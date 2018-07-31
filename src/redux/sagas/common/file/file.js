import types from "../../../actions/types"
import {takeEvery} from "redux-saga/effects"
import createFile from "./creareFile"
import updateFile from "./updateFile"

export function* watchCreateFile() {
    yield takeEvery(types.COMMON.CREATE_FILE, createFile)
}

export function* watchUpdateFile() {
    yield takeEvery(types.COMMON.UPDATE_FILE, updateFile)
}

export default {
    watchCreateFile,
    watchUpdateFile
}