<script>
import LoginPage from './views/LoginPage.vue'
import PageWrapper from './views/PageWrapper.vue'
import { getAccessToken } from './controllers/StravaAPIController'

export default {
  name: 'App',
  components: {
    LoginPage,
    PageWrapper
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    loggedIn() {
      return this.$store.state.accessToken !== null && this.$store.state.accessToken !== ''
    }
  },
  mounted() {
    if (
      window.location.pathname === '/exchange_token' &&
      !window.location.search.includes('error')
    ) {
      this.loading = true
    }

    getAccessToken().then((res) => {
      this.$store.dispatch('storeToken', res)
      if (res) {
        this.loading = false // zakończ ładowanie, gdy token zostanie pobrany
      }
    })
  }
}
</script>

<template>
  <LoginPage v-if="!loggedIn()" />
  <PageWrapper v-else />
</template>
