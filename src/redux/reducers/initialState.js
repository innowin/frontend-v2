import messages from 'src/translate/fa'

export default {
	auth:{
		client: {
			isLoggedIn: false,
			identity:{},
			profile:{},
			user:{},
			rememberMe:null
		},
		clients: {
			users:[],
			active_user:{},
			visited_pages:{},
			logged_in_time:{}
		}
	},
	organization:{
		isLoading:false,
		exchanges:{
			isLoading:false,
			list:[]
		},
		followings:{
			isLoading:false,
			list:[]
		},
		followers:{
			isLoading:false,
			list:[]
		},
		abilities:{
			isLoading:false,
			list:[]
		},
		certificates:{
			isLoading:false,
			list:[]
		},
		customers:{
			isLoading:false,
			list:[]
		},
		products:{
			isLoading:false,
			list:[]
		},
		pictures:{
			isLoading:false,
			list:[]
		},
		members:{
			isLoading:false,
			list:[]
		},
		name:'',
		id:'',
		official_name:'',
		identity:'',
	},
	test: {
		result: 1,
		list:[]
	},
	intl: {
		locale: 'fa',
		messages: {...messages}
	},
	error:{
		message:''
	}
};