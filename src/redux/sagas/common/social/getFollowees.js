import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"

export function* getFollowees(action) {
  const {followIdentity, followParentType, followOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.GET_FOLLOWEES)
  try {
    yield fork(api.get, urls.COMMON.SOCIAL.GET_FOLLOWEES, results.COMMON.SOCIAL.GET_FOLLOWEES, `?follow_follower=${followIdentity}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES , payload:{data, followOwnerId, followIdentity, followParentType}})
  } catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.GET_FOLLOWEES,
      payload: {message}
    })
  } finally {
    socketChannel.close()
  }
}