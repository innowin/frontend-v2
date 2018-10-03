import {takeEvery} from "redux-saga/effects"
import types from "../../actions/types"

/**********    %% WORKERS %%    **********/
import {getWorkExperienceByUserId} from "./getWorkExperienceByUserId"
import {updateWorkExperienceByUserId} from './updateWorkExperienceByUserId'
import {createWorkExperienceByUserId} from './createWorkExperienceByUserId'
import {deleteWorkExperienceByUserId} from './deleteWorkExperienceByUserId'

/**********    %% WATCHERS %%    **********/

function* watchGetWorkExperienceByUserId() {
  yield takeEvery(types.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID, getWorkExperienceByUserId)
}

function* watchUpdateWorkExperienceByUserId() {
  yield takeEvery(types.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID, updateWorkExperienceByUserId)
}

function* watchCreateWorkExperienceByUserId() {
  yield takeEvery(types.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID, createWorkExperienceByUserId)
}

function* watchDeleteWorkExperienceByUserId() {
  yield takeEvery(types.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID, deleteWorkExperienceByUserId)
}

export default [
  watchGetWorkExperienceByUserId(),
  watchUpdateWorkExperienceByUserId(),
  watchCreateWorkExperienceByUserId(),
  watchDeleteWorkExperienceByUserId(),
]