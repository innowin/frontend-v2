import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updateEducationByUserId(action) {
  const {formValues, educationId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID)
  try {
    yield fork(api.patch, urls.EDUCATION, results.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID, formValues, `${educationId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID , payload:{data, educationId, userId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID,
      payload: {message, educationId}
    })
  } finally {
    socketChannel.close()
  }
}