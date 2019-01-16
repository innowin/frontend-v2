import types from 'src/redux/actions/types'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {getUniversities} from './getUniversities'

/**********    %% WATCHERS %%    **********/
function* watchGetUniversities() {
  yield takeEvery(types.COMMON.GET_UNIVERSITIES, getUniversities)
}

export default [
  watchGetUniversities()
]