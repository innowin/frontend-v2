import initialState from 'src/redux/reducers/initialState'
import types from 'src/redux/actions/types'
import exchangeSlice from './sliceReducers/exchange'

// this badge function just set received success exchanges in user or organ or ...

const exchanges = (state = initialState.exchanges, action) => {
  const {postParentType} = action.payload || {}
  const {getExchangeByExId, postsExchange, getExchangeIdentities} = exchangeSlice
  switch (action.type) {
    /** --------------------  get exchange --------------------- **/
    case types.SUCCESS.EXCHANGE.GET_EXCHANGE_BY_EX_ID:
      return getExchangeByExId.success(state, action)
    case types.SUCCESS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
      return getExchangeIdentities.success(state, action)

    /** ---------------------  get exchange posts ---------------------------**/
    case types.SUCCESS.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
      if (postParentType === 'exchange') {
        return postsExchange.filterPostsByPostParentLimitOffset.success(state, action)
      }
      return state

    /** -------------------------- add one post to exchange posts  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST :
      if (postParentType === 'exchange') {
        return postsExchange.createPost.success(state, action)
      }
      return state

    /** -------------------------- delete one post from exchange posts  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      if (postParentType === 'exchange') {
        return postsExchange.deletePost.success(state, action)
      }
      return state

    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.exchanges
    default:
      return state
  }
}
export default exchanges