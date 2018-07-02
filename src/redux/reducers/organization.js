import initialState from './initialState';
import types from '../actions/actionTypes';

const organization = (state = initialState.organization, action) => {
	switch (action.type) {
		case types.GET_ORGANIZATION_SUCCESS:
			const {organId} = action.payload
			return {...state};
		case types.SIGN_IN_ERROR:
			return {...state, client: {}};
		default:
			return state;
	}
}

export default auth;