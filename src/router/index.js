import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'Shopping',
      component: () => import('../views/Shopping.vue')
    },
    {
      path: '/ShoppingCar',
      name: 'ShoppingCar',
      component: () => import('../views/ShoppingCar.vue')
    },
    {
      path: '/ShoppingCheck',
      name: 'ShoppingCheck',
      component: () => import('../views/ShoppingCheck.vue')
    },
  ],
});

export default router;
