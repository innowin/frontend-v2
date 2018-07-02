import initialState from './initialState';
import types from '../actions/actionTypes';

const auth = (state = initialState.auth, action) => {
	switch (action.type) {
		case types.SIGN_IN_SUCCESS:
			const {rememberMe ,data:{user,token, profile,identity}} = action.payload
			return {...state, client: {user ,profile,identity,rememberMe, isLoggedIn:true,token}}
		case types.SIGN_OUT_FINISHED:
			return {...state ,client:{user:{},profile:{},identity:{},rememberMe:null,isLoggedIn: false,token:null}}
		case types.SIGN_IN_ERROR:
			return {...state, client: {}}
		default:
			return state
	}
}

export default auth;