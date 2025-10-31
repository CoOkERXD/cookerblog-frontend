import { createRouter, createWebHashHistory } from 'vue-router'
import IndexPage from '../views/IndexPage.vue'
import PostPage from '../views/PostPage.vue'
import Layout from '@/components/Layout.vue'

const routes = [
  {
    path: '/cookerblog/index',
    component: Layout,
    children: [
      {
        path: '',
        component: IndexPage
      },
      {
        path: '/',
        redirect: '/cookerblog/index'
      },      
      {
        path: '/cookerblog/post',
        component: PostPage
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
