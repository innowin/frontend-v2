import initialState from 'src/redux/reducers/initialState'
import types from 'src/redux/actions/types'
import slices from './exchangeSlices'

// this badge function just set received success exchanges in user or organ or ...

const exchanges = (state = initialState.exchanges, action) => {
  const {data, exchangeId, message, postId, postOwnerId, postOwnerType, postParentId, postParentType} = action.payload || {}
  switch (action.type) {
    /** --------------------  get exchange --------------------- **/
    // case types.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
    //   return {
    //     ...state,
    //     [exchangeId]: {
    //       ...state[exchangeId],
    //       exchange: {
    //         ...prevExchange,
    //         isLoading: true,
    //         error: null
    //       }
    //     }
    //   }
		case types.SUCCESS.EXCHANGE.GET_EXCHANGE_BY_EX_ID:
			return slices.getExchangeByExId(state , action)
	
		case types.SUCCESS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
      return {
        ...state,
        ...data
      }
    case types.SUCCESS.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
      const postResults = data.results
      const postIds = postResults.map(post => post.id)
      if (postParentType === 'exchange' && postIds.length > 0) {
        const exchangeId = postParentId
        const prevPostIds = (state[postParentId] && state[postParentId].posts) ? state[postParentId].posts.content : []
        return {
          ...state,
          [exchangeId]: {
            ...state[exchangeId],
            posts: {
              content: [ ...postIds, ...prevPostIds],
              isLoading: false,
              error:null
            }
          }
        }
      }
      return {...state}
    // case types.ERRORS.EXCHANGE.GET_EXCHANGES_BY_MEMBER_IDENTITY:
    //   return {
    //     ...state,
    //     [exchangeId]: {
    //       ...state[exchangeId],
    //       exchange: {
    //         content:{},
    //         isLoading: false,
    //         error: message
    //       }
    //     }
    //   }
    /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      if (postParentType === 'exchange') {
        const exchangeId = data.post_parent
        const prevPosts = state[exchangeId] && state[exchangeId].posts
        const prevPostsContent = prevPosts && prevPosts.content
        return {
          ...state,
          [exchangeId]: {
            ...state[exchangeId],
            posts: {
              content: [data.id, ...prevPostsContent],
              isLoading: false,
              error: null
            }
          }
        }
      } else return {
        ...state
      }
    /** -------------------------- delete post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      if (postParentType === 'exchange') {
        const exchangeId = postParentId
        const prevPosts = state[exchangeId] && state[exchangeId].posts
        const prevPostsContent = prevPosts && prevPosts.content
        const newPosts = prevPostsContent.filter(id => id !== postId)
        return {
          ...state,
          [exchangeId]: {
            ...state[exchangeId],
            posts: {
              content: newPosts,
              isLoading: false,
              error: null
            }
          }
        }
      } else return {...state}
    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.exchanges
    default:
      return {...state}
  }
}
export default exchanges