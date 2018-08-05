import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, fork,take, put} from "redux-saga/effects";
import types from '../../../actions/types'


function* deleteFileMiddlewareData(action) { // payload?
    // const {formData} = action
    // const socketChannel = yield call(api.createSocketChannel, results.COMMON.CREATE_FILE)
    //
    // try {
    //     yield fork(api.post, urls.COMMON.FILE, results.COMMON.CREATE_FILE, formData)
    //     const data = yield take(socketChannel)
    //     yield put({type: types.SUCCESS.COMMON.CREATE_FILE, data})
    //
    // } catch (error) {
    //     console.log('createFile saga worker error data is: ', error)
    //
    // } finally {
    //     socketChannel.close()
    // }
}

export default deleteFileMiddlewareData