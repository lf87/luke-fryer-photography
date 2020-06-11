<template>
  <main v-if="dataFetched" class="category grid">
    <BannerComponent
      :data="data"
      :category="category"
      :categories="categories"
      :dataFetched="dataFetched"
    ></BannerComponent>
    <section class="grid">
      <template v-for="(image, index) in data[getActiveCategoryIndex].images">
        <button
          :class="[`grid__item grid__item--to-gallery grid__item--${image.layout}`]"
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
            alt="alt"
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
  props: ['data', 'category', 'categories', 'dataFetched'],
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
    }
  },
  computed: {
    getActiveCategoryIndex () {
      return this.categories.indexOf(this.category)
    }
  },
  beforeRouteUpdate (to, from, next) {
    // console.log(to)
    console.log('active')
    if (this.galleryActive) {
      // this.$router.go(-1)
      this.galleryActive = false
      // return
    }
    // else if (!from.query.gallery === 'active') {
    //   console.log('sdfusbfiudbdgiu')
    //   this.$router.push({ name: 'HomePage' })
    // }
    next()
  }
}
</script>
