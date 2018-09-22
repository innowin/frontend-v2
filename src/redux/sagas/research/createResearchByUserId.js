import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createResearchByUserId(action) {

  const {formValues, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID)
  try {
    yield fork(api.post, urls.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID, results.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID ,
      payload:{data, userId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}