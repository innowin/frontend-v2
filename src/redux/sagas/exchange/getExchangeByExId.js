import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call, select} from 'redux-saga/effects'

export function* getExchangeByExId(action) {
  const {id, getMemberShip} = action.payload
  const result = `${results.EXCHANGE.GET_EXCHANGE_BY_EX_ID}-${id}`
  const socketChannel = yield call(api.createSocketChannel, result)
  try {
    yield fork(
        api.get,
        urls.EXCHANGE,
        result,
        `${id}`,
    )
    let data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data: data.owner, userId: data.owner.id}})
    data.owner = data.owner.id
    yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGE_BY_EX_ID, payload: {data}})

    const identityId = yield select((state) => state.auth.client.identity.content)
    if (getMemberShip !== true)
      yield put({
        type: types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
        payload: {identityId, exchangeMembershipOwnerId: identityId},
      })
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERRORS.EXCHANGE.GET_EXCHANGE_BY_EX_ID,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}
