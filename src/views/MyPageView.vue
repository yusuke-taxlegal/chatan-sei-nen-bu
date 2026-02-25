<script setup>
import { ref, computed, onMounted } from 'vue'

// --- 入部年度の選択肢を生成（直近15年分） ---
const currentYear = new Date().getFullYear()
const enrollmentYearOptions = Array.from({ length: 15 }, (_, i) => currentYear - i)
import { auth, db, storage } from '../firebase'
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  GoogleAuthProvider,
  linkWithPopup,
  deleteUser,
} from 'firebase/auth'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import NotebookLMPromptGenerator from '../components/NotebookLMPromptGenerator.vue'
import { getGraduationStatus } from '../utils/memberUtils'

const userName = ref('')
const phoneticName = ref('') // フリガナ用の新しいref
const companyName = ref('')
const bio = ref('') // 自己紹介と事業内容を統合
const website = ref('')
const sns = ref('') // 互換性のため残す
const twitter = ref('')
const facebook = ref('')
const instagram = ref('')
const tiktok = ref('')
const youtube = ref('') // YouTubeリンク用の新しいref
// const recentActivity = ref(''); // 削除
const profileImageUrl = ref('')

// 新しく追加する項目
// const businessContent = ref(''); // bioに統合
const needs = ref('')
const pastTransactions = ref('')
const providableInfo = ref('')
const seekingInfo = ref('')

// --- 役職・入部年度・生年月日 ---
const currentRole = ref('')
const pastRoles = ref([])
const enrollmentYear = ref('')
const birthDate = ref('')

// --- 卒部・Last Year判定 ---
const graduationStatus = computed(() => getGraduationStatus(birthDate.value))
const isGraduated = computed(() => graduationStatus.value.isGraduated)
const isLastYear = computed(() => graduationStatus.value.isLastYear)

// --- 閲覧/編集モード ---
const isEditing = ref(false)

const memberObj = computed(() => ({
  name: userName.value,
  phoneticName: phoneticName.value,
  company: companyName.value,
  bio: bio.value,
  needs: needs.value,
  pastTransactions: pastTransactions.value,
  providableInfo: providableInfo.value,
  seekingInfo: seekingInfo.value,
  website: website.value,
  sns: sns.value,
  youtube: youtube.value,
  profileImageUrl: profileImageUrl.value,
  currentRole: currentRole.value,
  pastRoles: pastRoles.value,
  enrollmentYear: enrollmentYear.value,
  birthDate: birthDate.value,
}))

const getSafeUrl = (url) => {
  if (!url) return ''
  const trimmedUrl = url.trim()
  if (/^(javascript|data|vbscript):/i.test(trimmedUrl)) return '#unsafe'
  return trimmedUrl
}

const getSNSPlatform = (url) => {
  if (!url) return 'SNS'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X'
  if (url.includes('instagram.com')) return 'Instagram'
  if (url.includes('facebook.com')) return 'Facebook'
  if (url.includes('linkedin.com')) return 'LinkedIn'
  if (url.includes('tiktok.com')) return 'TikTok'
  return 'SNS'
}

// --- パスワード変更用のState ---
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordChangeMessage = ref('')
const passwordChangeError = ref('')
const isPasswordChanging = ref(false)
// -----------------------------

// --- メールアドレス変更用のState ---
const currentEmail = ref('')
const newEmail = ref('')
const passwordForEmailChange = ref('')
const emailChangeMessage = ref('')
const emailChangeError = ref('')
const isEmailChanging = ref(false)
// -------------------------------

// --- Google連携用のState ---
const isLinkingGoogle = ref(false)
const googleLinkMessage = ref('')
const googleLinkError = ref('')
// ---------------------------

// --- アカウント削除用のState ---
const showDeleteModal = ref(false)
const passwordForDelete = ref('')
const deleteConfirmationText = ref('')
const isDeleting = ref(false)
const deleteError = ref('')
// ---------------------------

// --- ログインプロバイダーのState ---
const authProvider = ref('')
// ---------------------------------

const selectedFile = ref(null)
const fileInputRef = ref(null) // ファイル入力への参照

// --- トリミング機能用の新しいState ---
const showCropperModal = ref(false)
const imageToCrop = ref(null)
const cropperRef = ref(null)
// ------------------------------------

const triggerFileInput = () => {
  fileInputRef.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageToCrop.value = e.target.result
      showCropperModal.value = true
    }
    reader.readAsDataURL(file)
  }
  // inputの値をリセットして同じファイルを選択できるようにする
  event.target.value = null
}

const onCropCancel = () => {
  showCropperModal.value = false
  imageToCrop.value = null
}

const onCropConfirm = () => {
  if (cropperRef.value) {
    const { canvas } = cropperRef.value.getResult()
    canvas.toBlob((blob) => {
      selectedFile.value = blob
      profileImageUrl.value = URL.createObjectURL(blob) // プレビューを更新
      showCropperModal.value = false
    }, 'image/jpeg')
  }
}

const validateAndFormatUrl = (url) => {
  if (!url) return ''
  const trimmedUrl = url.trim()
  if (/^(javascript|data|vbscript):/i.test(trimmedUrl)) {
    throw new Error('セキュリティ上、許可されていないURL形式が含まれています。')
  }
  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return 'https://' + trimmedUrl
  }
  return trimmedUrl
}

const saveProfile = async () => {
  const user = auth.currentUser
  if (!user) return

  let formattedWebsite = website.value
  let formattedSns = sns.value
  let formattedYoutube = youtube.value

  try {
    formattedWebsite = validateAndFormatUrl(website.value)
    formattedSns = validateAndFormatUrl(sns.value)
    formattedYoutube = validateAndFormatUrl(youtube.value)

    // 画面の入力欄も自動補完されたものに書き換える
    website.value = formattedWebsite
    sns.value = formattedSns
    youtube.value = formattedYoutube
  } catch (error) {
    alert(error.message)
    return
  }

  try {
    let imageUrl = profileImageUrl.value // 既存のURLを保持
    if (selectedFile.value) {
      const file = selectedFile.value
      const filePath = `profileImages/${user.uid}/${file.name}`
      const fileRef = storageRef(storage, filePath)
      await uploadBytes(fileRef, file)
      imageUrl = await getDownloadURL(fileRef)
    }

    const profileData = {
      name: userName.value,
      phoneticName: phoneticName.value, // 保存データにフリガナを追加
      company: companyName.value,
      bio: bio.value,
      website: formattedWebsite,
      sns: formattedSns,
      twitter: formattedTwitter,
      facebook: formattedFacebook,
      instagram: formattedInstagram,
      tiktok: formattedTiktok,
      youtube: formattedYoutube, // 保存データにYouTubeを追加
      // recentActivity: recentActivity.value, // 削除
      profileImageUrl: imageUrl,
      // businessContent: businessContent.value, // bioに統合
      needs: needs.value,
      pastTransactions: pastTransactions.value,
      providableInfo: providableInfo.value,
      seekingInfo: seekingInfo.value,
      currentRole: currentRole.value,
      pastRoles: pastRoles.value,
      enrollmentYear: enrollmentYear.value ? Number(enrollmentYear.value) : '',
      birthDate: birthDate.value,
    }

    const profileRef = doc(db, 'profiles', user.uid)
    await setDoc(profileRef, profileData, { merge: true })

    alert('プロフィールを保存しました！')
    if (imageUrl) profileImageUrl.value = imageUrl
    selectedFile.value = null // ファイル選択をリセット
  } catch (error) {
    console.error('プロフィールの保存に失敗しました:', error)
    alert('プロフィールの保存に失敗しました。')
  }
}

const handleChangePassword = async () => {
  passwordChangeMessage.value = ''
  passwordChangeError.value = ''

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    passwordChangeError.value = 'すべての項目を入力してください。'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordChangeError.value = '新しいパスワードが一致しません。'
    return
  }
  if (newPassword.value.length < 6) {
    passwordChangeError.value = '新しいパスワードは6文字以上で入力してください。'
    return
  }

  isPasswordChanging.value = true
  const user = auth.currentUser
  if (!user) {
    passwordChangeError.value = 'ユーザーがログインしていません。'
    isPasswordChanging.value = false
    return
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword.value)
    await reauthenticateWithCredential(user, credential)
    await updatePassword(user, newPassword.value)

    passwordChangeMessage.value = 'パスワードが正常に変更されました。'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    console.error('パスワード変更エラー:', error)
    if (error.code === 'auth/wrong-password') {
      passwordChangeError.value = '現在のパスワードが間違っています。'
    } else {
      passwordChangeError.value = 'パスワードの変更に失敗しました。もう一度お試しください。'
    }
  } finally {
    isPasswordChanging.value = false
  }
}

const handleChangeEmail = async () => {
  emailChangeMessage.value = ''
  emailChangeError.value = ''

  if (!newEmail.value || !passwordForEmailChange.value) {
    emailChangeError.value = '新しいメールアドレスと現在のパスワードを入力してください。'
    return
  }

  isEmailChanging.value = true
  const user = auth.currentUser
  if (!user) {
    emailChangeError.value = 'ユーザーがログインしていません。'
    isEmailChanging.value = false
    return
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, passwordForEmailChange.value)
    await reauthenticateWithCredential(user, credential)
    await updateEmail(user, newEmail.value)

    emailChangeMessage.value =
      'メールアドレスが正常に変更されました。新しいアドレスに送信されたメールをご確認の上、認証を完了してください。'
    currentEmail.value = newEmail.value
    newEmail.value = ''
    passwordForEmailChange.value = ''
  } catch (error) {
    console.error('メールアドレス変更エラー:', error)
    if (error.code === 'auth/wrong-password') {
      emailChangeError.value = '現在のパスワードが間違っています。'
    } else if (error.code === 'auth/email-already-in-use') {
      emailChangeError.value = 'このメールアドレスは既に使用されています。'
    } else if (error.code === 'auth/invalid-email') {
      emailChangeError.value = 'メールアドレスの形式が正しくありません。'
    } else {
      emailChangeError.value = 'メールアドレスの変更に失敗しました。もう一度お試しください。'
    }
  } finally {
    isEmailChanging.value = false
  }
}

const linkWithGoogle = async () => {
  googleLinkMessage.value = ''
  googleLinkError.value = ''
  isLinkingGoogle.value = true

  const user = auth.currentUser
  if (!user) {
    googleLinkError.value = 'ユーザーがログインしていません。'
    isLinkingGoogle.value = false
    return
  }

  const provider = new GoogleAuthProvider()

  try {
    await linkWithPopup(user, provider)
    googleLinkMessage.value = 'Googleアカウントとの連携に成功しました！'
    // UIを更新するためにプロバイダー情報を更新
    authProvider.value = 'google.com'
  } catch (error) {
    console.error('Google連携エラー:', error)
    if (error.code === 'auth/credential-already-in-use') {
      googleLinkError.value = 'このGoogleアカウントは既に他のユーザーによって使用されています。'
    } else {
      googleLinkError.value = 'Googleアカウントとの連携に失敗しました。'
    }
  } finally {
    isLinkingGoogle.value = false
  }
}

const handleDeleteAccount = async () => {
  deleteError.value = ''
  isDeleting.value = true
  const user = auth.currentUser

  if (!user) {
    deleteError.value = '再ログインが必要です。'
    isDeleting.value = false
    return
  }

  try {
    // 1. Re-authenticate if necessary (for password users)
    if (authProvider.value === 'password') {
      if (!passwordForDelete.value) {
        deleteError.value = 'パスワードを入力してください。'
        isDeleting.value = false
        return
      }
      const credential = EmailAuthProvider.credential(user.email, passwordForDelete.value)
      await reauthenticateWithCredential(user, credential)
    } else if (authProvider.value === 'google.com') {
      if (deleteConfirmationText.value !== '削除します') {
        deleteError.value = '確認用のテキストが正しくありません。'
        isDeleting.value = false
        return
      }
    }

    // 2. Delete Storage files
    const userStorageRef = storageRef(storage, `profileImages/${user.uid}`)
    const res = await listAll(userStorageRef)
    const deletePromises = res.items.map((itemRef) => deleteObject(itemRef))
    await Promise.all(deletePromises)

    // 3. Delete Firestore document
    await deleteDoc(doc(db, 'profiles', user.uid))

    // 4. Delete user from Auth
    await deleteUser(user)

    alert('アカウントが正常に削除されました。ご利用いただきありがとうございました。')
    // Redirect to home page after deletion
    window.location.href = '/'
  } catch (error) {
    console.error('アカウント削除エラー:', error)
    if (error.code === 'auth/wrong-password') {
      deleteError.value = 'パスワードが間違っています。'
    } else if (error.code === 'auth/requires-recent-login') {
      deleteError.value =
        '最終ログインから時間が経過しています。安全のため、もう一度ログインしてからお試しください。'
    } else {
      deleteError.value = 'アカウントの削除に失敗しました。'
    }
  } finally {
    isDeleting.value = false
  }
}

onMounted(async () => {
  const user = auth.currentUser
  if (user) {
    // ログインプロバイダーを特定
    if (user.providerData && user.providerData.length > 0) {
      authProvider.value = user.providerData[0].providerId
    }

    currentEmail.value = user.email
    const profileRef = doc(db, 'profiles', user.uid)
    const docSnap = await getDoc(profileRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      userName.value = data.name || ''
      phoneticName.value = data.phoneticName || '' // フリガナを読み込む
      companyName.value = data.company || ''
      // bioとbusinessContentを結合して読み込む
      bio.value = [data.bio, data.businessContent].filter(Boolean).join('\\n\\n')
      website.value = data.website || ''
      sns.value = data.sns || ''
      twitter.value = data.twitter || ''
      facebook.value = data.facebook || ''
      instagram.value = data.instagram || ''
      tiktok.value = data.tiktok || ''
      youtube.value = data.youtube || '' // YouTubeリンクを読み込む
      // recentActivity.value = data.recentActivity || ''; // 削除
      profileImageUrl.value = data.profileImageUrl || ''
      // businessContent.value = data.businessContent || ''; // bioに統合
      needs.value = data.needs || ''
      pastTransactions.value = data.pastTransactions || ''
      providableInfo.value = data.providableInfo || ''
      seekingInfo.value = data.seekingInfo || ''
      currentRole.value = data.currentRole || ''
      pastRoles.value = data.pastRoles || data.roleHistory || []
      enrollmentYear.value = data.enrollmentYear || ''
      birthDate.value = data.birthDate || ''
    }
  }
})
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">マイページ</h1>
      <p class="page-subtitle">プロフィール情報を編集して、部員同士のつながりを深めましょう</p>
    </div>

    <!-- ===== 閲覧モード ===== -->
    <div v-if="!isEditing" class="card profile-view-card">
      <div class="view-header">
        <div class="view-image-container">
          <img
            :src="profileImageUrl || 'https://via.placeholder.com/150'"
            alt="プロフィール画像"
            class="view-profile-image"
          />
        </div>
        <p v-if="phoneticName" class="view-phonetic">{{ phoneticName }}</p>
        <h2 class="view-name">{{ userName || '名前未設定' }}</h2>
        <p class="view-company">{{ companyName || '' }}</p>
        <div
          v-if="currentRole || pastRoles.length > 0 || enrollmentYear || isGraduated || isLastYear"
          class="view-badges"
        >
          <span v-if="isGraduated" class="graduated-badge">🎓 卒部</span>
          <span v-if="isLastYear" class="last-year-badge">🔥 Last Year</span>
          <span v-if="currentRole" class="current-role-badge">🏅 現 {{ currentRole }}</span>
          <span v-for="role in pastRoles" :key="role" class="past-role-badge"
            >📜 {{ role }}経験</span
          >
          <span v-if="enrollmentYear" class="enrollment-badge">📅 {{ enrollmentYear }}年入部</span>
        </div>
      </div>

      <div class="view-details">
        <div v-if="bio" class="view-detail-card">
          <div class="view-detail-icon">📝</div>
          <div class="view-detail-content">
            <h3 class="view-detail-label">自己紹介・事業内容</h3>
            <div class="view-detail-value text-content">{{ bio }}</div>
          </div>
        </div>

        <div v-if="needs" class="view-detail-card">
          <div class="view-detail-icon">🎯</div>
          <div class="view-detail-content">
            <h3 class="view-detail-label">対応できるニーズ</h3>
            <div class="view-detail-value text-content">{{ needs }}</div>
          </div>
        </div>

        <div v-if="pastTransactions" class="view-detail-card">
          <div class="view-detail-icon">🤝</div>
          <div class="view-detail-content">
            <h3 class="view-detail-label">過去に青年部内で取引した事例</h3>
            <div class="view-detail-value text-content">{{ pastTransactions }}</div>
          </div>
        </div>

        <div v-if="providableInfo" class="view-detail-card">
          <div class="view-detail-icon">💡</div>
          <div class="view-detail-content">
            <h3 class="view-detail-label">提供できる情報</h3>
            <div class="view-detail-value text-content">{{ providableInfo }}</div>
          </div>
        </div>

        <div v-if="seekingInfo" class="view-detail-card">
          <div class="view-detail-icon">🔍</div>
          <div class="view-detail-content">
            <h3 class="view-detail-label">求めている情報</h3>
            <div class="view-detail-value text-content">{{ seekingInfo }}</div>
          </div>
        </div>

        <div v-if="website" class="view-detail-card">
          <div class="view-detail-icon">🌐</div>
          <div class="view-detail-content">
            <h3 class="view-detail-label">ウェブサイト</h3>
            <a :href="getSafeUrl(website)" target="_blank" class="view-detail-link">{{
              website
            }}</a>
          </div>
        </div>

        <div v-if="twitter || facebook || instagram || tiktok || sns" class="view-detail-card">
          <div class="view-detail-icon">📢</div>
          <div class="view-detail-content">
            <h3 class="view-detail-label">SNS</h3>
            <div class="sns-links-wrapper">
              <a
                v-if="twitter"
                :href="getSafeUrl(twitter)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-twitter"
                >𝕏 X (Twitter)</a
              >
              <a
                v-if="facebook"
                :href="getSafeUrl(facebook)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-facebook"
                >📘 Facebook</a
              >
              <a
                v-if="instagram"
                :href="getSafeUrl(instagram)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-instagram"
                >📸 Instagram</a
              >
              <a
                v-if="tiktok"
                :href="getSafeUrl(tiktok)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-tiktok"
                >🎵 TikTok</a
              >
              <a
                v-if="sns && !twitter && !facebook && !instagram && !tiktok"
                :href="getSafeUrl(sns)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-other"
                >🔗 その他SNS</a
              >
            </div>
          </div>
        </div>

        <div v-if="youtube" class="view-detail-card">
          <div class="view-detail-icon">📺</div>
          <div class="view-detail-content">
            <h3 class="view-detail-label">YouTube</h3>
            <a :href="getSafeUrl(youtube)" target="_blank" class="view-detail-link">{{
              youtube
            }}</a>
          </div>
        </div>
      </div>

      <button @click="isEditing = true" class="edit-profile-btn">✏️ 情報を修正する</button>
    </div>

    <!-- ===== 編集モード ===== -->
    <div v-else class="card profile-card">
      <div class="edit-mode-header">
        <button @click="isEditing = false" class="back-to-view-btn">← プロフィールに戻る</button>
        <h2 class="card-title" style="border-bottom: none; margin: 0; padding: 0">
          プロフィール編集
        </h2>
      </div>

      <div class="profile-layout">
        <div class="image-section">
          <div class="image-preview-wrapper" @click="triggerFileInput">
            <img
              :src="profileImageUrl || 'https://via.placeholder.com/150'"
              alt="プロフィール画像"
              class="profile-image-preview"
            />
            <div class="image-overlay"><span>📷 変更</span></div>
          </div>
          <button @click="triggerFileInput" class="image-select-button">画像を選択</button>
          <input
            type="file"
            ref="fileInputRef"
            @change="handleFileSelect"
            accept="image/*"
            class="file-input"
          />
        </div>

        <div class="form-section">
          <div class="form-grid">
            <div class="grid-col-2">
              <div class="form-group">
                <label for="userName">👤 氏名</label>
                <input type="text" id="userName" v-model="userName" placeholder="お名前を入力" />
              </div>
              <div class="form-group">
                <label for="phoneticName">あ フリガナ</label>
                <input
                  type="text"
                  id="phoneticName"
                  v-model="phoneticName"
                  placeholder="フリガナを入力"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="companyName">🏢 会社名</label>
              <input
                type="text"
                id="companyName"
                v-model="companyName"
                placeholder="会社名を入力"
              />
            </div>
            <div class="grid-col-2">
              <div class="form-group">
                <label for="currentRole">🏅 現在の役職</label>
                <select id="currentRole" v-model="currentRole" class="form-select">
                  <option value="">なし</option>
                  <option value="部長">部長</option>
                  <option value="副部長">副部長</option>
                </select>
              </div>
              <div class="form-group">
                <label>📜 過去に経験した役職</label>
                <div class="checkbox-group">
                  <label class="checkbox-label">
                    <input type="checkbox" value="部長" v-model="pastRoles" />
                    <span class="checkbox-text">部長</span>
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" value="副部長" v-model="pastRoles" />
                    <span class="checkbox-text">副部長</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="grid-col-2">
              <div class="form-group">
                <label for="enrollmentYear">📅 入部年度</label>
                <select id="enrollmentYear" v-model="enrollmentYear" class="form-select">
                  <option value="">選択してください</option>
                  <option v-for="y in enrollmentYearOptions" :key="y" :value="y">{{ y }}年</option>
                </select>
              </div>
              <div class="form-group">
                <label for="birthDate">🎂 生年月日</label>
                <input type="date" id="birthDate" v-model="birthDate" class="form-input-date" />
                <p v-if="isGraduated" class="graduated-hint">🎓 卒部対象です</p>
                <p v-if="isLastYear" class="last-year-hint">
                  🔥 青年部ラストイヤー（今年度卒部）です！
                </p>
              </div>
            </div>
            <div class="form-group">
              <label for="bio">📝 自己紹介・事業内容</label>
              <textarea
                id="bio"
                v-model="bio"
                rows="5"
                placeholder="ご自身の事業や趣味、得意なことなどを自由に紹介してください"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="needs">🎯 どのようなニーズに対応できるか</label>
              <textarea
                id="needs"
                v-model="needs"
                rows="3"
                placeholder="例）会社の忘年会や接待で利用できる飲食店を探している方。"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="pastTransactions">🤝 過去に青年部内で取引した事例</label>
              <textarea
                id="pastTransactions"
                v-model="pastTransactions"
                rows="3"
                placeholder="例）○○さんのオフィスの内装工事を担当しました。"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="providableInfo">💡 提供できる情報</label>
              <textarea
                id="providableInfo"
                v-model="providableInfo"
                rows="3"
                placeholder="例）車両を長持ちさせるメンテナンスのコツ。"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="seekingInfo">🔍 求めている情報</label>
              <textarea
                id="seekingInfo"
                v-model="seekingInfo"
                rows="3"
                placeholder="例）新メニューのPRを手伝ってくれる事業者を探しています。"
              ></textarea>
            </div>
            <div class="grid-col-2">
              <div class="form-group">
                <label for="website">🌐 ウェブサイト</label>
                <input
                  type="url"
                  id="website"
                  v-model="website"
                  placeholder="https://example.com"
                />
              </div>
              <div class="form-group">
                <label for="twitter">𝕏 X (旧Twitter)</label>
                <input
                  type="url"
                  id="twitter"
                  v-model="twitter"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>

            <div class="grid-col-2">
              <div class="form-group">
                <label for="facebook">📘 Facebook</label>
                <input
                  type="url"
                  id="facebook"
                  v-model="facebook"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div class="form-group">
                <label for="instagram">📸 Instagram</label>
                <input
                  type="url"
                  id="instagram"
                  v-model="instagram"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>

            <div class="grid-col-2">
              <div class="form-group">
                <label for="tiktok">🎵 TikTok</label>
                <input
                  type="url"
                  id="tiktok"
                  v-model="tiktok"
                  placeholder="https://tiktok.com/@..."
                />
              </div>
            </div>
            <div class="form-group">
              <label for="youtube">📺 YouTubeリンク</label>
              <input
                type="url"
                id="youtube"
                v-model="youtube"
                placeholder="https://youtube.com/channel/..."
              />
            </div>
            <button @click="saveProfile" class="save-button primary">プロフィールを保存</button>
          </div>
        </div>
      </div>
    </div>

    <NotebookLMPromptGenerator :member="memberObj" />

    <!-- Account Management Section -->
    <template v-if="authProvider === 'password'">
      <div class="card">
        <h2 class="card-title">アカウント連携</h2>
        <p class="card-subtitle">
          お使いのGoogleアカウントと連携すると、次回からGoogleボタンで簡単にログインできるようになります。
        </p>
        <button
          @click="linkWithGoogle"
          class="save-button google-button"
          :disabled="isLinkingGoogle"
        >
          <div class="google-icon">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
              ></path>
              <path
                fill="#34A853"
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z"
              ></path>
              <path
                fill="#FBBC05"
                d="M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.22l2.67-2.08z"
              ></path>
              <path
                fill="#EA4335"
                d="M8.98 4.72c1.16 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-2.7z"
              ></path>
            </svg>
          </div>
          <span>{{ isLinkingGoogle ? '連携処理中...' : 'Googleアカウントと連携する' }}</span>
        </button>
        <div v-if="googleLinkMessage" class="alert-message success">{{ googleLinkMessage }}</div>
        <div v-if="googleLinkError" class="alert-message error">{{ googleLinkError }}</div>
      </div>

      <div class="card">
        <h2 class="card-title">メールアドレス変更</h2>
        <div class="form-group">
          <label for="currentEmail">✉️ 現在のメールアドレス</label>
          <input
            type="email"
            id="currentEmail"
            :value="currentEmail"
            readonly
            class="readonly-input"
          />
        </div>
        <div class="grid-col-2">
          <div class="form-group">
            <label for="newEmail">📧 新しいメールアドレス</label>
            <input
              type="email"
              id="newEmail"
              v-model="newEmail"
              placeholder="新しいメールアドレス"
            />
          </div>
          <div class="form-group">
            <label for="passwordForEmailChange">🔑 現在のパスワード</label>
            <input
              type="password"
              id="passwordForEmailChange"
              v-model="passwordForEmailChange"
              placeholder="本人確認のため"
            />
          </div>
        </div>
        <button @click="handleChangeEmail" class="save-button" :disabled="isEmailChanging">
          <span v-if="isEmailChanging" class="loader"></span
          ><span v-else>メールアドレスを変更</span>
        </button>
        <div v-if="emailChangeMessage" class="alert-message success">{{ emailChangeMessage }}</div>
        <div v-if="emailChangeError" class="alert-message error">{{ emailChangeError }}</div>
      </div>

      <div class="card">
        <h2 class="card-title">パスワード変更</h2>
        <div class="form-group">
          <label for="currentPassword">🔑 現在のパスワード</label>
          <input
            type="password"
            id="currentPassword"
            v-model="currentPassword"
            placeholder="現在のパスワード"
          />
        </div>
        <div class="grid-col-2">
          <div class="form-group">
            <label for="newPassword">🔒 新しいパスワード</label>
            <input type="password" id="newPassword" v-model="newPassword" placeholder="6文字以上" />
          </div>
          <div class="form-group">
            <label for="confirmPassword">🔒 新しいパスワード（確認）</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="再度入力"
            />
          </div>
        </div>
        <button @click="handleChangePassword" class="save-button" :disabled="isPasswordChanging">
          <span v-if="isPasswordChanging" class="loader"></span><span v-else>パスワードを変更</span>
        </button>
        <div v-if="passwordChangeMessage" class="alert-message success">
          {{ passwordChangeMessage }}
        </div>
        <div v-if="passwordChangeError" class="alert-message error">{{ passwordChangeError }}</div>
      </div>
    </template>

    <div v-if="authProvider === 'google.com'" class="card">
      <h2 class="card-title">アカウント情報</h2>
      <div class="info-message">
        <p class="info-text">
          このアカウントはGoogleアカウントと連携しています。<br />メールアドレスやパスワードの変更は、ご利用のGoogleアカウント設定から行ってください。
        </p>
      </div>
    </div>

    <!-- Account Deletion Card -->
    <div class="card delete-card">
      <h2 class="card-title">アカウント削除</h2>
      <p class="card-subtitle">
        この操作は元に戻すことはできません。アカウントを削除すると、すべてのプロフィール情報が完全に削除されます。
      </p>
      <button @click="showDeleteModal = true" class="save-button delete-button">
        アカウントを削除する
      </button>
    </div>

    <!-- Image Cropper Modal -->
    <div v-if="showCropperModal" class="cropper-modal-overlay">
      <div class="cropper-modal-content">
        <h3>画像を調整</h3>
        <cropper
          ref="cropperRef"
          :src="imageToCrop"
          :stencil-component="CircleStencil"
          :stencil-props="{ aspectRatio: 1 / 1 }"
        />
        <div class="cropper-actions">
          <button @click="onCropCancel" class="cropper-button secondary">キャンセル</button>
          <button @click="onCropConfirm" class="cropper-button primary">決定</button>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div v-if="showDeleteModal" class="cropper-modal-overlay">
      <div class="cropper-modal-content delete-modal-content">
        <h3>本当にアカウントを削除しますか？</h3>
        <p class="delete-warning">
          この操作は取り消せません。プロフィール、画像など全てのデータが永久に削除されます。
        </p>

        <!-- For password users -->
        <div v-if="authProvider === 'password'" class="form-group">
          <label for="passwordForDelete">本人確認のため、パスワードを入力してください</label>
          <input
            type="password"
            id="passwordForDelete"
            v-model="passwordForDelete"
            placeholder="現在のパスワード"
          />
        </div>

        <!-- For Google users -->
        <div v-if="authProvider === 'google.com'" class="form-group">
          <label for="deleteConfirmation">「削除します」と入力してください</label>
          <input
            type="text"
            id="deleteConfirmation"
            v-model="deleteConfirmationText"
            placeholder="削除します"
          />
        </div>

        <div v-if="deleteError" class="alert-message error">{{ deleteError }}</div>

        <div class="cropper-actions">
          <button @click="showDeleteModal = false" class="cropper-button secondary">
            キャンセル
          </button>
          <button
            @click="handleDeleteAccount"
            class="cropper-button delete-button"
            :disabled="isDeleting"
          >
            <span v-if="isDeleting" class="loader"></span>
            <span v-else>削除を実行する</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base Styles */
.page-container {
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--vt-c-text-dark-2);
  margin-top: 0.5rem;
}

.card {
  background: linear-gradient(145deg, var(--color-background-soft), var(--color-background-mute));
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: -0.5rem 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.card-subtitle {
  color: var(--vt-c-text-dark-2);
  margin: -1rem 0 1.5rem 0;
}

/* Delete Section */
.delete-card {
  border-color: #ef4444;
}
.delete-button {
  background: #ef4444;
  color: white;
}
.delete-button:hover {
  background: #dc2626;
}
.delete-modal-content {
  max-width: 500px;
}
.delete-warning {
  background: rgba(239, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  color: #ef4444;
  margin: 1.5rem 0;
  line-height: 1.6;
}

/* ===== View Mode (Read-only Profile) ===== */
.profile-view-card {
  text-align: center;
}

.view-header {
  margin-bottom: 2rem;
}

.view-image-container {
  display: inline-block;
  margin-bottom: 1rem;
}

.view-profile-image {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.view-phonetic {
  font-size: 0.9rem;
  color: var(--vt-c-text-dark-2);
  margin-bottom: 0.25rem;
  letter-spacing: 0.05em;
}

.view-name {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
}

.view-company {
  font-size: 1.1rem;
  color: var(--vt-c-text-dark-2);
}

.view-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.current-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #92400e;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 1px solid #f59e0b;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.past-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vt-c-text-dark-2);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 2rem;
}

.enrollment-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vt-c-text-dark-2);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 2rem;
}

.graduated-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #581c87;
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  border: 1px solid #a855f7;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.2);
}

.last-year-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #9f1239;
  background: linear-gradient(135deg, #ffe4e6, #fecdd3);
  border: 1px solid #f43f5e;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(244, 63, 94, 0.3);
  animation: pulse-border 2s infinite;
}

@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(244, 63, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(244, 63, 94, 0);
  }
}

/* Date Input */
.form-input-date {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  transition: border-color 0.2s;
}

.form-input-date:focus {
  outline: none;
  border-color: var(--vt-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.graduated-hint {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #a855f7;
  font-weight: 500;
}

.last-year-hint {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #f43f5e;
  font-weight: 600;
}

/* Checkbox Group */
.checkbox-group {
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.checkbox-label input[type='checkbox'] {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: var(--vt-c-brand);
  cursor: pointer;
}

.checkbox-text {
  color: var(--color-text);
  font-weight: 500;
}

/* Form Select */
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s;
  appearance: auto;
}

.form-select:focus {
  outline: none;
  border-color: var(--vt-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.view-details {
  display: grid;
  gap: 1rem;
  text-align: left;
  margin-bottom: 2rem;
}

.view-detail-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: border-color 0.2s;
}

.view-detail-card:hover {
  border-color: var(--vt-c-brand);
}

.view-detail-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  padding: 0.4rem;
  background: var(--color-background);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.view-detail-content {
  flex: 1;
  min-width: 0;
}

.view-detail-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vt-c-text-dark-2);
  margin-bottom: 0.4rem;
}

.view-detail-value {
  font-size: 1rem;
  color: var(--color-text);
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.view-detail-link {
  color: var(--vt-c-brand);
  text-decoration: none;
  word-break: break-all;
  font-size: 0.95rem;
}

.view-detail-link:hover {
  text-decoration: underline;
}

.edit-profile-btn {
  display: inline-block;
  padding: 0.9rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.edit-profile-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* ===== Edit Mode Header ===== */
.edit-mode-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.back-to-view-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: var(--vt-c-text-dark-2);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.back-to-view-btn:hover {
  color: var(--vt-c-brand);
  border-color: var(--vt-c-brand);
}

/* Profile Section */
.profile-card {
  padding: 2.5rem;
}
.profile-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2.5rem;
  align-items: flex-start;
}

.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 120px;
}

.image-preview-wrapper {
  position: relative;
  cursor: pointer;
}

.profile-image-preview {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-background);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}
.image-preview-wrapper:hover .profile-image-preview {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-weight: 500;
}

.image-preview-wrapper:hover .image-overlay {
  opacity: 1;
}

.image-select-button {
  padding: 0.6rem 1.2rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.2s;
}
.image-select-button:hover {
  background: var(--vt-c-brand-tint);
}

.file-input {
  display: none;
}

.form-section {
  display: flex;
  flex-direction: column;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--vt-c-text-dark-2);
  font-size: 0.875rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text);
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--vt-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  background-color: var(--color-background-soft);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.grid-col-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.readonly-input {
  background-color: var(--color-background-mute) !important;
  cursor: default;
}

/* Buttons */
.save-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.save-button.primary {
  background: var(--vt-c-brand);
  color: white;
  margin-top: 1.5rem;
}
.save-button.primary:hover {
  background: var(--vt-c-brand-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.google-button {
  background: white;
  color: #333;
  border: 1px solid var(--color-border);
}
.google-button:hover {
  background-color: #f5f5f5;
}
.google-icon {
  display: flex;
}

/* Alert & Info Messages */
.alert-message,
.info-message {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
}
.alert-message.success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #059669;
}
.alert-message.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.info-message {
  background-color: var(--color-background);
}
.info-text {
  line-height: 1.6;
}

.loader {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

/* Cropper Modal */
.cropper-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.cropper-modal-content {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
}
.cropper-modal-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
.cropper-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
.cropper-button {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
.cropper-button.primary {
  background: var(--vt-c-brand);
  color: white;
}
.cropper-button.secondary {
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

/* Responsive */
@media (max-width: 768px) {
  .page-container {
    padding: 1rem 0;
  }
  .page-header {
    padding: 0 1rem;
  }
  .page-title {
    font-size: 2rem;
  }
  .card {
    padding: 1.5rem 1rem;
    margin-top: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    box-shadow: none;
    border-bottom: 8px solid var(--color-background);
  }
  .card:last-child {
    border-bottom: none;
  }
  .profile-layout {
    grid-template-columns: 1fr;
  }
  .image-section {
    position: static;
  }
  .grid-col-2 {
    grid-template-columns: 1fr;
  }
}
</style>
