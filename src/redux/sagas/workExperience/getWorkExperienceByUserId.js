import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {take, put, fork, call} from 'redux-saga/effects'

export function* getWorkExperienceByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID)
  try {
    yield fork(api.get, urls.WORK_EXPERIENCE, results.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID, `?work_experience_related_identity=${userId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID, payload: {data, userId}})
    for (let i = 0; i < data.length; i++) {
      const workExperience = data[i]
      if (workExperience.work_experience_organization) {
        yield put({
          type: types.USER.GET_USER_BY_USER_ID,
          payload: {userId: workExperience.work_experience_organization}
        })
      }
    }
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID, payload: {message, userId}})
  } finally {
    socketChannel.close()
  }
}