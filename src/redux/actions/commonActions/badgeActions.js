import types from '../types'

const getUserBadges = (userId, identityId) => ({
  type: types.COMMON.GET_USER_BADGES,
  payload: {
    userId,
    identityId
  }
})

const getOrganBadges = (organizationId) => ({
  type: types.COMMON.GET_ORG_BADGES,
  payload: {
    organizationId
  }
})


const BadgeActions = {
  getUserBadges,
  getOrganBadges
}

export default BadgeActions