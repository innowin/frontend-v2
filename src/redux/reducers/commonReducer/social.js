import initialState from '../initialState'
import types from '../../actions/types'

const social = (state = initialState.common.social, action) => {
  const {data, message, followId} = action.payload || []
  const previousFollows = (state && state.follows) || {}
  const previousFollowsList = (previousFollows && state.follows.list) || {}
  const previousFollow = (previousFollowsList && state.follows.list[followId]) || {}
  const indexedSocial = {}

  switch (action.type) {
      /** -------------------------- get following -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      data.map(follow => indexedSocial[follow.id] = {...follow, error: null, isLoading: false})
      return {
        ...state,
        follows:{
          ...previousFollows,
          list: {
            ...previousFollows.list,
            ...indexedSocial,
          }
        }
      }
      /** -------------------------- get followers -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      data.map(follow => indexedSocial[follow.id] = {...follow, error: null, isLoading: false})
      return {
        ...state,
        follows:{
          ...previousFollows,
          list: {
            ...previousFollows.list,
            ...indexedSocial,
          }
        }
      }
      /** -------------------------- delete follow -------------------------> **/
    case types.COMMON.SOCIAL.DELETE_FOLLOW:
      return {
        ...state,
        follows: {
          ...previousFollows,
          list: {
            ...previousFollowsList,
            [followId]:{
              ...previousFollow,
              isLoading: true,
              error: null,
            }
          }
        }
      }
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW:
      const {[`${followId}`]: deleted, ...deleteRest} = state.follows.list
      return {
        ...state,
        follows: {
          ...previousFollows,
          list: {...deleteRest}
        }
      }
    case types.ERRORS.COMMON.SOCIAL.DELETE_FOLLOW:
      return {
        ...state,
        follows: {
          ...previousFollows,
          list: {
            ...previousFollowsList,
            [followId]:{
              ...previousFollow,
              isLoading: false,
              error: message,
            }
          }
        }
      }
      /** -------------------------- reset -------------------------> **/
    case types.RESET:
      return initialState.common.social
    default:
      return {...state}
  }
}
export default social