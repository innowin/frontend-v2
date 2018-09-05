import initialState from '../initialState'
import types from '../../actions/types'

const post = (state = initialState.common.post, action) => {
  const {data, message, postId} = action.payload || []
  const indexedPost = {}

  switch (action.type) {
    /** -------------------------- get post by identity -------------------------> **/
    // TODO: mohammad Ryhydrate problem
    case types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY:
      data.map(post => indexedPost[post.id] = {...post, error: null, isLoading: false})
      return {
        ...state,
        list: {
          ...state.list,
          ...indexedPost,
        }
      }
    /** ------------------------------ get posts by parentId ---------------------- **/
    case types.SUCCESS.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
      const postResults = data.results
      postResults.map(post => {
        return indexedPost[post.id] = {...post, error: null}
      })
      return {
        ...state,
        list:{
          ...state.list,
          ...indexedPost,
        }
      }
    /** -------------------------- create post -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      // TODO: mohammad full identity_object or just id
      return {
        ...state,
        list:{
          ...state.list,
          [data.id]: {...data, isLoading: false, error: null}
        }
      }
    /** -------------------------- update post -------------------------> **/
    case types.COMMON.POST.UPDATE_POST:
      return {
        ...state,
        list:{
          ...state.list,
          [postId]: {...state.list[postId], error: null, isLoading: true}
        }
      }
    case types.SUCCESS.COMMON.POST.UPDATE_POST:
      return {
        ...state,
        list:{
          ...state.list,
          [postId]: {...data, isLoading: false, error: null}
        }
      }
    case types.ERRORS.COMMON.POST.UPDATE_POST:
      return {
        ...state,
        list:{
          ...state.list,
          [postId]: {...state.list[postId], isLoading: true, error: message}
        }
      }
    /** -------------------------- delete post -------------------------> **/
    case types.COMMON.POST.DELETE_POST:
      return {
        ...state,
        list:{
          ...state.list,
          [postId]: {...state.list[postId], error: null, isLoading: true}
        }
      }
    case types.ERRORS.COMMON.POST.DELETE_POST:
      return {
        ...state,
        list:{
          ...state.list,
          [postId]: {...state.list[postId], isLoading: true, error: message}
        }
      }
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      const {[`${postId}`]: deleted, ...deleteRest} = state.list
      return {
        ...state,
        list: {...deleteRest}
      }
    case types.RESET:
      return initialState.common.post
    default:
      return {...state}
  }
}
export default post