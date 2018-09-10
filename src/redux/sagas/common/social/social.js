import types from 'src/redux/actions/types'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {getFollowees} from './getFollowees'
import {getFollowers} from './getFollowers'
import {deleteFollow} from './deleteFollow'
import {updateFollow} from './updateFollow'


/**********    %% WATCHERS %%    **********/

function* watchGetFollowees() {
  yield takeEvery(types.COMMON.SOCIAL.GET_FOLLOWEES, getFollowees)
}

function* watchGetFollowers() {
  yield takeEvery(types.COMMON.SOCIAL.GET_FOLLOWERS, getFollowers)
}

function* watchDeleteFollow() {
  yield takeEvery(types.COMMON.SOCIAL.DELETE_FOLLOW, deleteFollow)
}

function* watchUpdateFollow() {
  yield takeEvery(types.COMMON.SOCIAL.UPDATE_FOLLOW, updateFollow)
}


export default {
  watchGetFollowees,
  watchGetFollowers,
  watchDeleteFollow,
  watchUpdateFollow,
}