import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

import {getExchangeIdentitiesByMemberIdentity, getExchangeByExId, getExchangeMembersByExId} from "./getExchange"
import {deleteExchangeMembership} from './deleteExchangeMembership'
import {createExchange} from './createExchange'
import {addToExchange} from './addToExchange'

/**********    %% WATCHERS %%    **********/

export function* watchGetExchangesByMemberIdentity() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY, getExchangeIdentitiesByMemberIdentity)
}

export function* watchGetExchangeByExId() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGE_BY_EX_ID, getExchangeByExId)
}

export function* watchGetExchangeMembersByExId() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID, getExchangeMembersByExId)
}

export function* watchDeleteExchangeMembership() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID, deleteExchangeMembership)
}

export function* watchCreateExchange() {
	yield takeEvery(types.EXCHANGE.CREATE_EXCHANGE, createExchange)
}

export function* watchAddToExchange(){
	yield takeEvery(types.EXCHANGE.ADD_TO_EXCHANGE, addToExchange)
}