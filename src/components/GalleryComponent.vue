<template>
  <section :class="['gallery', { 'active': galleryActive }]" v-on:click.self="closeGallery">
    <img
      class="gallery__img"
      sizes="(max-width: 2560px) 100vw, 2560px"
          :srcset="`/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-2560.jpg 2560w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1920.jpg 1920w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1440.jpg 1440w,
        /img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-1080.jpg 1080w`"
      :src="require(`@/assets/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex].file}-2560.jpg`)"
      loading="lazy"
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
      :src="require(`@/assets/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex - 1].file}-2560.jpg`)"
      loading="lazy"
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
      :src="require(`@/assets/img/photography/${category}/${data[getActiveCategoryIndex].images[currentImageIndex + 1].file}-2560.jpg`)"
      loading="lazy"
      alt="last"
    />
    <button
      v-if="currentImageIndex !== 0"
      class="gallery__btn gallery__btn--prev"
      v-on:click="prevImg"
    ></button>
    <button
      v-if="currentImageIndex !== getCategoryImagesLength"
      class="gallery__btn gallery__btn--next"
      v-on:click="nextImg"
    ></button>
    <button class="gallery__btn-close" v-on:click="closeGallery"></button>
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
    }
  },
  computed: {
    getActiveCategoryIndex () {
      return this.categories.indexOf(this.category)
    },
    getCategoryImagesLength () {
      // console.log(this.data)
      // console.log(this.categories)
      const category = this.categories.indexOf(this.category)
      console.log(this.data[category].images.length)
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
