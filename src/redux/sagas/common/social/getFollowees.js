import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getFollowees(action) {
  const {notProfile, followOwnerIdentity, followOwnerId} = action.payload
  const result = `${results.COMMON.SOCIAL.GET_FOLLOWEES}-${followOwnerId}`
  const socketChannel = yield call(api.createSocketChannel, result)
  try {
    yield fork(api.get, urls.COMMON.SOCIAL.FOLLOW, result, `?follow_follower=${followOwnerIdentity}&limit=10000`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES, payload: {data, followOwnerId, followOwnerIdentity}})
    if (!notProfile) {
      for (let follow of data) {
        const followed = follow.follow_followed
        yield put({type: types.USER.GET_USER_BY_USER_ID, payload: {userId: followed.id}})
      }
    }
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.GET_FOLLOWEES,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}