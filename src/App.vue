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
    categories: [
      'crete',
      'scotland',
      'devon',
      'croatia',
      'fuerteventura',
      'lviv',
      'scafell-pike',
      'austria',
      'gdansk',
      'bulgaria',
      'carpathians',
      'amsterdam',
      'formula-1',
      'scarborough',
      'nature',
      'fireworks',
      'macro',
      'astrophotography'
    ],
    data: [],
    dataFetched: false
  }),
  created () {
    const iterator = this.categories.values()
    // let loopIndex = 0
    // const categoriesLength = this.categories.length
    // function objectKeys (obj) {
    //   var keys = [];
    //   if (!obj) return keys;
    //   for (var key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //       keys.push(key);
    //     }
    //   }
    // }
    const promises = []
    // let i = 1
    const fn = async () => {
      for (const value of iterator) {
        promises.push(
          fetch(`/data/categories/${value}.json`)
            .then((response) =>
              response.json()
            )
        )
      }

      await Promise.all(promises).then(data => {
        console.log('666')
        console.log(data)
        this.data = data
        this.dataFetched = true
      })
    }

    fn()
  },
  mounted () {
    // Emitted from HomePage.vue
    EventBus.$on('transitionsActive', (bool) => {
      !bool ? this.transitionsActive = false : this.transitionsActive = true
    })
  }
}
</script>
