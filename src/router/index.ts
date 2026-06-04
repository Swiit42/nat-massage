import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
      meta: { title: 'Nat Massage — Терапевтичний масаж' },
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('@/pages/BookingPage.vue'),
      meta: { title: 'Запис на сеанс — Nat Massage' },
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/pages/AdminLoginPage.vue'),
      meta: { title: 'Вхід для адміністратора' },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/AdminPage.vue'),
      meta: { title: 'Адмін — Nat Massage', requiresAuth: true },
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('@/pages/InfoPage.vue'),
      meta: { title: 'Про масаж — Nat Massage' },
    },
    {
      path: '/techniques/:slug',
      name: 'technique',
      component: () => import('@/pages/TechniquePage.vue'),
      meta: { title: 'Техніки масажу — Nat Massage' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  if (to.meta.requiresAuth) {
    const auth = useAuthStore()
    if (!auth.isAuthenticated) {
      return next({ name: 'admin-login' })
    }
  }

  next()
})

export default router
