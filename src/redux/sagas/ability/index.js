import {takeEvery} from "redux-saga/effects"
import types from "../../actions/types"

/**********    %% WORKERS %%    **********/
import {getAbilityByOrganizationId} from './getAbilityByOrganizationId'
import {deleteAbility} from './deleteAbility'
import {updateAbility} from './updateAbility'
import {createAbility} from "./createAbility";

/**********    %% WATCHERS %%    **********/

function* watchGetAbilityByOrganizationId() {
  yield takeEvery(types.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID, getAbilityByOrganizationId)
}

function* watchDeleteAbility() {
  yield takeEvery(types.ABILITY.DELETE_ABILITY, deleteAbility)
}

function* watchUpdateAbility() {
  yield takeEvery(types.ABILITY.UPDATE_ABILITY, updateAbility)
}

function* watchCreateAbility() {
  yield takeEvery(types.ABILITY.CREATE_ABILITY, createAbility)
}


export default [
  watchGetAbilityByOrganizationId(),
  watchDeleteAbility(),
  watchUpdateAbility(),
  watchCreateAbility()
]