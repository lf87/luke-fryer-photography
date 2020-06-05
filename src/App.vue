<template>
  <div :class="['app', { 'app--mounted': isMounted }]" id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isMounted: false
  }),
  mounted () {
    window.addEventListener('load', () => {
      this.isMounted = true
    })
  }
}
</script>
