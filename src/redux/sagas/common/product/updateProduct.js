import {call, fork, put, take} from "redux-saga/effects";
import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import types from "../../../actions/types";

function* updateProduct(action) { // action = {type, payload: {id, formData} }
    const {formData, id} = action.payload
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.UPDATE_PRODUCT)

    try {
        yield fork(api.patch, urls.COMMON.PRODUCT, results.COMMON.UPDATE_PRODUCT, formData, id)
        const {data} = yield take(socketChannel)
        yield put({type: types.SUCCESS.COMMON.UPDATE_PRODUCT, data})
    } catch (error) {
        yield put({type: types.ERRORS.COMMON.UPDATE_PRODUCT, error})
    } finally {
        socketChannel.close()
    }
}

export default updateProduct