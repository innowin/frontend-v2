import messages from 'src/translate/fa'

export default {
	auth:{
		client: {
			isLoggedIn: false,
			identity:{},
			profile:{},
			user:{},
			rememberMe:null,
			user_type:null,
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