import initialState from './initialState';
import types from '../actions/types';

const organization = (state = initialState.organization, action) => {
	let error;
	switch (action.type) {
    /** -------------------------- get organization members-------------------------> **/
    case types.SUCCESS.ORG.GET_ORGANIZATION_MEMBERS:
      const members = action.payload
      return{...state,staff:{...staff, content:members,isLoading:false,error:false}}

    case types.ERRORS.ORG.GET_ORGANIZATION_MEMBERS:
      return {...state, members: []};

    /** -------------------------- get organization staff-------------------------> **/
    case types.SUCCESS.ORG.GET_STAFF:
      let {staff} = action.payload
      return{...state,staff:{...state.staff,content:staff,isLoading:false,error:false}}

		/** -------------------------- get organization customers-------------------------> **/
		// case types.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
		// 	return {...state,customers:{...state.customers,isLoading:true}}
		//
		// case types.SUCCESS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
		// 	let customers = action.payload;
		// 	return{...state,customers:{content:customers,isLoading:false,error:false}}
		//
		// case types.ERRORS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
		// 	error = action.payload.error
		// 	return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}
		//
		// /** -------------------------- create organization customers-------------------------> **/
		// case types.ORG.CREATE_CUSTOMER:
		// 	return {...state,customers:{...state.customers,isLoading:true}}
		//
		// case types.SUCCESS.ORG.CREATE_CUSTOMER:
		// 	let {customer} = action.payload
		// 	let currentCustomers = state.customers.content;
		// 	currentCustomers.push(customer)
		// 	return{...state,customers:{content:currentCustomers,isLoading:false,error:false}}
		//
		// case types.ERRORS.ORG.CREATE_CUSTOMER:
		// 	error = action.payload.error
		// 	return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}
		//
    // /** -------------------------- update organization customer-------------------------> **/
    // case types.SUCCESS.ORG.UPDATE_CUSTOMER:
    //   customer = action.payload;
    //   var nowCustomers = state.customers.content;
    //   var index = nowCustomers.findIndex(function (cus) { return cus.id === customer.id; });
    //   nowCustomers[index] = customer
    //   return{...state,customers:{content:nowCustomers,isLoading:false,error:false}}
		//
    // case types.ERRORS.ORG.UPDATE_CUSTOMER:
    //   error = action.payload.error
    //   return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}
		//
		// /** -------------------------- delete organization customers-------------------------> **/
		// case types.ORG.DELETE_CUSTOMER:
		// 	return {...state,customers:{...state.customers,isLoading:true}}
		//
		// case types.SUCCESS.ORG.DELETE_CUSTOMER:
		// 	let {customerId} = action.payload
		// 	currentCustomers = state.customers.content;
		// 	var index = currentCustomers.findIndex(
		// 		function (cus) {
		// 			 return cus.id === customerId;
		// 			}
		// 	);
		// 	currentCustomers.splice(index, 1);
		// 	return{...state,customers:{content:currentCustomers,isLoading:false,error:false}}
		//
		// case types.ERRORS.ORG.DELETE_CUSTOMER:
		//
		// 	error = action.payload.error
		// 	return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}

		/** -------------------------- get organization product-------------------------> **/

		// case types.SUCCESS.ORG.GET_PRODUCT_PICTURE:
		// 	const pictures = action.payload
		// 	currentProducts = state.products.content;
		// 	var index = currentProducts.findIndex(function (cus) { return cus.id === pictures[0].picture_product; });
		// 	currentProducts[index].pictures = pictures
		// 	return {...state,products:{...state.products, content:currentProducts,isLoading:false,error:false}}
    //
    // case types.ERRORS.ORG.GET_PRODUCT_PICTURE:
     //  error = action.payload.error
     //  return{...state,errorMessage:error,products:{content:[],isLoading:false,error:true}}
		//
		// case types.SUCCESS.ORG.GET_PRODUCT_PRICE:
		// 	const price = action.payload
		// 	currentProducts = state.products.content;
		// 	var index = currentProducts.findIndex(function (cus) { return cus.id === price[0].price_product; });
		// 	currentProducts[index].price = price[0]
		// 	return {...state,products:{...state.products, content:currentProducts,isLoading:false,error:false}}

    /** -------------------------- create organization product-------------------------> **/
    // case types.SUCCESS.ORG.CREATE_PRODUCT:
    //   product = action.payload
    //   currentProducts = state.products.content;
    //   currentProducts.push(product)
    //   return{...state,products:{...state.products, content:currentProducts,isLoading:false,error:false}};

		/** -------------------------- get agency request-----------------------------------> **/
		case types.ORG.AGENCY_REQUEST:
			return{...state,agencyReqest:{...state.agencyReqest, isLoading:true,error:{message:''}}};
		case types.ERRORS.ORG.AGENCY_REQUEST:
			error = action.payload
			return{...state,agencyReqest:{...state.agencyReqest, isLoading:false,error:{message:error}}};
		case types.SUCCESS.ORG.AGENCY_REQUEST:
			return{...state,agencyReqest:{...state.agencyReqest, isLoading:false,error:{message:''}}};


		case types.ERRORS.ORG.ADD_PRODUCT_PICTURE://TODO amir
			error = action.payload.error
			return {...state,errorMessage:error, products: {}};

    case types.RESET:
      return initialState.organization
		default:
			return state;
	}
}

export default organization