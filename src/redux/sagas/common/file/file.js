import types from "../../../actions/types"
import {takeEvery} from "redux-saga/effects"
import createFile from "./creareFile"
import updateFile from "./updateFile"
import getFile from "./getFile"
import delFileMiddlewareData from "./delMiddlewareData"
import getFiles from "./getFiles"


function* watchGetFile() {
  yield takeEvery(types.COMMON.GET_FILE, getFile)
}

function* watchGetFiles() {
  yield takeEvery(types.COMMON.GET_FILES, getFiles)
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
  watchDelFileMiddleWareData(),
  watchGetFiles()
]