import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updateSkillByUserId(action) {
  const {formValues, skillId, userId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.SKILL.UPDATE_SKILL_BY_USER_ID)
  try {
    yield fork(api.patch, urls.SKILL.UPDATE_SKILL_BY_USER_ID, results.SKILL.UPDATE_SKILL_BY_USER_ID, formValues, `${skillId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.SKILL.UPDATE_SKILL_BY_USER_ID , payload:{data, skillId, userId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.SKILL.UPDATE_SKILL_BY_USER_ID,
      payload: {message, skillId}
    })
  } finally {
    socketChannel.close()
  }
}