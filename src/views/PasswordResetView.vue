<script setup>
import { ref } from 'vue';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'vue-router';

const email = ref('');
const router = useRouter();
const resetMessage = ref('');
const errorMessage = ref('');
const isResetting = ref(false);

const resetPassword = () => {
  if (!email.value) {
    errorMessage.value = 'メールアドレスを入力してください。';
    return;
  }

  isResetting.value = true;
  resetMessage.value = '';
  errorMessage.value = '';

  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      resetMessage.value = `${email.value} にパスワードリセット用のメールを送信しました。`;
      isResetting.value = false;
      
      // 3秒後に成功ページに遷移
      setTimeout(() => {
        router.push('/password-reset-sent');
      }, 3000);
    })
    .catch((error) => {
      console.error('パスワードリセットエラー:', error);
      isResetting.value = false;
      
      if (error.code === 'auth/user-not-found') {
        errorMessage.value = 'このメールアドレスで登録されたアカウントが見つかりません。';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage.value = '有効なメールアドレスを入力してください。';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage.value = 'リセット試行回数が多すぎます。しばらく時間をおいてからお試しください。';
      } else {
        errorMessage.value = 'パスワードリセットに失敗しました。しばらく時間をおいてからお試しください。';
      }
    });
};

const goBackToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="auth-page-container">
    <div 
      class="auth-card"
      data-aos="fade-up"
      data-aos-duration="800"
      v-motion
      :initial="{ opacity: 0, y: 50, scale: 0.9 }"
      :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 200, duration: 800 } }"
    >
      <h1 
        class="auth-title font-heading"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 600 } }"
      >
        パスワードリセット
      </h1>
      
      <p 
        class="reset-description font-body"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 600 } }"
      >
        登録時に使用したメールアドレスを入力してください。<br>
        パスワードリセット用のリンクをお送りします。
      </p>
      
      <div 
        class="form-group"
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 600, duration: 600 } }"
      >
        <label for="email" class="font-ui">メールアドレス</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="email@example.com" 
          class="font-body"
          @keyup.enter="resetPassword"
        />
      </div>
      
      <!-- エラーメッセージ -->
      <div 
        v-if="errorMessage" 
        class="message error"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        {{ errorMessage }}
      </div>
      
      <!-- 成功メッセージ -->
      <div 
        v-if="resetMessage" 
        class="message success"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        <div class="success-icon">✉️</div>
        {{ resetMessage }}
        <div class="redirect-info">3秒後に確認ページに移動します...</div>
      </div>
      
      <div class="button-group">
        <button 
          @click="resetPassword" 
          :disabled="isResetting"
          class="auth-button primary font-ui"
          v-motion
          :initial="{ opacity: 0, y: 30, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 700, duration: 600 } }"
        >
          {{ isResetting ? '送信中...' : 'リセットメールを送信' }}
        </button>
        
        <button 
          @click="goBackToLogin" 
          class="auth-button secondary font-ui"
          v-motion
          :initial="{ opacity: 0, y: 30, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 750, duration: 600 } }"
        >
          ログインページに戻る
        </button>
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
  max-width: 450px;
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
  margin-bottom: 1rem;
}

.reset-description {
  text-align: center;
  color: var(--vt-c-text-dark-2);
  margin-bottom: 2rem;
  line-height: 1.5;
  font-size: 0.9rem;
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
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: var(--vt-c-brand);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

.auth-button.primary:hover:not(:disabled) {
  background-color: var(--vt-c-brand-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.auth-button.secondary {
  background-color: var(--color-background);
  color: var(--vt-c-text-dark-2);
  border: 1px solid var(--color-border);
}

.auth-button.secondary:hover {
  background-color: var(--color-background-soft);
  border-color: var(--vt-c-brand);
  color: var(--vt-c-brand);
}

.auth-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.message {
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
  text-align: center;
}

.message.success {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.message.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.success-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.redirect-info {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .auth-title {
    font-size: 1.5rem;
  }
  
  .reset-description {
    font-size: 0.85rem;
  }
}
</style>
