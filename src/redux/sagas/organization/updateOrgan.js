import {call, fork, put, take} from "redux-saga/effects"
import urls from "src/consts/URLS"
import types from "../../actions/types"
import results from "src/consts/resultName"
import api from "src/consts/api"

export function* updateOrganization(action) {
  const payload = action.payload
  const {organizationId, formValues, hideEdit} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_ORGANIZATION_INFO)
  try {
    yield fork(
      api.patch,
      urls.ORG.UPDATE_ORGANIZATION_INFO,
      results.ORG.UPDATE_ORGANIZATION_INFO,
      formValues,
      `${organizationId}`
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.ORG.UPDATE_ORGANIZATION_INFO, payload: {data}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.UPDATE_ORGANIZATION_INFO, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
    hideEdit()
  }
}
