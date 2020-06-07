import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'
import EventBus from '@/event-bus/event-bus.js'

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
  // Emitted to App.vue
  console.log(to.name)
  window.addEventListener('load', () => {
    if (to.name === 'HomePage') {
      console.log('zzz')
      EventBus.$emit('transitionsActive', true)
    }
  })

  if (to.name === 'CategoryPage') {
    setTimeout(() => {
      EventBus.$emit('transitionsActive', true)
    }, 50)
  }
})

export default router
