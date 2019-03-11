import initialState from '../initialState'
import types from '../../actions/types'
import slices from '../sliceReducers/common/social'

const social = (state = initialState.common.social, action) => {
  switch (action.type) {
    /** -------------------------- get followers -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      return slices.getFollowers.success(state, action)
    /** -------------------------- get followers -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      return slices.getFollowees.success(state, action)
    /** -------------------------- delete follow -------------------------> **/
    case types.COMMON.SOCIAL.DELETE_FOLLOW:
      return slices.deleteFollow.base(state, action)
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW:
      return slices.deleteFollow.success(state, action)
    case types.ERRORS.COMMON.SOCIAL.DELETE_FOLLOW:
      return slices.deleteFollow.error(state, action)
    /** -------------------------- update follow -------------------------> **/
    case types.COMMON.SOCIAL.UPDATE_FOLLOW:
      return slices.updateFollow.base(state, action)
    case types.SUCCESS.COMMON.SOCIAL.UPDATE_FOLLOW:
      return slices.updateFollow.success(state, action)
    case types.ERRORS.COMMON.SOCIAL.UPDATE_FOLLOW:
      return slices.updateFollow.error(state, action)
    /** -------------------------- create follow -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.CREATE_FOLLOW:
      return slices.createFollow.success(state, action)
    /** -------------------------- reset -------------------------> **/
    case types.RESET:
      return initialState.common.social
    default:
      return state
  }
}
export default social