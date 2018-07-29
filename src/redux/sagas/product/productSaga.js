import {call, fork, put, take, takeEvery} from "redux-saga/effects";
import api from "../../../consts/api";
import urls from "../../../consts/URLS";
import types from "../../actions/actionTypes";
import results from "../../../consts/resultName";
import {signIn} from "../auth/authSaga";


/**********    %% WORKERS %%    **********/

export function* getProductInfo(id) {
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_PRODUCT_BASIC_INFO)
    try {
        yield fork(api.get, urls.COMMON.PRODUCTS, results.COMMON.GET_PRODUCT_BASIC_INFO, `${id}`)
        const data = yield take(socketChannel)
        console.log(data)
    } catch (error) {
        console.log(error)
        // yield put({type: types.ERRORS.GET_ORGANIZATION, payload: {type: types.ERRORS.GET_ORGANIZATION, message}})
    } finally {
        socketChannel.close()
    }
}


/**********    %% WATCHERS %%    **********/

export function* watchGetProductInfo() {
    yield takeEvery(types.GET_PRODUCT_INFO, getProductInfo)
}
