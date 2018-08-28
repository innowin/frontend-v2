import initialState from '../initialState'
import types from '../../actions/types'

const social = (state = initialState.common.social, action) => {
  const {data, message} = action.payload || []

  switch (action.type) {
      /** -------------------------- get following -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWEES:
      return {...state}
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      return {...state}
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWEES:
      return {...state}
      /** -------------------------- get followers -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWERS:
      return {...state}
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      return {...state}
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWERS:
      return {...state}
      /** -------------------------- delete followers -------------------------> **/
    case types.COMMON.SOCIAL.DELETE_FOLLOWERS:
      return {...state}
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOWERS:
      return {...state}
    case types.ERRORS.COMMON.SOCIAL.DELETE_FOLLOWERS:
      return {...state}

    default:
      return {...state}
  }
}
export default social