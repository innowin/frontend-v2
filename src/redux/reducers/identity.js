import initialState from "./initialState"
import types from "../actions/types/index"

const identities = (state = initialState.identities, action) => {
  const {data} = action.payload || {}
  switch (action.type) {
    /** -------------------------- get identity -------------------------> **/
    case types.SUCCESS.USER.GET_USER_IDENTITY:
      return {
        ...state,
        list: {
          ...state.list,
          [data.id]: {...data, isLoading: false, error: null}
        }
      }
    case types.SUCCESS.ORG.GET_ORG_IDENTITY:
      return {
        ...state,
        list: {
          ...state.list,
          [data.id]: {...data, isLoading: false, error: null}
        }
      }
    case types.RESET:
      return initialState.identities
    default:
      return state
  }
}

export default identities