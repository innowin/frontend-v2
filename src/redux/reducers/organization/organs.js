import initialState from "../initialState"
import types from "../../actions/types/index"

const organs = (state = initialState.organs, action) => {
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
  const previousBadges = (state[organizationId] && state[organizationId].badges) || {}
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

    /** -------------------------- badge -------------------------> **/
    case types.COMMON.SET_BADGES_IN_ORG:
      return {
        ...state,
        [organizationId]: {
          ...state[organizationId],
          badges: {
            ...previousBadges,
            isLoading: true
          }
        }
      }
    case types.SUCCESS.COMMON.SET_BADGES_IN_ORG:
      const ArrayOfBadgeId = data.map((badge) => badge.id)
      return {
        ...state,
        [organizationId]: {
          ...state[organizationId],
          badges: {
            ...previousBadges,
            content: ArrayOfBadgeId,
            isLoading: false
          }
        }
      }
    case types.ERRORS.COMMON.SET_BADGES_IN_ORG:
      return {
        ...state,
        [organizationId]: {
          ...state[organizationId],
          badges: {
            ...previousBadges,
            isLoading: false,
            error: {
              message
            }
          }
        }
      }

    /** -------------------------- reset organs -------------------------> **/
    case types.RESET:
      return initialState.organs
    default:
      return state
  }
}

export default organs