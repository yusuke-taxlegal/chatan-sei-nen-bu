import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // savedPosition は ブラウザの戻る/進むボタンを使った場合の前回のスクロール位置
    if (savedPosition) {
      return savedPosition
    }
    // 新しいページに遷移する場合は常にトップにスクロール
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/MyPageView.vue'),
      meta: { requiresAuth: true }, // このルートは認証が必要
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/MemberListView.vue'),
    },
    {
      path: '/member/:id', // ← 動的ルート
      name: 'member-detail',
      component: () => import('../views/MemberDetailView.vue'),
    },
    {
      path: '/add-sample-data',
      name: 'add-sample-data',
      component: () => import('../views/AddSampleDataView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
    },
  ],
})

// ログイン状態をチェックする関数
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

// ルートガード
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 認証が必要なページの場合
    if (await getCurrentUser()) {
      next() // ログインしているので、そのままページを表示
    } else {
      alert('このページにアクセスするにはログインが必要です。')
      next('/login') // ログインしていないので、ログインページにリダイレクト
    }
  } else {
    next() // 認証が不要なページはそのまま表示
  }
})

export default router
