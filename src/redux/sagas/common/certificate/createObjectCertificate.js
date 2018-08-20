import {call, fork, put, take} from "redux-saga/effects"
import api from "../../../../consts/api"
import results from "../../../../consts/resultName"
import urls from "../../../../consts/URLS"
import types from "../../../actions/types"
import helpers from "src/consts/helperFunctions"


function* createObjectCertificate(action) { // action = {type, payload: {formData} }
    const {formData} = action.payload
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.CREATE_OBJECT_CERTIFICATE)

    try {
        yield fork(api.post, urls.COMMON.CERTIFICATE, results.COMMON.CREATE_OBJECT_CERTIFICATE, formData)
        const {data} = yield take(socketChannel)
        const normalData = helpers.deleteKeyFromObj(data, 'id')
        console.log('normal data id: ', normalData)
        yield put({type: types.SUCCESS.COMMON.CREATE_OBJECT_CERTIFICATE, data: normalData, id: data.id})

    } catch (error) {
        yield put({type: types.ERRORS.COMMON.CREATE_OBJECT_CERTIFICATE, error})

    } finally {
        socketChannel.close()
    }
}

export default createObjectCertificate