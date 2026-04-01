<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import {
  HomeIcon,
  UserGroupIcon,
  InformationCircleIcon,
  KeyIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/vue/24/outline'

const { user } = useAuth()
const router = useRouter()
const isMobileMenuOpen = ref(false)

// PWA Update State
const needRefresh = ref(false)
let updateSW = null

onMounted(async () => {
  // Check for PWA updates
  if ('serviceWorker' in navigator) {
    try {
      const { registerSW } = await import('virtual:pwa-register')
      updateSW = registerSW({
        onNeedRefresh() {
          needRefresh.value = true
        },
        onOfflineReady() {
          console.log('App ready to work offline')
        },
      })
    } catch (e) {
      console.error('PWA registration error:', e)
    }
  }
})

const reloadPage = () => {
  if (updateSW) {
    updateSW(true)
  }
}

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
          <img src="/img/icons/impulse_logo.jpg" alt="IMPULSE" class="impulse-logo" />
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
            <HomeIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">Home</span>
          </RouterLink>
          <RouterLink to="/members" class="nav-item">
            <UserGroupIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">部員一覧</span>
          </RouterLink>
          <RouterLink to="/about" class="nav-item">
            <InformationCircleIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">青年部とは</span>
          </RouterLink>
          <RouterLink to="/login" class="nav-item primary">
            <KeyIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">ログイン</span>
          </RouterLink>
        </template>
        <!-- ログイン時 -->
        <template v-else>
          <RouterLink to="/" class="nav-item">
            <HomeIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">Home</span>
          </RouterLink>
          <RouterLink to="/about" class="nav-item">
            <InformationCircleIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">青年部とは</span>
          </RouterLink>
          <RouterLink to="/mypage" class="nav-item">
            <UserCircleIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">マイページ</span>
          </RouterLink>
          <RouterLink to="/members" class="nav-item">
            <UserGroupIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">部員一覧</span>
          </RouterLink>
          <button @click="handleLogout" class="nav-item logout-btn" type="button">
            <ArrowRightStartOnRectangleIcon class="nav-svg" aria-hidden="true" />
            <span class="nav-text">ログアウト</span>
          </button>
        </template>
      </nav>
    </div>
  </header>

  <!-- PWA Update Notification -->
  <div v-if="needRefresh" class="pwa-toast-container" role="alert">
    <div class="pwa-toast">
      <div class="pwa-message">新しいバージョンのアプリが利用可能です</div>
      <div class="pwa-buttons">
        <button @click="reloadPage" class="pwa-button primary">更新する</button>
        <button @click="needRefresh = false" class="pwa-button secondary">後で</button>
      </div>
    </div>
  </div>

  <!-- モバイルメニューオーバーレイ -->
  <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>

  <!-- モバイルメニュー -->
  <nav class="mobile-nav" :class="{ active: isMobileMenuOpen }">
    <!-- ログアウト時 -->
    <template v-if="!user">
      <RouterLink to="/" class="mobile-nav-item" @click="closeMobileMenu">
        <HomeIcon class="nav-svg" aria-hidden="true" />
        <span class="nav-text">Home</span>
      </RouterLink>
      <RouterLink to="/members" class="mobile-nav-item" @click="closeMobileMenu">
        <UserGroupIcon class="nav-svg" aria-hidden="true" />
        <span class="nav-text">部員一覧</span>
      </RouterLink>
      <RouterLink to="/about" class="mobile-nav-item" @click="closeMobileMenu">
        <InformationCircleIcon class="nav-svg" aria-hidden="true" />
        <span class="nav-text">青年部とは</span>
      </RouterLink>
      <RouterLink to="/login" class="mobile-nav-item primary" @click="closeMobileMenu">
        <KeyIcon class="nav-svg" aria-hidden="true" />
        <span class="nav-text">ログイン</span>
      </RouterLink>
    </template>
    <!-- ログイン時 -->
    <template v-else>
      <RouterLink to="/" class="mobile-nav-item" @click="closeMobileMenu">
        <HomeIcon class="nav-svg" aria-hidden="true" />
        <span class="nav-text">Home</span>
      </RouterLink>
      <RouterLink to="/about" class="mobile-nav-item" @click="closeMobileMenu">
        <InformationCircleIcon class="nav-svg" aria-hidden="true" />
        <span class="nav-text">青年部とは</span>
      </RouterLink>
      <RouterLink to="/mypage" class="mobile-nav-item" @click="closeMobileMenu">
        <UserCircleIcon class="nav-svg" aria-hidden="true" />
        <span class="nav-text">マイページ</span>
      </RouterLink>
      <RouterLink to="/members" class="mobile-nav-item" @click="closeMobileMenu">
        <UserGroupIcon class="nav-svg" aria-hidden="true" />
        <span class="nav-text">部員一覧</span>
      </RouterLink>
      <button @click="handleLogout" class="mobile-nav-item logout-btn" type="button">
        <ArrowRightStartOnRectangleIcon class="nav-svg" aria-hidden="true" />
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
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  padding: 0.625rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 48rem;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .header-container {
    padding: 0 1.25rem;
  }
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  padding: 0.375rem 0.625rem;
  border-radius: 0.5rem;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  color: inherit;
}

.brand-logo:hover {
  border-color: var(--vt-c-brand);
  background: var(--color-background-soft);
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
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--vt-c-text-dark-2);
  font-weight: 500;
  font-size: 0.8125rem;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
}

.nav-item:hover {
  color: var(--vt-c-brand);
  background: var(--color-background);
  border-color: var(--color-border);
}

.nav-item.router-link-exact-active {
  color: #fff;
  background: var(--vt-c-brand);
  border-color: var(--vt-c-brand);
}

.nav-item.router-link-exact-active:hover {
  background: var(--vt-c-brand-hover);
  color: #fff;
}

.nav-item.primary {
  background: var(--vt-c-brand);
  color: #fff;
  border-color: var(--vt-c-brand);
}

.nav-item.primary:hover {
  background: var(--vt-c-brand-hover);
  color: #fff;
}

.nav-item.primary .nav-svg,
.nav-item.router-link-exact-active .nav-svg {
  color: #fff;
}

.nav-item.logout-btn {
  background: transparent;
  border-color: transparent;
}

.nav-item.logout-btn:hover {
  background: rgba(239, 68, 68, 0.08);
  color: #dc2626;
  border-color: rgba(239, 68, 68, 0.2);
}

.nav-svg {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}

.nav-text {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .smart-header {
    padding: 0.5rem 0.75rem;
  }

  .header-container {
    padding: 0;
    max-width: 100%;
    margin: 0;
  }

  .brand-logo {
    padding: 0.375rem 0.5rem;
    gap: 0.5rem;
    min-height: 44px;
  }

  .logo-icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  .brand-main {
    font-size: 0.9375rem;
    font-weight: 700;
  }

  .brand-sub {
    font-size: 0.75rem;
    font-weight: 500;
  }
}

@media (max-width: 480px) {
  .smart-header {
    padding: 0.5rem 0.625rem;
  }

  .brand-main {
    font-size: 0.875rem;
  }

  .brand-sub {
    font-size: 0.6875rem;
  }

  .logo-icon {
    width: 2rem;
    height: 2rem;
  }
}

/* ハンバーガーメニューボタン */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2.75rem;
  height: 2.75rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: var(--color-heading);
  transition: all 0.2s ease;
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
  width: min(100%, 300px);
  height: 100%;
  background: var(--color-background);
  border-left: 1px solid var(--color-border);
  padding: 4.5rem 0 1.5rem;
  transition: right 0.25s ease;
  z-index: 1000;
  overflow-y: auto;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.35);
}

.mobile-nav.active {
  right: 0;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1.25rem;
  margin: 0.125rem 0;
  text-decoration: none;
  color: var(--color-text);
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
  font-size: 1rem;
  font-weight: 500;
  border-left: 3px solid transparent;
  min-height: 48px;
}

.mobile-nav-item:hover {
  background: var(--color-background-soft);
  border-left-color: var(--vt-c-brand);
}

.mobile-nav-item.router-link-exact-active {
  background: var(--color-background-soft);
  border-left-color: var(--vt-c-brand);
  color: var(--vt-c-brand);
  font-weight: 600;
}

.mobile-nav-item.primary {
  background: var(--vt-c-brand);
  color: #fff;
  margin: 0.75rem 1rem 0.5rem;
  border-radius: 0.5rem;
  border-left: none;
  font-weight: 600;
}

.mobile-nav-item.primary .nav-text {
  color: #fff;
  font-weight: 600;
}

.mobile-nav-item.primary:hover {
  background: var(--vt-c-brand-hover);
}

.mobile-nav-item.primary .nav-svg {
  color: #fff;
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

.mobile-nav-item .nav-svg {
  width: 1.375rem;
  height: 1.375rem;
  flex-shrink: 0;
}

.mobile-nav-item .nav-text {
  font-size: 1rem;
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
    padding: 0.75rem 1.25rem;
    font-size: 0.9375rem;
  }

  .mobile-nav-item .nav-text {
    font-size: 0.9375rem;
  }
}

main {
  padding: 0;
  min-height: calc(100vh - 160px); /* Adjust height so footer is at bottom */
}

/* Footer Styles */
.app-footer {
  background: var(--color-background-soft);
  border-top: 1px solid var(--color-border);
  padding: 1.5rem 1rem;
  margin-top: 2rem;
}

.footer-content {
  max-width: 48rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  box-sizing: border-box;
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

/* PWA Toast Styles */
.pwa-toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.pwa-toast {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  max-width: 350px;
}

.pwa-message {
  font-weight: 600;
  color: var(--color-heading);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.pwa-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.pwa-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.pwa-button.primary {
  background: var(--vt-c-brand);
  color: #fff;
  border: none;
}

.pwa-button.primary:hover {
  background: var(--vt-c-brand-hover);
}

.pwa-button.secondary {
  background: transparent;
  color: var(--vt-c-text-dark-2);
  border: 1px solid var(--color-border);
}

.pwa-button.secondary:hover {
  background: var(--color-background-mute);
  color: var(--color-text);
}

@media (max-width: 480px) {
  .pwa-toast-container {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }

  .pwa-toast {
    max-width: none;
    width: 100%;
  }
}
</style>
