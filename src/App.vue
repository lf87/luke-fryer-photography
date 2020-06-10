<template>
  <div :class="['app', { 'transitions-active': transitionsActive }]" id="app">
    <router-view
      :dataFetched="dataFetched"
      :data="data"
      :categories="categories"
      :key="$route.path"
    ></router-view>
  </div>
</template>

<script>
import EventBus from '@/event-bus/event-bus.js'

export default {
  name: 'App',
  data: () => ({
    transitionsActive: false,
    categories: ['amsterdam',
      'astrophotography',
      'austria',
      'carpathians',
      'crete',
      'croatia',
      'devon',
      'fireworks',
      'formula-1',
      'fuerteventura',
      'gdansk',
      'lviv',
      'macro',
      'nature',
      'scafell-pike',
      'scarborough',
      'scotland'],
    data: [],
    dataFetched: false
  }),
  created () {
    const iterator = this.categories.values()
    let loopIndex = 0
    const categoriesLength = this.categories.length

    for (const value of iterator) {
      fetch(`/data/categories/${value}.json`)
        .then((response) =>
          response.json()
            // eslint-disable-next-line no-console
            .catch(err => { console.error(`'${err}' happened!`); return {} }))
        .then((json) => {
          console.log(json)
          this.data.push(json)

          loopIndex++
          if (loopIndex === categoriesLength) {
            // Signal data fetched upon completion
            this.dataFetched = true
          }
        })
    }
  },
  mounted () {
    // window.addEventListener('load', () => {
    //   this.transitionsActive = true
    // })

    // Emitted from HomePage.vue
    EventBus.$on('transitionsActive', (bool) => {
      !bool ? this.transitionsActive = false : this.transitionsActive = true
    })
  }
}
</script>

<style lanf="scss">
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap");
</style>
