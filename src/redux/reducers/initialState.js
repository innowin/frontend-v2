import messages from 'src/translate/fa'

export default {
	auth:{
		client: {
			isLoggedIn: false,
			identity:{},
			profile:{},
			user:{},
			organization:null,
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
	user: {
		skills: {
			isLoading: false,
			content: [],
			isLoaded: false
		}
	},
	organization:{
		isLoading:false,
		exchanges:{
			isLoading:false,
			content:[]
		},
		followings:{
			isLoading:false,
			content:[]
		},
		followers:{
			isLoading:false,
			content:[]
		},
		abilities:{
			isLoading:false,
			content:[]
		},
		certificates:{
			isLoading:false,
			content:[]
		},
		customers:{
			isLoading:false,
			error:false,
			content:[]
		},
		products:{
			isLoading:false,
			content:[]
		},
		pictures:{
			isLoading:false,
			content:[]
		},
		members:{
			isLoading:false,
			content:[]
		},
		name:'',
		id:'',
		official_name:'',
		identity:{
			isLoaded:false,
			content:''
		},
	},
	test: {
		result: 1,
		content:[]
	},
	intl: {
		locale: 'fa',
		messages: {...messages}
	},
	error: {
        message: ''
    },
};