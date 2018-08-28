import types from 'src/redux/actions/types'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {filterPostsByPostParentPostTypeLimitOffset} from './filterPostsByPostParentLimitOffset'
import {createPost} from './createPost'
import {getPostByIdentity} from "./getPostByIdentity"
import {updatePost} from './updatePost'
import {deletePost} from './deletePost'


/**********    %% WATCHERS %%    **********/

function* watchFilterPostsByPostParentPostTypeLimitOffset() {
	yield takeEvery(types.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET, filterPostsByPostParentPostTypeLimitOffset)
}

function* watchGetPostByIdentity() {
  yield takeEvery(types.COMMON.POST.GET_POST_BY_IDENTITY, getPostByIdentity)
}

function* watchCreatePost() {
  yield takeEvery(types.COMMON.POST.CREATE_POST, createPost)
}

function* watchUpdatePost() {
  yield takeEvery(types.COMMON.POST.UPDATE_POST, updatePost)
}

function* watchDeletePost() {
  yield takeEvery(types.COMMON.POST.DELETE_POST, deletePost)
}

export default {
  watchFilterPostsByPostParentPostTypeLimitOffset,
  watchGetPostByIdentity,
  watchCreatePost,
  watchUpdatePost,
  watchDeletePost,
}