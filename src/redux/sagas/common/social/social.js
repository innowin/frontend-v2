import types from 'src/redux/actions/types'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {getFollowees} from './getFollowees'
import {getFollowers} from './getFollowers'
import {deleteFollowers} from './deleteFolowers'


/**********    %% WATCHERS %%    **********/

function* watchGetFollowees() {
  yield takeEvery(types.COMMON.SOCIAL.GET_FOLLOWEES, getFollowees)
}

function* watchGetFollowers() {
  yield takeEvery(types.COMMON.SOCIAL.GET_FOLLOWERS, getFollowers)
}

function* watchDeleteFollowers() {
  yield takeEvery(types.COMMON.SOCIAL.DELETE_FOLLOWERS, deleteFollowers)
}


export default {
  watchGetFollowees,
  watchGetFollowers,
  watchDeleteFollowers,
}