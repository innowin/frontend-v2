import types from '../types'

const getFollowees = ({followIdentity, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWEES,
    payload: {
      followIdentity,
      followOwnerType,
      followOwnerId,
    }
  }
}

const getFollowers= ({followIdentity, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWERS,
    payload: {
      followIdentity,
      followOwnerType,
      followOwnerId,
    }
  }
}

const deleteFollowers= (followedIdentityId, followOwnerType) => {
  return{
    type: types.COMMON.SOCIAL.DELETE_FOLLOWERS,
    payload: {
      followedIdentityId,
      followOwnerType,
    }
  }
}

const SocialActions = {
  getFollowees,
  getFollowers,
  deleteFollowers
}

export default SocialActions