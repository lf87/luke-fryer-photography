<template>
  <header class="banner">
    <img class="banner__img" src="/img/photography/austria/motion-blur.jpg" alt="placeholder" />
    <!-- <img class="banner__img" src="@/assets/img/photography/austria/gondola.jpg" alt="placeholder" /> -->
    <h1 class="banner__heading">
      <span class="banner__large-text">{{ data.largeHeading }}</span>
      <span class="banner__small-text">{{ data.smallHeading }}</span>
    </h1>
  </header>
</template>

<script>
export default {
  name: 'BannerComponent',
  props: ['data']
}
</script>
