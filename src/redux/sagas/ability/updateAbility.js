import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* updateAbility(action) {
  const {formValues, abilityId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.ABILITY.UPDATE_ABILITY)
  try {
    yield fork(api.patch, urls.ABILITY, results.ABILITY.UPDATE_ABILITY, formValues, `${abilityId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ABILITY.UPDATE_ABILITY , payload:{data, abilityId}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.ABILITY.UPDATE_ABILITY,
      payload: {message, abilityId}
    })
  } finally {
    socketChannel.close()
  }
}