import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getFollowers(action) {
  const {followIdentity, followParentType, followOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.GET_FOLLOWERS)
  try {
    yield fork(api.get, urls.COMMON.SOCIAL.GET_FOLLOWERS, results.COMMON.SOCIAL.GET_FOLLOWERS, `?follow_followed=${followIdentity}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS , payload:{data, followOwnerId, followIdentity, followParentType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.GET_FOLLOWERS,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}