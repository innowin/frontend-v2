import initialState from "../initialState"
import types from "../../actions/types/index"
import constants from 'src/consts/constants'

const users = (state = initialState.users, action) => {
  const {userId, postOwnerId, postOwnerType, followOwnerId, followOwnerType, data, message, postId, followId} = action.payload || {}
  const defaultObject = { content: {}, isLoading: false, error: null }
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousUser = (state[userId] && state[userId].user) || defaultObject
  const previousProfile = (state[userId] && state[userId].profile) || defaultObject
  const previousIdentity = (state[userId] && state[userId].identity) || defaultObject
  const previousBadges = (state[userId] && state[userId].badges) || defaultObject2
  const previousPost = (state[postOwnerId] && state[postOwnerId].posts) || defaultObject2
  const previousSocial = (state[followOwnerId] && state[followOwnerId].social) || {follows: {}}
  const previousFollows = (state[followOwnerId] && state[followOwnerId].social && state[followOwnerId].social.follows) || defaultObject2

  switch (action.type) {
    /** -------------------------- get user -------------------------> **/
    case types.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            isLoading: true,
            error: null
          }
        }
      }
    case types.SUCCESS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            content: {...data},
            isLoading: false,
          }
        }
      }
    case types.ERRORS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            isLoading: false,
            error: message
          }
        }
      }
    case types.SUCCESS.USER.GET_USERS:
      return{
        ...state,
          list:data,
          isLoading: false,
          error:null
      }
    /** -------------------------- get profile -------------------------> **/
    case types.USER.GET_PROFILE_BY_USER_ID:
      // initial structure build in first request for getProfile is called but profile isLoading is true:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...previousProfile,
            isLoading: true,
            error: null
          }
        }
      }
    case types.SUCCESS.USER.GET_PROFILE_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...previousProfile,
            content: {...data},
            isLoading: false
          }
        }
      }
    case types.ERRORS.USER.GET_PROFILE_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...previousProfile,
            error: message,
            isLoading: false
          }
        }
      }
    /** -------------------------- get identity -------------------------> **/
    case types.USER.GET_USER_IDENTITY:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          identity: {
            ...previousIdentity,
            isLoading: true,
            error: null
          }
        }
      }
    case types.SUCCESS.USER.GET_USER_IDENTITY:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          identity: {
            ...previousIdentity,
            content: {...data},
            isLoading: false
          }
        }
      }
    case types.ERRORS.USER.GET_USER_IDENTITY:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          identity: {
            ...previousIdentity,
            isLoading: false,
            error: message
          }
        }
      }
    /** -------------------------- get badges -------------------------> **/
    case types.COMMON.SET_BADGES_IN_USER:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          badges: {
            ...previousBadges,
            isLoading: true,
            error: null
          }
        }
      }
    case types.SUCCESS.COMMON.SET_BADGES_IN_USER:
      const ArrayOfBadgeId = data.map((badge) => badge.id)
      return {
        ...state,
        [userId]: {
          ...state[userId],
          badges: {
            ...previousBadges,
            content: ArrayOfBadgeId,
            isLoading: false
          }
        }
      }
    case types.ERRORS.COMMON.SET_BADGES_IN_USER:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          badges: {
            ...previousBadges,
            isLoading: false,
            error: message
          }
        }
      }
    /** -------------------------- update user by user id -------------------------> **/
    case types.USER.UPDATE_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            isLoading: true
          }
        }
      }
    case types.SUCCESS.USER.UPDATE_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            content: {...data},
            isLoading: false,
            error: null
          }
        }
      }
    case types.ERRORS.USER.UPDATE_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            isLoading: false,
            error: message
          }
        }
      }
    /** -------------------------- update profile by profile id -------------------------> **/
    case types.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...previousProfile,
            isLoading: true
          }
        }
      }
    case types.SUCCESS.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            content: {...data},
            isLoading: false,
            error: null
          }
        }
      }
    case types.ERRORS.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...previousProfile,
            isLoading: false,
            error: message
          }
        }
      }
    /** -------------------------- get posts by identity  -------------------------> **/
    case types.COMMON.POST.GET_POST_BY_IDENTITY:
      if(postOwnerType === constants.USER_TYPES.PERSON){
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              isLoading: true,
              error: null
            }
          }
        }
      }
      else{
        return {...state}
      }

    case types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        const arrayOfPostId = data.map(post => post.id)
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              content: [...new Set([...previousPost.content, ...arrayOfPostId])],
              isLoading: false,
              error: null
            }
          }
        }
      }
      else{
        return {...state}
      }
      //TODO: mohammad check userId is not undefined and find current userId
    case types.ERRORS.COMMON.POST.GET_POST_BY_IDENTITY:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              isLoading: false,
              error: message
            }
          }
        }
      }
      else{
        return {...state}
      }
    /** -------------------------- create post  -------------------------> **/
    case types.COMMON.POST.CREATE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              isLoading: true,
              error: null
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              content: [...previousPost.content, data.id],
              isLoading: false,
              error: null
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.ERRORS.COMMON.POST.CREATE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              isLoading: false,
              error: message
            }
          }
        }
      }
      else{
        return {...state}
      }
      /** -------------------------- update post  -------------------------> **/
    case types.COMMON.POST.UPDATE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              isLoading: true,
              error: null
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.ERRORS.COMMON.POST.UPDATE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              isLoading: false,
              error: message
            }
          }
        }
      }
      else{
        return {...state}
      }
    /** -------------------------- delete post  -------------------------> **/
    case types.COMMON.POST.DELETE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              isLoading: false,
              error: null
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        const newDeletedPosts = previousPost.content.filter(id => id !== postId);
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              content: [...newDeletedPosts],
              isLoading: false,
              error: null
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.ERRORS.COMMON.POST.DELETE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [postOwnerId]: {
            ...state[postOwnerId],
            posts: {
              ...previousPost,
              isLoading: false,
              error: message
            }
          }
        }
      }
      else{
        return {...state}
      }
    /** -------------------------- get followers -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWERS:
      if (followOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                isLoading: true,
                error: null
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      if (followOwnerType === constants.USER_TYPES.PERSON) {
        const arrayOfFollowersId = data.map(follow => follow.id)
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                content: [...new Set([...previousFollows.content, ...arrayOfFollowersId])],
                isLoading: false,
                error: null
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWERS:
      if (followOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                isLoading: false,
                error: message
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    /** -------------------------- get followees -------------------------> **/
    case types.COMMON.SOCIAL.GET_FOLLOWEES:
      if (followOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                isLoading: true,
                error: null
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      if (followOwnerType === constants.USER_TYPES.PERSON) {
        const arrayOfFolloweesId = data.map(follow => follow.id)
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                content: [...new Set([...previousFollows.content, ...arrayOfFolloweesId])],
                isLoading: false,
                error: null
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.ERRORS.COMMON.SOCIAL.GET_FOLLOWEES:
      if (followOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                isLoading: false,
                error: message
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    /** -------------------------- delete follow -------------------------> **/
    case types.COMMON.SOCIAL.DELETE_FOLLOW:
      if(followOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                isLoading: true,
                error: null
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW:
      if(followOwnerType === constants.USER_TYPES.PERSON) {
        const newDeletedFollowers = previousFollows.content.filter(id => id !== followId);
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                content: [...newDeletedFollowers],
                isLoading: false,
                error: null
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    case types.ERRORS.COMMON.SOCIAL.DELETE_FOLLOW:
      if(followOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          [followOwnerId]: {
            ...state[followOwnerId],
            social: {
              ...previousSocial,
              follows: {
                ...previousFollows,
                isLoading: false,
                error: message
              }
            }
          }
        }
      }
      else{
        return {...state}
      }
    /** -------------------------- reset users -------------------------> **/
    case types.RESET:
      return initialState.users
    default:
      return state
  }
}

export default users