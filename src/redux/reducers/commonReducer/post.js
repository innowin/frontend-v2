import initialState from '../initialState'
import types from '../../actions/types'

const posts = (state = initialState.common.posts, action) => {
  const {data, postParent, postId, message} = action.payload || []
  const {previousContent} = state.content || {}

  const indexedPost = {}

  switch (action.type) {
      /** -------------------------- get post by identity -------------------------> **/
    case types.SUCCESS.COMMON.GET_POST_BY_IDENTITY:
      data.map(post => indexedPost[post.id] = {...post, error: null})
      return {
        ...state,
        ...indexedPost,
      }
    /** ------------------------------ get posts by parentId ---------------------- **/
    // case types.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
    //   return {
    //     ...state,
    //     content:{
    //       ...content
    //     },
    //     isLoading: true,
    //     error: null,
    //   }
    case types.SUCCESS.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
      const postResults = data.results
      postResults.map(post => {return indexedPost[post.id] = {...post, error: null}})
      return {
        ...state,
        ...indexedPost,
      }
    // case types.ERRORS.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
    //   return {
    //     ...state,
    //     error: message,
    //     isLoading: false,
    //   }
      /** -------------------------- create post -------------------------> **/
    case types.SUCCESS.COMMON.CREATE_POST:
      // TODO: full identity_object or just id
      return {
        ...state,
        [data.id]: {...data, isLoading: false, error: null}
      }
      /** -------------------------- update post -------------------------> **/
    case types.COMMON.UPDATE_POST:
      return {
        ...state,
        [postId]:{...state[postId], isLoading: true, error: null}
      }
    case types.SUCCESS.COMMON.UPDATE_POST:
      return {
        ...state,
        [postId]: {...data, isLoading: false, error: null}
      }
    case types.ERRORS.COMMON.UPDATE_POST:
      return {
        ...state,
        [postId]:{...state[postId], isLoading: true, error: message}
      }
    /** -------------------------- delete post -------------------------> **/
    case types.COMMON.DELETE_POST:
      return {
        ...state,
        [postId]:{...state[postId], isLoading: true, error: null}
      }
    case types.SUCCESS.COMMON.DELETE_POST:
      const {[postId]:deleted, ...rest} = state
      return {rest}
    case types.ERRORS.COMMON.DELETE_POST:
      return {
        ...state,
        [postId]:{...state[postId], isLoading: true, error: null}
      }

    default:
      return {...state}
  }
}
export default posts