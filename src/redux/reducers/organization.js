import initialState from './initialState';
import types from '../actions/actionTypes';

const organization = (state = initialState.organization, action) => {
	switch (action.type) {
		case types.SUCCESS.GET_ORG_EXCHANGES:
			const exchanges = action.payload;
			return{...state,exchanges:{list:exchanges,isLoading:false}}

		case types.SUCCESS.GET_ORG_FOLLOWINGS:
			const followings = action.payload;
			return{...state,followings:{list:followings,isLoading:false}}

		case types.SUCCESS.GET_ORG_FOLLOWERS:
			const followers = action.payload;
			return{...state,followers:{list:followers,isLoading:false}}	

		case types.SUCCESS.GET_USER_IDENTITY:
			const identity = action.payload[0];
			return{...state,identity:identity}
						
		case types.SUCCESS.GET_PRODUCTS:
			const products = action.payload;
			return{...state,products:products}

		case types.SUCCESS.GET_ORGANIZATION:
			const organization = action.payload
			return {...state,...organization};

		case types.SUCCESS.GET_ORGANIZATION_MEMBERS:
			const members = action.payload
			return {...state,...members};		

		case types.ERRORS.GET_ORGANIZATION:
			return {...state, client: {}};
			
		case types.ERRORS.GET_ORGANIZATION_MEMBERS:
			return {...state, members: []};
		default:
			return state;
	}
}

export default organization;