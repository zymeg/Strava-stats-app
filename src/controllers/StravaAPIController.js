import axios from 'axios'
import { getAuthTokenFromUrl } from '../utils'
const { VITE_APP_CLIENT_ID, VITE_APP_CLIENT_SECRET } = import.meta.env

const getLocalAccessToken = () => window.localStorage.getItem('strava_access_token')
const getLocalRefreshToken = () => window.localStorage.getItem('strava_refresh_token')
const getLocalTokenExpiry = () => window.localStorage.getItem('strava_token_expiry')

const setLocalAccessToken = (token) => window.localStorage.setItem('strava_access_token', token)
const setLocalRefreshToken = (token) => window.localStorage.setItem('strava_refresh_token', token)
const setLocalTokenExpiry = (token) => window.localStorage.setItem('strava_token_expiry', token)

const removeLocalAccessToken = () => window.localStorage.removeItem('strava_access_token')
const removeLocalRefreshToken = () => window.localStorage.removeItem('strava_refresh_token')
const removeLocalTokenExpiry = () => window.localStorage.removeItem('strava_token_expiry')

const refreshAccessToken = async () => {
  try {
    const authReponse = await axios.post(`https://www.strava.com/api/v3/oauth/token`, null, {
      params: {
        client_id: VITE_APP_CLIENT_ID,
        client_secret: VITE_APP_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: getLocalRefreshToken()
      }
    })
    const responseData = authReponse.data
    setLocalAccessToken(responseData.access_token)
    setLocalRefreshToken(responseData.refresh_token)
    setLocalTokenExpiry(responseData.expires_at)
    window.location.reload()
    return
  } catch (error) {
    console.log(error)
  }
}

export const getAccessToken = async () => {
  let token = getAuthTokenFromUrl()
  const localTokenExpiry = getLocalTokenExpiry()

  // If token has expired, refresh token
  if (localTokenExpiry && Number(localTokenExpiry * 1000) - Date.now() <= 0) {
    refreshAccessToken()
  }

  const localAccessToken = getLocalAccessToken()

  // If no token, but we are in the redirect URI, get new access token
  if (!localAccessToken && token) {
    try {
      const authReponse = await axios.post(`https://www.strava.com/api/v3/oauth/token`, null, {
        params: {
          client_id: VITE_APP_CLIENT_ID,
          client_secret: VITE_APP_CLIENT_SECRET,
          code: token,
          grant_type: 'authorization_code'
        }
      })
      const responseData = authReponse.data
      axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.access_token}`
      setLocalAccessToken(responseData.access_token)
      setLocalRefreshToken(responseData.refresh_token)
      setLocalTokenExpiry(responseData.expires_at)
      window.location =
        import.meta.env.MODE === 'production'
          ? 'https://rogowskie-straty.netlify.app'
          : `http://localhost:5173`
      return responseData.access_token
    } catch (error) {
      console.log(error)
    }
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${localAccessToken}`
  return localAccessToken
}

export const logout = () => {
  axios.defaults.headers.common['Authorization'] = null
  removeLocalAccessToken()
  removeLocalRefreshToken()
  removeLocalTokenExpiry()
  window.location =
    import.meta.env.MODE === 'production'
      ? 'https://rogowskie-straty.netlify.app'
      : `http://localhost:5173`
}

export const getUserInfo = async () => {
  try {
    const userInfoResponse = await axios.get('https://www.strava.com/api/v3/athlete')
    return userInfoResponse.data
  } catch (error) {
    console.log(error)
  }
}

export const getActivities = async () => {
  try {
    const userInfoResponse = await axios.get('https://www.strava.com/api/v3/athlete/activities')
    return userInfoResponse.data
  } catch (error) {
    console.log(error)
  }
}

export const getAllActivities = async () => {
  let allActivities = []
  const fetchMaxActivities = async () => {
    try {
      const activities = await getActivities()
      allActivities = [...allActivities, ...activities]
    } catch (e) {
      console.log(e)
    }
  }
  await fetchMaxActivities()
  return allActivities
}

export const getUserStats = async (id) => {
  try {
    const userStatsResponse = await axios.get(`https://www.strava.com/api/v3/athletes/${id}/stats`)
    return userStatsResponse.data
  } catch (error) {
    console.log(error)
  }
}

export const getUserClubs = async () => {
  try {
    const userClubs = await axios.get(`https://www.strava.com/api/v3/athlete/clubs`)
    return userClubs.data
  } catch (error) {
    console.log(error)
  }
}

export const getClubInfo = async (id) => {
  try {
    const clubData = await axios.get(`https://www.strava.com/api/v3/clubs/${id}`)
    return clubData.data
  } catch (error) {
    console.log(error)
  }
}

export const getClubMembers = async (id) => {
  try {
    const clubMembers = await axios.get(`https://www.strava.com/api/v3/clubs/${id}/members`)
    return clubMembers.data
  } catch (error) {
    console.log(error)
  }
}

export const getClubActivities = async (id) => {
  try {
    const clubActivities = await axios.get(`https://www.strava.com/api/v3/clubs/${id}/activities`)
    return clubActivities.data
  } catch (error) {
    console.log(error)
  }
}
