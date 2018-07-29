import initialState from './initialState'
import types from '../actions/types'

const auth = (state = initialState.auth, action) => {
	switch (action.type) {
		case types.IS_LOADING.AUTH.SIGN_IN:
		  const {isLoading} = action.payload
      return {
        ...state,
        client:{
          user: {},
          profile: {},
          identity: {},
          organization: null,
          rememberMe: null,
          signInIsLoading:isLoading,
          isLoggedIn: false,
          token:null,
        }
      }
    case types.AUTH.SET_TOKEN:
      return {
        ...state,
        client:{
          user: {},
          profile: {},
          identity: {},
          organization: null,
          rememberMe: null,
					signInIsLoading:true,
          isLoggedIn: false,
          token:action.payload.token,
        }
      }
		case types.SUCCESS.AUTH.SIGN_IN:
			const {rememberMe, data: {token, user, profile, identity, organization}} = action.payload
			const user_type = profile.is_user_organization ? 'org' : 'person'
			return {
				...state,
				client: {
					user,
					profile,
					identity,
					organization,
					user_type,
					rememberMe,
					signInIsLoading:false,
					isLoggedIn: true,
          token
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
					signInIsLoading:false,
					isLoggedIn: false,
					token: null
				}
			}
		case types.ERRORS.AUTH.SIGN_IN:
			return {...state, client: {}}
		default:
			return state
	}
}

export default auth