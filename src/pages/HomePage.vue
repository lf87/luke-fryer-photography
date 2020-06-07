<template>
  <div v-if="dataFetched" class="home">
    <BannerComponent :data="data" :categories="categories" :dataFetched="dataFetched"></BannerComponent>
    <CategoriesComponent ref="categories"></CategoriesComponent>
  </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue'
import CategoriesComponent from '@/components/CategoriesComponent.vue'
import EventBus from '@/event-bus/event-bus.js'
import scroll from '@/assets/js/vendor/scroll.js'

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
    scroll(
      0,
      500,
      'easeOutQuad',
      updateSelectedCategory
    )

    setTimeout(() => {
      // Emitted to App.vue
      EventBus.$emit('transitionsActive', false)
    }, 50)

    setTimeout(() => {
      next()
    }, 1250)
  }
}
</script>
