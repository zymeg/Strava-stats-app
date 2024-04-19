<template>
  <div class="club-card" @click="routeToClub()">
    <div v-if="club.profile_medium != 'avatar/club/medium.png'" class="photo">
      <img :src="club.profile_medium" alt="Club profile" />
    </div>
    <div class="club-data">
      <h2 class="club-name">
        {{ club.name }}
      </h2>
      <p class="club-type">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"
          />
        </svg>
        {{ club.localized_sport_type }}
      </p>
      <p class="club-members">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path
            d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
          />
        </svg>
        {{ club.member_count }}
      </p>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'ClubCard',
  props: {
    club: Object
  },
  methods: {
    routeToClub() {
      router.push({ name: 'ClubInfo', params: { id: this.club.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/colors.scss';

.club-card {
  width: 90%;
  height: 7rem;
  background: $lighten-background-color;
  border-radius: 0.3rem;
  padding: 0.7rem;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    width: 100%;
    color: $lighten-text-color;
  }

  & > .club-data,
  & > .photo {
    display: inline-block;
    margin: 0 1rem 0 0;
  }

  & > .club-data {
    & > p {
      font-size: 1rem;

      & > svg {
        width: 1rem;

        & > path {
          fill: $main-text-color;
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .club-card {
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.7rem;
    margin: 0.7rem auto;

    &:hover {
      color: $main-text-color;
    }
  }
}
</style>
