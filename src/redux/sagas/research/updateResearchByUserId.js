import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updateResearchByUserId(action) {
  const {formValues, researchId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID)
  try {
    yield fork(api.patch, urls.RESEARCH, results.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID, formValues, `${researchId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID , payload:{data, researchId, userId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID,
      payload: {message, researchId}
    })
  } finally {
    socketChannel.close()
  }
}