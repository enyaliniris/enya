import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeCover',
      component: () => import('@/views/HomeCover.vue'),
    },
    {
      path: '/1',
      name: 'ScrollScene',
      alias: '/scroll',
      // lazy-loaded for code-splitting
      component: () => import('../views/ScrollScene.vue'),
    },
  ],
})

export default router
