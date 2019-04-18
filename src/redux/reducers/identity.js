import initialState from "./initialState"
import types from "../actions/types/index"
import slices from "./sliceReducers/identity"
import userSlices from "./sliceReducers/user"
import organSlices from "./sliceReducers/organ"
import constants from "src/consts/constants"
import setRelatedObjIdForListItem from "./sliceReducers/utilsSlices/setRelatedObjIdForListItem"

const identities = (state = initialState.identities, action) => {
  const {userId, data, message, search, organizationId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousUser = (state.list[userId] && state.list[userId].user) || {}
  const previousProfile = (state.list[userId] && state.list[userId].profile) || {}
  const previousIdentity = (state.list[userId] && state.list[userId].identity) ||
      {content: null, isLoading: false, error: null}
  const previousBadgesUser = (state.list[userId] && state.list[userId].badges) || defaultObject2
  const defaultObject = {content: {}, isLoading: false, error: null}
  const previousOrgan = (state.list[organizationId] && state.list[organizationId].organization) || defaultObject
  const previousBadgesOrgan = (state.list[organizationId] && state.list[organizationId].badges) || defaultObject2

  switch (action.type) {
      /** -------------------------- get identity -------------------------> **/
      // case types.SUCCESS.USER.GET_USER_IDENTITY:
      //   return {
      //     ...state,
      //     list: {
      //       ...state.list,
      //       [data.id]: {...data, isLoading: false, error: null}
      //     }
      //   }
      // case types.SUCCESS.ORG.GET_ORG_IDENTITY:
      //   return {
      //     ...state,
      //     list: {
      //       ...state.list,
      //       [data.id]: {...data, isLoading: false, error: null}
      //     }
      //   }
      /** -------------------------- sign in -------------------------> **/
    case types.SUCCESS.AUTH.SIGN_IN:
      return slices.signIn.success(state, action)
      /** -------------------------- get file by related parent id -------------------------> **/
      // case types.SUCCESS.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID:
      //   return slices.getFileByRelatedParentId.success(state, action)
      /** -------------------------- reset -------------------------> **/

    case types.USER.SEARCH_USER:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          searchUserData: {},
          isLoading: true,
          error: null
        }
      }
    case types.SUCCESS.USER.SEARCH_USER:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          searchUserData: data,
          isLoading: false,
          error: null
        }
      }
    case types.ERRORS.USER.SEARCH_USER:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          searchUserData: {},
          isLoading: false,
          error: message
        }
      }
      // -------------------- request by email
    case types.USER.PASSWORD_RECOVERY_BY_EMAIL:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          userId: null,
          step_name: constants.RESET_PASSWORD_STEP.REQUEST,
          isLoading: true,
          error: null
        }
      }
    case types.SUCCESS.USER.PASSWORD_RECOVERY_BY_EMAIL:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          userId,
          step_name: constants.RESET_PASSWORD_STEP.REQUEST,
          isLoading: false,
          error: null
        }
      }
    case types.ERRORS.USER.PASSWORD_RECOVERY_BY_EMAIL:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          userId: null,
          step_name: constants.RESET_PASSWORD_STEP.REQUEST,
          isLoading: false,
          error: message
        }
      }
      // ---------------- request
    case types.USER.PASSWORD_RESET_BY_SMS_REQUEST:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          userId: null,
          step_name: constants.RESET_PASSWORD_STEP.REQUEST,
          isLoading: true,
          error: null
        }
      }
    case types.SUCCESS.USER.PASSWORD_RESET_BY_SMS_REQUEST:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          userId,
          step_name: constants.RESET_PASSWORD_STEP.REQUEST,
          isLoading: false,
          error: null
        }
      }
    case types.ERRORS.USER.PASSWORD_RESET_BY_SMS_REQUEST:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          userId: null,
          step_name: constants.RESET_PASSWORD_STEP.REQUEST,
          isLoading: false,
          error: message
        }
      }
      // ----------------- checking code
    case types.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          userId,
          step_name: constants.RESET_PASSWORD_STEP.CHECK_CODE,
          isLoading: true,
          error: null
        }
      }
    case types.SUCCESS.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE:
      const {VerificationCode} = action.payload || {}
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          VerificationCode,
          userId,
          step_name: constants.RESET_PASSWORD_STEP.CHECK_CODE,
          isLoading: false,
          error: null
        }
      }
    case types.ERRORS.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          userId,
          step_name: constants.RESET_PASSWORD_STEP.CHECK_CODE,
          isLoading: false,
          error: message
        }
      }
      // -------------------- reset finally
    case types.USER.PASSWORD_RESET_BY_SMS:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          step_name: constants.RESET_PASSWORD_STEP.RESET,
          isLoading: true,
          error: null
        }
      }
    case types.SUCCESS.USER.PASSWORD_RESET_BY_SMS:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          step_name: constants.RESET_PASSWORD_STEP.RESET,
          isLoading: false,
          error: null
        }
      }
    case types.ERRORS.USER.PASSWORD_RESET_BY_SMS:
      return {
        ...state,
        recoveryPassword: {
          ...state.recoveryPassword,
          step_name: constants.RESET_PASSWORD_STEP.RESET,
          isLoading: false,
          error: message
        }
      }
      // ------------------------------------ reset initial state of recoveryPassword
    case types.USER.RESET_RECOVERY_PASSWORD_REDUX_STATE:
      return {
        ...state,
        recoveryPassword: {
          VerificationCode: "",
          userId: null,
          searchUserData: {},
          step_name: "",
          isLoading: false,
          error: null
        }
      }

      /** -------------------------- get user -------------------------> **/
    case types.SUCCESS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            ...previousUser,
            ...data,
          }
        }
      }
    case types.ERRORS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            ...previousUser,
          }
        }
      }
    case types.SUCCESS.USER.GET_USERS:
      return {
        ...state,
        list: {...state.list, ...data},
        isLoading: false,
        error: null
      }

      /** ------------------------------ get all users ------------------------- **/
    case types.SUCCESS.USER.GET_ALL_USERS:
      let objectData = {}
      data.forEach(user => {
            objectData[user.id] = {
              ...state.list[user.id],
              ...user
            }
          }
      )
      return {
        ...state,
        list: {...state.list, ...objectData},
        search: search,
        isLoading: false
      }

      /** -------------------------- reset search user -------------------------> **/
    case types.USER.RESET_SEARCH_USER:
      return {
        ...state,
        search: null,
        loading: false
      }

      /** -------------------------- get profile -------------------------> **/
    case types.USER.GET_PROFILE_BY_USER_ID:
      // initial structure build in first request for getProfile is called but profile isLoading is true:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            profile: {
              ...previousProfile,
              isLoading: true,
              error: null
            }
          }
        }
      }
    case types.SUCCESS.USER.GET_PROFILE_BY_USER_ID:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            profile: {
              ...previousProfile,
              content: {...previousProfile.content, ...data},
              isLoading: false
            }
          }
        }
      }
    case types.ERRORS.USER.GET_PROFILE_BY_USER_ID:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            profile: {
              ...previousProfile,
              error: message,
              isLoading: false
            }
          }
        }
      }

    case types.SUCCESS.USER.SET_PROFILE_MEDIA:
      return userSlices.setProfileMedia.success(state, action)
      /** -------------------------- get identity -------------------------> **/
    case types.USER.GET_USER_IDENTITY:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            identity: {
              ...previousIdentity,
              isLoading: true,
              error: null
            }
          }
        }
      }
      // case types.SUCCESS.USER.GET_USER_IDENTITY:
      //   return {
      //     ...state,
      //     list: {
      //       ...state.list,
      //       [userId]: {
      //         ...state.list[userId],
      //         identity: {
      //           ...previousIdentity,
      //           content: data.id,
      //           isLoading: false
      //         }
      //       }
      //     }
      //   }
    case types.ERRORS.USER.GET_USER_IDENTITY:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            identity: {
              ...previousIdentity,
              isLoading: false,
              error: message
            }
          }
        }
      }
      /** -------------------------- get badges -------------------------> **/
    case types.COMMON.SET_BADGES_IN_USER:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            badges: {
              ...previousBadgesUser,
              isLoading: true,
              error: null
            }
          }
        }
      }
    case types.SUCCESS.COMMON.SET_BADGES_IN_USER:
      const ArrayOfBadgeUserId = data.map((badge) => badge.id)
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            badges: {
              ...previousBadgesUser,
              content: ArrayOfBadgeUserId,
              isLoading: false
            }
          }
        }
      }
    case types.ERRORS.COMMON.SET_BADGES_IN_USER:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            badges: {
              ...previousBadgesUser,
              isLoading: false,
              error: message
            }
          }
        }
      }
      /** -------------------------- update user by user id -------------------------> **/
    case types.USER.UPDATE_USER_BY_USER_ID:
      return userSlices.updateUserByUserId.base(state, action)
    case types.SUCCESS.USER.UPDATE_USER_BY_USER_ID:
      return userSlices.updateUserByUserId.success(state, action)
    case types.ERRORS.USER.UPDATE_USER_BY_USER_ID:
      return userSlices.updateUserByUserId.error(state, action)
      /** -------------------------- update profile by profile id -------------------------> **/
    case types.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return userSlices.updateProfileByUserId.base(state, action)
    case types.SUCCESS.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return userSlices.updateProfileByUserId.success(state, action)
    case types.ERRORS.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return userSlices.updateProfileByUserId.error(state, action)
      /** -------------------------- get posts by identity  -------------------------> **/
    case types.COMMON.POST.GET_POST_BY_IDENTITY:
      return userSlices.getPostByIdentity.base(state, action)
    case types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY:
      return userSlices.getPostByIdentity.success(state, action)
    case types.ERRORS.COMMON.POST.GET_POST_BY_IDENTITY:
      return userSlices.getPostByIdentity.error(state, action)
      /** -------------------------- get post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.GET_POST:
      return userSlices.getPost.success(state, action)
      /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      return userSlices.createPost.success(state, action)
      /** -------------------------- delete post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      return userSlices.deletePost.success(state, action)
      /** -------------------------- get followers -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWERS:
      return userSlices.getFollowers.base(state, action)
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      return userSlices.getFollowers.success(state, action)
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWERS:
      return userSlices.getFollowers.error(state, action)
      /** -------------------------- get followees -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWEES:
      return userSlices.getFollowees.base(state, action)
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      return userSlices.getFollowees.success(state, action)
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWEES:
      return userSlices.getFollowees.error(state, action)
      /** -------------------------- delete follow -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW:
      return userSlices.deleteFollow.success(state, action)
      /** -------------------------- create follow  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.CREATE_FOLLOW:
      return userSlices.createFollow.success(state, action)
      /** -------------------------- get exchange membership by member identity  -------------------------> **/
    case types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return userSlices.getExchangeMembershipByMemberIdentity.base(state, action)
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return userSlices.getExchangeMembershipByMemberIdentity.success(state, action)
    case types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return userSlices.getExchangeMembershipByMemberIdentity.error(state, action)
      /** -------------------------- delete exchange membership  -------------------------> **/
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP:
      return userSlices.deleteExchangeMembership.success(state, action)
      /** -------------------------- get work experience by user id  -------------------------> **/
    case types.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID:
      return userSlices.getWorkExperienceByUserId.base(state, action)
    case types.SUCCESS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID:
      return userSlices.getWorkExperienceByUserId.success(state, action)
    case types.ERRORS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID:
      return userSlices.getWorkExperienceByUserId.error(state, action)
      /** -------------------------- create work experience by user id -------------------------> **/
    case types.SUCCESS.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return userSlices.createWorkExperienceByUserId.success(state, action)
      /** -------------------------- delete work experience by user id -------------------------> **/
    case types.SUCCESS.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID:
      return userSlices.deleteWorkExperienceByUserId.success(state, action)
      /** -------------------------- get education by user id  -------------------------> **/
    case types.EDUCATION.GET_USER_EDUCATION_BY_USER_ID:
      return userSlices.getEducationByUserId.base(state, action)
    case types.SUCCESS.EDUCATION.GET_USER_EDUCATION_BY_USER_ID:
      return userSlices.getEducationByUserId.success(state, action)
    case types.ERRORS.EDUCATION.GET_USER_EDUCATION_BY_USER_ID:
      return userSlices.getEducationByUserId.error(state, action)
      /** -------------------------- create education by user id -------------------------> **/
    case types.SUCCESS.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID:
      return userSlices.createEducationByUserId.success(state, action)
      /** -------------------------- delete education by user id -------------------------> **/
    case types.SUCCESS.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID:
      return userSlices.deleteEducationByUserId.success(state, action)
      /** -------------------------- get research by user id  -------------------------> **/
    case types.RESEARCH.GET_USER_RESEARCH_BY_USER_ID:
      return userSlices.getResearchByUserId.base(state, action)
    case types.SUCCESS.RESEARCH.GET_USER_RESEARCH_BY_USER_ID:
      return userSlices.getResearchByUserId.success(state, action)
    case types.ERRORS.RESEARCH.GET_USER_RESEARCH_BY_USER_ID:
      return userSlices.getResearchByUserId.error(state, action)
      /** -------------------------- create research by user id -------------------------> **/
    case types.SUCCESS.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID:
      return userSlices.createResearchByUserId.success(state, action)
      /** -------------------------- delete research by user id -------------------------> **/
    case types.SUCCESS.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID:
      return userSlices.deleteResearchByUserId.success(state, action)
      /** -------------------------- get skill by user id  -------------------------> **/
    case types.SKILL.GET_SKILL_BY_USER_ID:
      return userSlices.getSkillByUserId.base(state, action)
    case types.SUCCESS.SKILL.GET_SKILL_BY_USER_ID:
      return userSlices.getSkillByUserId.success(state, action)
    case types.ERRORS.SKILL.GET_SKILL_BY_USER_ID:
      return userSlices.getSkillByUserId.error(state, action)
      /** -------------------------- create skill -------------------------> **/
    case types.SUCCESS.SKILL.CREATE_SKILL:
      return userSlices.createSkill.success(state, action)
      /** -------------------------- delete skill by user id -------------------------> **/
    case types.SUCCESS.SKILL.DELETE_SKILL_BY_USER_ID:
      return userSlices.deleteSkillByUserId.success(state, action)
      /** -------------------------- get products by identity  -------------------------> **/
    case types.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY:
      return userSlices.getProductsByIdentity.base(state, action)
    case types.SUCCESS.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY:
      return userSlices.getProductsByIdentity.success(state, action)
    case types.ERRORS.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY:
      return userSlices.getProductsByIdentity.error(state, action)
      /** -------------------------- delete product  -------------------------> **/
    case types.SUCCESS.COMMON.PRODUCT.DELETE_PRODUCT:
      return userSlices.deleteProduct.success(state, action)
      /** -------------------------- reset users -------------------------> **/
      /** <----------------- add skill id to user ---------------**/
    case types.USER.ADD_SKILL_ID_TO_USER:
      return setRelatedObjIdForListItem.success(state, action, "skills")
      /** -------------- get Certificate -------------> **/
    case types.SUCCESS.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY:
      return userSlices.getCertificatesByIdentity.success(state, action)
      /** -------------------------- delete Certificate -------------------------> **/
    case types.SUCCESS.COMMON.CERTIFICATE.DELETE_CERTIFICATE:
      return userSlices.deleteCertificate.success(state, action)
      /** -------------------------- create Certificate  -------------------------> **/
    case types.SUCCESS.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE:
      return userSlices.createCertificate.success(state, action)
      /** -------------------------- sign in  -------------------------> **/
      // case types.SUCCESS.AUTH.SIGN_IN:
      //   return userSlices.signIn.success(state, action)

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
            ...previousOrgan,
            isLoading: true,
            error: null
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
            ...previousOrgan,
            content: data,
            isLoading: false
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
            ...previousOrgan,
            isLoading: false,
            error: message
          }
        }
      }

    case types.SUCCESS.ORG.SET_ORGANIZATION_INFO_MEDIA:
      return organSlices.setOrganMedia.success(state, action)

      /** -------------------------- update organization info-------------------------> **/
    case types.SUCCESS.ORG.UPDATE_ORGANIZATION_INFO:
      return {
        ...state,
        list: {
          ...state.list,
          [data.id]: {
            ...state.list[data.id],
            ...data,
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
            ...previousOrgan,
            isLoading: false,
            error: message
          }
        }
      }
      /** -------------------------- badge -------------------------> **/
    case types.COMMON.SET_BADGES_IN_ORG:
      return {
        ...state,
        list: {
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            badges: {
              ...previousBadgesOrgan,
              isLoading: true,
              error: null
            }
          }
        }
      }
    case types.SUCCESS.COMMON.SET_BADGES_IN_ORG:
      const ArrayOfBadgeOrganId = data.map((badge) => badge.id)
      return {
        ...state,
        list: {
          ...state.list,
          [organizationId]: {
            ...state.list[organizationId],
            badges: {
              ...previousBadgesOrgan,
              content: ArrayOfBadgeOrganId,
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
              ...previousBadgesOrgan,
              isLoading: false,
              error: message
            }
          }
        }
      }
    case types.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
      return organSlices.getCustomersByOrganizationId.base(state, action)
    case types.SUCCESS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
      return organSlices.getCustomersByOrganizationId.success(state, action)
    case types.ERRORS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
      return organSlices.getCustomersByOrganizationId.error(state, action)
      /** -------------------------- delete customer  -------------------------> **/
    case types.SUCCESS.ORG.DELETE_CUSTOMER:
      return organSlices.deleteCustomer.success(state, action)
      /** -------------------------- create customer -------------------------> **/
    case types.SUCCESS.ORG.CREATE_CUSTOMER:
      return organSlices.createCustomer.success(state, action)
      /** -------------------------- get organization customers -------------------------> **/
    case types.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID:
      return organSlices.getAbilitiesByOrganizationId.base(state, action)
    case types.SUCCESS.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID:
      return organSlices.getAbilitiesByOrganizationId.success(state, action)
    case types.ERRORS.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID:
      return organSlices.getAbilitiesByOrganizationId.error(state, action)
      /** -------------------------- delete customer  -------------------------> **/
    case types.SUCCESS.ABILITY.DELETE_ABILITY:
      return organSlices.deleteAbility.success(state, action)
      /** -------------------------- create customer -------------------------> **/
    case types.SUCCESS.ABILITY.CREATE_ABILITY:
      return organSlices.createAbility.success(state, action)
      /** -------------- reset -------------> **/

    case types.RESET:
      return initialState.identities

    default:
      return state
  }

}

export default identities