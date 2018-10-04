import {takeEvery} from "redux-saga/effects"
import types from "../../actions/types"

/**********    %% WORKERS %%    **********/
import {getSkillByUserId} from './getSkillByUserId'
import {deleteSkillByUserId} from './deleteSkillByUserId'
import {updateSkillByUserId} from './updateSkillByUserId'
import createSkill from "./createSkillSaga";

/**********    %% WATCHERS %%    **********/

function* watchGetSkillByUserId() {
  yield takeEvery(types.SKILL.GET_SKILL_BY_USER_ID, getSkillByUserId)
}

function* watchDeleteSkillByUserId() {
  yield takeEvery(types.SKILL.DELETE_SKILL_BY_USER_ID, deleteSkillByUserId)
}

function* watchUpdateSkillByUserId() {
  yield takeEvery(types.SKILL.UPDATE_SKILL_BY_USER_ID, updateSkillByUserId)
}

function* watchCreateSkill() {
  yield takeEvery(types.SKILL.CREATE_SKILL, createSkill)
}


export default [
  watchGetSkillByUserId(),
  watchDeleteSkillByUserId(),
  watchUpdateSkillByUserId(),
  watchCreateSkill()
]