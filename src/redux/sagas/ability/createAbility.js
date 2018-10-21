import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createAbility(action) {

  const {formValues, organizationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.ABILITY.CREATE_ABILITY)
  try {
    yield fork(api.post, urls.ABILITY, results.ABILITY.CREATE_ABILITY, formValues)
    const data = yield take(socketChannel)
    yield put({
      type: types.SUCCESS.ABILITY.CREATE_ABILITY,
      payload: {data, organizationId}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.ABILITY.CREATE_ABILITY,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}