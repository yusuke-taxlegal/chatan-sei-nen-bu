<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBackToLogin = () => {
  router.push('/login');
};

const goToPasswordReset = () => {
  router.push('/password-reset');
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
      <div 
        class="success-content"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 600 } }"
      >
        <div class="success-icon">📧</div>
        <h1 class="auth-title font-heading">メール送信完了</h1>
        <p class="success-description font-body">
          パスワードリセット用のメールを送信しました。<br>
          メールボックスをご確認ください。
        </p>
      </div>
      
      <div 
        class="info-box"
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 600, duration: 600 } }"
      >
        <h3 class="info-title font-ui">📌 確認のポイント</h3>
        <ul class="info-list font-body">
          <li>📩 迷惑メールフォルダもご確認ください</li>
          <li>⏰ リセットリンクは1時間で期限切れになります</li>
          <li>🔗 リンクは一度のみ使用可能です</li>
          <li>🔒 新しいパスワードは6文字以上で設定してください</li>
        </ul>
      </div>
      
      <div class="button-group">
        <button 
          @click="goBackToLogin" 
          class="auth-button primary font-ui"
          v-motion
          :initial="{ opacity: 0, y: 30, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 700, duration: 600 } }"
        >
          ログインページに戻る
        </button>
        
        <button 
          @click="goToPasswordReset" 
          class="auth-button secondary font-ui"
          v-motion
          :initial="{ opacity: 0, y: 30, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 750, duration: 600 } }"
        >
          別のメールアドレスで再送信
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
  max-width: 500px;
  padding: 2.5rem;
  background-color: var(--color-background-soft);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.success-content {
  text-align: center;
  margin-bottom: 2rem;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: block;
}

.auth-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.success-description {
  color: var(--vt-c-text-dark-2);
  line-height: 1.6;
  font-size: 1rem;
}

.info-box {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.info-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  padding: 0.5rem 0;
  color: var(--vt-c-text-dark-2);
  font-size: 0.9rem;
  line-height: 1.4;
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

.auth-button.primary:hover {
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

@media (max-width: 480px) {
  .auth-card {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .success-icon {
    font-size: 3rem;
  }
  
  .auth-title {
    font-size: 1.5rem;
  }
  
  .success-description {
    font-size: 0.9rem;
  }
  
  .info-list li {
    font-size: 0.85rem;
  }
}
</style>
