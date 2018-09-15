import {takeEvery} from "redux-saga/effects"
import types from "../../actions/types"

/**********    %% WORKERS %%    **********/
import {getEducationByUserId} from './getEducationByUserId'
import {createEducationByUserId} from './createEducationByUserId'
import {deleteEducationByUserId} from './deleteEducationByUserId'
import {updateEducationByUserId} from './updateEducationByUserId'

/**********    %% WATCHERS %%    **********/

function* watchGetEducationByUserId() {
  yield takeEvery(types.EDUCATION.GET_USER_EDUCATION_BY_USER_ID, getEducationByUserId)
}

function* watchCreateEducationByUserId() {
  yield takeEvery(types.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID, createEducationByUserId)
}

function* watchDeleteEducationByUserId() {
  yield takeEvery(types.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID, deleteEducationByUserId)
}

function* watchUpdateEducationByUserId() {
  yield takeEvery(types.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID, updateEducationByUserId)
}


export default [
  watchGetEducationByUserId(),
  watchCreateEducationByUserId(),
  watchDeleteEducationByUserId(),
  watchUpdateEducationByUserId(),
]