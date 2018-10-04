import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, put, fork, take} from "redux-saga/effects";
import helpers from "../../../../consts/helperFunctions/helperFunctions"
import types from "../../../actions/types"

function* getHashTags(action) {
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_HASH_TAGS)

    try {
        yield fork(api.get, urls.COMMON.HASH_TAG_PARENT, results.COMMON.GET_HASH_TAGS)
        const data = yield take(socketChannel)
        const normalData = helpers.arrayToIdKeyedObject(data)
        yield put({type: types.SUCCESS.COMMON.GET_HASH_TAGS, payload: {data: normalData}})

    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_HASH_TAGS, error})

    } finally {
        socketChannel.close()

    }
}

export default getHashTags