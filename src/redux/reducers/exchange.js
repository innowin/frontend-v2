import initialState from 'src/redux/reducers/initialState'
import types from 'src/redux/actions/types'
import exchangeSlice from './sliceReducers/exchange'
import constants from "src/consts/constants"
import pushAnObjToStateList from "./sliceReducers/utilsSlices/pushAnObjToStateList"
import createAnObj from "./sliceReducers/utilsSlices/createAnObj"
// this badge function just set received success exchanges in user or organ or ...

const exchanges = (state = initialState.exchanges, action) => {
  const {postParentType} = action.payload || {}
  const {getExchangeByExId, postsExchange, getExchangeMembershipByMemberIdentity, getAllExchanges, searchExchangesByWord} = exchangeSlice
  const {POST_PARENT} = constants
  switch (action.type) {
    case types.EXCHANGE.CREATE_EXCHANGE:
      return createAnObj.base(state, action)
    case types.SUCCESS.EXCHANGE.CREATE_EXCHANGE:
      return createAnObj.success(state, action)
      /** --------------------  get exchange by exchange id --------------------- **/
    case types.SUCCESS.EXCHANGE.GET_EXCHANGE_BY_EX_ID:
      return getExchangeByExId.success(state, action)
      /** --------------------  get all --------------------- **/
    case types.SUCCESS.EXCHANGE.GET_EXCHANGES:
      return getAllExchanges.success(state, action)
      /** --------------------  get exchange membership by member identity --------------------- **/
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return getExchangeMembershipByMemberIdentity.success(state, action)
      /** ---------------------  get exchange posts ---------------------------**/
    case types.SUCCESS.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
      if (postParentType === POST_PARENT.EXCHANGE) {
        return postsExchange.filterPostsByPostParentLimitOffset.success(state, action)
      }
      return state
      /** -------------------------- search exchanges by word  -------------------------> **/
    case types.SUCCESS.EXCHANGE.SEARCH_EXCHANGES_BY_WORD:
      return searchExchangesByWord.success(state, action)
      /** -------------------------- add one post to exchange posts  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST :
      if (postParentType === POST_PARENT.EXCHANGE) {
        return postsExchange.createPost.success(state, action)
      }
      return state
      /** -------------------------- delete one post from exchange posts  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      if (postParentType === POST_PARENT.EXCHANGE) {
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