import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from 'redux-saga/effects'

export function* getFollowers(action) {
  const {notProfile, followOwnerIdentity, followOwnerId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.SOCIAL.GET_FOLLOWERS)
  try {
    yield fork(api.get, urls.COMMON.SOCIAL.FOLLOW, results.COMMON.SOCIAL.GET_FOLLOWERS, `?follow_followed=${followOwnerIdentity}`)
    const data = yield take(socketChannel)
    yield put({type: types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS, payload: {data, followOwnerId, followOwnerIdentity}})
    if (!notProfile) {
      for (let follow of data) {
        const follower = follow.follow_follower
        yield put({type: types.USER.GET_USER_BY_USER_ID, payload: {userId: follower.id}})
      }
    }
  }
  catch (error) {
    const {message} = error
    yield put({
      type: types.ERRORS.COMMON.SOCIAL.GET_FOLLOWERS,
      payload: {message},
    })
  }
  finally {
    socketChannel.close()
  }
}