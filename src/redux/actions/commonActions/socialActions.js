import types from '../types'

const getFollowees = (followIdentity, followOwnerId, followParentType="identity") => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWEES,
    payload: {
      followIdentity,
      followParentType,
      followOwnerId,
    }
  }
}

const getFollowers= (followIdentity, followOwnerId, followParentType="identity") => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWERS,
    payload: {
      followIdentity,
      followParentType,
      followOwnerId,
    }
  }
}

const deleteFollowers= (followedIdentityId, followParentType="identity") => {
  return{
    type: types.COMMON.SOCIAL.DELETE_FOLLOWERS,
    payload: {
      followedIdentityId,
      followParentType,
    }
  }
}

const SocialActions = {
  getFollowees,
  getFollowers,
  deleteFollowers
}

export default SocialActions