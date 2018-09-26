import initialState from "./initialState"
import types from "../actions/types/index"

const organs = (state = initialState.param, action) => {
  const {id} = action.payload || {}
  switch (action.type) {
    /** -------------------------- set param user id -------------------------> **/
    case types.PARAM.SET_PARAM_USER_ID:
      return {
        ...state,
        user: id,
      }
    /** -------------------------- remove param user id -------------------------> **/
    case types.PARAM.REMOVE_PARAM_USER_ID:
      return {
        ...state,
        user: 0,
      }
    /** -------------------------- reset param -------------------------> **/
    case types.RESET:
      return initialState.param
    default:
      return state
  }
}

export default organs