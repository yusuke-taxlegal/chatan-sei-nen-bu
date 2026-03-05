<script setup>
import { ref, onMounted } from 'vue'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCustomToken,
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import liff from '@line/liff'

const email = ref('')
const password = ref('')
const router = useRouter()
const isGoogleLoading = ref(false)
const isLineLoading = ref(false)
const showLineLogin = ref(localStorage.getItem('hasLinkedLINE') === 'true')

const liffId = import.meta.env.VITE_LINE_LIFF_ID || ''

onMounted(async () => {
  if (liffId) {
    try {
      await liff.init({ liffId })
      // LINEの認証画面から戻ってきた直後かどうかを判定する
      const urlParams = new URLSearchParams(window.location.search)
      const isLineRedirect = sessionStorage.getItem('isLineLoginClick') === 'true'

      if (liff.isLoggedIn() && (isLineRedirect || urlParams.has('liff.state'))) {
        sessionStorage.removeItem('isLineLoginClick')
        processLineLogin()
      }
    } catch (error) {
      console.error('LIFF initialization failed', error)
    }
  }
})

const processLineLogin = async () => {
  isLineLoading.value = true
  try {
    const accessToken = liff.getAccessToken()
    if (!accessToken) throw new Error('LINEアクセストークンが取得できませんでした')

    // 本番環境のCloud Functions URLを指定（必要に応じて環境変数化）
    const functionUrl =
      import.meta.env.VITE_FUNCTIONS_URL ||
      'https://us-central1-chatan-members-site.cloudfunctions.net/createLineCustomToken'

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lineAccessToken: accessToken }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'カスタムトークンの取得に失敗しました')
    }

    const { customToken, profile } = await response.json()

    // Firebase Authでカスタムトークンを使ってログイン
    const userCredential = await signInWithCustomToken(auth, customToken)
    const user = userCredential.user

    // 初回ログイン時はプロフィールを作成
    const profileRef = doc(db, 'profiles', user.uid)
    const docSnap = await getDoc(profileRef)

    if (!docSnap.exists()) {
      await setDoc(
        profileRef,
        {
          name: profile.displayName || 'LINE User',
          profileImageUrl: profile.pictureUrl || '',
          createdAt: new Date().toISOString(),
        },
        { merge: true },
      )
    }

    router.push('/')
  } catch (error) {
    console.error('LINE Login process failed:', error)
    alert('LINEログイン処理に失敗しました: ' + error.message)
    liff.logout()
  } finally {
    isLineLoading.value = false
  }
}

const loginWithLine = () => {
  if (!liffId) {
    alert('LINEログイン機能が現在未設定です。システム管理者にお問い合わせください。')
    return
  }
  // ボタンクリックのフラグを立ててからログイン処理へ
  sessionStorage.setItem('isLineLoginClick', 'true')

  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href })
  } else {
    processLineLogin()
  }
}

const logIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('ログインに成功しました！:', user)
      // アラート削除 - 直接ホームページへリダイレクト
      router.push('/')
    })
    .catch((error) => {
      console.error('ログインに失敗しました…:', error.code, error.message)
      alert('ログインに失敗しました: ' + error.message)
    })
}

const loginWithGoogle = () => {
  isGoogleLoading.value = true
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
      console.log('Googleログインに成功しました！:', user)
      router.push('/')
    })
    .catch((error) => {
      console.error('Googleログインに失敗しました:', error)
      let errorMessage = 'Googleログインに失敗しました。'

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'ログインがキャンセルされました。'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'ポップアップがブロックされました。ブラウザの設定をご確認ください。'
      }

      alert(errorMessage)
    })
    .finally(() => {
      isGoogleLoading.value = false
    })
}
</script>

<template>
  <div class="auth-page-container">
    <div class="auth-card">
      <h1 class="auth-title font-heading">ログイン</h1>
      <div class="form-group">
        <label for="email" class="font-ui">メールアドレス</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="email@example.com"
          class="font-body"
        />
      </div>
      <div class="form-group">
        <label for="password" class="font-ui">パスワード</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="パスワードを入力"
          class="font-body"
        />
      </div>
      <button @click="logIn" class="auth-button primary font-ui">ログイン</button>

      <!-- 区切り線 -->
      <div class="divider">
        <span class="divider-text font-caption">または</span>
      </div>

      <!-- LINEログインボタン -->
      <button
        v-if="showLineLogin"
        @click="loginWithLine"
        :disabled="isLineLoading"
        class="line-button font-ui"
      >
        <div class="line-icon">
          <!-- LINE Icon SVG -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2400/svg"
          >
            <path
              d="M24 10.304C24 4.614 18.618 0 12 0C5.382 0 0 4.614 0 10.304C0 15.384 4.254 19.646 9.808 20.428C10.19 20.51 11.082 20.697 11.232 21.033C11.353 21.313 11.268 22.014 11.196 22.404C11.196 22.404 10.982 23.518 11.002 23.61C11.056 23.868 11.458 24.086 11.776 23.958C12.182 23.794 17.514 19.982 20.312 16.598C22.698 13.682 24 12.028 24 10.304Z"
              fill="#06C755"
            />
            <path
              d="M19.349 11.854H17.436V8.12H19.349C19.878 8.12 20.306 7.691 20.306 7.162C20.306 6.633 19.878 6.204 19.349 6.204H16.478C15.949 6.204 15.52 6.633 15.52 7.162V12.871C15.52 13.4 15.949 13.829 16.478 13.829H19.349C19.878 13.829 20.306 13.4 20.306 12.871C20.306 12.342 19.878 11.854 19.349 11.854Z"
              fill="white"
            />
            <path
              d="M14.659 13.829H12.748C12.219 13.829 11.791 13.4 11.791 12.871V7.162C11.791 6.633 12.219 6.204 12.748 6.204H14.659C15.188 6.204 15.617 6.633 15.617 7.162V12.871C15.617 13.4 15.188 13.829 14.659 13.829Z"
              fill="white"
            />
            <path
              d="M10.999 13.829C10.871 13.829 10.749 13.805 10.638 13.757L8.069 9.878V12.871C8.069 13.4 7.64 13.829 7.111 13.829C6.582 13.829 6.153 13.4 6.153 12.871V7.162C6.153 6.633 6.582 6.204 7.111 6.204C7.239 6.204 7.361 6.228 7.472 6.276L10.041 10.156V7.162C10.041 6.633 10.47 6.204 10.999 6.204C11.528 6.204 11.957 6.633 11.957 7.162V12.871C11.957 13.4 11.528 13.829 10.999 13.829Z"
              fill="white"
            />
            <path
              d="M4.694 13.829H1.823C1.294 13.829 0.865 13.4 0.865 12.871V7.162C0.865 6.633 1.294 6.204 1.823 6.204H4.694C5.223 6.204 5.652 6.633 5.652 7.162C5.652 7.691 5.223 8.12 4.694 8.12H2.783V11.854H4.694C5.223 11.854 5.652 12.342 5.652 12.871C5.652 13.4 5.223 13.829 4.694 13.829Z"
              fill="white"
            />
          </svg>
        </div>
        {{ isLineLoading ? 'ログイン中...' : 'LINEでログイン' }}
      </button>

      <!-- Googleログインボタン -->
      <button @click="loginWithGoogle" :disabled="isGoogleLoading" class="google-button font-ui">
        <div class="google-icon">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              fill="#4285F4"
              d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
            />
            <path
              fill="#34A853"
              d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z"
            />
            <path
              fill="#FBBC05"
              d="M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.22l2.67-2.08z"
            />
            <path
              fill="#EA4335"
              d="M8.98 4.72c1.16 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-2.7z"
            />
          </svg>
        </div>
        {{ isGoogleLoading ? 'ログイン中...' : 'Googleでログイン' }}
      </button>

      <!-- パスワードリセットリンク -->
      <div class="password-reset-section">
        <RouterLink to="/forgot-password" class="reset-link font-caption">
          パスワードをお忘れですか？
        </RouterLink>
      </div>

      <div class="auth-footer">
        <RouterLink to="/about" class="register-link font-caption"
          >アカウント作成はこちら</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.auth-title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--color-heading);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--vt-c-text-dark-2);
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  color: var(--color-text);
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--vt-c-brand);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.auth-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.auth-button.primary {
  background-color: var(--vt-c-brand);
  color: white;
}

.auth-button.primary:hover {
  background-color: var(--vt-c-brand-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.register-link {
  color: var(--vt-c-brand);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.register-link:hover {
  color: var(--vt-c-brand-hover);
  text-decoration: underline;
}

.password-reset-section {
  text-align: center;
  margin-top: 1rem;
}

.reset-link {
  color: var(--vt-c-text-dark-2);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
  padding: 0.5rem;
  display: inline-block;
}

.reset-link:hover {
  color: var(--vt-c-brand);
  text-decoration: underline;
}

.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--color-border);
}

.divider-text {
  background-color: var(--color-background-soft);
  padding: 0 1rem;
  color: var(--vt-c-text-dark-2);
  font-size: 0.8rem;
  position: relative;
  z-index: 1;
}

.google-button {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background-color: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

.google-button:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.line-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #06c755;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(6, 199, 85, 0.2);
}

.line-button:hover:not(:disabled) {
  background-color: #05b34c;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(6, 199, 85, 0.3);
}

.line-button:disabled,
.google-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.google-icon,
.line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .auth-page-container {
    padding: 1rem;
    min-height: 100vh;
  }

  .auth-card {
    max-width: 100%;
    padding: 2.5rem 2rem;
  }

  .auth-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .form-group input {
    padding: 1rem;
    font-size: 1rem;
  }

  .auth-button,
  .google-button {
    padding: 1rem;
    font-size: 1.1rem;
  }

  .divider {
    margin: 2rem 0;
  }
}

@media (max-width: 480px) {
  .auth-page-container {
    padding: 0.5rem;
  }

  .auth-card {
    padding: 2rem 1.5rem;
    margin: 0.5rem;
  }

  .auth-title {
    font-size: 1.75rem;
  }
}
</style>
