@
<template>
  <section>
    <h1>Login with Strava</h1>
    <div id="strava-login-bar" @click="login">Authenticate...</div>
  </section>
</template>

<script>
export default {
  name: 'LoginPage',
  methods: {
    login() {
      const { VITE_APP_CLIENT_ID } = import.meta.env
      const redirectUrl =
        import.meta.env.VITE_USER_NODE_ENV === 'production'
          ? 'https://rogowskie-straty.netlify.app'
          : `http://localhost:5173/UserProfile`
      window.location = `http://www.strava.com/oauth/authorize?client_id=${VITE_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=read,profile:read_all,activity:read,activity:read_all`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/utils/colors.scss';

section {
  width: 50%;
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1rem auto;
  padding: 2rem;
  user-select: none;

  h1 {
    color: $main-text-color;
    display: block;
    margin: 0 auto 2rem;
    cursor: context-menu;
    font-size: 2.5rem;
  }

  #strava-login-bar {
    background: $main-strava-color;
    width: 75%;
    min-height: 2.5rem;
    font-size: 1.6rem;
    letter-spacing: 0.3rem;
    color: $main-text-color;
    cursor: pointer;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 0.3rem;
    transition: 0.3s;

    &:hover {
      background: $darken-strava-color;
      color: $lighten-text-color;
      letter-spacing: 0.4rem;
    }
  }
}
</style>
