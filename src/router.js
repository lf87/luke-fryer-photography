import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HomePage',
      props: true,
      component: HomePage
    },
    {
      path: '/:category',
      name: 'CategoryPage',
      props: true,
      component: CategoryPage
    }
  ]
})

router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
