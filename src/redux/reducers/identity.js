import initialState from "./initialState"
import types from "../actions/types/index"
import slices from './sliceReducers/identity'

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
      /** -------------------------- sign in -------------------------> **/
    case types.SUCCESS.AUTH.SIGN_IN:
      return slices.signIn.success(state, action)
      /** -------------------------- reset -------------------------> **/
    case types.RESET:
      return initialState.identities
    default:
      return state
  }
}

export default identities