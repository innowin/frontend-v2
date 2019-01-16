import types from 'src/redux/actions/types'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {getEducationFields} from './getEducationFields'

/**********    %% WATCHERS %%    **********/
function* watchGetUniversities() {
  yield takeEvery(types.COMMON.GET_UNIVERSITIES, getEducationFields)
}

export default [
  watchGetUniversities()
]