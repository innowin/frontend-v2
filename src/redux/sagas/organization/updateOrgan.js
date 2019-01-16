import {call, fork, put, take, select} from "redux-saga/effects"
import urls from "src/consts/URLS"
import types from "../../actions/types"
import results from "src/consts/resultName"
import api from "src/consts/api"
import constants from 'src/consts/constants'
import uuid from "uuid"

export function* updateOrganization(action) {
  const payload = action.payload
  const {organizationId, formValues} = payload
  const socketChannel = yield call(api.createSocketChannel, results.ORG.UPDATE_ORGANIZATION_INFO)
  const state = yield select()
  const translate = state.intl.messages

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
    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Update Organ Done']
          }
        }
      }
    })
    yield put({type:types.ORG.GET_ORGANIZATION, payload:{organizationId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.ORG.UPDATE_ORGANIZATION_INFO, payload: {message, organizationId}})
  } finally {
    socketChannel.close()
  }
}
