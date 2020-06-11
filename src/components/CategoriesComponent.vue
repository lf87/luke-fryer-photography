<template>
  <section class="categories">
    <template v-for="category in data">
      <router-link class="categories__item" :to="category.name" :key="category.index">
        <img
          class="categories__img"
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
