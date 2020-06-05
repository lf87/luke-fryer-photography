<template>
  <div class="home">
    <BannerComponent :data="data"></BannerComponent>
    <CategoriesComponent></CategoriesComponent>
  </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue'
import CategoriesComponent from '@/components/CategoriesComponent.vue'
import data from '@/assets/data/home.json'
// import debounce from 'lodash/debounce'

export default {
  name: 'HomePage',
  data () {
    return {
      data: data
    }
  },
  components: {
    BannerComponent,
    CategoriesComponent
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap");
/* @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); */
</style>
