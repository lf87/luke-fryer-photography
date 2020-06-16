<template>
  <section
    :class="['gallery', { 'active': galleryActive }]"
    v-on:click.self="closeGallery"
    v-on:keyup.esc="closeGallery"
    v-on:keyup.right="nextImg"
    v-on:keyup.left="prevImg"
    tabindex="-1"
    ref="gallery"
  >
    <img
      class="gallery__img"
      sizes="(max-width: 2560px) 100vw, 2560px"
      :srcset="`/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-2560.jpg 2560w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1920.jpg 1920w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1440.jpg 1440w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1080.jpg 1080w`"
      :src="`/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-2560.jpg`"
      alt="placeholder"
    />
    <img
      v-if="currentImageIndex !== 0"
      class="gallery__img--hide"
      sizes="(max-width: 2560px) 100vw, 2560px"
      :srcset="`/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-2560.jpg 2560w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1920.jpg 1920w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1440.jpg 1440w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1080.jpg 1080w`"
      :src="`/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex - 1].file}-2560.jpg`"
      alt="first"
    />
    <img
      v-if="currentImageIndex !== getCategoryImagesLength"
      class="gallery__img--hide"
      sizes="(max-width: 2560px) 100vw, 2560px"
      :srcset="`/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-2560.jpg 2560w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1920.jpg 1920w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1440.jpg 1440w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1080.jpg 1080w`"
      :src="`/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex + 1].file}-2560.jpg`"
      alt="last"
    />
    <button
      v-if="currentImageIndex !== 0"
      class="gallery__btn gallery__btn--prev"
      v-on:click="prevImg"
      aria-label="Previous image"
    >
      <div class="gallery__btn-svg-wrap">
        <svg
          class="gallery__btn-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 166.16 284.93"
        >
          <path
            d="M135.9 2.85L2.86 135.9C.96 137.8 0 139.99 0 142.46s.95 4.66 2.86 6.57L135.9 282.07c1.91 1.91 4.09 2.86 6.57 2.86 2.47 0 4.66-.95 6.57-2.86l14.27-14.27c1.9-1.9 2.85-4.09 2.85-6.57s-.95-4.66-2.85-6.57L51.1 142.46 163.31 30.25c1.9-1.9 2.85-4.09 2.85-6.56 0-2.48-.95-4.67-2.85-6.57L149.04 2.85C147.14.95 144.95 0 142.47 0c-2.48 0-4.67.94-6.57 2.85z"
          />
        </svg>
      </div>
    </button>
    <button
      v-if="currentImageIndex !== getCategoryImagesLength"
      class="gallery__btn gallery__btn--next"
      v-on:click="nextImg"
      aria-label="Next image"
    >
      <div class="gallery__btn-svg-wrap">
        <svg
          class="gallery__btn-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 166.16 284.93"
        >
          <path
            d="M30.26 282.08L163.3 149.03c1.9-1.9 2.86-4.09 2.86-6.56s-.95-4.66-2.86-6.57L30.26 2.86C28.35.95 26.17 0 23.69 0c-2.47 0-4.66.95-6.57 2.86L2.86 17.13C.95 19.03 0 21.22 0 23.69s.95 4.66 2.85 6.57l112.2 112.2L2.85 254.67c-1.9 1.9-2.85 4.09-2.85 6.56 0 2.48.95 4.67 2.85 6.57l14.28 14.27c1.9 1.9 4.09 2.85 6.57 2.85 2.47.01 4.66-.94 6.56-2.84z"
          />
        </svg>
      </div>
    </button>
    <button class="gallery__btn-close" v-on:click="closeGallery" aria-label="Close gallery">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 492 492"
        class="gallery__btn-svg gallery__btn-svg--close"
      >
        <path
          d="M300.188 246L484.14 62.04c5.06-5.064 7.852-11.82 7.86-19.024 0-7.208-2.792-13.972-7.86-19.028L468.02 7.872C462.952 2.796 456.196.016 448.984.016c-7.2 0-13.956 2.78-19.024 7.856L246.008 191.82 62.048 7.872C56.988 2.796 50.228.016 43.02.016c-7.2 0-13.96 2.78-19.02 7.856L7.872 23.988c-10.496 10.496-10.496 27.568 0 38.052L191.828 246 7.872 429.952C2.808 435.024.02 441.78.02 448.984c0 7.204 2.788 13.96 7.852 19.028l16.124 16.116c5.06 5.072 11.824 7.856 19.02 7.856 7.208 0 13.968-2.784 19.028-7.856l183.96-183.952 183.952 183.952c5.068 5.072 11.824 7.856 19.024 7.856h.008c7.204 0 13.96-2.784 19.028-7.856l16.12-16.116c5.06-5.064 7.852-11.824 7.852-19.028 0-7.204-2.792-13.96-7.852-19.028L300.188 246z"
        />
      </svg>
    </button>
  </section>
</template>

<script>
import EventBus from '@/event-bus/event-bus.js'

export default {
  name: 'GalleryComponent',
  props: ['category', 'categories', 'data', 'galleryActive', 'selectedImgIndex'],
  data () {
    return {
      currentImageIndex: 0
    }
  },
  methods: {
    prevImg () {
      const val = this.currentImageIndex - 1
      this.getSelectedImgIndex(val)
    },
    nextImg () {
      const val = this.currentImageIndex + 1
      this.getSelectedImgIndex(val)
    },
    getSelectedImgIndex (val) {
      this.currentImageIndex = val

      // Update prop in parent component so that the correct image opens upon click
      // Emmitted to CategoryPage.vue
      EventBus.$emit('updateImageIndex', val)
    },
    closeGallery () {
      // Emmitted to CategoryPage.vue
      EventBus.$emit('closeGallery')
      this.$router.go(-1)
      // this.$router.replace({ query: {} })
    }
  },
  computed: {
    getActiveCategoryIndex () {
      return this.categories.indexOf(this.category)
    },
    getCategoryImagesLength () {
      const category = this.categories.indexOf(this.category)
      return this.data[category].images.length - 1
    }
  },
  watch: {
    selectedImgIndex: function (val) { // watch it
      this.currentImageIndex = val
    }
  }
}
</script>
