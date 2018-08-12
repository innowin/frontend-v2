import types from 'src/redux/actions/actionTypes'
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {filterPostsByPostParentPostTypeLimitOffset} from './filterPostsByPostParentLimitOffset'


/**********    %% WATCHERS %%    **********/

export function* watchFilterPostsByPostParentPostTypeLimitOffset() {
	yield takeEvery(types.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET, filterPostsByPostParentPostTypeLimitOffset)
}