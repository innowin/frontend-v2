import initialState from "./initialState"
import types from "../actions/types/index"
import slices from "./sliceReducers/organ";

const organs = (state = initialState.organs, action) => {
  const {organizationId, data, message} = action.payload || {}
  const defaultObject = {content: {}, isLoading: false, error: null}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousOrgan = (state.list[organizationId] && state.list[organizationId].organization) || defaultObject
  const previousBadges = (state.list[organizationId] && state.list[organizationId].badges) || defaultObject2
  switch (action.type) {
    /** -------------------------- get organ identity-------------------------> **/
    case types.SUCCESS.ORG.GET_ORG_IDENTITY:
      return {
        ...state,
        list: {
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            identity: {
              content: data.id,
              isLoading: false,
              error: null
            }
          }
        }
      }
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

    case types.SUCCESS.ORG.SET_ORGANIZATION_INFO_MEDIA:
      return slices.setOrganMedia.success(state, action)

    /** -------------------------- update organization info-------------------------> **/
    case types.SUCCESS.ORG.UPDATE_ORGANIZATION_INFO:
      return {
        ...state,
        list: {
          ...state.list,
          [data.id]: {
            ...state.list[data.id],
            organization: {
              content: data,
              isLoading: false,
              error: null
            }
          }
        }
      }
    case types.ERRORS.ORG.UPDATE_ORGANIZATION_INFO:
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

    /** -------------------------- create file-------------------------> **/

    /** -------------------------- get posts by identity  -------------------------> **/
    case types.COMMON.POST.GET_POST_BY_IDENTITY:
      return slices.getPostByIdentity.base(state, action)
    case types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY:
      return slices.getPostByIdentity.success(state, action)
    case types.ERRORS.COMMON.POST.GET_POST_BY_IDENTITY:
      return slices.getPostByIdentity.error(state, action)
    /** -------------------------- get products by identity  -------------------------> **/
    case types.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY:
      return slices.getProductsByIdentity.base(state, action)
    case types.SUCCESS.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY:
      return slices.getProductsByIdentity.success(state, action)
    case types.ERRORS.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY:
      return slices.getProductsByIdentity.error(state, action)
    /** -------------------------- delete product  -------------------------> **/
    case types.SUCCESS.COMMON.PRODUCT.DELETE_PRODUCT:
      return slices.deleteProduct.success(state, action)
    /** -------------------------- get post  -------------------------> **/
    case types.COMMON.POST.GET_POST:
      return slices.getPost.base(state, action)
    case types.SUCCESS.COMMON.POST.GET_POST:
      return slices.getPost.success(state, action)
    case types.ERRORS.COMMON.POST.GET_POST:
      return slices.getPost.error(state, action)
    /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      return slices.createPost.success(state, action)
    /** -------------------------- delete post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      return slices.deletePost.success(state, action)
    /** -------------------------- get followers -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWERS:
      return slices.getFollowers.base(state, action)
    // case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
    //   return slices.getFollowers.success(state, action)
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWERS:
      return slices.getFollowers.error(state, action)
    /** -------------------------- get followees -------------------------> **/
    // case types.COMMON.SOCIAL.GET_FOLLOWEES:
    //   return slices.getFollowees.base(state, action)
    // case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
    //   return slices.getFollowees.success(state, action)
    // case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWEES:
    //   return slices.getFollowees.error(state, action)
    /** -------------------------- delete follow -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW:
      return slices.deleteFollow.success(state, action)
    /** -------------------------- create follow  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.CREATE_FOLLOW:
      return slices.createFollow.success(state, action)
    /** -------------------------- badge -------------------------> **/
    case types.COMMON.SET_BADGES_IN_ORG:
      return {
        ...state,
        list: {
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
        list: {
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
        list: {
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
    // case types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
    //   return slices.getExchangeMembershipByMemberIdentity.base(state, action)
    // case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
    //   return slices.getExchangeMembershipByMemberIdentity.success(state, action)
    // case types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
    //   return slices.getExchangeMembershipByMemberIdentity.error(state, action)
    /** -------------------------- delete exchange membership  -------------------------> **/
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP:
      return slices.deleteExchangeMembership.success(state, action)
    /** -------------------------- create work experience by user id -------------------------> **/
    case types.SUCCESS.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.createWorkExperienceByUserId.success(state, action)
    /** -------------------------- delete work experience by user id -------------------------> **/
    case types.SUCCESS.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return slices.deleteWorkExperienceByUserId.success(state, action)
    /** -------------- get organization certificates -------------> **/
    case types.SUCCESS.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY:
      return slices.getCertificatesByIdentity.success(state, action)
    /** -------------------------- delete organization certificate -------------------------> **/
    case types.SUCCESS.COMMON.CERTIFICATE.DELETE_CERTIFICATE:
      return slices.deleteCertificate.success(state, action)
    /** -------------------------- create Certificate  -------------------------> **/
    case types.SUCCESS.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE:
      return slices.createCertificate.success(state, action)
    /** -------------------------- get organization customers -------------------------> **/
    case types.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
      return slices.getCustomersByOrganizationId.base(state, action)
    case types.SUCCESS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
      return slices.getCustomersByOrganizationId.success(state, action)
    case types.ERRORS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
      return slices.getCustomersByOrganizationId.error(state, action)
    /** -------------------------- delete customer  -------------------------> **/
    case types.SUCCESS.ORG.DELETE_CUSTOMER:
      return slices.deleteCustomer.success(state, action)
    /** -------------------------- create customer -------------------------> **/
    case types.SUCCESS.ORG.CREATE_CUSTOMER:
      return slices.createCustomer.success(state, action)
    /** -------------------------- get organization customers -------------------------> **/
    case types.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID:
      return slices.getAbilitiesByOrganizationId.base(state, action)
    case types.SUCCESS.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID:
      return slices.getAbilitiesByOrganizationId.success(state, action)
    case types.ERRORS.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID:
      return slices.getAbilitiesByOrganizationId.error(state, action)
    /** -------------------------- delete customer  -------------------------> **/
    case types.SUCCESS.ABILITY.DELETE_ABILITY:
      return slices.deleteAbility.success(state, action)
    /** -------------------------- create customer -------------------------> **/
    case types.SUCCESS.ABILITY.CREATE_ABILITY:
      return slices.createAbility.success(state, action)
      /** -------------------------- sign in  -------------------------> **/
    // case types.SUCCESS.AUTH.SIGN_IN:
    //   return slices.signIn.success(state, action)
    /** -------------------------- reset organs -------------------------> **/
    case types.RESET:
      return initialState.organs
    default:
      return state
  }
}

export default organs