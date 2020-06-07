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

export default {
  name: 'HomePage',
  props: ['data', 'dataFetched', 'categories'],
  components: {
    BannerComponent,
    CategoriesComponent
  },
  beforeRouteLeave (to, from, next) {
    // Emitted to App.vue
    EventBus.$emit('transitionsActive')
    console.log(to.params.category)

    // EMitted to BannerComponent.vue
    EventBus.$emit('categorySelected', to.params.category)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    // this.$refs.categories.$el.style.display = 'none' // YES !!! apply all default states in SCSS and do the transition state in here. do same on cat page
    setTimeout(() => {
      next()
    }, 2000)
  }
}
</script>
