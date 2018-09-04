import initialState from './initialState'
import types from '../actions/types'
import constants from 'src/consts/constants'

const auth = (state = initialState.auth, action) => {
  const {data, postId, postIdentity, postOwnerType, followIdentity, message, followOwnerType} = action.payload || {}
  const {user, profile, identity} = data || {}
  const {client} = state
  const previousPost = (client && client.posts) || []
  const previousFollows = (client && client.social && client.social.follows) || []
  switch (action.type) {
    /** -------------------------- sign in -------------------------> **/
    case types.AUTH.SET_TOKEN:
      return {
        ...state,
        client: {
          ...client,
          token: action.payload.token
        }
      }
    case types.SUCCESS.AUTH.SIGN_IN:
      const {rememberMe} = action.payload
      const {organization} = data
      const user_type = profile.is_user_organization ? constants.USER_TYPES.ORG : constants.USER_TYPES.PERSON
      return {
        ...state,
        client: {
          ...client,
          user,
          profile,
          identity,
          organization,
          user_type,
          rememberMe,
          posts: [],
          social: {
            follows: []
          },
          isLoggedIn: true,
          error: null,
        }
      }
    case types.ERRORS.AUTH.SIGN_IN:
      const {message: errorMessage} = action.payload
      return {
        ...state,
        client: {
          ...client,
          error: errorMessage
        }
      }

      /** -------------------------- get client exchanges -------------------------> **/
    case types.SUCCESS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
      const ArrayOfExchangeId = Object.keys(data).map(id => +id)
      return {
        ...state,
        client: {
          ...client,
          exchanges: ArrayOfExchangeId
        }
      }
      /** -------------------------- update user by user id -------------------------> **/
    case types.SUCCESS.USER.UPDATE_USER_BY_USER_ID:
      return {
        ...state,
        client: {
          ...client,
          user: {...data}
        }
      }
      /** -------------------------- verify token -------------------------> **/
    case types.SUCCESS.AUTH.VERIFY_TOKEN:
      return {
        ...state,
        client: {
          ...client,
          user,
          profile,
          identity,
        }
      }
    case types.ERRORS.AUTH.VERIFY_TOKEN:
      return {
        ...state,
        client: {
          ...client,
          error: {
            message
          }
        }
      }
      /** -------------------------- update profile by profile id -------------------------> **/
    case types.SUCCESS.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return {
        ...state,
        client: {
          ...client,
          profile: {...data}
        }
      }
      /** -------------------------- get posts by identity  -------------------------> **/
    case types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        const arrayOfPostId = []
        data.map(post => {
          if (postIdentity === state.client.identity.id && (!previousPost.includes(post.id))) {
            return arrayOfPostId.push(post.id)
          }
          return arrayOfPostId
        })
        return {
          ...state,
          client: {
            ...client,
            posts: [...previousPost, ...arrayOfPostId]
          }
        }
      }
      else{
        return {...state}
      }
      /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        return {
          ...state,
          client: {
            ...client,
            posts: [...previousPost, data.id]
          }
        }
      }
      else{
        return {...state}
      }
      /** -------------------------- delete post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      if(postOwnerType === constants.USER_TYPES.PERSON) {
        const newDeletedPosts = previousPost.filter(id => id !== postId);
        return {
          ...state,
          client: {
            ...client,
            posts: [...newDeletedPosts]
          }
        }
      }
      else{
        return {...state}
      }
      /** -------------------------- get followers  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      if (followOwnerType === constants.USER_TYPES.PERSON){
        const arrayOfFollowersId = []
          data.map(follower => {
            if (followIdentity === state.client.identity.id && (!previousFollows.includes(follower.id))) {
              return arrayOfFollowersId.push(follower.id)
            }
            return arrayOfFollowersId
          })
          return {
            ...state,
            client: {
              ...client,
              social: {
                ...client.social,
                follows: [...previousFollows, ...arrayOfFollowersId]
              }
            }
          }
      }
      else{
        return {...state,}
      }
    /** -------------------------- get followees  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      if (followOwnerType === constants.USER_TYPES.PERSON) {
        const arrayOfFolloweesId = []
        data.map(follower => {
          if (followIdentity === state.client.identity.id && (!previousFollows.includes(follower.id))) {
            return arrayOfFolloweesId.push(follower.id)
          }
          return arrayOfFolloweesId
        })
        return {
          ...state,
          client: {
            ...client,
            social: {
              ...client.social,
              follows: [...previousFollows, ...arrayOfFolloweesId]
            }
          }
        }
      }
      else{
        return {...state,}
      }
    /** -------------------------- reset auth  -------------------------> **/
    case types.RESET:
      return initialState.auth
    default:
      return state
  }
}

export default auth