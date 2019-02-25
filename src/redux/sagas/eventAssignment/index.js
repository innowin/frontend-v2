import {takeEvery} from "redux-saga/effects"
import types from "../../actions/types"

/**********    %% WORKERS %%    **********/
import {createEventAssignment} from './createEventAssignment'

/**********    %% WATCHERS %%    **********/


function* watchCreateEventAssignment() {
  yield takeEvery(types.EVENT_ASSIGNMENT.CREATE_EVENT_ASSIGNMENT, createEventAssignment)
}


export default [
  watchCreateEventAssignment(),
]