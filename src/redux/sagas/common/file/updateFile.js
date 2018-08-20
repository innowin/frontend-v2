import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, fork, take} from "redux-saga/effects";

export function* updateFile(action) { // payload?
    const {formData, id} = action.payload
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.UPDATE_FILE)

    try {
        yield fork(api.patch, urls.COMMON.FILE, results.COMMON.UPDATE_FILE, formData, id)
        const {data} = yield take(socketChannel)
        console.log('updateFile saga worker success data is: ', data)
        // yield put({type: types.SUCCESS.COMMON.UPDATE_PRODUCT, data})
    } catch (error) {
        console.log('updateFile saga worker error data is: ', error)
        // yield put({type: types.ERRORS.COMMON.UPDATE_PRODUCT, error})
    } finally {
        socketChannel.close()
    }
}

export default updateFile