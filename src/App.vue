<template>
  <div :class="['app', { 'app--mounted': isMounted }]" id="app">
    <BannerComponent></BannerComponent>
    <CategoriesComponent></CategoriesComponent>
  </div>
</template>

<script>
import BannerComponent from './components/BannerComponent.vue'
import CategoriesComponent from './components/CategoriesComponent.vue'
// import debounce from 'lodash/debounce'

export default {
  name: 'App',
  data: () => ({
    isMounted: false
  }),
  components: {
    BannerComponent,
    CategoriesComponent
  },
  mounted () {
    window.addEventListener('load', () => {
      console.log('test') // runs only once
      this.isMounted = true
    })
  }
  // updated: debounce(function () {
  //   this.$nextTick(() => {
  //     console.log('test') // runs only once
  //     this.isMounted = true
  //   })
  // }, 250) // increase to ur needs
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap');
/* @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap'); */
</style>
