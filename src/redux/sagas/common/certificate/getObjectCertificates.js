import api from "src/consts/api";
import results from "src/consts/resultName";
import urls from "src/consts/URLS";
import {call, put, fork, take} from "redux-saga/effects";
import types from "../../../actions/types"
import helpers from "src/consts/helperFunctions/helperFunctions";


function* getObjectCertificates(action) { // action={type: , id: }
    const suffix = `?certificate_parent=${action.payload.id}`
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.CERTIFICATE.GET_CERTIFICATES)

    try {
        yield fork(api.get, urls.COMMON.CERTIFICATE, results.COMMON.CERTIFICATE.GET_CERTIFICATES, suffix)
        const data = yield take(socketChannel)
        const normalData = helpers.arrayToIdKeyedObject(data)
        yield put({type: types.SUCCESS.COMMON.GET_CERTIFICATES, data: normalData})
    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_CERTIFICATES, error})
    } finally {
        socketChannel.close()
    }
}

export default getObjectCertificates