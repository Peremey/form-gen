import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import Example3 from '../views/Example3.vue'
import Example1 from '../views/Example1.vue'
import Example2 from '../views/Example2.vue'
import Example4 from '../views/Example4.vue'
import Example5 from '../views/Example5.vue'

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL), //createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'example1',
      component: Example1,
    },
    {
      path: '/example2',
      name: 'example2',
      component: Example2,
    },
    {
      path: '/example3',
      name: 'example3',
      component: Example3,
    },
    {
      path: '/example4',
      name: 'example4',
      component: Example4,
    },
    {
      path: '/example5',
      name: 'example5',
      component: Example5,
    }
  ],
})

export default router
