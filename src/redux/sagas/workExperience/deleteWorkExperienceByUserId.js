import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteWorkExperienceByUserId(action) {
  const {workExperienceId, userId, organizationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID)
  try {
    yield fork(api.del, urls.WORK_EXPERIENCE, results.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID, '', `${workExperienceId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID,
      payload: {workExperienceId, userId, organizationId}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID,
      payload: {message, workExperienceId}
    })
  } finally {
    socketChannel.close()
  }
}