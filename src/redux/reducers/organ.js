import initialState from "./initialState"
import types from "../actions/types/index"
import slices from "./sliceReducers/organ";

const organs = (state = initialState.organs, action) => {
  const {organizationId, data, message} = action.payload || {}
  const defaultObject = {content: {}, isLoading: false, error: null}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  // FIXME: commented by ali. because of an error.
  // const previousOrgan = (state.list[organizationId] && state.list[organizationId].organization) || defaultObject
  const previousOrgan = state.list
      ? (state.list[organizationId] && state.list[organizationId].organization)
      : defaultObject
  // FIXME: commented by ali. because of an error.
  // const previousBadges = (state.list[organizationId] && state.list[organizationId].badges) || defaultObject2
  const previousBadges = state.list ?
      (state.list[organizationId] && state.list[organizationId].badges)
      : defaultObject2
  switch (action.type) {
    /** -------------------------- get organ -------------------------> **/
    case types.ORG.GET_ORGANIZATION:
      return {
        ...state,
        list: {
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            organization: {
              ...previousOrgan,
              isLoading: true,
              error: null
            }
          }
        }
      }
    case types.SUCCESS.ORG.GET_ORGANIZATION:
      return {
        ...state,
        list: {
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            organization: {
              ...previousOrgan,
              content: data,
              isLoading: false
            }
          }
        }
      }
    case types.ERRORS.ORG.GET_ORGANIZATION:
      return {
        ...state,
        list: {
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            organization: {
              ...previousOrgan,
              isLoading: false,
              error: message
            }
          }
        }
      }
    /** -------------------------- update organization info-------------------------> **/
    case types.SUCCESS.ORG.UPDATE_ORGANIZATION_INFO:
      const updatedOrganization = action.payload
      return {
        ...state,
        list:{
          ...state.list,
          [updatedOrganization.id]: {
            ...state.list[updatedOrganization.id],
            organization: {
              ...previousOrgan,
              content: {...updatedOrganization},
              isLoading: false,
              error: message

            }
          }
        }
      }
    /** -------------------------- badge -------------------------> **/
    case types.COMMON.SET_BADGES_IN_ORG:
      return {
        ...state,
        list:{
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            badges: {
              ...previousBadges,
              isLoading: true,
              error: null
            }
          }
        }
      }
    case types.SUCCESS.COMMON.SET_BADGES_IN_ORG:
      const ArrayOfBadgeId = data.map((badge) => badge.id)
      return {
        ...state,
        list:{
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            badges: {
              ...previousBadges,
              content: ArrayOfBadgeId,
              isLoading: false
            }
          }
        }
      }
    case types.ERRORS.COMMON.SET_BADGES_IN_ORG:
      return {
        ...state,
        list:{
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            badges: {
              ...previousBadges,
              isLoading: false,
              error: message
            }
          }
        }
      }
    /** -------------------------- get exchange membership by member identity  -------------------------> **/
    case types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return slices.getExchangeMembershipByMemberIdentity.base(state, action)
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return slices.getExchangeMembershipByMemberIdentity.success(state, action)
    case types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return slices.getExchangeMembershipByMemberIdentity.error(state, action)
    /** -------------------------- delete exchange membership  -------------------------> **/
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP:
      return slices.deleteExchangeMembership.success(state, action)
    /** -------------------------- get work experience by user id  -------------------------> **/
    case types.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.getWorkExperienceByUserId.base(state, action)
    case types.SUCCESS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.getWorkExperienceByUserId.success(state, action)
    case types.ERRORS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.getWorkExperienceByUserId.error(state, action)
    /** -------------------------- create work experience by user id -------------------------> **/
    case types.SUCCESS.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.createWorkExperienceByUserId.success(state, action)
    /** -------------------------- delete work experience by user id -------------------------> **/
    case types.SUCCESS.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.deleteWorkExperienceByUserId.success(state, action)
    /** -------------------------- reset organs -------------------------> **/
    case types.RESET:
      return initialState.organs
    default:
      return state
  }
}

export default organs