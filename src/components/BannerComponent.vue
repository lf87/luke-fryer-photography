<template>
  <header v-if="dataFetched" class="banner">
    <img
      v-if="selectCategory"
      class="banner__img"
      sizes="(max-width: 2560px) 100vw, 2560px"
      :srcset="`/img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-2560.jpg 2560w,
        /img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-1920.jpg 1920w,
        /img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-1440.jpg 1440w,
        /img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-1080.jpg 1080w`"
      :src="`/img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-1920.jpg`"
      :alt="data[getSelectCategoryIndex].images[0].alt"
    />
    <img
      v-if="currentRouteName === 'HomePage'"
      :class="['banner__img', { 'banner__img--fade-out': selectCategory }]"
      sizes="(max-width: 2560px) 100vw, 2560px"
      srcset="/img/photography/austria/austria-03-2560.jpg 2560w, /img/photography/austria/austria-03-1920.jpg 1920w, /img/photography/austria/austria-03-1440.jpg 1440w, /img/photography/austria/austria-03-1080.jpg 1080w"
      src="/img/photography/austria/austria-03-1920.jpg"
      alt="Austria"
    />
    <img
      v-else
      :class="['banner__img', { 'banner__img--fade-out': selectCategory }]"
      sizes="(max-width: 2560px) 100vw, 2560px"
      :srcset="`/img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-2560.jpg 2560w,
        /img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-1920.jpg 1920w,
        /img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-1440.jpg 1440w,
        /img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-1080.jpg 1080w`"
      :src="`/img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-1920.jpg`"
      :alt="data[getActiveCategoryIndex].images[0].alt"
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
  props: ['category', 'data', 'categories', 'dataFetched'],
  data () {
    return {
      selectCategory: '',
      activeCategory: 'austria',
      // getActiveCategoryIndex: '0',
      ready: false
    }
  },
  mounted () {
    if (this.dataFetched) this.ready = true
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
      console.log(this.categories)
      console.log(this.dataFetched)
      console.log(this.categories.indexOf(this.activeCategory))
      return this.categories.indexOf(this.activeCategory)
    },
    getSelectCategoryIndex () {
      console.log(this.categories)
      console.log(this.selectCategory)
      console.log(this.categories.indexOf(this.selectCategory))
      return this.categories.indexOf(this.selectCategory)
    },
    currentRouteName () {
      return this.$route.name
    }
  }
  // watch: {
  //   ready: function (val, change) { // watch it
  //     console.log(val)
  //     console.log(change)
  //     this.getActiveCategoryIndex = this.categories.indexOf(this.activeCategory)
  //   }
  // }
}
</script>
