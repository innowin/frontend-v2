import {call, put, fork, take, takeEvery} from "redux-saga/effects";
import types from "../../actions/types";
import api from "../../../consts/api";
import urls from "../../../consts/URLS";
import results from "../../../consts/resultName";


/**********    %% WORKERS %%    **********/

export function* getProductInfo(action) { // action = {type, id}
    const {id} = action
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_PRODUCT_BASIC_INFO)
    try {
        yield fork(api.get, urls.COMMON.PRODUCT, results.COMMON.GET_PRODUCT_BASIC_INFO, id)
        const data = yield take(socketChannel)
        console.log('the guy new complete data is: ', data)
        yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_INFO, data})
    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_PRODUCT_INFO, error})
    } finally {
        socketChannel.close()
    }
}


export function* updateProduct(action) { // action = {type, payload: {id, formData} }
    const {formData, id} = action.payload
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.UPDATE_PRODUCT)

    try {
        yield fork(api.patch, urls.COMMON.PRODUCT, results.COMMON.UPDATE_PRODUCT, formData, id)
        const data = yield take(socketChannel)
        yield put({type: types.SUCCESS.COMMON.UPDATE_PRODUCT, data})
    } catch (error) {
        yield put({type: types.ERRORS.COMMON.UPDATE_PRODUCT, error})
    } finally {
        socketChannel.close()
    }
}


/**********    %% WATCHERS %%    **********/

export function* watchGetProductInfo() {
    yield takeEvery(types.COMMON.GET_PRODUCT_INFO, getProductInfo)
}


export function* watchUpdateProduct() {
    yield takeEvery(types.COMMON.UPDATE_PRODUCT, updateProduct)
}