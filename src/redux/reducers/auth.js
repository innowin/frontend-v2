import initialState from './initialState'
import types from '../actions/types'

const auth = (state = initialState.auth, action) => {
  const {data} = action.payload || {}
  const {user, profile, identity, posts} = data || {}
  const {client} = state
  const {exchange_identities} = client
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
          posts,
          isLoggedIn: true
        }
      }
    case types.ERRORS.AUTH.SIGN_IN:
      const {message:errorMessage} = action.payload
      return {
        ...state,
        client: {
          ...client,
          error: {
            isError: true,
            message: errorMessage
          }
        }
      }

    /** -------------------------- get client exchanges -------------------------> **/
    case types.SUCCESS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
      return {
        ...state,
        client: {
          ...client,
          exchange_identities: {
            ...exchange_identities,
            content: data,
            isLoaded: true,
            isLoading: false
          }
        }
      }
    case types.ERRORS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
      const {message} = action.payload
      return {
        ...state,
        client: {
          ...client,
          exchange_identities: {
            ...exchange_identities,
            isLoading: false,
            error: {
              isError: true,
              messages: message
            }
          }
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
    case types.SUCCESS.COMMON.GET_POST_BY_IDENTITY:
      const {postIdentity} = action.payload || {}
      const postId = []
      data.map(post => {
        if(postIdentity === state.client.identity.id) {
          return postId.push(post.id)
        }
        return postId
      })
      return {
        ...state,
        client: {
          ...client,
          posts: [...postId]
        }
      }
    /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.CREATE_POST:
      return {
        ...state,
        client: {
          ...client,
          posts: [...client.posts, data.id]
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