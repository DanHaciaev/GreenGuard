import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import RegistatrationPage from '@/pages/RegistatrationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: MainPage,
    },

    {
      path: '/',
      name: 'registration',
      component: RegistatrationPage,
    },

  ],
})

export default router
