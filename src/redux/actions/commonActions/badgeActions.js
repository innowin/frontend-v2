import types from '../types'

const getUserBadges = (userId, identityId) => ({
  type: types.COMMON.GET_FILE,
  payload: {
    userId,
    identityId
  }
})

const getOrganBadges = (organId) => ({
  type: types.COMMON.GET_FILE,
  payload: {
    organId
  }
})


const BadgeActions = {
  getUserBadges,
  getOrganBadges
}

export default BadgeActions