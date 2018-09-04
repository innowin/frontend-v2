import initialState from '../initialState'
import types from '../../actions/types'

const social = (state = initialState.common.social, action) => {
  const {data, message} = action.payload || []
  const previousFollows = (state && state.follows) || {}
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
      /** -------------------------- delete followers -------------------------> **/
    case types.COMMON.SOCIAL.DELETE_FOLLOWERS:
      return {...state}
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOWERS:
      return {...state}
    case types.ERRORS.COMMON.SOCIAL.DELETE_FOLLOWERS:
      return {...state}
      /** -------------------------- reset -------------------------> **/
    case types.RESET:
      return initialState.common.social
    default:
      return {...state}
  }
}
export default social