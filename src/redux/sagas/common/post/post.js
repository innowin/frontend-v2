import types from 'src/redux/actions/types'
import {takeEvery} from 'redux-saga/effects'
import {filterPostsStream} from './filterPostsStream'
import {filterPostsByPostParentPostTypeLimitOffset} from './filterPostsByPostParentLimitOffset'
import {filterPostByPostRelatedProduct} from './filterPostByPostRelatedProduct'
import {createPost} from './createPost'
import {getPostByIdentity} from './getPostByIdentity'
import {updatePost} from './updatePost'
import {deletePost} from './deletePost'
import {getPost} from './getPost'
import {getPostViewerCount, setPostViewer} from './viewerCount'


/**********    %% WATCHERS %%    **********/
function* watchFilterPostsStream() {
  yield takeEvery(types.COMMON.POST.FILTER_POSTS_STREAM, filterPostsStream)
}

function* watchFilterPostsByPostParentPostTypeLimitOffset() {
  yield takeEvery(types.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET, filterPostsByPostParentPostTypeLimitOffset)
}

function* watchFilterPostsByPostRelatedProduct() {
  yield takeEvery(types.COMMON.POST.FILTER_POSTS_BY_POST_RELATED_PRODUCT, filterPostByPostRelatedProduct)
}

function* watchGetPostByIdentity() {
  yield takeEvery(types.COMMON.POST.GET_POST_BY_IDENTITY, getPostByIdentity)
}

function* watchGetPostViewerCount() {
  yield takeEvery(types.COMMON.POST.GET_POST_VIEWER_COUNT, getPostViewerCount)
}

function* watchSetPostViewer() {
  yield takeEvery(types.COMMON.POST.SET_POST_VIEWER, setPostViewer)
}

function* watchGetPost() {
  yield takeEvery(types.COMMON.POST.GET_POST, getPost)
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

export default [
  watchFilterPostsStream(),
  watchGetPost(),
  watchCreatePost(),
  watchDeletePost(),
  watchFilterPostsByPostParentPostTypeLimitOffset(),
  watchFilterPostsByPostRelatedProduct(),
  watchGetPostByIdentity(),
  watchGetPostViewerCount(),
  watchSetPostViewer(),
  watchUpdatePost(),
]