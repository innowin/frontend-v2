import {call, fork, put, take} from "redux-saga/effects";
import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import types from "../../../actions/types";

function* getProductInfo(action) { // action = {type, id}
    const {id} = action.payload
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_PRODUCT_BASIC_INFO)
    try {
        yield fork(api.get, urls.COMMON.PRODUCT, results.COMMON.GET_PRODUCT_BASIC_INFO, id)
        const {data} = yield take(socketChannel)
        console.log('the guy new complete data is: ', data)
        yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_INFO, data})
    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_PRODUCT_INFO, error})
    } finally {
        socketChannel.close()
    }
}

export default getProductInfo