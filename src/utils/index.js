export const getAuthTokenFromUrl = () => {
  let token = window.location.search ? window.location.search.split('code=')[1].split('&')[0] : null
  return token
}

export const getCurrentTime = () => {
  // Fetch activies before current time
  const now = new Date()
  const utcMilllisecondsSinceEpoch = now.getTime() + now.getTimezoneOffset() * 60 * 1000
  return Math.round(utcMilllisecondsSinceEpoch / 1000)
}

export const getRewardValue = (distance, type) => {
  if (type === 'Ride') return Math.round((distance * 26) / 10000)
  if (type === 'Run') return Math.round((distance * 72) / 10000)
  if (type === 'Walk') return Math.round((distance * 56) / 10000)
  if (type === 'Swim') return Math.round((distance * 120) / 10000)
  if (type === 'Hike') return Math.round((distance * 70) / 10000)
}

export const calculateMonths = (month) => {
  switch (month) {
    case 0:
      return 'w styczniu'
    case 1:
      return 'w lutym'
    case 2:
      return 'w marcu'
    case 3:
      return 'w kwietniu'
    case 4:
      return 'w maju'
    case 5:
      return 'w czerwcu'
    case 6:
      return 'w lipcu'
    case 7:
      return 'w sierpniu'
    case 8:
      return 'we wrześniu'
    case 9:
      return 'w październiku'
    case 10:
      return 'w listopadzie'
    case 11:
      return 'w grudniu'
  }
}