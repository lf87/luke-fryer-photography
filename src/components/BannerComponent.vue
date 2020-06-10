<template>
  <header class="banner">
    <picture>
      <img
        v-if="selectCategory"
        class="banner__img banner__img--category-overlay"
        media="(orientation: landscape)"
        sizes="(max-width: 2560px) 100vw, 2560px"
        :srcset="`/img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-2560.jpg 2560w,
        /img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-1920.jpg 1920w,
        /img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-1440.jpg 1440w,
        /img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-1080.jpg 1080w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-768.jpg 768w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-480.jpg 480w`"
        :src="require(`@/assets/img/photography/${selectCategory}/${data[getSelectCategoryIndex].images[0].file}-1920.jpg`)"
        :alt="data[getActiveCategoryIndex].images[0].alt"
      />
      <img
        v-if="currentRouteName === 'HomePage'"
        :class="['banner__img', { 'banner__img--fade-out': selectCategory }]"
        media="(orientation: landscape)"
        sizes="(max-width: 2560px) 100vw, 2560px"
        :srcset="`/img/photography/${activeCategory}/${data[2].images[2].file}-2560.jpg 2560w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-1920.jpg 1920w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-1440.jpg 1440w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-1080.jpg 1080w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-768.jpg 768w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-480.jpg 480w`"
        :src="require(`@/assets/img/photography/${activeCategory}/${data[2].images[2].file}-1920.jpg`)"
        :alt="data[getActiveCategoryIndex].images[2].alt"
      />
      <img
        v-if="currentRouteName === 'HomePage'"
        :class="['banner__img', { 'banner__img--fade-out': selectCategory }]"
        media="(orientation: portrait)"
        sizes="(max-width: 2560px) 100vw, 2560px"
        :srcset="`/img/photography/${activeCategory}/${data[2].images[2].file}-2560.jpg 2560w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-1920.jpg 1920w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-1440.jpg 1440w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-1080.jpg 1080w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-768.jpg 768w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-2560.jpg 480w`"
        :src="require(`@/assets/img/photography/${activeCategory}/${data[2].images[2].file}-1920.jpg`)"
        :alt="data[getActiveCategoryIndex].images[2].alt"
      />
      <img
        v-else
        :class="['banner__img', { 'banner__img--fade-out': selectCategory }]"
        media="(orientation: landscape)"
        sizes="(max-width: 2560px) 100vw, 2560px"
        :srcset="`/img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-2560.jpg 2560w,
        /img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-1920.jpg 1920w,
        /img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-1440.jpg 1440w,
        /img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-1080.jpg 1080w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-768.jpg 768w,
        /img/photography/${activeCategory}/${data[2].images[2].file}-480.jpg 480w`"
        :src="require(`@/assets/img/photography/${activeCategory}/${data[getActiveCategoryIndex].images[0].file}-1920.jpg`)"
        :alt="data[getActiveCategoryIndex].images[0].alt"
      />
    </picture>
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
