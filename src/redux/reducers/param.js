import initialState from "./initialState"
import types from "../actions/types/index"

const param = (state = initialState.param, action) => {
  const {id} = action.payload || {}
  switch (action.type) {
    /** -------------------------- set param user id -------------------------> **/
    case types.PARAM.USER.SET_PARAM_USER_ID:
      return {
        ...state,
        user: id,
      }
    /** -------------------------- remove param user id -------------------------> **/
    case types.PARAM.USER.REMOVE_PARAM_USER_ID:
      return {
        ...state,
        user: 0,
      }
    /** -------------------------- set param organization id -------------------------> **/
    case types.PARAM.ORG.SET_PARAM_ORG_ID:
      return {
        ...state,
        organization: id,
      }
    /** -------------------------- remove param organization id -------------------------> **/
    case types.PARAM.ORG.REMOVE_PARAM_ORG_ID:
      return {
        ...state,
        organization: 0,
      }
    /** -------------------------- reset param -------------------------> **/
    case types.RESET:
      return initialState.param
    default:
      return state
  }
}

export default param