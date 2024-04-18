<template>
  <section>
    <div class="club-info">
      <div v-if="clubData.profile != 'avatar/club/large.png'" class="photo">
        <img :src="clubData.profile" />
      </div>
      <div class="club-more-info">
        <h1 class="club-name">
          {{ clubData.name }}
        </h1>
        <p class="member-count">
          <span>{{ clubData.member_count }} </span> członków
        </p>
        <p class="location">{{ clubData.city }}</p>
      </div>
    </div>
    <div class="club-page-wrapper">
      <ul>
        <li @click="changeClubTab('activity')" :class="{ active: activitiesVisible }">
          Lista aktywności
        </li>
        <li @click="changeClubTab('member')" :class="{ active: memberVisible }">Lista członków</li>
      </ul>
    </div>
    <div v-if="activitiesVisible === 1" class="activities-list">
      <ActivityCard v-for="activity in clubActivities" :activity="activity" :key="activity.id" />
    </div>
    <div v-if="memberVisible === 1" class="member-list">
      <ul>
        <li v-for="member in clubMembers">{{ `${member.firstname} ${member.lastname}` }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import { useRoute } from 'vue-router'
import { getClubInfo, getClubMembers, getClubActivities } from '@/controllers/StravaAPIController'

import ActivityCard from '@/components/ActivityCard.vue'

export default {
  name: 'ClubInfo',
  components: {
    ActivityCard
  },
  data: function () {
    return {
      clubID: 0,
      loading: true,
      clubData: [],
      clubMembers: [],
      clubActivities: [],
      activitiesVisible: 1,
      memberVisible: 0
    }
  },
  methods: {
    changeClubTab(toTab) {
      if (toTab === 'activity') {
        this.activitiesVisible = 1
        this.memberVisible = 0
      } else if (toTab === 'member') {
        this.activitiesVisible = 0
        this.memberVisible = 1
      }
    }
  },
  mounted() {
    const route = useRoute()
    this.clubID = route.params.id

    getClubInfo(this.clubID)
      .then((res) => {
        this.clubData = res
        this.loading = false
      })
      .catch((error) => console.log(error))

    this.loading = true
    getClubMembers(this.clubID)
      .then((res) => {
        this.clubMembers = res
        this.loading = false
      })
      .catch((error) => console.log(error))

    this.loading = true
    getClubActivities(this.clubID)
      .then((res) => {
        this.clubActivities = res
        this.loading = false
      })
      .catch((error) => console.log(error))
  }
}
</script>

<style lang="scss" scoped>
@import '@/utils/colors.scss';

section {
  width: 70%;
  padding: 1rem;
  user-select: none;

  & > .club-info {
    width: 100%;
    min-height: 10rem;
    text-align: left;
    align-items: start;
    align-content: start;
    border-bottom: 2px solid $lighten-background-color;

    & > .photo {
      display: inline-block;
    }

    & > .club-more-info {
      display: inline-block;
      margin: 1rem;
      & > .club-name {
        font-size: 2.4rem;
        display: inline-block;
      }

      & > .member-count {
        font-size: 1.2rem;

        & > span {
          color: $main-strava-color;
        }
      }
    }
  }

  & > .club-page-wrapper {
    width: 100%;
    // height: 7rem;

    & > ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      width: 100%;

      & > .active {
        border-bottom: 2px solid $main-strava-color;
      }

      & > li {
        text-decoration: none;
        list-style: none;
        font-size: 1.2rem;
        padding: 1rem;
        cursor: pointer;
        width: 100%;
        text-align: center;
        transition: 0.5s;

        &:hover {
          background: $lighten-background-color;
        }
      }
    }
  }

  & > .activities-list {
    transition: 0.5s;
  }

  & > .member-list {
    transition: 0.5s;

    & > ul {
      width: 100%;

      & > li {
        list-style: none;
        width: 100%;
        min-height: 1.5rem;
        font-size: 1.2rem;
        padding: 1rem;

        &:nth-child(2n) {
          background: $lighten-background-color;
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  section {
    width: 100%;
    padding: 0.7rem;
    user-select: none;

    & > .club-info {
      & > .photo {
        margin: 0 1rem 0 0;
      }

      & > .club-more-info {
        margin: 0;
        & > .club-name {
          font-size: 1.5rem;
        }

        & > .member-count {
          font-size: 1rem;
        }
      }
    }

    & > .club-page-wrapper {
      & > ul {
        & > .active {
          border-bottom: 2px solid $main-strava-color;
          background: $lighten-background-color;
        }

        & > li {
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>
