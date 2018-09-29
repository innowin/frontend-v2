import types from "../../../actions/types"
import {takeEvery} from "redux-saga/effects"
import createFile from "./creareFile"
import updateFile from "./updateFile"
import getFile from "./getFile"
import delFileMiddlewareData from "./delMiddlewareData"

function* watchGetFile() {
  yield takeEvery(types.COMMON.GET_FILE, getFile)
}

function* watchCreateFile() {
  yield takeEvery(types.COMMON.CREATE_FILE, createFile)
}

function* watchUpdateFile() {
  yield takeEvery(types.COMMON.UPDATE_FILE, updateFile)
}

function* watchDelFileMiddleWareData() {
  yield takeEvery(types.COMMON.DEL_MIDDLEWARE_FILE_DATA, delFileMiddlewareData)
}

export default [
  watchGetFile(),
  watchCreateFile(),
  watchUpdateFile(),
  watchDelFileMiddleWareData()
]