
import types from "../../../actions/types";
import {takeEvery} from "redux-saga/effects";
import getCategoriesList from "./getCategoriesList"


function* watchGetCategoriesList() {
    yield takeEvery(types.COMMON.GET_CATEGORIES, getCategoriesList)
}

export default [
    watchGetCategoriesList()
]