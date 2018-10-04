import {call, fork, put, take} from "redux-saga/effects";
import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import types from "../../../actions/types";
import helpers from "../../../../consts/helperFunctions/helperFunctions";

function* getCategoriesList() {
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_CATEGORIES)

    try {
        yield fork(api.get, urls.COMMON.CATEGORY, results.COMMON.GET_CATEGORIES)
        const data = yield take(socketChannel)
        const normalData = helpers.arrayToIdKeyedObject(data)
        yield put({type: types.SUCCESS.COMMON.GET_CATEGORIES, data: normalData})
    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_CATEGORIES})
    }
}
export default getCategoriesList