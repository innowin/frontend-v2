import types from "../../../actions/types"
import {takeEvery} from "redux-saga/effects"
import {createLike} from "./createLike"


function* watchGetLike() {
  yield takeEvery(types.COMMON.LIKE.CREATE_LIKE, createLike)
}

export default [
  watchGetLike(),
]