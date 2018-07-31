import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, fork,take} from "redux-saga/effects";

function* createFile(action) { // payload?
    const {formData} = action.payload
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.CREATE_FILE)

    try {
        yield fork(api.post, urls.COMMON.FILE, results.COMMON.CREATE_FILE, formData)
        const data = yield take(socketChannel)
        console.log('createFile saga worker success data is: ', data)
        // yield put({type: types.SUCCESS.COMMON.UPDATE_PRODUCT, data})
    } catch (error) {
        // yield put({type: types.ERRORS.COMMON.UPDATE_PRODUCT, error})
        console.log('createFile saga worker error data is: ', error)
    } finally {
        socketChannel.close()
    }
}

export default createFile