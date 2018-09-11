import types from './types'

const getExchangeIdentitiesByMemberIdentity = ({identityId, membershipOwnerIdentity}) => ({
	type: types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY,
	payload: {identityId, membershipOwnerIdentity}
})

const getExchangeByExId = (id) => ({
	type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID,
	payload:{id}
})

const getExchangeMembersByExId = (id) => ({
	type: types.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
	payload:{id}
})

const deleteExchangeMembership = (identityId) => ({
	type: types.EXCHANGE.DELETE_EXCHANGE_MEMBERSHIP,
	payload:{identityId}
})

const createExchange = (formValues, finished) =>({
	type: types.EXCHANGE.CREATE_EXCHANGE,
	payload:{formValues,finished}
})


const addToExchange = (identityId,exchangeIdentity) => ({
	type: types.EXCHANGE.ADD_TO_EXCHANGE,
	payload: {
			identityId,
			exchangeIdentity
	}
})

const ExchangeActions =  {
	getExchangeIdentitiesByMemberIdentity,
	getExchangeByExId,
	getExchangeMembersByExId,
	deleteExchangeMembership,
	addToExchange,
	createExchange
}

export default ExchangeActions;
