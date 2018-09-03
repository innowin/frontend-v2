import initialState from 'src/redux/reducers/initialState'
import types from 'src/redux/actions/types'
import exchangeSlice from './slice/exchangeSlices'
import postSlice from "./slice/commonSlices/post"

// this badge function just set received success exchanges in user or organ or ...

const exchanges = (state = initialState.exchanges, action) => {
  switch (action.type) {
    /** --------------------  get exchange --------------------- **/
		case types.SUCCESS.EXCHANGE.GET_EXCHANGE_BY_EX_ID:
			return exchangeSlice.getExchangeByExId.SUCCESS(state , action)
		case types.SUCCESS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
      return exchangeSlice.getExchangeIdentities.SUCCESS(state , action)
    /** ---------------------  get exchange posts ---------------------------**/
    case types.SUCCESS.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
      return postSlice.filterPostsByPostParentLimitOffset.SUCCESS(state, action)
    /** -------------------------- add one post to exchange posts  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      return postSlice.createPost.SUCCESS(state, action)
    /** -------------------------- delete one post from exchange posts  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      return postSlice.deletePost.SUCCESS(state, action)
    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.exchanges
    default:
      return {...state}
  }
}
export default exchanges