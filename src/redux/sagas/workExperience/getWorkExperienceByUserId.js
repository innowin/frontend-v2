import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

export function* getWorkExperienceByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID)
  try {
    console.log('herrerrer: ',userId)
    yield fork(api.get, urls.WORK_EXPERIENCE, results.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID, `?work_experience_related_identity=${userId}`)
    const data = yield take(socketChannel)
    console.log('then data: ',data)
    yield put({type:types.SUCCESS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID, payload:{data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID, payload:{message, userId}})
  } finally {
    socketChannel.close()
  }
}