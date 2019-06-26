import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {put, take, fork, call, select} from 'redux-saga/effects'

export function* getAllExchanges(action) {
  const {limit, offset, search, hashtags, getAll} = action.payload
  let params = search ? `?name=${search}` : `?limit=${limit}&offset=${offset}`
  if (hashtags) hashtags && hashtags.forEach(tag => params += `&hashtag_filter=${tag}`)
  yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGES, payload: {data: [], search: getAll ? null : search, hashtags: getAll ? null : hashtags, isLoading: true}})
  const result = `${results.EXCHANGE.GET_EXCHANGES}-${Math.random()}`
  const socketChannel = yield call(api.createSocketChannel, result)
  try {
    yield fork(
        api.get,
        urls.EXCHANGE_EXPLORER,
        result,
        params,
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGES, payload: {data, search: getAll ? null : search, hashtags: getAll ? null : hashtags, isLoading: false}})
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