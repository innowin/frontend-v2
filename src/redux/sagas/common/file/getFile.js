import api from 'src/consts/api'
import results from 'src/consts/resultName'
import urls from 'src/consts/URLS'
import {call, fork, take, put} from 'redux-saga/effects'
import types from 'src/redux/actions/types'


function* getFile(action) {
  const {fileId} = action.payload
  // use fileId in resultName because multi get file in same time be handle
  if (fileId) {
    const resultName = results.COMMON.FILE.GET_FILE + fileId
    const socketChannel = yield call(api.createSocketChannel, resultName)
    try {
      yield fork(api.get, urls.COMMON.FILE, resultName, `${fileId}`)
      const data = yield take(socketChannel)
      yield put({type: types.SUCCESS.COMMON.FILE.GET_FILE, payload: {data}})
    }
    catch (e) {
      const {message} = e
      yield put({type: types.ERRORS.COMMON.FILE.GET_FILE, payload: {message, fileId}})
    }
    finally {
      socketChannel.close()
    }
  }
}

export default getFile