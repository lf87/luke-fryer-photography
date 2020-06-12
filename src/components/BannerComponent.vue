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
      <span class="banner__large-text">{{ largeText}}</span>
      <span class="banner__small-text">{{ smallText}}</span>
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
      largeText: '',
      smallText: ''
    }
  },
  // updated: function () {
  //   this.$nextTick(() => {
  //     })
  // },
  mounted () {
    if (this.dataFetched) {
      this.largeText = 'Luke Fryer'
      this.smallText = 'Photographer'
      window.addEventListener('load', () => {
        this.$nextTick(() => {
          EventBus.$emit('transitionsActive', true)
        })
      })
    }
    if (!this.category) {
      // If home page
      // EventBus.$emit('transitionsActive', true)
    } else {
      // If category page
      this.activeCategory = this.category

      this.$nextTick(() => {
        EventBus.$emit('transitionsActive', true)
      })
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
      return this.$route.name
    }
  }
}
</script>
