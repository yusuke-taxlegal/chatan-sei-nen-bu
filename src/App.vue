<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const { user } = useAuth()
const router = useRouter()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      closeMobileMenu()
      router.push('/login')
    })
    .catch((error) => {
      // An error happened.
      console.error('Logout error:', error)
    })
}
</script>

<template>
  <header class="smart-header">
    <div class="header-container">
      <RouterLink to="/" class="brand-logo">
        <div class="logo-icon">
          <img src="https://i.ibb.co/RphNtfqb/P00018.jpg" alt="IMPULSE" class="impulse-logo" />
        </div>
        <div class="brand-text">
          <span class="brand-main">北谷町商工会</span>
          <span class="brand-sub">青年部</span>
        </div>
      </RouterLink>

      <!-- ハンバーガーボタン（モバイル用） -->
      <button
        class="mobile-menu-button"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- デスクトップナビゲーション -->
      <nav class="smart-nav desktop-nav">
        <!-- ログアウト時 -->
        <template v-if="!user">
          <RouterLink to="/" class="nav-item">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Home</span>
          </RouterLink>
          <RouterLink to="/members" class="nav-item">
            <span class="nav-icon">👥</span>
            <span class="nav-text">部員一覧</span>
          </RouterLink>
          <RouterLink to="/about" class="nav-item">
            <span class="nav-icon">✨</span>
            <span class="nav-text">登録</span>
          </RouterLink>
          <RouterLink to="/login" class="nav-item primary">
            <span class="nav-icon">🔑</span>
            <span class="nav-text">ログイン</span>
          </RouterLink>
        </template>
        <!-- ログイン時 -->
        <template v-else>
          <RouterLink to="/" class="nav-item">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Home</span>
          </RouterLink>
          <RouterLink to="/mypage" class="nav-item">
            <span class="nav-icon">👤</span>
            <span class="nav-text">マイページ</span>
          </RouterLink>
          <RouterLink to="/members" class="nav-item">
            <span class="nav-icon">👥</span>
            <span class="nav-text">部員一覧</span>
          </RouterLink>
          <button @click="handleLogout" class="nav-item logout-btn">
            <span class="nav-icon">🚪</span>
            <span class="nav-text">ログアウト</span>
          </button>
        </template>
      </nav>
    </div>
  </header>

  <!-- モバイルメニューオーバーレイ -->
  <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>

  <!-- モバイルメニュー -->
  <nav class="mobile-nav" :class="{ active: isMobileMenuOpen }">
    <!-- ログアウト時 -->
    <template v-if="!user">
      <RouterLink to="/" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">Home</span>
      </RouterLink>
      <RouterLink to="/members" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="nav-icon">👥</span>
        <span class="nav-text">部員一覧</span>
      </RouterLink>
      <RouterLink to="/about" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="nav-icon">✨</span>
        <span class="nav-text">登録</span>
      </RouterLink>
      <RouterLink to="/login" class="mobile-nav-item primary" @click="closeMobileMenu">
        <span class="nav-icon">🔑</span>
        <span class="nav-text">ログイン</span>
      </RouterLink>
    </template>
    <!-- ログイン時 -->
    <template v-else>
      <RouterLink to="/" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">Home</span>
      </RouterLink>
      <RouterLink to="/mypage" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="nav-icon">👤</span>
        <span class="nav-text">マイページ</span>
      </RouterLink>
      <RouterLink to="/members" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="nav-icon">👥</span>
        <span class="nav-text">部員一覧</span>
      </RouterLink>
      <button @click="handleLogout" class="mobile-nav-item logout-btn">
        <span class="nav-icon">🚪</span>
        <span class="nav-text">ログアウト</span>
      </button>
    </template>
  </nav>

  <main>
    <RouterView />
  </main>

  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-links">
        <RouterLink to="/terms" class="footer-link">利用規約</RouterLink>
        <span class="footer-divider">|</span>
        <RouterLink to="/privacy" class="footer-link">プライバシーポリシー</RouterLink>
      </div>
      <div class="footer-copyright">
        &copy; {{ new Date().getFullYear() }} 北谷町商工会青年部. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.smart-header {
  background: linear-gradient(135deg, var(--color-background-soft), var(--color-background-mute));
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  background: var(--color-background);
  border: 1px solid var(--color-border);
}

.brand-logo:hover {
  background: var(--color-background-soft);
  border-color: var(--vt-c-brand);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}

.logo-icon {
  font-size: 1.5rem;
  padding: 0;
  background: transparent;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
}

.impulse-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-main {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-heading);
}

.brand-sub {
  font-size: 0.75rem;
  color: var(--vt-c-text-dark-2);
  font-weight: 500;
}

main {
  padding: 0;
}

@media print {
  .smart-header {
    display: none;
  }

  main {
    padding: 0;
    background-color: white !important;
  }

  /*
    印刷時にすべての要素の背景を透明にし、文字色を黒に強制します。
    !importantを使用して、他のスタイル指定を上書きします。
  */
  * {
    background-color: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
}

.smart-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: var(--vt-c-text-dark-2);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s;
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover {
  color: var(--vt-c-brand);
  background: var(--color-background);
  border-color: var(--color-border);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-item.router-link-exact-active {
  color: white;
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  border-color: var(--vt-c-brand);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
}

.nav-item.router-link-exact-active:hover {
  background: linear-gradient(135deg, var(--vt-c-brand-hover), var(--vt-c-brand));
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.nav-item.primary {
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  color: white;
  border-color: var(--vt-c-brand);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.nav-item.primary:hover {
  background: linear-gradient(135deg, var(--vt-c-brand-hover), var(--vt-c-brand));
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.nav-item.logout-btn {
  background: var(--color-background);
  border-color: var(--color-border);
}

.nav-item.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.nav-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.nav-text {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .smart-header {
    padding: 0.75rem 1rem;
  }

  .header-container {
    padding: 0;
    max-width: 100%;
    margin: 0;
  }

  .brand-logo {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }

  .logo-icon {
    font-size: 1.5rem;
    width: 3rem;
    height: 3rem;
  }

  .brand-main {
    font-size: 1.1rem;
    font-weight: 800;
  }

  .brand-sub {
    font-size: 0.8rem;
    font-weight: 600;
  }

  .smart-nav {
    gap: 0.5rem;
  }

  .nav-item {
    padding: 0.75rem;
    font-size: 0.9rem;
    min-width: 3rem;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-text {
    /* display: none; を削除 */
  }

  .nav-icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .smart-header {
    padding: 0.5rem 0.75rem;
  }

  .brand-logo {
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }

  .logo-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .brand-main {
    font-size: 1rem;
  }

  .brand-sub {
    font-size: 0.75rem;
  }

  .nav-item {
    padding: 0.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  .nav-icon {
    font-size: 1.25rem;
  }
}

/* ハンバーガーメニューボタン */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: var(--color-text);
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-button.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-button.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-button.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* モバイルメニューオーバーレイ */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* モバイルナビゲーション */
.mobile-nav {
  position: fixed;
  top: 0;
  right: -320px;
  width: 300px;
  height: 100%;
  background: linear-gradient(145deg, var(--color-background-soft), var(--color-background-mute));
  border-left: 1px solid var(--color-border);
  padding: 5rem 0 2rem 0;
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
}

.mobile-nav.active {
  right: 0;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 1.5rem;
  margin: 0.25rem 0;
  text-decoration: none;
  color: var(--color-text);
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  border-left: 4px solid transparent;
  min-height: 3.5rem;
}

.mobile-nav-item:hover {
  background: var(--color-background);
  border-left-color: var(--vt-c-brand);
  padding-left: 2rem;
}

.mobile-nav-item.router-link-exact-active {
  background: linear-gradient(90deg, var(--color-background), var(--color-background-soft));
  border-left-color: var(--vt-c-brand);
  color: var(--vt-c-brand);
  font-weight: 600;
}

.mobile-nav-item.primary {
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  color: white;
  margin: 1rem 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  border-left: none;
  font-weight: 600;
}

.mobile-nav-item.primary .nav-text {
  color: white;
  font-weight: 600;
}

.mobile-nav-item.primary:hover {
  background: linear-gradient(135deg, var(--vt-c-brand-hover), var(--vt-c-brand));
  padding-left: 1.5rem;
}

.mobile-nav-item.logout-btn {
  border-top: 1px solid var(--color-border);
  margin-top: 1rem;
  color: #ef4444;
}

.mobile-nav-item.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-left-color: #ef4444;
}

.mobile-nav-item .nav-icon {
  font-size: 1.4rem;
  width: 2rem;
  text-align: center;
  flex-shrink: 0;
}

.mobile-nav-item .nav-text {
  font-size: 1.1rem;
  font-weight: 500;
  flex: 1;
  color: inherit;
  white-space: nowrap;
}

/* モバイルでデスクトップナビを非表示、ハンバーガーを表示 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }
}

/* 小画面デバイス向けの調整 */
@media (max-width: 480px) {
  .mobile-nav {
    width: 100%;
    right: -100%;
  }

  .mobile-nav-item {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }

  .mobile-nav-item .nav-icon {
    font-size: 1.3rem;
    width: 1.8rem;
  }

  .mobile-nav-item .nav-text {
    font-size: 1rem;
  }
}

main {
  padding: 0;
  min-height: calc(100vh - 160px); /* Adjust height so footer is at bottom */
}

/* Footer Styles */
.app-footer {
  background: var(--color-background-mute);
  border-top: 1px solid var(--color-border);
  padding: 2rem 1rem;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: var(--vt-c-text-dark-2);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--vt-c-brand);
}

.footer-divider {
  color: var(--color-border);
}

.footer-copyright {
  color: var(--vt-c-text-dark-2);
  font-size: 0.8rem;
}

@media (max-width: 480px) {
  .footer-links {
    gap: 0.5rem;
  }
  .footer-divider {
    display: none;
  }
  .footer-link {
    display: block;
    width: 100%;
    text-align: center;
    padding: 0.5rem 0;
  }
}
</style>
