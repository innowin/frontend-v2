import initialState from './initialState'
import types from '../actions/types'

const auth = (state = initialState.auth, action) => {
  const {client} = state
  const {exchange_identities} = client
  switch (action.type) {
    case types.IS_LOADING.AUTH.SIGN_IN:
      const {isLoading} = action.payload
      return {
        ...state,
        client: {
          ...client,
          signInIsLoading: isLoading
        }
      }
    case types.AUTH.SET_TOKEN:
      return {
        ...state,
        client: {
          ...client,
          token: action.payload.token
        }
      }
    case types.SUCCESS.AUTH.SIGN_IN:
      const {rememberMe, data: {user, profile, identity, organization}} = action.payload
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
          signInIsLoading: false,
          isLoggedIn: true
        }
      }
    case types.AUTH.SIGN_OUT_FINISHED:
      return {
        ...state,
        client: {
          user: {},
          profile: {},
          identity: {},
          organization: null,
          rememberMe: null,
          signInIsLoading: false,
          isLoggedIn: false,
          token: null
        }
      }
    case types.ERRORS.AUTH.SIGN_IN:
      return {...state, client: {}}
    case types.IS_LOADING.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
      return {
        ...state,
        client: {
          ...client,
          exchange_identities: {
            ...exchange_identities,
            isLoading: true
          }
        }
      }
    case types.SUCCESS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
      const {data} = action.payload
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
            exchange_identities,
            isLoading: false,
            error: {
              isError: true,
              messages: message
            }
          }
        }
      }
    default:
      return state
  }
}

export default auth