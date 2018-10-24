import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteAbility(action) {
  const {abilityId, organizationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.ABILITY.DELETE_ABILITY)
  try {
    yield fork(api.del, urls.ABILITY, results.ABILITY.DELETE_ABILITY, '', `${abilityId}`)
    yield take(socketChannel)
    yield put({
      type: types.SUCCESS.ABILITY.DELETE_ABILITY,
      payload: {abilityId, organizationId}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.ABILITY.DELETE_ABILITY,
      payload: {message, abilityId}
    })
  } finally {
    socketChannel.close()
  }
}