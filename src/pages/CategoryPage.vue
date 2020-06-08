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
        v-for="(image, index) in data[getActiveCategoryIndex].images"
        :key="index"
      >
        <button class="category__grid-img-btn" v-on:click="activateGallery(galleryActive, index)">
          <img
            class="category__grid-img"
            :src="`/img/photography/${category}/${image.file}`"
            alt="alt"
          />
        </button>
      </div>
    </section>
    <GalleryComponent
      :category="category"
      :categories="categories"
      :data="data"
      :galleryActive="galleryActive"
      :selectedImgIndex="selectedImgIndex"
    ></GalleryComponent>
  </main>
</template>

<script>
import GalleryComponent from '@/components/GalleryComponent.vue'
import BannerComponent from '@/components/BannerComponent.vue'
import EventBus from '@/event-bus/event-bus.js'

export default {
  name: 'category',
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
      console.log(index)
      this.selectedImgIndex = index
      !state ? this.galleryActive = true : this.galleryActive = false
    }
  },
  computed: {
    getActiveCategoryIndex () {
      return this.categories.indexOf(this.category)
    }
  }
}
</script>
