<template>
  <section class="categories">
    <template v-for="category in data">
      <router-link class="categories__item" :to="category.name" :key="category.index">
        <img
          class="categories__img"
          :src="`/img/photography/${category.name}/${category.images[0].file}-2560.jpg`"
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
  props: ['data'],
  mounted () {
    console.log(this.data)
  }
}
</script>
