import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      accessToken: null,
      user: null,
      recentActivities: null,
      activities: null,
      allActivities: null,
      userStats: null,
      userClubs: null,
      clubData: null,
      clubMembers: null,
      clubActivities: null
    }
  },
  mutations: {
    storeToken(state, token) {
      state.accessToken = token
    },
    storeUser(state, user) {
      state.user = user
    },
    storeActivities(state, activities) {
      state.activities = activities
    },
    storeRecentActivities(state, activities) {
      state.recentActivities = activities
    },
    storeUserStats(state, userStats) {
      state.userStats = userStats
    },
    storeAllActivities(state, allActivities) {
      state.allActivities = allActivities
    },
    storeAllClubs(state, allClubs) {
      state.allClubs = allClubs
    },
    storeClubData(state, clubData) {
      state.clubData = clubData
    },
    storeClubMembers(state, clubMembers) {
      state.clubMembers = clubMembers
    },
    storeClubActivities(state, clubActivities) {
      state.clubActivities = clubActivities
    }
  },
  actions: {
    storeToken({ commit }, token) {
      commit('storeToken', token)
    },
    removeToken({ commit }) {
      commit('storeToken', null)
    },
    storeUser({ commit }, user) {
      commit('storeUser', user)
    },
    storeActivities({ commit }, activities) {
      commit('storeActivities', activities)
    },
    storeRecentActivities({ commit }, activities) {
      commit('storeRecentActivities', activities)
    },
    storeUserStats({ commit }, userStats) {
      commit('storeUserStats', userStats)
    },
    storeAllActivities({ commit }, allActivities) {
      commit('storeAllActivities', allActivities)
    },
    storeAllClubs({ commit }, allClubs) {
      commit('storeAllClubs', allClubs)
    },
    storeClubData({ commit }, clubData) {
      commit('storeClubData', clubData)
    },
    storeClubMembers({ commit }, clubMembers) {
      commit('storeClubMembers', clubMembers)
    },
    storeClubActivities({ commit }, clubActivities) {
      commit('storeClubActivities', clubActivities)
    }
  }
})
