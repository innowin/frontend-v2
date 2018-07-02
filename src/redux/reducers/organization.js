import initialState from './initialState';
import types from '../actions/actionTypes';

const organization = (state = initialState.organization, action) => {
	switch (action.type) {
		case types.SUCCESS.GET_ORGANIZATION:
			const {organizationId} = action.payload
			return {...state,};
		case types.ERRORS.SIGN_IN:
			return {...state, client: {}};
		default:
			return state;
	}
}

export default organization;