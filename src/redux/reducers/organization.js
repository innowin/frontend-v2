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

    /** -------------------------- get organization exchanges -------------------------> **/
		case types.ORG.GET_ORG_EXCHANGES:
			return {...state,exchanges:{...state.exchanges,isLoading:true}};

    case types.SUCCESS.ORG.GET_ORG_EXCHANGES:
      let exchanges = action.payload;
      return{...state,exchanges:{content:exchanges,isLoading:false,error:false}}

		/** -------------------------- get organization customers-------------------------> **/
		case types.ORG.GET_ORG_CUSTOMERS:
			return {...state,customers:{...state.customers,isLoading:true}}

		case types.SUCCESS.ORG.GET_ORG_CUSTOMERS:
			let customers = action.payload;
			return{...state,customers:{content:customers,isLoading:false,error:false}}	

		case types.ERRORS.ORG.GET_ORG_CUSTOMERS:
			error = action.payload.error
			return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}

		/** -------------------------- create organization customers-------------------------> **/
		case types.ORG.CREATE_CUSTOMER:
			return {...state,customers:{...state.customers,isLoading:true}}

		case types.SUCCESS.ORG.CREATE_CUSTOMER:
			let {customer} = action.payload
			let currentCustomers = state.customers.content;
			currentCustomers.push(customer)
			return{...state,customers:{content:currentCustomers,isLoading:false,error:false}}	

		case types.ERRORS.ORG.CREATE_CUSTOMER:
			error = action.payload.error
			return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}

    /** -------------------------- update organization customer-------------------------> **/
    case types.SUCCESS.ORG.UPDATE_CUSTOMER:
      customer = action.payload;
      var nowCustomers = state.customers.content;
      var index = nowCustomers.findIndex(function (cus) { return cus.id === customer.id; });
      nowCustomers[index] = customer
      return{...state,customers:{content:nowCustomers,isLoading:false,error:false}}

    case types.ERRORS.ORG.UPDATE_CUSTOMER:
      error = action.payload.error
      return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}

		/** -------------------------- delete organization customers-------------------------> **/
		case types.ORG.DELETE_CUSTOMER:
			return {...state,customers:{...state.customers,isLoading:true}}

		case types.SUCCESS.ORG.DELETE_CUSTOMER:
			let {customerId} = action.payload
			currentCustomers = state.customers.content;
			var index = currentCustomers.findIndex(
				function (cus) {
					 return cus.id === customerId; 
					}
			);
			currentCustomers.splice(index, 1);
			return{...state,customers:{content:currentCustomers,isLoading:false,error:false}}	

		case types.ERRORS.ORG.DELETE_CUSTOMER:
			
			error = action.payload.error
			return{...state,errorMessage:error,customers:{content:[],isLoading:false,error:true}}

		/** -------------------------- get organization certificates-------------------------> **/
		case types.ORG.GET_ORG_CERTIFICATES:
			return {...state,certificates:{...state.certificates,isLoading:true}}

    case types.ERRORS.ORG.GET_ORG_CERTIFICATES:
      error = action.payload.error
      return{...state,errorMessage:error,certificates:{content:[],isLoading:false,error:true}}

    /** -------------------------- create organization certificates-------------------------> **/
		case types.ORG.CREATE_CERTIFICATE:
			return {...state,certificates:{...state.certificates,isLoading:true}}

		/** -------------------------- get organization product-------------------------> **/
		case types.ORG.UPDATE_PRODUCT:
			return {...state,products:{isLoading:true}}

    case types.ERRORS.ORG.UPDATE_PRODUCT:
      error = action.payload.error
      return{...state,errorMessage:error,products:{content:[],isLoading:false,error:true}}

		case types.ORG.GET_PRODUCTS:
			return {...state,products:{isLoading:true}}

		case types.SUCCESS.ORG.GET_PRODUCT_PICTURE:
			const pictures = action.payload
			currentProducts = state.products.content;
			var index = currentProducts.findIndex(function (cus) { return cus.id === pictures[0].picture_product; });
			currentProducts[index].pictures = pictures
			return {...state,products:{...state.products, content:currentProducts,isLoading:false,error:false}}

    case types.ERRORS.ORG.GET_PRODUCT_PICTURE:
      error = action.payload.error
      return{...state,errorMessage:error,products:{content:[],isLoading:false,error:true}}
		
		case types.SUCCESS.ORG.GET_PRODUCT_PRICE:
			const price = action.payload
			currentProducts = state.products.content;
			var index = currentProducts.findIndex(function (cus) { return cus.id === price[0].price_product; });
			currentProducts[index].price = price[0]
			return {...state,products:{...state.products, content:currentProducts,isLoading:false,error:false}}
	
		case types.SUCCESS.ORG.GET_PRODUCTS:
			const {products,categories} = action.payload;
			return{...state,products:{...products, content:products,categories:categories,isLoading:false,error:false}}

    /** -------------------------- create organization product-------------------------> **/
    case types.SUCCESS.ORG.CREATE_PRODUCT:
      product = action.payload
      currentProducts = state.products.content;
      currentProducts.push(product)
      return{...state,products:{...state.products, content:currentProducts,isLoading:false,error:false}};

    /** -------------------------- update organization product-------------------------> **/
    case types.SUCCESS.ORG.UPDATE_PRODUCT:
      let product = action.payload;
      let currentProducts = state.customers.content;
      var index = currentProducts.findIndex(function (cus) { return cus.id === product.id; });
      currentProducts[index] = product
      return{...state,products:{...products, content:currentProducts,isLoading:false,error:false}}

    /** -------------------------- delete organization product-------------------------> **/
    case types.SUCCESS.ORG.DELETE_PRODUCT:
      const productId = action.payload
      currentProducts = state.products.content;
      var index = currentProducts.findIndex(function (cus) { return cus.id === productId; });
      currentProducts.array.splice(index, 1);
      return{...state,products:{...state.products, content:currentProducts,isLoading:false,error:false}};

    case types.ERRORS.ORG.DELETE_PRODUCT:
      error = action.payload.error
      return{...state, errorMessage:error,products:{...state.products,isLoading:false,error:true}}

		/** -------------------------- get organization follower-------------------------> **/
		case types.ORG.GET_ORG_FOLLOWERS:
			let followers = action.payload;
			return{...state,followers:{content:[],isLoading:true,error:false}}	
		case types.ERRORS.ORG.GET_ORG_FOLLOWERS:
			let errorMsg = action.payload;
			return{...state,errorMessage:errorMsg,followers:{content:[],isLoading:false,error:true}}	
		case types.SUCCESS.ORG.GET_ORG_FOLLOWERS:
			followers = action.payload;
			return{...state,followers:{content:followers,isLoading:false,error:false}}	

		/** -------------------------- get organization followings-------------------------> **/
		case types.ORG.GET_ORG_FOLLOWINGS:
			let followings = action.payload;
			return{...state,followings:{content:[],isLoading:true,error:false}}	
		case types.ERRORS.ORG.GET_ORG_FOLLOWINGS:
			errorMsg = action.payload;
			return{...state,errorMessage:errorMsg,followings:{content:[],isLoading:false,error:true}}	
		case types.SUCCESS.ORG.GET_ORG_FOLLOWINGS:
		followings = action.payload;
			return{...state,followings:{content:followings,isLoading:false,error:false}}	
		
		/** -------------------------- get organization CERTIFICATE-------------------------> **/
		case types.SUCCESS.ORG.GET_ORG_CERTIFICATES:
			let certificates = action.payload;
			return{...state,certificates:{...state.certificates, content:certificates,isLoading:false,error:false}}		

		/** -------------------------- create organization CERTIFICATE-------------------------> **/
		case types.SUCCESS.ORG.CREATE_CERTIFICATE:
			let {certificate} = action.payload
			let curCertificates = state.certificates.content;
			curCertificates.push(certificate)
			return{...state,certificates:{...state.certificates,content:curCertificates,isLoading:false,error:false}}

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