import {call, fork, put, take} from "redux-saga/effects";
import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import types from "../../../actions/types";


function* createObjectCertificate(action) { // action = {type, payload: {formData} }
    const {formData} = action.payload
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.CREATE_OBJECT_CERTIFICATE)
    try {
        yield fork(api.patch, urls.COMMON.CERTIFICATE, results.COMMON.CREATE_OBJECT_CERTIFICATE, formData)
        const data = yield take(socketChannel)
        // yield put({type: types.SUCCESS.COMMON.UPDATE_PRODUCT, data})
    } catch (error) {
    } finally {
        socketChannel.close()
    }
}

export default createObjectCertificate