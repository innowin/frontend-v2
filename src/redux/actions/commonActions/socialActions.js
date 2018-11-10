import types from '../types'

const getFollowees = ({followOwnerIdentity, followOwnerId, followOwnerType}) => {
  console.log('this is get followees action data: ', {followOwnerIdentity, followOwnerId, followOwnerType})
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWEES,
    payload: {
      followOwnerIdentity,
      followOwnerType,
      followOwnerId,
    }
  }
}

const getFollowers = ({followOwnerIdentity, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.GET_FOLLOWERS,
    payload: {
      followOwnerIdentity,
      followOwnerType,
      followOwnerId,
    }
  }
}

const deleteFollow = ({followId, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.DELETE_FOLLOW,
    payload: {
      followId,
      followOwnerId,
      followOwnerType,
    }
  }
}

const updateFollow = ({formValues, followId, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.UPDATE_FOLLOW,
    payload: {
      formValues,
      followId,
      followOwnerId,
      followOwnerType,
    }
  }
}

const createFollow = ({formValues, followOwnerId, followOwnerType}) => {
  return{
    type: types.COMMON.SOCIAL.CREATE_FOLLOW,
    payload: {
      formValues,
      followOwnerId,
      followOwnerType
    }
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