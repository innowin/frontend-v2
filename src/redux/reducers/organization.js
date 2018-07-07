import initialState from './initialState';
import types from '../actions/actionTypes';

const organization = (state = initialState.organization, action) => {
	let error;
	switch (action.type) {
		//pending
		case types.UPDATE_ORGANIZATION_INFO:
			return {...state,isLoading:true};

		case types.GET_ORG_EXCHANGES:
			return {...state,exchanges:{...exchanges,isLoading:true}};
		case types.GET_ORG_CUSTOMERS:
			return {...state,customers:{...customers,isLoading:true}}
		case types.GET_ORG_CERTIFICATES:
			return {...state,certificates:{...certificates,isLoading:true}}
		//SUCCESS
		case types.SUCCESS.GET_ORG_CERTIFICATES:
			let certificates = action.payload;
			return{...state,certificates:{content:certificates,isLoading:false,error:false}}		
		
		case types.SUCCESS.UPDATE_CUSTOMER:
			let customer = action.payload;
			let nowCustomers = state.customers.content;
			var index = nowCustomers.findIndex(function (cus) { return cus.id === customer.id; });
			nowCustomers[index] = customer
			return{...state,customers:{content:nowCustomers,isLoading:false,error:false}}	

		case types.SUCCESS.GET_ORG_CUSTOMERS:
			let customers = action.payload;
			return{...state,customers:{content:customers,isLoading:false,error:false}}		

		case types.SUCCESS.GET_ORG_EXCHANGES:
			let exchanges = action.payload;
			return{...state,exchanges:{content:exchanges,isLoading:false,error:false}}

		case types.SUCCESS.GET_ORG_FOLLOWINGS:
			let followings = action.payload;
			return{...state,followings:{content:followings,isLoading:false,error:false}}

		case types.SUCCESS.GET_ORG_FOLLOWERS:
			const followers = action.payload;
			return{...state,followers:{content:followers,isLoading:false,error:false}}	

		case types.SUCCESS.GET_USER_IDENTITY:
			const identity = action.payload[0];
			return{...state,identity:{content:identity,isLoading:false,error:false}}
						
		case types.SUCCESS.GET_PRODUCTS:
			const products = action.payload;
			return{...state,products:products}

		case types.SUCCESS.GET_ORGANIZATION:
			const organization = action.payload
			return {...state,...organization};

		case types.SUCCESS.GET_ORGANIZATION_MEMBERS:
			const members = action.payload
			return {...state,...members};		

		case types.SUCCESS.UPDATE_ORGANIZATION_INFO:
			const updatedOrganization = action.payload
			return{...state,...updatedOrganization,isLoading:false,error:false}
		//ERROR
		case types.ERRORS.UPDATE_ORGANIZATION_INFO:
			error = action.payload.error
			return{...state,errorMessage:error,isLoading:false,error:true}

		case types.ERRORS.GET_ORG_CERTIFICATES:
			error = action.payload.error
			return{...state,errorMessage:error,certificates:{content:[],isLoading:false,error:true}}

		case types.ERRORS.UPDATE_CUSTOMER:
			error = action.payload.error
			return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}

		case types.ERRORS.GET_ORGANIZATION:
			return {...state, client: {}};
			
		case types.ERRORS.GET_ORGANIZATION_MEMBERS:
			return {...state, members: []};
		default:
			return state;
	}
}

export default organization;