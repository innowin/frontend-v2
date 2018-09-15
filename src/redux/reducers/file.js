import initialState from 'src/redux/reducers/initialState'
import types from 'src/redux/actions/types'
import fileSlice from 'src/redux/reducers/sliceReducers/file'

const files = (state = initialState.files, action) => {
	switch (action.type) {
			/** --------------------  get exchange --------------------- **/
	
			/** ---------------------  get exchange posts ---------------------------**/
		case types.SUCCESS.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
			if (postParentType === 'exchange') {
				return postsExchange.filterPostsByPostParentLimitOffset.success(state, action)
			}
			return {...state}
			
			/** -------------------------- add one post to exchange posts  -------------------------> **/
		case types.SUCCESS.COMMON.POST.CREATE_POST :
			if (postParentType === 'exchange') {
				return postsExchange.createPost.success(state, action)
			}
			return {...state}
			
			/** -------------------------- delete one post from exchange posts  -------------------------> **/
		case types.SUCCESS.COMMON.POST.DELETE_POST:
			if (postParentType === 'exchange') {
				return postsExchange.deletePost.success(state, action)
			}
			return {...state}
			
			/** ----------------- reset -----------------> **/
		case types.RESET:
			return initialState.files
		default:
			return {...state}
	}
}
export default files