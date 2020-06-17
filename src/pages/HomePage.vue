<template>
  <div v-if="dataFetched" class="home">
    <BannerComponent :data="data" :dataFetched="dataFetched" :categories="categories"></BannerComponent>
    <CategoriesComponent :data="data" ref="categories"></CategoriesComponent>
  </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue'
import CategoriesComponent from '@/components/CategoriesComponent.vue'
import EventBus from '@/event-bus/event-bus.js'
// import scroll from '@/assets/js/vendor/scroll.js'

export default {
  name: 'HomePage',
  props: ['data', 'dataFetched', 'categories'],
  components: {
    BannerComponent,
    CategoriesComponent
  },
  beforeRouteLeave (to, from, next) {
    const updateSelectedCategory = () => {
      EventBus.$emit('categorySelected', to.params.category)
    }

    // Emitted to BannerComponent.vue
    // scroll(
    //   0,
    //   600,
    //   'easeOutCubic',
    //   updateSelectedCategory
    // )

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setTimeout(() => {
      // Emitted to BannerComponent.vue

      updateSelectedCategory()
    }, 600)

    setTimeout(() => {
      // Emitted to App.vue
      EventBus.$emit('transitionsActive', false)
    }, 0)

    setTimeout(() => {
      next()
    }, 1000)
  }
}
</script>
