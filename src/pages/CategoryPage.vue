<template>
  <main class="category">
    <BannerComponent :data="data"></BannerComponent>
    <section class="category__grid">
      <div class="category__grid-item" v-for="image in data.images" v-bind:key="image.index">
        <img class="category__grid-img" :src="`/img/photography/${category}/${image.file}`" alt="alt" />
      </div>
    </section>
  </main>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue'

export default {
  name: 'category',
  props: ['category'],
  data () {
    return {
      data: []
    }
  },
  components: {
    BannerComponent
  },
  mounted () {
    console.log(this.category)
    fetch(`/data/categories/${this.category}.json`)
      .then((response) =>
        response.json()
          // eslint-disable-next-line no-console
          .catch(err => { console.error(`'${err}' happened!`); return {} }))
      .then((json) => {
        console.log(json)
        this.data = json
      })

    this.data = this.category
  }
}
</script>
