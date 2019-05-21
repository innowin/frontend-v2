import api from 'src/consts/api'
import results from 'src/consts/resultName'
import urls from 'src/consts/URLS'
import {call, fork, take, put} from 'redux-saga/effects'
import types from 'src/redux/actions/types'

function* getFileByRelatedParentId(action) {
  const {fileRelatedParentId, fileParentType} = action.payload
  const resultName = results.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID + fileRelatedParentId
  const socketChannel = yield call(api.createSocketChannel, resultName)
  try {
    yield fork(api.get, urls.COMMON.FILE, resultName, `?file_related_parent=${fileRelatedParentId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID, payload: {data, fileParentType, fileRelatedParentId}})
  }
  catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID, payload: {message}})
  }
  finally {
    socketChannel.close()
  }
}

export default getFileByRelatedParentId