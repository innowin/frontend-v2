import messages from 'src/translate/fa'

export default {
	auth:{
		client:{
			identity:{},
			profile:{},
			user:{},
			rememberMe:null,
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
	reduxTest:{
		number:0,
	},
	intl: {
		locale: 'fa',
		messages: {...messages}
	},
	error:{
		message:''
	}
};