import { createRouter, createWebHistory } from 'vue-router'
import ExamView from '../views/ExamView.vue'

const routes = [
  {
    path: '/',
    name: 'exam',
    component: ExamView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
