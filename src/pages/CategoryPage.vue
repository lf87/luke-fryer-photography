<template>
  <main v-if="dataFetched" class="category">
    <BannerComponent
      :data="data"
      :category="category"
      :categories="categories"
      :dataFetched="dataFetched"
    ></BannerComponent>
    <!-- <section class="category__grid">
      <div
        class="category__grid-item"
        v-for="image in data[activeCategoryIndex].images"
        v-bind:key="image.index"
      >
        <img
          class="category__grid-img"
          :src="`/img/photography/${category}/${image.file}`"
          alt="alt"
        />
      </div>
    </section> -->
  </main>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue'
import EventBus from '@/event-bus/event-bus.js'

export default {
  name: 'category',
  props: ['data', 'category', 'categories', 'dataFetched'],
  components: {
    BannerComponent
  },
  data () {
    return {
      activeCategory: '',
      activeCategoryIndex: ''
    }
  },
  mounted () {
    this.activeCategoryIndex = this.categories.indexOf(this.category)
    // fetch(`/data/categories/${this.category}.json`)
    //   .then((response) =>
    //     response.json()
    //       // eslint-disable-next-line no-console
    //       .catch(err => { console.error(`'${err}' happened!`); return {} }))
    //   .then((json) => {
    //     this.data = json
    //   })

    // this.data = this.category

    EventBus.$emit('categorySelected', this.category)
  }
  // afterEach (to, from, next) {
  //   // Emitted to App.vue
  //   EventBus.$emit('transitionsActive', true)
  // },
  // beforeRouteEnter (to, from, next) {
  //   // Emitted to App.vue
  //   EventBus.$emit('transitionsActive', true)
  // },
  // beforeRouteEnter (to, from, next) {
  //   this.activeCategory = to.params
  //   console.log('hiya')
  //   // Emitted to App.vue
  //   // EventBus.$emit('transitionsActive', true)
  //   next()
  // }
}
</script>
