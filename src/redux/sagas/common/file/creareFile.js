import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, fork,take, put} from "redux-saga/effects";
import types from '../../../actions/types'


function* createFile(action) { // payload?
    const {file_string, nextActionData, nextActionType, nextActionErrorType} = action.payload
    const dynamicResult = results.COMMON.CREATE_FILE + file_string
    const socketChannel = yield call(api.createSocketChannel, dynamicResult)
    // console.log('---- SAGA ---- >> createFile >> dynamicResult is: ', dynamicResult)
    try {
        const file = {file_string}
        yield fork(api.post, urls.COMMON.FILE, dynamicResult, file)
        const {data} = yield take(socketChannel)
        const payload = nextActionData ? {
            ...nextActionData,
            picture_media: data.id
        } : {}
        // console.log('---- SAGA ---- >> createFile >> data is: ', data)
        yield put({type: types.SUCCESS.COMMON.CREATE_FILE, data})
        yield put({type: nextActionType, payload})

    } catch (error) {
        yield put({type: nextActionErrorType, error})

    } finally {
        socketChannel.close()
    }
}

export default createFile