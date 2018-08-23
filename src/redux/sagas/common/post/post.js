import types from 'src/redux/actions/types'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {filterPostsByPostParentPostTypeLimitOffset} from './filterPostsByPostParentLimitOffset'
import {getPostByIdentity} from "./getPostByIdentity"


/**********    %% WATCHERS %%    **********/

function* watchFilterPostsByPostParentPostTypeLimitOffset() {
	yield takeEvery(types.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET, filterPostsByPostParentPostTypeLimitOffset)
}

function* watchGetPostByIdentity() {
  yield takeEvery(types.COMMON.GET_POST_BY_IDENTITY, getPostByIdentity)
}

export default {
  watchFilterPostsByPostParentPostTypeLimitOffset,
  watchGetPostByIdentity,
}