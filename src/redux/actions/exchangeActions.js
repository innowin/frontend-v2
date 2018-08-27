import types from './types'

const getExchangeIdentitiesByMemberIdentity = (identityId) => ({type: types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, payload: {identityId}})

const getExchangeByExId = (id) => ({type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID , payload:{id}})

const getExchangesByMemberIdentity = (identity) => ({type: types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY , payload:{identity}})

const getExchangeMembersByExId = (id) => ({type: types.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID, payload:{id}})

const deleteExchangeMembership = (identityId) => ({type: types.EXCHANGE.DELETE_EXCHANGE_MEMBERSHIP, payload:{identityId}})

const createExchange = (formValues, hideEdit) =>({type: types.EXCHANGE.CREATE_EXCHANGE, payload:{formValues,hideEdit}})
export default {
	getExchangeIdentitiesByMemberIdentity,
	getExchangeByExId,
	getExchangesByMemberIdentity,
	getExchangeMembersByExId,
	deleteExchangeMembership,
	createExchange
}
