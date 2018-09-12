import initialState from "./initialState"
import types from "../actions/types/index"

const organs = (state = initialState.organs, action) => {
  const {organizationId, data, message, postParentId, postOwnerType, postParentType, postId }= action.payload || {}
  const defaultObject = {content: {}, isLoading: false, error: null}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousOrgan = (state[organizationId] && state[organizationId].organization) || defaultObject
  const previousBadges = (state[organizationId] && state[organizationId].badges) || defaultObject2
  switch (action.type) {
    /** -------------------------- get organ -------------------------> **/
    case types.ORG.GET_ORGANIZATION:
      return {
        ...state,
        [organizationId]: {
          ...state[organizationId],
          organization:{
            ...previousOrgan,
            isLoading: true,
            error: null
          }
        }
      }
    case types.SUCCESS.ORG.GET_ORGANIZATION:
      return {
        ...state,
        [organizationId]: {
          ...state[organizationId],
          organization:{
            ...previousOrgan,
            content: {...data},
            isLoading: false
          }
        }
      }
    case types.ERRORS.ORG.GET_ORGANIZATION:
      return {
        ...state,
        [organizationId]: {
          ...state[organizationId],
          organization:{
            ...previousOrgan,
            isLoading: false,
            error: message
            
          }
        }
      }

    /** -------------------------- update organization info-------------------------> **/
		case types.SUCCESS.ORG.UPDATE_ORGANIZATION_INFO:
    const updatedOrganization = action.payload
    return {
      ...state,
      [updatedOrganization.id]: {
        ...state[updatedOrganization.id],
        organization:{
          ...previousOrgan,
          content: {...updatedOrganization},
          isLoading: false,
          error: message
          
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
            isLoading: true,
            error: null
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
            error: message
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