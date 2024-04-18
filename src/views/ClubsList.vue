<template>
  <section v-if="!loading">
    <h1>Clubs List:</h1>
    <ClubCard v-for="club in userClubs" :club="club" :key="club.id" />
  </section>
  <loader v-else />
</template>

<script>
import ClubCard from '@/components/ClubCard.vue'
import { getUserClubs } from '@/controllers/StravaAPIController'
import Loader from '@/components/Loader.vue'

export default {
  name: 'ClubsList',
  components: {
    ClubCard,
    Loader
  },
  data() {
    return {
      userClubs: [],
      loading: true
    }
  },
  mounted() {
    if (!this.$store.state.userClubs) {
      getUserClubs()
        .then((res) => {
          this.userClubs = res
          this.$store.dispatch('storeAllClubs', res)
          this.loading = false
        })
        .catch((error) => console.log(error))
    } else {
      this.userClubs = this.$store.state.allClubs
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  min-height: 10vh;
  width: 70%;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-self: flex-start;
  user-select: none;

  & > h1 {
    grid-column-start: 1;
    grid-column-end: 4;
    justify-self: start;
    margin: 0.5rem 0 2rem 1rem;
  }
}

@media only screen and (max-width: 600px) {
  section {
    min-height: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;

    & > h1 {
      margin: 0 0 1rem 0;
    }
  }
}
</style>
