<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // ← firebase.js をインポート
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const isGoogleLoading = ref(false);

const signUp = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // 登録成功
      const user = userCredential.user;
      console.log('登録に成功しました！:', user);
      alert('登録に成功しました！');
      router.push('/');
    })
    .catch((error) => {
      // 登録失敗
      console.error('登録に失敗しました…:', error.code, error.message);
      alert('登録に失敗しました: ' + error.message);
    });
};

const signUpWithGoogle = () => {
  isGoogleLoading.value = true;
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('Googleアカウントでの登録に成功しました！:', user);
      router.push('/');
    })
    .catch((error) => {
      console.error('Googleアカウントでの登録に失敗しました:', error);
      let errorMessage = 'Googleアカウントでの登録に失敗しました。';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = '登録がキャンセルされました。';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'ポップアップがブロックされました。ブラウザの設定をご確認ください。';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'このメールアドレスは既に別の方法で登録されています。';
      }
      
      alert(errorMessage);
    })
    .finally(() => {
      isGoogleLoading.value = false;
    });
};
</script>

<template>
  <div class="auth-page-container">
    <div 
      class="auth-card"
      data-aos="zoom-in"
      data-aos-duration="800"
      v-motion
      :initial="{ opacity: 0, scale: 0.8, rotate: -2 }"
      :enter="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 200, duration: 800 } }"
    >
      <h1 
        class="auth-title font-heading"
        v-motion
        :initial="{ opacity: 0, y: -30 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 600 } }"
      >
        ユーザー登録
      </h1>
      <div 
        class="form-group"
        v-motion
        :initial="{ opacity: 0, x: -40 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 600, duration: 700 } }"
      >
        <label for="email" class="font-ui">メールアドレス</label>
        <input type="email" id="email" v-model="email" placeholder="email@example.com" class="font-body" />
      </div>
      <div 
        class="form-group"
        v-motion
        :initial="{ opacity: 0, x: -40 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 700, duration: 700 } }"
      >
        <label for="password" class="font-ui">パスワード</label>
        <input type="password" id="password" v-model="password" placeholder="6文字以上" class="font-body" />
      </div>
      <button 
        @click="signUp" 
        class="auth-button primary font-ui"
        v-motion
        :initial="{ opacity: 0, y: 40, scale: 0.8 }"
        :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 800, duration: 700 } }"
      >
        <span v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 1000, duration: 300 } }"
        >
          ✨ 登録する
        </span>
      </button>
      
      <!-- 区切り線 -->
      <div 
        class="divider"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 825, duration: 600 } }"
      >
        <span class="divider-text font-caption">または</span>
      </div>
      
      <!-- Googleログインボタン -->
      <button 
        @click="signUpWithGoogle" 
        :disabled="isGoogleLoading"
        class="google-button font-ui"
        v-motion
        :initial="{ opacity: 0, y: 30, scale: 0.9 }"
        :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 850, duration: 600 } }"
      >
        <div class="google-icon">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.53H1.83v2.07A8 8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.49a4.8 4.8 0 0 1 0-3.07V5.35H1.83a8 8 0 0 0 0 7.22l2.67-2.08z"/>
            <path fill="#EA4335" d="M8.98 4.72c1.16 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.35L4.5 7.42a4.77 4.77 0 0 1 4.48-2.7z"/>
          </svg>
        </div>
        {{ isGoogleLoading ? '登録中...' : 'Googleアカウントで登録' }}
      </button>
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
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  color: var(--color-text);
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
}

.google-button:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.google-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.google-icon {
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
  
  .auth-button, .google-button {
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