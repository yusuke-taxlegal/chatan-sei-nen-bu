<script setup>
import { ref } from 'vue'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const message = ref('')
const error = ref('')
const isLoading = ref(false)
const router = useRouter()

const handlePasswordReset = async () => {
  if (!email.value) {
    error.value = 'メールアドレスを入力してください。'
    return
  }
  isLoading.value = true
  message.value = ''
  error.value = ''
  const auth = getAuth()
  try {
    await sendPasswordResetEmail(auth, email.value)
    message.value = 'パスワード再設定用のメールを送信しました。メールボックスをご確認ください。'
  } catch (err) {
    console.error('Password reset error:', err.code, err.message)
    switch (err.code) {
      case 'auth/user-not-found':
        error.value = 'このメールアドレスは登録されていません。'
        break
      case 'auth/invalid-email':
        error.value = '無効なメールアドレス形式です。'
        break
      default:
        error.value = 'エラーが発生しました。時間をおいて再度お試しください。'
        break
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <h1 class="card-title">パスワード再設定</h1>
      <p class="card-description">
        ご登録のメールアドレスを入力してください。パスワード再設定用のリンクを送信します。
      </p>
      <form @submit.prevent="handlePasswordReset" class="forgot-password-form">
        <div class="input-group">
          <label for="email" class="input-label">メールアドレス</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-input"
              placeholder="user@example.com"
              required
            />
          </div>
        </div>
        
        <button type="submit" class="submit-button" :disabled="isLoading">
          <span v-if="isLoading" class="loader"></span>
          <span v-else>再設定メールを送信</span>
        </button>
      </form>

      <div v-if="message" class="alert-message success">
        <p>{{ message }}</p>
      </div>
      <div v-if="error" class="alert-message error">
        <p>{{ error }}</p>
      </div>

      <div class="back-to-login">
        <router-link to="/login" class="login-link">&larr; ログイン画面に戻る</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: var(--color-background);
  padding: 2rem;
}

.forgot-password-card {
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background-color: var(--color-background-soft);
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.75rem;
}

.card-description {
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  text-align: left;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-mute);
  font-size: 1.1rem;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: var(--vt-c-brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.submit-button {
  padding: 1rem;
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.submit-button:disabled {
  background: var(--color-border);
  cursor: not-allowed;
  opacity: 0.7;
}

.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alert-message {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.alert-message.success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.alert-message.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.back-to-login {
  margin-top: 2rem;
}

.login-link {
  color: var(--vt-c-brand);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.login-link:hover {
  text-decoration: underline;
  color: var(--vt-c-brand-hover);
}
</style>
