import types from "../../../actions/types"
import {call, fork,take, put} from "redux-saga/effects"
import results from "../../../../consts/resultName";
import api from "../../../../consts/api";
import urls from "../../../../consts/URLS";


function* createHashTagFor (action) {
    const hashTag = action.payload
    const dynamicResult = results.COMMON.CREATE_HASH_TAG_FOR + hashTag.title
    const socketChannel = yield call(api.createSocketChannel, dynamicResult)
    console.log('\n ------- SAGA ------ >> createHashTagFor >> dynamicResult:\n',  dynamicResult)

    try {
        yield fork(api.post, urls.COMMON.HASH_TAG, dynamicResult, hashTag)
        const data = yield take(socketChannel)
        console.log('\n ------- SAGA ------ >> createHashTagFor >> try >> data:\n',  data)
        yield put({type: types.SUCCESS.COMMON.CREATE_HASH_TAG_FOR, data})

    } catch (error) {
        yield put({type: types.ERRORS.COMMON.CREATE_HASH_TAG_FOR, error})

    } finally {
        socketChannel.close()
    }
}

export default createHashTagFor