import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {createExchange} from './createExchange'
import {getExchangeByExId} from "./getExchangeByExId"

/**********    %% WATCHERS %%    **********/

function* watchGetExchangeByExId() {
	yield takeEvery(types.EXCHANGE.GET_EXCHANGE_BY_EX_ID, getExchangeByExId)
}

function* watchCreateExchange() {
	yield takeEvery(types.EXCHANGE.CREATE_EXCHANGE, createExchange)
}

export  {
	watchGetExchangeByExId,
	watchCreateExchange,
}