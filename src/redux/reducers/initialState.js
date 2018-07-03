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
		abilities:[],
		certificates:[],
		customers:[],
		products:[],
		pictures:[],
		name:'',
		id:'',
		
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