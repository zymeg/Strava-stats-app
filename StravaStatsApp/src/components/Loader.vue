<template>
  <div class="loader-wrapper">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
@import '@/utils/colors.scss';

.loader-wrapper {
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  align-self: center;
}
.lds-dual-ring {
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  align-self: center;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 6px solid $main-strava-color;
  border-color: $main-strava-color transparent $main-strava-color transparent;
  animation: lds-dual-ring 1.2s linear infinite;
  justify-self: center;
  align-self: center;
}
/* Loader animation */
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
