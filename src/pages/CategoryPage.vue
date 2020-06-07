<template>
  <main v-if="dataFetched" class="category">
    <BannerComponent
      :data="data"
      :category="category"
      :categories="categories"
      :dataFetched="dataFetched"
    ></BannerComponent>
    <section class="category__grid">
      <div
        class="category__grid-item"
        v-for="image in data[getActiveCategoryIndex].images"
        :key="image.index"
      >
        <img
          class="category__grid-img"
          :src="`/img/photography/${category}/${image.file}`"
          alt="alt"
        />
      </div>
    </section>
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
  mounted () {
    this.activeCategoryIndex = this.categories.indexOf(this.category)
    EventBus.$emit('categorySelected', this.category)
  },
  computed: {
    getActiveCategoryIndex () {
      return this.categories.indexOf(this.category)
    }
  }
}
</script>
