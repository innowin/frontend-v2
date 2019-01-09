import api from "src/consts/api"
import results from "src/consts/resultName"
import urls from "src/consts/URLS"
import { call, fork, take, put } from "redux-saga/effects"
import types from "src/redux/actions/types"

export function* updateFile(action) {
  const {formData, id} = action.payload
  const resultName = results.COMMON.UPDATE_FILE + id
  const socketChannel = yield call(api.createSocketChannel, resultName)

  try {
    yield fork(api.patch, urls.COMMON.FILE, resultName, formData, id)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.UPDATE_FILE, payload: {id, data}})
  } catch (error) {
    const { message } = error
    yield put({type: types.ERRORS.COMMON.UPDATE_FILE, payload: {id, message}})
  } finally {
    socketChannel.close()
  }
}

export default updateFile