import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '../views/UserProfile.vue'
import App from '../App.vue'
import OutOfLimit from '../views/OutOfLimit.vue'
import Loader from '@/components/Loader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ENV_URL),
  routes: [
    {
      path: '',
      name: 'Main',
      componen: App
    },
    {
      path: '/UserProfile',
      name: 'userProfile',
      component: UserProfile
    },
    {
      path: '/strava-api-err-too-many-requests',
      name: 'OutOfLimit',
      component: OutOfLimit
    },
    {
      path: '/exchange_token*',
      name: 'exchange_token',
      component: Loader
    }
  ]
})

export default router
