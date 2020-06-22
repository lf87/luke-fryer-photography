<template>
  <section class="categories grid">
    <template v-for="category in data">
      <router-link
        :class="[`grid__item grid__item--${category.images[0].layout}`]"
        tag="button"
        :to="category.name"
        :key="category.index"
        v-on:click.native="hideBannerIcons()"
      >
        <img
          class="grid__img"
          sizes="(min-width: 768px) and (min-height: 700px) 1920px, (min-width: 1440px) and (min-height: 700px) 2560px"
          :srcset="`/img/photography/${category.name}/${category.images[0].file}-2560.jpg 2560w,
        /img/photography/${category.name}/${category.images[0].file}-1920.jpg 1920w,
        /img/photography/${category.name}/${category.images[0].file}-1440.jpg 1440w,
        /img/photography/${category.name}/${category.images[0].file}-1080.jpg 1080w`"
          :src="`/img/photography/${category.name}/${category.images[0].file}-1920.jpg`"
          loading="lazy"
          :alt="category.images[0].alt"
        />
        <div class="grid__heading">
          <span class="grid__text">{{category.largeHeading}}</span>
        </div>
      </router-link>
    </template>
  </section>
</template>

<script>
import EventBus from '@/event-bus/event-bus.js'

export default {
  name: 'CategoriesComponent',
  props: ['data'],
  methods: {
    hideBannerIcons () {
      // Emitted to BannerComponent.vue
      EventBus.$emit('hideBannerIcons')
    }
  }
}
</script>
