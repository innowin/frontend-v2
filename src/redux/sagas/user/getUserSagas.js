import api from 'src/consts/api'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import urls from 'src/consts/URLS'
import {take, put, fork, call} from 'redux-saga/effects'


export function* getUserByUserId(action) {
  const {payload} = action
  const {userId} = payload
  const socketChannel = yield call(api.createSocketChannel, results.USER.GET_USER_BY_USER_ID)
  try {
    yield fork(api.get, urls.USER.GET_USER_BY_USER_ID, results.USER.GET_USER_BY_USER_ID, `${userId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_USER_BY_USER_ID, payload: {data, userId}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.GET_USER_BY_USER_ID, payload: {message, userId}})
  } finally {
    socketChannel.close()
  }
}

export function* getUsers(action) {
  // const {payload} = action
  let socketChannel
  try {
    socketChannel = yield call(api.createSocketChannel, results.USER.GET_USERS)
  } catch (e) {
    console.log(e)
  }

  try {
    yield fork(api.get, urls.USER.GET_USERS, results.USER.GET_USERS, `?limit=50`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_USERS, payload: {data}})
  } catch (e) {
    const {message} = e
    yield put({type: types.ERRORS.USER.GET_USERS, payload: {message}})
  } finally {
    socketChannel.close()
  }
}

export function* getAllUsers(action) {
  const {limit, offset, search} = action.payload
  const params = search !== null ? `?username=${search}` : `?limit=${limit}&offset=${offset}`
  const socketChannel = yield call(api.createSocketChannel, results.USER.GET_ALL_USERS)
  try {
    yield fork(
        api.get,
        urls.USER.GET_ALL_USERS,
        results.USER.GET_ALL_USERS,
        params
    )
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.USER.GET_ALL_USERS, payload: {data, search}})
  } catch (err) {
    const {message} = err
    yield put({
      type: types.ERROR.USER.GET_ALL_USERS,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}