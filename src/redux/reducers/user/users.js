import initialState from "../initialState"
import types from "../../actions/types/index"

const users = (state = initialState.users, action) => {
  const {userId, data, message, postIdentity} = action.payload || {}
  const defaultObject = { content: {}, isLoading: false, error: null }
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousUser = (state[userId] && state[userId].user) || defaultObject
  const previousProfile = (state[userId] && state[userId].profile) || defaultObject
  const previousIdentity = (state[userId] && state[userId].identity) || defaultObject
  const previousBadges = (state[userId] && state[userId].badges) || defaultObject2
  const getPreviousUserPost = userId => (state[userId] && state[userId].posts) || defaultObject2

  const getUserId = (postIdentity) => {
    let userSelectId
    for(let key in state){
      if(postIdentity === state[key].identity.content.id){
        userSelectId = key
        break
      }
    }
    return userSelectId
  }

  let userSelectId

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
    case types.USER.GET_IDENTITY_BY_USER_ID:
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
    case types.SUCCESS.USER.GET_IDENTITY_BY_USER_ID:
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
    case types.ERRORS.USER.GET_IDENTITY_BY_USER_ID:
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
            isLoading: false
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
    case types.COMMON.GET_POST_BY_IDENTITY:
      userSelectId = getUserId(postIdentity)
      return {
        ...state,
        [userSelectId]: {
          ...state[userSelectId],
          posts: {
            ...getPreviousUserPost(userSelectId),
            isLoading: true,
            error: null
          }
        }
      }
    case types.SUCCESS.COMMON.GET_POST_BY_IDENTITY:
      const postId = []
      userSelectId = getUserId(postIdentity)
      data.map(post => {
        postId.push(post.id)
        return postId
      })
      return {
        ...state,
        [userSelectId]: {
          ...state[userSelectId],
          posts: {
            ...getPreviousUserPost(userSelectId),
            content: [...postId],
            isLoading: false,
            error: null
          }
        }
      }
    case types.ERRORS.COMMON.GET_POST_BY_IDENTITY:
      userSelectId = getUserId(postIdentity)
      return {
        ...state,
        [userSelectId]: {
          ...state[userSelectId],
          posts: {
            ...getPreviousUserPost(userSelectId),
            isLoading: false,
            error: message
          }
        }
      }
    /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.CREATE_POST:
      userSelectId = getUserId(data.post_identity)
      return {
        ...state,
        [userSelectId]: {
          ...state[userSelectId],
          posts: {
            content: [...getPreviousUserPost(userSelectId).content, data.id],
            isLoading: false,
            error: null
          }
        }
      }
    /** -------------------------- reset users -------------------------> **/
    case types.RESET:
      return initialState.users
    default:
      return state
  }
}

export default users