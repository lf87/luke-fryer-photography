<template>
  <main class="category">
    <BannerComponent :data="data" :category="category" :categories="categories"></BannerComponent>
    <section class="grid">
      <template v-for="(image, index) in data[getActiveCategoryIndex].images">
        <button
          :class="[`grid__item grid__item--${image.layout}`]"
          v-on:click="activateGallery(galleryActive, index)"
          :key="index"
        >
          <img
            class="grid__img"
            sizes="(max-width: 2560px) 100vw, 2560px"
            :srcset="`/img/photography/${category}/${image.file}-2560.jpg 2560w,
        /img/photography/${category}/${image.file}-1920.jpg 1920w,
        /img/photography/${category}/${image.file}-1440.jpg 1440w,
        /img/photography/${category}/${image.file}-1080.jpg 1080w`"
            :src="`/img/photography/${category}/${image.file}-2560.jpg`"
            loading="lazy"
            :alt="image.alt"
          />
        </button>
      </template>
    </section>
    <keep-alive>
      <GalleryComponent
        :category="category"
        :categories="categories"
        :data="data"
        :galleryActive="galleryActive"
        :selectedImgIndex="selectedImgIndex"
        ref="gallery"
      ></GalleryComponent>
    </keep-alive>
  </main>
</template>

<script>
import GalleryComponent from '@/components/GalleryComponent.vue'
import BannerComponent from '@/components/BannerComponent.vue'
import EventBus from '@/event-bus/event-bus.js'

export default {
  name: 'categoryPage',
  props: ['data', 'category', 'categories'],
  components: {
    BannerComponent,
    GalleryComponent
  },
  data () {
    return {
      galleryActive: false,
      selectedImgIndex: 0
    }
  },
  mounted () {
    this.activeCategoryIndex = this.categories.indexOf(this.category)
    // Emitted to BannerComponent.vue
    EventBus.$emit('categorySelected', this.category)

    // Emmitted from GalleryComponent.vue
    EventBus.$on('updateImageIndex', (val) => {
      this.selectedImgIndex = val
    })

    // Emmitted from GalleryComponent.vue
    EventBus.$on('closeGallery', (category) => {
      this.galleryActive = false
    })
  },
  methods: {
    activateGallery (state, index) {
      this.$router.push({ query: { gallery: 'active' } })
      this.selectedImgIndex = index
      !state ? this.galleryActive = true : this.galleryActive = false
      this.$refs.gallery.$el.focus()
    }
  },
  computed: {
    getActiveCategoryIndex () {
      return this.categories.indexOf(this.category)
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (this.galleryActive) {
      this.galleryActive = false
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    if (to.query.gallery === 'active') {
      next({ path: to.path })
    } else {
      next()
    }
  }
}
</script>
