import types from "../../../actions/types"
import {takeEvery} from "redux-saga/effects"
import createFile from "./creareFile"
import updateFile from "./updateFile"
import getFile from "./getFile"
import delFileMiddlewareData from "./delMiddlewareData"
import getFiles from "./getFiles"
import getFileByRelatedParentId from './getFileByRelatedParentId'


function* watchGetFile() {
  yield takeEvery(types.COMMON.FILE.GET_FILE, getFile)
}

function* watchGetFiles() {
  yield takeEvery(types.COMMON.FILE.GET_FILES, getFiles)
}

function* watchCreateFile() {
  yield takeEvery(types.COMMON.FILE.CREATE_FILE, createFile)
}

function* watchUpdateFile() {
  yield takeEvery(types.COMMON.FILE.UPDATE_FILE, updateFile)
}

function* watchDelFileMiddleWareData() {
  yield takeEvery(types.COMMON.FILE.DEL_MIDDLEWARE_FILE_DATA, delFileMiddlewareData)
}

function* watchGetFileByRelatedParentId() {
  yield takeEvery(types.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID, getFileByRelatedParentId)
}

export default [
  watchGetFile(),
  watchCreateFile(),
  watchUpdateFile(),
  watchDelFileMiddleWareData(),
  watchGetFiles(),
  watchGetFileByRelatedParentId(),
]