import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {getEvents} from "./getEvents"

/**********    %% WATCHERS %%    **********/

function* watchGetEvents() {
  yield takeEvery(types.EVENT.GET_EVENTS, getEvents)
}

export default [
  watchGetEvents()
]

