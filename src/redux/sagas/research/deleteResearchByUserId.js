import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteResearchByUserId(action) {
  const {researchId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID)
  try {
    yield fork(api.del, urls.RESEARCH, results.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID, '', `${researchId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID,
      payload: {researchId, userId}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID,
      payload: {message, researchId}
    })
  } finally {
    socketChannel.close()
  }
}