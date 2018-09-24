// create skill
import types from "../../actions/types";
import {takeEvery} from "redux-saga/effects";
import createSkill from "./createSkillSaga";

function* watchCreateSkill() {
  yield takeEvery(types.SKILL.CREATE_SKILL, createSkill)
}

export default [
  watchCreateSkill()
]