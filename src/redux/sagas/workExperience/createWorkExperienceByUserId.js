import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createWorkExperienceByUserId(action) {

  const {formValues, userId, organizationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID)
  try {
    yield fork(api.post, urls.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID, results.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID, formValues)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID ,
      payload:{data, userId, organizationId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}