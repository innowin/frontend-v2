import api from 'src/consts/api'
import urls from 'src/consts/URLS'
import results from 'src/consts/resultName'
import types from 'src/redux/actions/actionTypes'
import {put, take, fork, call} from "redux-saga/effects"
/*
* parentId is required for filtering but postType is arbitrary.
* default number of limit is 100 and offset is 0
* */
export function* filterPostsByPostParentPostTypeLimitOffset(action) {
	const {parentId , postType , limit = 100 , offset = 0 } = action.payload
	let filter = `?`
	if(parentId){ filter+= `post_parent=${parentId}`}
	if(limit){ filter += `&limit=${limit}`}
	if(offset){ filter = filter + `&offset=${offset}`}
	if(postType){ filter = filter + `&post_type=${postType}`}
	
	const socketChannel = yield call(api.createSocketChannel, results.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET)
	try {
		yield fork(
				api.get,
				urls.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
				results.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
				filter
		)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET , payload:{data}})
	} catch (err) {
		const {message} = err
		yield put({
			type: types.ERRORS.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
			payload: {message}
		})
	} finally {
		socketChannel.close()
	}
}