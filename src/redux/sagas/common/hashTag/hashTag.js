import {takeEvery} from "redux-saga/effects";
import types from "../../../actions/types";
import getHashTags from "../hashTag/getHashTags";


function* watchGetHashTags() {
    yield takeEvery(types.COMMON.GET_HASH_TAGS, getHashTags)
}


export default {
    watchGetHashTags
}