import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createEducationByUserId(action) {

  const {formValues, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID)
  try {
    yield fork(api.post, urls.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID, results.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID ,
      payload:{data, userId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}