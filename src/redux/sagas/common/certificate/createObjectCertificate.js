import {call, fork, put, take} from "redux-saga/effects"
import api from "../../../../consts/api"
import results from "../../../../consts/resultName"
import urls from "../../../../consts/URLS"
import types from "../../../actions/types"
import helpers from "src/consts/helperFunctions"
import client from "../../../../consts/client";


function* createObjectCertificate(action) { // action = {type, payload: {formData} }
    const identityId = client.getIdentityId()

    const newCert = {
        ...action.payload,
        certificate_identity: identityId
    }

    const dynamicResult = results.COMMON.CREATE_OBJECT_CERTIFICATE + newCert.title
    const socketChannel = yield call(api.createSocketChannel, dynamicResult)

    try {
        yield fork(api.post, urls.COMMON.CERTIFICATE, dynamicResult, newCert)
        const data = yield take(socketChannel)
        yield put({type: types.SUCCESS.COMMON.CREATE_OBJECT_CERTIFICATE, data: data})

    } catch (error) {
        yield put({type: types.ERRORS.COMMON.CREATE_OBJECT_CERTIFICATE, error})

    } finally {
        socketChannel.close()
    }
}

export default createObjectCertificate