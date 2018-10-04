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

export const getBadges = (parentId, destinationId) => ({
  type: types.COMMON.GET_BADGES,
  payload: {parentId, destinationId}
})


const BadgeActions = {
  getUserBadges,
  getOrganBadges,
  getBadges
}

export default BadgeActions