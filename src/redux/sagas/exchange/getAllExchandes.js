import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call, select} from 'redux-saga/effects'

export function* getAllExchanges(action) {
  const {limit, offset, search, hashtags} = action.payload
  let params = search ? `?name=${search}` : `?limit=${limit}&offset=${offset}`
  if (hashtags) hashtags.forEach(tag => params += `&q=${JSON.stringify(tag)}`)
  console.log('params: ', params)
  yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGES, payload: {data: [], search, hashtags, isLoading: true}})
  const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGES)
  try {
    yield fork(
        api.get,
        urls.EXCHANGE_EXPLORER,
        results.EXCHANGE.GET_EXCHANGES,
        encodeURI(params),
    )
    const data = yield take(socketChannel)
    console.log(data)
    yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGES, payload: {data, search, hashtags, isLoading: false}})
// Added for get membership
    const identityId = yield select((state) => state.auth.client.identity.content)
    yield put({
      type: types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY,
      payload: {identityId, exchangeMembershipOwnerId: identityId},
    })
//end
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERROR.EXCHANGE.GET_EXCHANGES,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}