const admin = require('firebase-admin')

// サービスアカウントキーへのパス（存在する場合）または環境変数を設定して初期化
// ※今回はローカルテストなどと同じプロジェクトなので、defaultAppで初期化を試みますが、
// 権限エラーが出る場合はサービスアカウントのキー（JSON）が必要です。
// 代わりに、FIREBASE_CONFIG環境変数を使うこともできます。

// 最も簡単なのは、firebase login済みの状態で、Google Default Credentialsを使うか、
// プロジェクトIDを指定することです。
admin.initializeApp({
  projectId: 'chatan-members-site',
})

const db = admin.firestore()
const auth = admin.auth()

const TEST_USER_UID = 'GYeT53iTDDTrDdmbEIdCFMmZXZq1'

async function deleteTestUser() {
  try {
    console.log(`Starting deletion for user: ${TEST_USER_UID}`)

    // 1. Delete from Firestore profiles collection
    const profileRef = db.collection('profiles').doc(TEST_USER_UID)
    const profileDoc = await profileRef.get()

    if (profileDoc.exists) {
      console.log('Found profile document in Firestore. Deleting...')
      await profileRef.delete()
      console.log('Successfully deleted profile document.')
    } else {
      console.log('Profile document not found in Firestore. Skipping.')
    }

    // 2. Delete from Firebase Authentication
    // this strictly depends on application default credentials having correct cross-service permissions
    // if using just standard initialization without service account credentials, this might fail
    // unless running via Cloud Functions or a machine with Google Application Default Credentials.
    try {
      console.log('Attempting to delete user from Firebase Auth...')
      await auth.deleteUser(TEST_USER_UID)
      console.log('Successfully deleted user from Firebase Auth.')
    } catch (authError) {
      if (authError.code === 'auth/user-not-found') {
        console.log('User not found in Firebase Auth. Skipping.')
      } else {
        console.error('Error deleting user from Firebase Auth:', authError.message)
      }
    }

    console.log('Test user deletion process finished.')
  } catch (error) {
    console.error('Error during test user deletion:', error)
  }
}

deleteTestUser()
