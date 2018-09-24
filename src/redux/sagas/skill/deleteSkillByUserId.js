import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteSkillByUserId(action) {
  const {skillId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.SKILL.DELETE_SKILL_BY_USER_ID)
  try {
    yield fork(api.del, urls.SKILL.DELETE_SKILL_BY_USER_ID, results.SKILL.DELETE_SKILL_BY_USER_ID, '', `${skillId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.SKILL.DELETE_SKILL_BY_USER_ID,
      payload: {skillId, userId}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.SKILL.DELETE_SKILL_BY_USER_ID,
      payload: {message, skillId}
    })
  } finally {
    socketChannel.close()
  }
}