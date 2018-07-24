import initialState from './initialState'
import types from '../actions/types'

const auth = (state = initialState.auth, action) => {
	switch (action.type) {
		case types.SUCCESS.AUTH.SIGN_IN:
			const {rememberMe, data: {user, token, profile, identity, organization}} = action.payload
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