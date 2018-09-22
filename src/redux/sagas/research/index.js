import {takeEvery} from "redux-saga/effects"
import types from "../../actions/types"

/**********    %% WORKERS %%    **********/
import {getResearchByUserId} from './getResearchByUserId'
import {createResearchByUserId} from './createResearchByUserId'
import {deleteResearchByUserId} from './deleteResearchByUserId'
import {updateResearchByUserId} from './updateResearchByUserId'

/**********    %% WATCHERS %%    **********/

function* watchGetResearchByUserId() {
  yield takeEvery(types.RESEARCH.GET_USER_RESEARCH_BY_USER_ID, getResearchByUserId)
}

function* watchCreateResearchByUserId() {
  yield takeEvery(types.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID, createResearchByUserId)
}

function* watchDeleteResearchByUserId() {
  yield takeEvery(types.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID, deleteResearchByUserId)
}

function* watchUpdateResearchByUserId() {
  yield takeEvery(types.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID, updateResearchByUserId)
}


export default [
  watchGetResearchByUserId(),
  watchCreateResearchByUserId(),
  watchDeleteResearchByUserId(),
  watchUpdateResearchByUserId(),
]