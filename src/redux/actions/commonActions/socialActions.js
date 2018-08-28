import types from '../types'

const getFollowees = (identityId) => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWEES,
    payload: {
      identityId,
    }
  }
}

const getFollowers= (identityId) => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWERS,
    payload: {
      identityId,
    }
  }
}

const deleteFollowers= (followedIdentityId) => {
  return{
    type: types.COMMON.SOCIAL.DELETE_FOLLOWERS,
    payload: {
      followedIdentityId,
    }
  }
}

const SocialActions = {
  getFollowees,
  getFollowers,
  deleteFollowers
}

export default SocialActions