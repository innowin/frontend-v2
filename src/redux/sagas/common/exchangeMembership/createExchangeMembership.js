import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types/index"
import urls from "src/consts/URLS"
import {put, take, fork, call, select} from "redux-saga/effects"
import constants from "src/consts/constants"
import uuid from 'uuid'


export function* createExchangeMembership(action) {
  const payload = action.payload
  const {identityId, exchangeIdentity} = payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP)
  const state = yield select()
  const translate = state.intl.messages
  const exchangeMembershipOwnerType = state.auth.client.user_type
  const exchangeMembershipOwnerId = state.auth.client.identity.content

  try {
    yield fork(api.post, urls.COMMON.EXCHANGE_MEMBERSHIP, results.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP, {
      exchange_identity_related_exchange: exchangeIdentity,
      exchange_identity_related_identity: identityId
    })
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP, payload: {request: data}})
// Added for update followed exchanges list
    yield put({
      type: types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
      payload: {identityId, exchangeMembershipOwnerId, exchangeMembershipOwnerType}
    })

    yield put({
      type: types.TOAST.ADD_TOAST,
      payload: {
        data: {
          id: uuid(),
          type: constants.TOAST_TYPE.SUCCESS,
          content: {
            text: translate['Create exchange membership done']
          }
        }
      }
    })
// end
  } catch (e) {
    const {message} = e
    yield put({
      type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP,
      payload: {type: types.ERRORS.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP, error: message}
    })
  } finally {
    socketChannel.close()
  }
}