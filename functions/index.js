const { onRequest, onCall, HttpsError } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const axios = require('axios')
const cors = require('cors')({ origin: true })

admin.initializeApp()
const db = admin.firestore()

exports.createLineCustomToken = onRequest({ invoker: 'public' }, async (req, res) => {
  return cors(req, res, async () => {
    // 1. Get token from request body
    const { lineAccessToken } = req.body

    if (!lineAccessToken) {
      return res.status(400).json({ error: 'Missing LINE access token.' })
    }

    try {
      // 2. Verify LINE Token
      const verifyResponse = await axios.get('https://api.line.me/oauth2/v2.1/verify', {
        params: { access_token: lineAccessToken },
      })

      if (verifyResponse.data.expires_in <= 0) {
        return res.status(401).json({ error: 'LINE access token has expired.' })
      }

      // 3. Get User Profile from LINE
      const profileResponse = await axios.get('https://api.line.me/v2/profile', {
        headers: { Authorization: `Bearer ${lineAccessToken}` },
      })

      const lineUid = profileResponse.data.userId
      const displayName = profileResponse.data.displayName
      const pictureUrl = profileResponse.data.pictureUrl

      // 4. Check if this LINE UID is linked to an existing user in Firestore
      const usersRef = db.collection('profiles')
      const snapshot = await usersRef.where('lineUid', '==', lineUid).limit(1).get()

      let firebaseUid = `line:${lineUid}`
      if (!snapshot.empty) {
        // Line account is already linked to an existing user!
        // We will log them in as that existing user instead of creating a new LINE-only user.
        firebaseUid = snapshot.docs[0].id
      }

      const customToken = await admin.auth().createCustomToken(firebaseUid, {
        provider: 'line.me',
        displayName,
        pictureUrl,
      })

      // 5. Return the custom token and LINE profile
      return res.status(200).json({
        customToken,
        profile: { lineUid, displayName, pictureUrl },
      })
    } catch (error) {
      console.error('Error creating custom token:', error.response?.data || error.message)
      return res.status(500).json({ error: 'Failed to create custom token.' })
    }
  })
})

// === LINE accounts linking function ===
// Called by an ALREADY logged-in user from the MyPage to link their LINE account.
exports.linkLineAccount = onCall(async (request) => {
  // Check if user is authenticated
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to link a LINE account.')
  }

  const { lineAccessToken } = request.data
  if (!lineAccessToken) {
    throw new HttpsError('invalid-argument', 'Missing LINE access token.')
  }

  try {
    // 1. Verify LINE Token
    const verifyResponse = await axios.get('https://api.line.me/oauth2/v2.1/verify', {
      params: { access_token: lineAccessToken },
    })

    if (verifyResponse.data.expires_in <= 0) {
      throw new HttpsError('unauthenticated', 'LINE access token has expired.')
    }

    // 2. Get User Profile from LINE
    const profileResponse = await axios.get('https://api.line.me/v2/profile', {
      headers: { Authorization: `Bearer ${lineAccessToken}` },
    })

    const lineUid = profileResponse.data.userId

    // 3. Make sure this lineUid isn't already linked to someone else
    const snapshot = await db.collection('profiles').where('lineUid', '==', lineUid).limit(1).get()
    if (!snapshot.empty && snapshot.docs[0].id !== request.auth.uid) {
      throw new HttpsError('already-exists', 'This LINE account is already linked to another user.')
    }

    // 4. Save the link in the user's Firestore profile
    await db.collection('profiles').doc(request.auth.uid).set(
      {
        lineUid: lineUid,
        lineLinkedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    )

    return { success: true, message: 'LINE account successfully linked.' }
  } catch (error) {
    console.error('Error linking LINE account:', error.response?.data || error.message)
    throw new HttpsError('internal', 'Failed to link LINE account.')
  }
})

// === LINE accounts unlinking function ===
// Called by an ALREADY logged-in user from the MyPage to unlink their LINE account.
exports.unlinkLineAccount = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to unlink a LINE account.')
  }

  try {
    // Remove the lineUid from the user's Firestore profile so they can no longer log in with it
    await db.collection('profiles').doc(request.auth.uid).update({
      lineUid: admin.firestore.FieldValue.delete(),
      lineLinkedAt: admin.firestore.FieldValue.delete(),
    })

    return { success: true, message: 'LINE account successfully unlinked.' }
  } catch (error) {
    console.error('Error unlinking LINE account:', error)
    throw new HttpsError('internal', 'Failed to unlink LINE account.')
  }
})
