import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

export function* getSkillByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.SKILL.GET_SKILL_BY_USER_ID)
  try {
    yield fork(api.get, urls.SKILL.GET_SKILL_BY_USER_ID, results.SKILL.GET_SKILL_BY_USER_ID, `?skill_user=${userId}`)
    const data = yield take(socketChannel)
    yield put({type:types.SUCCESS.SKILL.GET_SKILL_BY_USER_ID, payload:{data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type:types.ERRORS.SKILL.GET_SKILL_BY_USER_ID, payload:{message, userId}})
  } finally {
    socketChannel.close()
  }
}