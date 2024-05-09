import { createRouter, createWebHistory } from 'vue-router'
import Epsg28992View from '../views/Epsg28992View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'epsg28992',
      component: Epsg28992View
    },
    {
      path: '/epsg4326',
      name: 'epsg4326',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Epsg4326View.vue')
    }
  ]
})

export default router
