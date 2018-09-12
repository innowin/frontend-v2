import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {deleteExchangeMembership} from './deleteExchangeMembership'

/**********    %% WATCHERS %%    **********/


function* watchDeleteExchangeMembership() {
  yield takeEvery(types.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP, deleteExchangeMembership)
}

export default{
  watchDeleteExchangeMembership,
}