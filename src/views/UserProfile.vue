<template>
  <div class="profile-wrapper">
    <div v-if="!loading" class="profile">
      <div class="profile-header">
        <div class="left-panel">
          <img :src="user.profile" alt="User profile" />
          <h1>{{ user.firstname + ' ' + user.lastname }}</h1>
          <p>{{ user.bio }}</p>
          <div class="profile-info">
            <div class="follower-count">
              {{ user.follower_count }}
              <p>Obserwujący</p>
            </div>
            <div class="friend-count">
              {{ user.friend_count }}
              <p>Obserwowani</p>
            </div>
          </div>
        </div>
        <div class="right-panel">
          <div class="points-total">
            <span class="points"> {{ pointsTotalAll }} </span
            ><span class="month-points">wszystkich</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="activity-icon">
              <path
                d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
              />
            </svg>
          </div>
          <div class="points-selected-month">
            <span class="points"> {{ pointsTotalMonth }} </span>
            <span class="month-points">
              {{ calculateMonthsExt(selectedDate.month) }} {{ selectedDate.year }}</span
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="activity-icon">
              <path
                d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="profile-recent">
        <div class="datepicker-wrapper">
          <VueDatePicker
            v-model="selectedDate"
            month-picker
            placeholder="Wybierz miesiąc"
            @update:model-value="handleDateChange"
            dark
            :max-date="new Date()"
            :clearable="false"
          ></VueDatePicker>
        </div>
        <h2>Lista aktywności:</h2>
        <div class="recent-activities">
          <ActivityCard
            v-for="activity in filteredActivities"
            :activity="activity"
            :key="activity.id"
          />
        </div>
      </div>
    </div>
    <loader v-else />
  </div>
</template>

<script>
import { getUserInfo, getActivities } from '@/controllers/StravaAPIController'
import Loader from '../components/Loader.vue'
import ActivityCard from '@/components/ActivityCard.vue'
import { getRewardValue, calculateMonths } from '../utils/index'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'UserProfile',
  components: {
    Loader,
    ActivityCard,
    VueDatePicker
  },
  data() {
    return {
      loading: true,
      user: null,
      allActivities: [], // Przechowuje wszystkie aktywności
      filteredActivities: [], // Przechowuje przefiltrowane aktywności
      pointsTotalMonth: 0,
      pointsTotalAll: 0,
      selectedDate: {
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      }
    }
  },
  computed: {
    // Oblicz sumę punktów dla aktywności z danego miesiąca
    pointsTotalMonth() {
      let pointsToAdd = 0
      return this.filteredActivities.reduce((total, activity) => {
        pointsToAdd = getRewardValue(activity.distance, activity.type)
        if (!isNaN(pointsToAdd)) {
          return total + pointsToAdd
        } else {
          return total + 0
        }
      }, 0)
    },
    // Oblicz sumę punktów dla wszystkich aktywności
    pointsTotalAll() {
      let pointsToAdd = 0
      return this.allActivities.reduce((total, activity) => {
        pointsToAdd = getRewardValue(activity.distance, activity.type)
        if (!isNaN(pointsToAdd)) {
          return total + pointsToAdd
        } else {
          return total + 0
        }
      }, 0)
    }
  },
  watch: {
    // Monitoruj zmiany wybranej daty i filtruj aktywności na jej podstawie
    selectedDate(newDate) {
      if (!(newDate instanceof Date)) {
        console.error('Selected date is not a Date object')
        return
      }

      this.filteredActivities = this.allActivities.filter((activity) => {
        const activityDate = new Date(activity.start_date_local)
        return (
          activityDate.getMonth() === newDate.month && activityDate.getFullYear() === newDate.year
        )
      })
    }
  },
  methods: {
    handleDateChange(newDate) {
      this.selectedDate = newDate
      this.filteredActivities = this.allActivities.filter((activity) => {
        const activityDate = new Date(activity.start_date_local)
        return (
          activityDate.getMonth() === newDate.month && activityDate.getFullYear() === newDate.year
        )
      })
    },
    calculateMonthsExt(month) {
      return calculateMonths(month)
    }
  },
  async mounted() {
    if (!this.$store.state.user) {
      await getUserInfo()
        .then((res) => {
          this.user = res
          this.$store.dispatch('storeUser', res)
        })
        .catch((error) => console.log(error))
    } else {
      this.user = this.$store.state.user
    }
    if (!this.$store.state.Activities) {
      await getActivities()
        .then((res) => {
          this.allActivities = res
          this.$store.dispatch('storeActivities', res)
          this.filteredActivities = this.allActivities.filter((activity) => {
            const activityDate = new Date(activity.start_date_local)
            return (
              activityDate.getMonth() === this.selectedDate.month &&
              activityDate.getFullYear() === this.selectedDate.year
            )
          })
        })
        .catch((error) => console.log(error))
    } else {
      this.allActivities = this.$store.state.Activities
    }

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
@import '../utils/colors.scss';
* {
  user-select: none;
}
h1 {
  padding: 1rem 0;
}
h2 {
  margin: 0 auto;
  font-size: 1.4rem;
  font-weight: 500;
}
img {
  max-width: 160px;
  margin-top: 2rem;
  border-radius: 50%;
  -webkit-box-shadow: 0px 8px 24px rgb(13 13 18 / 16%);
  box-shadow: 0px 8px 24px rgb(13 13 18 / 16%);
}
.profile-wrapper {
  align-self: flex-start;
  height: 100%;
  width: 70%;
  margin: 0 auto;
}
.datepicker-wrapper {
  width: 30%;
  margin: 1rem 0;
}
.profile-header {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 2px $lighten-background-color;
  & > p {
    margin-top: 0;
  }

  & > .left-panel {
    max-width: 50%;
    & > .profile-info {
      display: flex;
      margin: 0 auto;

      & > div {
        width: 50%;
        font-weight: 700;
        font-size: 2rem;
        color: $main-strava-color;

        & > p {
          font-weight: 500;
          font-size: 1rem;
          color: $main-text-color;
          margin: 0.2rem auto 1rem auto;
        }
      }
    }
  }

  & > .right-panel {
    width: 50%;
    display: flex;
    align-content: center;
    justify-content: flex-end;
    flex-direction: column;

    & > .points-total,
    & > .points-selected-month {
      width: 100%;
      text-align: right;
      margin: 2rem 0 0 0;

      & > .points {
        font-size: 2.3rem;
        font-weight: 300;
        letter-spacing: 0.1rem;
      }

      & > .month-points {
        font-size: 2rem;
        font-weight: 100;

        &::before {
          content: ' ';
        }
      }

      & > svg {
        height: 3rem;
        margin: 0 1rem;

        & > path {
          fill: $main-strava-color;
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .profile-wrapper {
    width: 95%;
  }
  .datepicker-wrapper {
    width: 100%;
  }
  .profile-header {
    flex-direction: column;
    width: 100%;

    & > .left-panel {
      max-width: 100%;
      width: 100%;
      border-bottom: solid 2px $lighten-background-color;
      text-align: center;
      align-content: center;

      h1 {
        font-size: 1.4rem;
        font-weight: 500;
        width: 100%;
        margin: 0 auto;
        text-align: center;
      }

      img {
        margin: 1rem auto 0;
      }
      & > .profile-info {
        & > div {
          text-align: center;
          width: 50%;
          font-weight: 500;
          font-size: 1.2rem;

          & > p {
            font-weight: 300;
            font-size: 0.8rem;
          }
        }
      }
    }

    & > .right-panel {
      width: 100%;

      & > .points-total,
      & > .points-selected-month {
        width: 100%;
        text-align: right;
        margin: 0.5rem 0;

        & > .points {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: 0.1rem;
        }

        & > .month-points {
          font-size: 1.3rem;
          font-weight: 100;
        }

        & > svg {
          height: 2rem;
          margin: 0 0.5rem;
        }
      }
    }
  }
}
</style>
