import initialState from './initialState';
import types from '../actions/actionTypes';

const auth = (state = initialState.auth, action) => {
	switch (action.type) {
		case types.SIGN_IN_SUCCESS:
			const {rememberMe ,data:{user, profile,identity}} = action.payload
			return {...state, client: {user ,profile,identity,rememberMe}}
		case types.SIGN_IN_ERROR:
			
			return {...state, client: {}}
		default:
			return state
	}
}

export default auth;