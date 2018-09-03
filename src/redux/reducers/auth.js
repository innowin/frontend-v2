import initialState from './initialState'
import types from '../actions/types'

const auth = (state = initialState.auth, action) => {
  const {data, postId, postIdentity, followIdentity, message} = action.payload || {}
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
      const user_type = profile.is_user_organization ? 'org' : 'person'
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
          social:{
            follows:[]
          },
          isLoggedIn: true,
          error: null,
        }
      }
    case types.ERRORS.AUTH.SIGN_IN:
      const {message:errorMessage} = action.payload
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
      const arrayOfPostId = []
      data.map(post => {
        if(postIdentity === state.client.identity.id && (!previousPost.includes(post.id))) {
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
    /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      return {
        ...state,
        client: {
          ...client,
          posts: [...previousPost, data.id]
        }
      }
    /** -------------------------- delete post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      const newDeletedPosts = previousPost.filter(id => id !== postId);
      return {
        ...state,
        client: {
          ...client,
          posts: [...newDeletedPosts]
        }
      }
    /** -------------------------- get followers  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      const arrayOfFollowersId = []
      data.map(follower => {
        if(followIdentity === state.client.identity.id && (!previousFollows.includes(follower.id))) {
          return arrayOfFollowersId.push(follower.id)
        }
        return arrayOfFollowersId
      })
      return {
        ...state,
        client: {
          ...client,
          social:{
            ...client.social,
            follows: [...previousFollows, ...arrayOfFollowersId]
          }
        }
      }
    /** -------------------------- get followees  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      const arrayOfFolloweesId = []
      data.map(follower => {
        if(followIdentity === state.client.identity.id && (!previousFollows.includes(follower.id))) {
          return arrayOfFolloweesId.push(follower.id)
        }
        return arrayOfFolloweesId
      })
      return {
        ...state,
        client: {
          ...client,
          social:{
            ...client.social,
            follows: [...previousFollows, ...arrayOfFolloweesId]
          }
        }
      }
    /** -------------------------- reset auth  -------------------------> **/
    case types.RESET:
      return initialState.auth
    default:
      return state
  }
}

export default auth