<template>
  <header>
    <div class="logo">
      <div class="logo-image"></div>
      <p>Powered by <a href="https://www.strava.com">Strava</a></p>
    </div>
    <div class="app-name"><h1>Rogowskie straty</h1></div>
    <ul class="nav-items">
      <RouterLink to="/UserProfile" class="nav-item"><li class="router">Użytkownik</li></RouterLink>
      <!-- <RouterLink to="/Clubs" class="nav-item"><li class="router">Kluby</li></RouterLink> -->
      <li class="nav-item logout" @click="logout()">Wyloguj</li>
    </ul>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { logout } from '@/controllers/StravaAPIController'

export default {
  name: 'NavBar',
  components: {
    RouterLink
  },
  methods: {
    logout() {
      this.$store.dispatch('removeToken')
      logout()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/colors.scss';

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 10vh;
  background: $main-strava-color;
  display: grid;
  grid-template-columns: 2fr, 10fr;

  & > .logo {
    grid-column-start: 0;
    grid-column-end: 1;
    margin: auto;

    & > .logo-image {
      width: 5rem;
      height: 4rem;
      background: url('../assets/logo.jpg') no-repeat;
      background-size: contain;
    }

    & > p {
      font-size: 0.6rem;
      color: $main-text-color;

      & > a {
        color: $main-text-color;
        text-decoration: none;
        transition: 0.5s;

        &:hover {
          color: $lighten-text-color;
        }
      }
    }
  }

  & > .app-name {
    color: $main-text-color;
    margin: auto;
    user-select: none;
    cursor: context-menu;
    grid-column-start: 1;
    grid-column: 3;

    & > h1 {
      font-weight: 300;
      letter-spacing: 0.5rem;
    }
  }

  & > .nav-items {
    grid-column-start: 11;
    grid-column-end: 12;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    & > .nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12vw;
      min-height: 10vh;
      text-decoration: none;
      font-style: normal;
      color: $main-text-color;
      user-select: none;
      cursor: pointer;
      list-style: none;
      text-align: center;
      font-size: 1.1rem;
      letter-spacing: 0.1rem;
      transition: 0.5s;

      &:hover {
        background: $darken-strava-color;
        color: $lighten-text-color;
        font-size: 1.2rem;
      }

      & > .router,
      & > .logout {
        display: inline-block;
        text-align: center;
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  header {
    padding: 0 0.2rem;

    & > .logo {
      & > .logo-image {
        width: 3rem;
        height: 2rem;
      }

      & > p {
        font-size: 0.5rem;
        color: $main-text-color;
      }
    }

    & > .app-name {
      & > h1 {
        font-weight: 300;
        letter-spacing: 0.2rem;
        font-size: 1rem;
      }
    }

    & > .nav-items {
      grid-column-start: 4;
      flex-direction: column;
      align-items: flex-end;

      & > .nav-item {
        width: 30vw;
        min-height: 3vh;
        font-size: 0.9rem;
        letter-spacing: 0.1rem;

        & > .router,
        & > .logout {
          display: inline-block;
          text-align: center;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
