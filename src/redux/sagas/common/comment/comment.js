import types from 'src/redux/actions/types'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {getCommentsByParentId} from './getCommentsByParentId'
import {createComment} from './createComment'
import {deleteComment} from './deleteComment'
import {getCommentById} from './getCommentById'

/**********    %% WATCHERS %%    **********/

function* watchGetCommentsByParentId() {
  yield takeEvery(types.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID, getCommentsByParentId)
}

function* watchCreateComment() {
  yield takeEvery(types.COMMON.COMMENT.CREATE_COMMENT, createComment)
}

function* watchDeleteComment() {
  yield takeEvery(types.COMMON.COMMENT.DELETE_COMMENT, deleteComment)
}

function* watchGetCommentById() {
  yield takeEvery(types.COMMON.COMMENT.GET_COMMENT_BY_ID, getCommentById)
}

export default [
  watchGetCommentsByParentId(),
  watchCreateComment(),
  watchDeleteComment(),
  watchGetCommentById(),
]