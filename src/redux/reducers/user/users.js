import initialState from "../initialState"
import types from "../../actions/types/index"

const users = (state = initialState.users, action) => {
  const {userId, data, message} = action.payload || {}
  const defaultObject = { content: {}, isLoading: false, error: {message: null} }
  const defaultObject2 = { content: [], isLoading: false, error: {message: null} }
  const previousUser = (state[userId] && state[userId].user) || defaultObject
  const previousProfile = (state[userId] && state[userId].profile) || defaultObject
  const previousIdentity = (state[userId] && state[userId].identity) || defaultObject
  const previousBadges = (state[userId] && state[userId].badges) || defaultObject2

  switch (action.type) {
    /** -------------------------- get user -------------------------> **/
    case types.USER.GET_USER_BY_USER_ID:
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
    case types.SUCCESS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            content: {...data},
            isLoading: false,
            error: {
              message:null
            }
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
            error: {
              message
            }
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
            isLoading: true
          }
        }
      }
    case types.SUCCESS.USER.GET_PROFILE_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            content: {...data},
            isLoading: false,
            error: {
              message:null
            }
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
            error: {
              message
            },
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
            isLoading: true
          }
        }
      }
    case types.SUCCESS.USER.GET_IDENTITY_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          identity: {
            content: {...data},
            isLoading: false,
            error: {
              message:null
            }
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
            error: {
              message
            }
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
            isLoading: true
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
            content: ArrayOfBadgeId,
            isLoading: false,
            error: {
              message:null
            }
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
            error: {
              message
            }
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
            error: {
              message
            }
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
            error: {
              message:null
            }
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
            error: {
              message
            }
          }
        }
      }
    /** -------------------------- get posts by identity  -------------------------> **/
    case types.SUCCESS.COMMON.GET_POST_BY_IDENTITY:
      const {postIdentity} = action.payload
      let userSelectId
      const postId = []
      for(let key in state){
        if(postIdentity === state[key].identity.content.id){
          userSelectId = key
          break
        }
      }
      data.map(post => {
        postId.push(post.id)
        return postId
      })
      const previousPosts = (state[userSelectId] && state[userSelectId].posts) || defaultObject
      return {
        ...state,
        [userSelectId]: {
          ...state[userSelectId],
          posts: {
            ...previousPosts,
            content: {
              ...postId,
            },
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