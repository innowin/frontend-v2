import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteFollowers(action) {
  const {followedIdentityId, followParentType} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.DELETE_FOLLOWERS)
  try {
    yield fork(api.del, urls.COMMON.SOCIAL.DELETE_FOLLOWERS, results.COMMON.SOCIAL.DELETE_FOLLOWERS, `?follow_followed=${followedIdentityId}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOWERS , payload:{data}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.DELETE_FOLLOWERS,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}