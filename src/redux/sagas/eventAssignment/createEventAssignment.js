import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* createEventAssignment(action) {

  const {formValues, userId, eventId, organizationId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.EVENT_ASSIGNMENT.CREATE_EVENT_ASSIGNMENT + eventId)
  try {
    yield fork(api.post, urls.EVENT_ASSIGNMENT, results.EVENT_ASSIGNMENT.CREATE_EVENT_ASSIGNMENT + eventId, formValues)
    const data = yield take(socketChannel)
    yield put({
      type: types.SUCCESS.EVENT_ASSIGNMENT.CREATE_EVENT_ASSIGNMENT,
      payload: {data, userId, organizationId, eventId}
    })
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.EVENT_ASSIGNMENT.CREATE_EVENT_ASSIGNMENT,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}