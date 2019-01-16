import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {createExchange} from "./createExchange"
import {editExchange} from "./editExchange"
import {deleteExchange} from "./deleteExchange"
import {getExchangeByExId} from "./getExchangeByExId"
import {getAllExchanges} from "./getAllExchandes"

/**********    %% WATCHERS %%    **********/

function* watchGetExchangeByExId() {
  yield takeEvery(types.EXCHANGE.GET_EXCHANGE_BY_EX_ID, getExchangeByExId)
}

function* watchCreateExchange() {
  yield takeEvery(types.EXCHANGE.CREATE_EXCHANGE, createExchange)
}

function* watchEditExchange() {
  yield takeEvery(types.EXCHANGE.EDIT_EXCHANGE, editExchange)
}

function* watchDeleteExchange() {
  yield takeEvery(types.EXCHANGE.DELETE_EXCHANGE, deleteExchange)
}

function* watchGetAllExchanges() {
  yield takeEvery(types.EXCHANGE.GET_EXCHANGES, getAllExchanges)
}

export default [
  watchGetExchangeByExId(),
  watchCreateExchange(),
  watchEditExchange(),
  watchDeleteExchange(),
  watchGetAllExchanges(),
]

