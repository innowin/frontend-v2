import initialState from "../initialState"
import types from "../../actions/types/index"

const organsInfoList = (state = initialState.organsInfoList, action) => {
  const {organizationId, data, message} = action.payload ? action.payload : {}
  const previousOrgan = (state[organizationId]) || {
    /* this object is default value for organ object if this state[organizationId] or state[organizationId].organ
    not exist in state object */
    content: {},
    isLoading: false,
    error: {
      message: null
    }
  }
  switch (action.type) {
    /** -------------------------- get organ -------------------------> **/
    case types.ORG.GET_ORGANIZATION:
      return {
        ...state,
        [organizationId]: {
          ...previousOrgan,
          isLoading: true
        }
      }
    case types.SUCCESS.ORG.GET_ORGANIZATION:
      return {
        ...state,
        [organizationId]: {
          ...previousOrgan,
          content: {...data},
          isLoading: false
        }
      }
    case types.ERRORS.ORG.GET_ORGANIZATION:
      return {
        ...state,
        [organizationId]: {
          ...previousOrgan,
          isLoading: false,
          error: {
            message
          }
        }
      }

    /** -------------------------- reset organsInfoList -------------------------> **/
    case types.RESET:
      return initialState.organsInfoList
    default:
      return state
  }
}

export default organsInfoList