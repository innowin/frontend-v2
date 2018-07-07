import {put} from "redux-saga/effects";
import types, {SUCCESS, FAILED} from "../../actions/actionTypes";

export function* addingContribution(action) {
    try {
        console.log('this is addingContribution action:', action)
        yield put({ type: types.ADD_CONTRIBUTION + SUCCESS ,data: "some fake data." })
    } catch (error) {
        yield put({type: types.ADD_CONTRIBUTION + FAILED, error})
    }
}
