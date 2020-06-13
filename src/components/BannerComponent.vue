<template>
  <header v-if="dataFetched" class="banner">
    <img
      v-if="currentRouteName === 'HomePage'"
      :class="['banner__img', { 'banner__img--fade-out': selectCategory, 'banner__img--blurry-hide': primaryImageLoaded }]"
      src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMdaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVGMDM0MTdGQUQ3MTExRUE4NjlFOTlFQkM2NjBBRDZGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVGMDM0MTdFQUQ3MTExRUE4NjlFOTlFQkM2NjBBRDZGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iRkQ1QTRGNTk5OEQyQkRGOEQxOEM2N0QyNzIzOEZEOUQiIHN0UmVmOmRvY3VtZW50SUQ9IkZENUE0RjU5OThEMkJERjhEMThDNjdEMjcyMzhGRDlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwM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"
      alt
    />
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
      :class="['banner__img banner__img--primary', { 'banner__img--fade-out': selectCategory, 'banner__img--primary-fade-in': primaryImageLoaded }]"
      sizes="(max-width: 2560px) 100vw, 2560px"
      srcset="/img/photography/austria/austria-03-2560.jpg 2560w, /img/photography/austria/austria-03-1920.jpg 1920w, /img/photography/austria/austria-03-1440.jpg 1440w, /img/photography/austria/austria-03-1080.jpg 1080w"
      src="/img/photography/austria/austria-03-1920.jpg"
      alt="Austria"
      ref="imagePrimary"
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
      smallText: '',
      primaryImageLoaded: false
    }
  },
  // updated: function () {
  //   this.$nextTick(() => {
  //     })
  // },
  mounted () {
    this.largeText = 'Luke Fryer'
    this.smallText = 'Photographer'

    this.$nextTick(() => {
      setTimeout(() => {
        EventBus.$emit('transitionsActive', true)
      }, 100)
    })

    if (!this.category) {
      // If home page
      // Fade in main image on top of blurry image
      this.$refs.imagePrimary.onload = () => {
        this.primaryImageLoaded = true
      }
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
