import api from "src/consts/api"
import results from "src/consts/resultName"
import urls from "src/consts/URLS"
import { call, fork, take, put } from "redux-saga/effects"
import types from "src/redux/actions/types"

export function* updateFile(action) {
  const {formData, id, fileParentType} = action.payload
  const resultName = results.COMMON.FILE.UPDATE_FILE + id
  const socketChannel = yield call(api.createSocketChannel, resultName)

  try {
    yield fork(api.patch, urls.COMMON.FILE, resultName, formData, id)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.FILE.UPDATE_FILE, payload: {id, data, fileParentType}})
  } catch (error) {
    const { message } = error
    yield put({type: types.ERRORS.COMMON.FILE.UPDATE_FILE, payload: {id, message}})
  } finally {
    socketChannel.close()
  }
}

export default updateFile