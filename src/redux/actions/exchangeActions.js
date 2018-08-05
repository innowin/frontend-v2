// @flow
import types from './types'
import {getExchangePostComment} from "../../crud/exchange/exchange";

const getExchangeIdentitiesByMemberIdentity = (identityId: number) => ({type: types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, payload: {identityId}})

const getExchangeIdentitiesByMemberIdentityIsLoading = () => ({type: types.IS_LOADING.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, payload: {}})

const getExchangeByExId = (id:number) => ({type: types.EXCHANGE.GET_EXCHANGE_BY_EX_ID , payload:{id}})

const getExchangesByMemberIdentity = (identity:number) => ({type: types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY , payload:{identity}})

const getExchangeMembersByExId = (id: number) => ({type: types.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID, payload:{id}})

const deleteExchangeMembership = (identityId: number) => ({type: types.EXCHANGE.DELETE_EXCHANGE_MEMBERSHIP, payload:{identityId}})

export default {
	getExchangeIdentitiesByMemberIdentity,
	getExchangeIdentitiesByMemberIdentityIsLoading,
	getExchangeByExId,
	getExchangesByMemberIdentity,
	getExchangeMembersByExId,
	deleteExchangeMembership
}
