import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {createExchange} from './createExchange'
import {getExchangeByExId} from "./getExchangeByExId"
import {getExchangeIdentitiesByMemberIdentity} from "./getExchangeIdentities"
import {getExchangeMembersByExId} from './getExchangeMembersByExId'
import {addToExchange} from './addToExchange'

/**********    %% WATCHERS %%    **********/

function* watchGetExchangesByMemberIdentity() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, getExchangeIdentitiesByMemberIdentity)
}

function* watchGetExchangeByExId() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGE_BY_EX_ID, getExchangeByExId)
}

function* watchGetExchangeMembersByExId() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID, getExchangeMembersByExId)
}

function* watchCreateExchange() {
	yield takeEvery(types.EXCHANGE.CREATE_EXCHANGE, createExchange)
}

function* watchAddToExchange(){
	yield takeEvery(types.EXCHANGE.ADD_TO_EXCHANGE, addToExchange)
}
export  {
	watchGetExchangesByMemberIdentity,
	watchGetExchangeByExId,
	watchGetExchangeMembersByExId,
	watchCreateExchange,
	watchAddToExchange
}