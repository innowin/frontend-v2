import {takeEvery} from "redux-saga/effects";
import types from "../../../actions/types";
import getHashTags from "./getHashTags";
import createHashTagFor from "./createHashTagFor"


function* watchGetHashTags() {
    yield takeEvery(types.COMMON.GET_HASH_TAGS, getHashTags)
}


function* watchCreateHashTagFor() {
    yield takeEvery(types.COMMON.CREATE_HASH_TAG_FOR, createHashTagFor)
}


export default [
    watchGetHashTags(),
    watchCreateHashTagFor()
]