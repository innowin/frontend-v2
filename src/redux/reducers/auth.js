import initialState from './initialState'
import types from '../actions/actionTypes'

const auth = (state = initialState.auth, action) => {
	switch (action.type) {
		case types.SIGN_IN_SUCCESS:
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
		case types.SIGN_OUT_FINISHED:
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
		case types.SIGN_IN_ERROR:
			return {...state, client: {}}
		default:
			return state
	}
}

export default auth;