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

export const getAllBadges = () => ({
  type: types.COMMON.GET_ALL_BADGES,
  payload: {}
})


const BadgeActions = {
  getUserBadges,
  getOrganBadges,
  getBadges,
  getAllBadges
}

export default BadgeActions