<template>
  <header class="banner" v-if="dataFetched">
    <img
      v-if="selectCategory"
      class="banner__img banner__img--category-overlay"
      :src="`/img/photography/${selectCategory}/${data[selectCategoryIndex].images[0].file}`"
      alt="placeholder"
    />
    <img
      :class="['banner__img', { 'banner__img--fade-out': selectCategory }]"
      :src="`/img/photography/${activeCategory}/${data[activeCategoryIndex].images[0].file}`"
      alt="placeholder"
    />
    <h1 class="banner__heading">
      <span class="banner__large-text">{{ data[activeCategoryIndex].largeHeading }}</span>
      <span class="banner__small-text">{{ data[activeCategoryIndex].smallHeading }}</span>
    </h1>
  </header>
</template>

<script>
import EventBus from '@/event-bus/event-bus.js'

export default {
  name: 'BannerComponent',
  props: ['data', 'category', 'categories', 'dataFetched'],
  data () {
    return {
      selectCategory: '',
      selectCategoryInde: '',
      activeCategory: 'nature',
      activeCategoryIndex: ''
    }
  },
  mounted () {
    if (!this.category) {
      // If home page
      this.category = 'nature'
    } else {
      // If category page
      this.activeCategory = this.category
    }
    this.activeCategoryIndex = this.categories.indexOf(this.category)

    // Emitted from HomePage.vue
    EventBus.$on('categorySelected', (category) => {
      this.selectCategory = category
      this.selectCategoryIndex = this.categories.indexOf(this.selectCategory)
      this.transitionsActive = false
    })

    // Emitted from CategoryPage.vue
    EventBus.$on('categoryActive', (category) => {
      this.selectCategory = category
      this.transitionsActive = false
    })
  }
}
</script>
