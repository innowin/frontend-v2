import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/types'
import {put, take, fork, call} from "redux-saga/effects"
/*
* parentId is required for filtering but postType is arbitrary.
* default number of limit is 100 and offset is 0
* */
export function* filterPostsByPostParentPostTypeLimitOffset(action) {
	const {postParentId , postType , limit = 100 , offset = 0 , postParentType} = action.payload
	let filter = `?`
	if(postParentId){ filter+= `post_parent=${postParentId}`}
	if(limit){ filter += `&limit=${limit}`}
	if(offset){ filter = filter + `&offset=${offset}`}
	if(postType){ filter = filter + `&post_type=${postType}`}
	const resultName = `${results.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET}-${postParentId}`
	const socketChannel = yield call(api.createSocketChannel, resultName)
	try {
		yield fork(
				api.get,
				urls.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
        resultName,
				filter
		)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET ,
			payload:{data, postParentId, postParentType}})
	} catch (err) {
		const {message} = err
		yield put({
			type: types.ERRORS.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
			payload: {message}
		})
	} finally {
		socketChannel.close()
	}
}