import {call, put, fork, take, takeEvery} from "redux-saga/effects";
import types from "../../actions/types";
import api from "../../../consts/api";
import urls from "../../../consts/URLS";
import results from "../../../consts/resultName";


/**********    %% WORKERS %%    **********/

export function* getProductInfo(action) { // action = {type, id}
    const {id} = action
    const socketChannel = yield call(api.createSocketChannel, results.PRODUCT.GET_BASIC_INFO)
    try {
        yield fork(api.get, urls.PRODUCT.BASE, results.PRODUCT.GET_BASIC_INFO, id)
        const data = yield take(socketChannel)
        yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_INFO, data})
        console.log('yap finally the data is: ', data)
    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_PRODUCT_INFO, error})
    } finally {
        socketChannel.close()
    }
}


export function* updateProduct(action) { // action = {type, payload: {id, formData} }
    const {formData, id} = action.payload
    console.log('the guy formData in saga worker is: ', formData)
    console.log('the guy action in saga worker is: ', action)
    const socketChannel = yield call(api.createSocketChannel, results.PRODUCT.UPDATE)
    try {
        yield fork(api.patch, urls.PRODUCT.BASE, results.PRODUCT.UPDATE, formData, id)
        const data = yield take(socketChannel)
        // yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_INFO, data})
        console.log('yap finally the data is: ', data)
    } catch (error) {
        console.log(error)
        // yield put({type: types.ERRORS.COMMON.GET_PRODUCT_INFO, error})
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


