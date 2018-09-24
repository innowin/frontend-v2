import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updateWorkExperienceByUserId(action) {
  const {formValues, workExperienceId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID)
  try {
    yield fork(api.patch, urls.WORK_EXPERIENCE, results.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID, formValues, `${workExperienceId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID , payload:{data, workExperienceId, userId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID,
      payload: {message, workExperienceId}
    })
  } finally {
    socketChannel.close()
  }
}