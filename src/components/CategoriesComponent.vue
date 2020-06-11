<template>
  <section class="categories grid">
    <template v-for="category in data">
      <router-link :class="[`grid__item grid__item--${category.images[0].layout}`]" tag="button" :to="category.name" :key="category.index">
        <img
          class="grid__img"
          sizes="(max-width: 2560px) 100vw, 2560px"
          :srcset="`/img/photography/${category.name}/${category.images[0].file}-2560.jpg 2560w,
        /img/photography/${category.name}/${category.images[0].file}-1920.jpg 1920w,
        /img/photography/${category.name}/${category.images[0].file}-1440.jpg 1440w,
        /img/photography/${category.name}/${category.images[0].file}-1080.jpg 1080w`"
          :src="`/img/photography/${category.name}/${category.images[0].file}-1920.jpg`"
          loading="lazy"
          alt="placeholder"
        />
        <div class="categories__heading">
          <span class="categories__text">{{category.name}}</span>
        </div>
      </router-link>
    </template>
  </section>
</template>

<script>

export default {
  name: 'CategoriesComponent',
  props: ['data']
}
</script>
