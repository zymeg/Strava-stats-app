<template>
  <NavBar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  name: 'PageWrapper',
  components: {
    NavBar
  },
  beforeCreate() {
    if (window.location.pathname === '/') {
      window.location.pathname = '/UserProfile'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/colors.scss';

.container {
  width: 100%;
  min-height: 90vh;
  margin: 10vh auto 0 auto;
  color: $main-text-color;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
