import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {createExchange} from './createExchange'
import {deleteExchangeMembership} from './deleteExchangeMembership'
import {getExchangeByExId} from "./getExchangeByExId"
import {getExchangeIdentitiesByMemberIdentity} from "./getExchangeIdentities"
import {getExchangeMembersByExId} from './getExchangeMembersByExId'

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

function* watchDeleteExchangeMembership() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID, deleteExchangeMembership)
}

function* watchCreateExchange() {
	yield takeEvery(types.EXCHANGE.CREATE_EXCHANGE, createExchange)
}

export default {
	watchGetExchangesByMemberIdentity,
	watchGetExchangeByExId,
	watchGetExchangeMembersByExId,
	watchDeleteExchangeMembership,
	watchCreateExchange,
}