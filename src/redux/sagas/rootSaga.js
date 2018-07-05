import {all, takeLatest} from 'redux-saga/effects'
import types, {REQUEST} from '../actions/actionTypes'
import {watchAddNumber, watchGetPosts} from "./auth/testSaga"
import {addingContribution} from './product/workers'

const rootSaga = function* () {
    yield takeLatest(types.ADD_CONTRIBUTION + REQUEST, addingContribution); // watches for adding contribution.

    yield all([
        watchAddNumber(),
        watchGetPosts()
    ])
};
export default rootSaga;