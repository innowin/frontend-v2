import types from '../types'

const getFollowees = ({notProfile, followOwnerIdentity, followOwnerId, userProfileId}) => {
  // if notProfile === true, in saga we will not get profile of the followees
  return {
    type: types.COMMON.SOCIAL.GET_FOLLOWEES,
    payload: {
      followOwnerIdentity,
      followOwnerId,
      notProfile,
      userProfileId,
    },
  }
}

const getFollowers = ({notProfile, followOwnerIdentity, followOwnerId}) => {
  return {
    type: types.COMMON.SOCIAL.GET_FOLLOWERS,
    payload: {
      followOwnerIdentity,
      followOwnerId,
      notProfile,
    },
  }
}

const updateFollow = ({formValues, followId, followOwnerId}) => {
  return {
    type: types.COMMON.SOCIAL.UPDATE_FOLLOW,
    payload: {
      formValues,
      followId,
      followOwnerId,
    },
  }
}

const createFollow = ({formValues}) => {
  return {
    type: types.COMMON.SOCIAL.CREATE_FOLLOW,
    payload: {formValues},
  }
}

const deleteFollow = ({followId, followOwnerId}) => {
  return {
    type: types.COMMON.SOCIAL.DELETE_FOLLOW,
    payload: {followId, followOwnerId},
  }
}

const SocialActions = {
  getFollowees,
  getFollowers,
  deleteFollow,
  updateFollow,
  createFollow,
}

export default SocialActions