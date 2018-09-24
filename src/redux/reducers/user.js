import initialState from "./initialState"
import types from "../actions/types/index"

import slices from './sliceReducers/user'
import setRelatedObjIdForListItem from "./sliceReducers/utilsSlices/setRelatedObjIdForListItem";

const users = (state = initialState.users, action) => {
  const {userId, data, message} = action.payload || {}
  const defaultObject = {content: {}, isLoading: false, error: null}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousUser = (state.list[userId] && state.list[userId].user) || defaultObject
  const previousProfile = (state.list[userId] && state.list[userId].profile) || defaultObject
  const previousIdentity = (state.list[userId] && state.list[userId].identity) || defaultObject
  const previousBadges = (state.list[userId] && state.list[userId].badges) || defaultObject2

  switch (action.type) {
    /** -------------------------- get user -------------------------> **/
    case types.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            user: {
              ...previousUser,
              isLoading: true,
              error: null
            }
          }
        }
      }
    case types.SUCCESS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            user: {
              ...previousUser,
              content: {...data},
              isLoading: false,
            }
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
            user: {
              ...previousUser,
              isLoading: false,
              error: message
            }
          }
        }
      }
    case types.SUCCESS.USER.GET_USERS:
      return {
        ...state,
        list: data,
        isLoading: false,
        error: null
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
              content: {...data},
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
    case types.SUCCESS.USER.GET_USER_IDENTITY:
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            identity: {
              ...previousIdentity,
              content: {...data},
              isLoading: false
            }
          }
        }
      }
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
              ...previousBadges,
              isLoading: true,
              error: null
            }
          }
        }
      }
    case types.SUCCESS.COMMON.SET_BADGES_IN_USER:
      const ArrayOfBadgeId = data.map((badge) => badge.id)
      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            badges: {
              ...previousBadges,
              content: ArrayOfBadgeId,
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
              ...previousBadges,
              isLoading: false,
              error: message
            }
          }
        }
      }
    /** -------------------------- update user by user id -------------------------> **/
    case types.USER.UPDATE_USER_BY_USER_ID:
      return slices.updateUserByUserId.base(state, action)
    case types.SUCCESS.USER.UPDATE_USER_BY_USER_ID:
      return slices.updateUserByUserId.success(state, action)
    case types.ERRORS.USER.UPDATE_USER_BY_USER_ID:
      return slices.updateUserByUserId.error(state, action)
    /** -------------------------- update profile by profile id -------------------------> **/
    case types.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return slices.updateProfileByUserId.base(state, action)
    case types.SUCCESS.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return slices.updateProfileByUserId.success(state, action)
    case types.ERRORS.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return slices.updateProfileByUserId.error(state, action)
    /** -------------------------- get posts by identity  -------------------------> **/
    case types.COMMON.POST.GET_POST_BY_IDENTITY:
      return slices.getPostByIdentity.base(state, action)
    case types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY:
      return slices.getPostByIdentity.success(state, action)
    case types.ERRORS.COMMON.POST.GET_POST_BY_IDENTITY:
      return slices.getPostByIdentity.error(state, action)
    /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      return slices.createPost.success(state, action)
    /** -------------------------- delete post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      return slices.deletePost.success(state, action)
    /** -------------------------- get followers -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWERS:
      return slices.getFollowers.base(state, action)
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      return slices.getFollowers.success(state, action)
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWERS:
      return slices.getFollowers.error(state, action)
    /** -------------------------- get followees -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWEES:
      return slices.getFollowees.base(state, action)
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      return slices.getFollowees.success(state, action)
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWEES:
      return slices.getFollowees.error(state, action)
    /** -------------------------- delete follow -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW:
      return slices.deleteFollow.success(state, action)
    /** -------------------------- create follow  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.CREATE_FOLLOW:
      return slices.createFollow.success(state, action)
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
    /** -------------------------- get education by user id  -------------------------> **/
    case types.EDUCATION.GET_USER_EDUCATION_BY_USER_ID:
      return slices.getEducationByUserId.base(state, action)
    case types.SUCCESS.EDUCATION.GET_USER_EDUCATION_BY_USER_ID:
      return slices.getEducationByUserId.success(state, action)
    case types.ERRORS.EDUCATION.GET_USER_EDUCATION_BY_USER_ID:
      return slices.getEducationByUserId.error(state, action)
    /** -------------------------- create education by user id -------------------------> **/
    case types.SUCCESS.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID:
      return slices.createEducationByUserId.success(state, action)
    /** -------------------------- delete education by user id -------------------------> **/
    case types.SUCCESS.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID:
      return slices.deleteEducationByUserId.success(state, action)
    /** -------------------------- get research by user id  -------------------------> **/
    case types.RESEARCH.GET_USER_RESEARCH_BY_USER_ID:
      return slices.getResearchByUserId.base(state, action)
    case types.SUCCESS.RESEARCH.GET_USER_RESEARCH_BY_USER_ID:
      return slices.getResearchByUserId.success(state, action)
    case types.ERRORS.RESEARCH.GET_USER_RESEARCH_BY_USER_ID:
      return slices.getResearchByUserId.error(state, action)
    /** -------------------------- create research by user id -------------------------> **/
    case types.SUCCESS.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID:
      return slices.createResearchByUserId.success(state, action)
    /** -------------------------- delete research by user id -------------------------> **/
    case types.SUCCESS.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID:
      return slices.deleteResearchByUserId.success(state, action)
    /** -------------------------- get skill by user id  -------------------------> **/
    case types.SKILL.GET_SKILL_BY_USER_ID:
      return slices.getSkillByUserId.base(state, action)
    case types.SUCCESS.SKILL.GET_SKILL_BY_USER_ID:
      return slices.getSkillByUserId.success(state, action)
    case types.ERRORS.SKILL.GET_SKILL_BY_USER_ID:
      return slices.getSkillByUserId.error(state, action)
    /** -------------------------- delete skill by user id -------------------------> **/
    case types.SUCCESS.SKILL.DELETE_SKILL_BY_USER_ID:
      return slices.deleteSkillByUserId.success(state, action)
    /** -------------------------- reset users -------------------------> **/
    /** <----------------- add skill id to user ---------------**/
    case types.USER.ADD_SKILL_ID_TO_USER:
      return setRelatedObjIdForListItem.success(state, action, 'skills')
      /** ------------------ add skill id to user -------------->**/
    case types.RESET:
      return initialState.users
    default:
      return state
  }
}

export default users