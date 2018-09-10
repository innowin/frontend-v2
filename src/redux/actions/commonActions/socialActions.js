import types from '../types'

const getFollowees = ({followOwnerIdentity, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWEES,
    payload: {
      followOwnerIdentity,
      followOwnerType,
      followOwnerId,
    }
  }
}

const getFollowers= ({followOwnerIdentity, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWERS,
    payload: {
      followOwnerIdentity,
      followOwnerType,
      followOwnerId,
    }
  }
}

const deleteFollow= ({followId, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.DELETE_FOLLOW,
    payload: {
      followId,
      followOwnerId,
      followOwnerType,
    }
  }
}

const updateFollow= ({formValues, followId, followOwnerId}) => {
  return{
    type: types.COMMON.SOCIAL.DELETE_FOLLOW,
    payload: {
      formValues,
      followId,
      followOwnerId,
    }
  }
}

const SocialActions = {
  getFollowees,
  getFollowers,
  deleteFollow,
  updateFollow,
}

export default SocialActions