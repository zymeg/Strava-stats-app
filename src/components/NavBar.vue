<template>
  <header>
    <div class="logo">
      <div class="logo-image"></div>
      <p>Powered by <a href="https://www.strava.com">Strava</a></p>
    </div>
    <div class="app-name"><h1>Rogowskie straty</h1></div>
    <div class="hamburger-menu" @click="this.isActive = !this.isActive">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" :class="{ rotate: isActive }">
        <path
          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
        />
      </svg>
    </div>
    <ul class="nav-items" :class="{ active: isActive }">
      <RouterLink to="/UserProfile" class="nav-item"
        ><li class="router" @click="isActive = !isActive">Użytkownik</li></RouterLink
      >
      <RouterLink to="/ClubsList" class="nav-item"
        ><li class="router" @click="isActive = !isActive">Kluby</li></RouterLink
      >
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
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    logout() {
      this.isActive = !this.isActive
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
  background: linear-gradient(
    90deg,
    $main-strava-color 0%,
    $main-strava-color 75%,
    $darken-strava-color 100%
  );
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr;
  z-index: 999;

  & > .logo {
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

    & > h1 {
      font-weight: 300;
      letter-spacing: 0.5rem;
    }
  }

  & > .hamburger-menu {
    display: none;
  }

  & > .nav-items {
    grid-column-start: 4;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    & > .nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
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
    min-height: 4rem;
    grid-template-columns: 1fr 2fr 1fr;

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

    & > .hamburger-menu {
      display: block;
      grid-column-start: 3;
      width: 2rem;
      height: 100%;
      align-items: center;
      justify-content: center;
      padding: 0.2rem;
      margin: 1rem auto;

      & > svg.rotate {
        transform: rotate(180deg);
      }

      & > svg {
        transition: 0.7s;
        & > path {
          fill: $main-text-color;
        }
      }
    }

    & > .nav-items {
      grid-column-start: 3;
      grid-row-start: 2;
      flex-direction: column;
      align-items: flex-end;

      & > .nav-item {
        width: 100%;
        min-height: 3vh;
        font-size: 0.9rem;
        letter-spacing: 0.1rem;
        display: none;

        &:hover {
          font-size: 1rem;
          background: $main-strava-color;
        }
      }
    }

    & > .nav-items.active {
      min-height: 5rem;
      & > .nav-item {
        display: block;
      }
    }
  }
}
</style>
