import {put, takeEvery} from "redux-saga/effects";
import types from "../../actions/actionTypes";
import {getOrganization} from "../organization/organizationSaga";

export function* addingContribution(action) {
    try {
        console.log('this is addingContribution action:', action)
        yield put({ type: types.ADD_CONTRIBUTION ,data: "some fake data." })
    } catch (error) {
        yield put({type: types.ADD_CONTRIBUTION, error})
    }
}


/**********    %% WATCHERS %%    **********/

export function* watchAddingContribution() {
    yield takeEvery(types.GET_ORGANIZATION, getOrganization)
}

