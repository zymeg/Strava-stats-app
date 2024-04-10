<template>
  <div class="out-of-limit">
    <h1>Przekroczono limit żądań serwera</h1>
    <p class="message">Spróbuj ponownie później...</p>
  </div>
</template>

<script>
export default {
  name: 'OutOfLimit'
}
</script>

<style lang="scss" scoped>
.out-of-limit {
  display: block;

  & > h1,
  & > .message {
    margin: 1rem auto;
  }

  & > h1 {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
  }

  & > .message {
    font-size: 0.9rem;
    font-weight: 300;
    letter-spacing: 0.1rem;
  }
}
</style>
