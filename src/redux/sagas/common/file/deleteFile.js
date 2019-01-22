import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteFile(action) {
  const {fileId, fileParentId, fileParentType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.FILE.DELETE_FILE)

  try {
    yield fork(api.del, urls.COMMON.FILE, results.COMMON.FILE.DELETE_FILE, '', `${fileId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.COMMON.FILE.DELETE_FILE,
      payload: {fileId, fileParentId, fileParentType}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.FILE.DELETE_FILE,
      payload: {message, fileId}
    })
  } finally {
    socketChannel.close()
  }
}

export default deleteFile