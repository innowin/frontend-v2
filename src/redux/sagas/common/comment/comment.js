import types from 'src/redux/actions/types'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {getCommentsByParentId} from './getCommentsByParentId'

/**********    %% WATCHERS %%    **********/

function* watchGetCommentsByParentId() {
  yield takeEvery(types.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID, getCommentsByParentId)
}

export default [
  watchGetCommentsByParentId(),
]