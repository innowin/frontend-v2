import initialState from '../initialState'
import types from '../../actions/types'

const posts = (state = initialState.common.posts, action) => {
  const {data, message, postId} = action.payload || []
  const indexedPost = {}

  switch (action.type) {
    /** -------------------------- get post by identity -------------------------> **/
    // TODO: mohammad Ryhydrate problem
    case types.SUCCESS.COMMON.GET_POST_BY_IDENTITY:
      data.map(post => indexedPost[post.id] = {...post, error: null, isLoading: false})
      return {
        ...state,
        ...indexedPost,
      }
    /** ------------------------------ get posts by parentId ---------------------- **/
    case types.SUCCESS.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
      const postResults = data.results
      postResults.map(post => {return indexedPost[post.id] = {...post, error: null}})
      return {
        ...state,
        ...indexedPost,
      }
    /** -------------------------- create post -------------------------> **/
    case types.SUCCESS.COMMON.CREATE_POST:
      // TODO: mohammad full identity_object or just id
      return {
        ...state,
        [data.id]: {...data, isLoading: false, error: null}
      }
    /** -------------------------- update post -------------------------> **/
    case types.COMMON.UPDATE_POST:
      return {
        ...state,
        [postId]: {...data, error: null, isLoading: true}
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
    case types.SUCCESS.COMMON.DELETE_POST:
      const {[`${postId}`]: deleted, ...deleteRest} = state
      return {
        ...deleteRest,
      }
    default:
      return {...state}
  }
}
export default posts