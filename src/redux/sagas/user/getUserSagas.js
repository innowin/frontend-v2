import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {take, put, fork, call} from 'redux-saga/effects'


export function* getUserByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.GET_USER_BY_USER_ID + userId)
  try {
    yield fork(api.get, urls.USER.GET_USER_BY_USER_ID, results.USER.GET_USER_BY_USER_ID + userId, `${userId}`, true)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data, userId}})
  }
  catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.GET_USER_BY_USER_ID, payload: {message, userId}})
  }
  finally {
    socketChannel.close()
  }
}

export function* getUsers() {
  let socketChannel
  try {
    socketChannel = yield call(api.createSocketChannel, results.USER.GET_USERS)
  }
  catch (e) {
    console.log(e)
  }
  try {
    yield fork(api.get, urls.USER.GET_USERS, results.USER.GET_USERS, `?limit=50`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_USERS, payload: {data}})
  }
  catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.GET_USERS, payload: {message}})
  }
  finally {
    socketChannel.close()
  }
}

export function* getAllUsers(action) {
  const {limit, offset, search, justOrgan, token = true} = action.payload
  yield put({type: types.SUCCESS.USER.GET_ALL_USERS, payload: {data: [], search, isLoading: true}})
  let params = search !== null ? `?username=${search}` : `?limit=${limit}&offset=${offset}`
  if (justOrgan === true) {
    params += '&identity_type=organization'
  }
  else if (justOrgan === false) {
    params += '&identity_type=user'
  }
  const socketChannel = yield call(api.createSocketChannel, results.USER.GET_ALL_USERS)
  try {
    yield fork(
        api.get,
        urls.USER.GET_ALL_USERS,
        results.USER.GET_ALL_USERS,
        params,
        token,
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_ALL_USERS, payload: {data, search, isLoading: false}})
  }
  catch (err) {
    const {message} = err
    yield put({
      type: types.ERROR.USER.GET_ALL_USERS,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}