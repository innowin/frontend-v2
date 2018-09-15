import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteEducationByUserId(action) {
  const {educationId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID)
  try {
    yield fork(api.del, urls.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID, results.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID, '', `${educationId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID,
      payload: {educationId, userId}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID,
      payload: {message, educationId}
    })
  } finally {
    socketChannel.close()
  }
}