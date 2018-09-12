const BASE = {
	GET_EXCHANGE_BY_EX_ID: 'GET_EXCHANGE_BY_EX_ID',
	GET_EXCHANGE_MEMBERS_BY_EX_ID: 'GET_EXCHANGE_MEMBERS_BY_EX_ID',
	CREATE_EXCHANGE:'CREATE_EXCHANGE',
	ADD_TO_EXCHANGE:'ADD_TO_EXCHANGE',
}

const SUCCESS = {
	GET_EXCHANGE_BY_EX_ID: 'GET_EXCHANGE_BY_EX_ID_SUCCESS',
	GET_EXCHANGE_MEMBERS_BY_EX_ID: 'GET_EXCHANGE_MEMBERS_BY_EX_ID_SUCCESS',
	CREATE_EXCHANGE:'CREATE_EXCHANGE_SUCCESS',
	ADD_TO_EXCHANGE:'ADD_TO_EXCHANGE_SUCCESS',
}

const ERROR = {
	GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY: 'GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY_ERROR',
	GET_EXCHANGE_MEMBERS_BY_EX_ID: 'GET_EXCHANGE_MEMBERS_BY_EX_ID_ERROR',
	CREATE_EXCHANGE:'CREATE_EXCHANGE_ERROR',
	ADD_TO_EXCHANGE:'ADD_TO_EXCHANGE_ERROR',
}


export default {
	BASE,
	ERROR,
	SUCCESS,
}
