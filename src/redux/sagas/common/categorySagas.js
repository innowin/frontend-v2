import types from "../../actions/types";
import {call, fork, put, take, takeEvery} from "redux-saga/effects";
import api from "../../../consts/api";
import results from "../../../consts/resultName";
import urls from "../../../consts/URLS";
import helpers from "src/consts/helperFunctions"

/**********    %% WORKERS %%    **********/

export function* getCategories() {
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_CATEGORIES)

    try {
        yield fork(api.get, urls.COMMON.CATEGORY, results.COMMON.GET_CATEGORIES)
        const data = yield take(socketChannel)
        const normalData = helpers.arrayToIdKeyedObject(data)
        yield put({type: types.SUCCESS.COMMON.GET_CATEGORIES, data: normalData})
    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_CATEGORIES})
    }
}


/**********    %% WATCHERS %%    **********/

export function* watchGetCategories() {
    yield takeEvery(types.COMMON.GET_CATEGORIES, getCategories)
}