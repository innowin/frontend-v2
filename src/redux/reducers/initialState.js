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