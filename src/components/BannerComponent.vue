<template>
  <header class="banner">
    <img
      v-if="selectCategory"
      class="banner__img banner__img--category-overlay"
      :src="`/img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}`"
      alt="placeholder"
    />
    <img
      v-if="currentRouteName === 'HomePage'"
      :class="['banner__img', { 'banner__img--fade-out': selectCategory }]"
      :src="`/img/photography/${activeCategory}/${data[0].images[1].file}`"
      alt="Beautiful photo of the Austrian landscape and a gondola making its way down through the mountains"
    />
    <img
      v-else
      :class="['banner__img', { 'banner__img--fade-out': selectCategory }]"
      :src="`/img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}`"
      alt="placeholder"
    />
    <h1 v-if="currentRouteName === 'HomePage'" class="banner__heading">
      <span class="banner__large-text">Luke Fryer</span>
      <span class="banner__small-text">Photographer</span>
    </h1>
    <h1 v-else class="banner__heading">
      <span class="banner__large-text">{{ data[getActiveCategoryIndex].largeHeading }}</span>
      <span class="banner__small-text">{{ data[getActiveCategoryIndex].smallHeading }}</span>
    </h1>
  </header>
</template>

<script>
import EventBus from '@/event-bus/event-bus.js'

export default {
  name: 'BannerComponent',
  props: ['data', 'category', 'categories'],
  data () {
    return {
      selectCategory: '',
      activeCategory: 'austria'
    }
  },
  mounted () {
    if (!this.category) {
      // If home page
      // this.category = this.activeCategory
    } else {
      // If category page
      this.activeCategory = this.category
    }

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
  },
  computed: {
    getActiveCategoryIndex () {
      return this.categories.indexOf(this.activeCategory)
    },
    getSelectCategoryIndex () {
      return this.categories.indexOf(this.selectCategory)
    },
    currentRouteName () {
      console.log(this.$route.name)
      return this.$route.name
    }
  }
  // watch: {
  //   dataFetched: function (value) {
  //     console.log('hhhhhhhhhh')
  //     // EventBus.$emit('transitionsActive', true)
  //   }
  // }
}
</script>
