import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {take, put, fork, call} from "redux-saga/effects"

export function* getAbilityByOrganizationId(action) {
  const {payload} = action
  const {organizationId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID)
  try {
    yield fork(api.get, urls.ABILITY, results.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID, `?ability_organization=${organizationId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID, payload: {data, organizationId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ABILITY.GET_ABILITIES_BY_ORGANIZATION_ID, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
  }
}