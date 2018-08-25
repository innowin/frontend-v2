import initialState from '../initialState'
import types from '../../actions/types'

const posts = (state = initialState.common.posts, action) => {
  const {data} = action.payload || []
  const {message} = action.payload || {}
  const {content} = state || {}

  const indexedPost = {}

  switch (action.type) {
      /** -------------------------- get post by identity -------------------------> **/
    case types.COMMON.GET_POST_BY_IDENTITY:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case types.SUCCESS.COMMON.GET_POST_BY_IDENTITY:
      data.map(post => {
        // let normalPost = {...post, post_identity: post.post_identity.id}
        return indexedPost[post.id] = {...post, error: null}
      })
      return {
        ...state,
        content: {
          ...content,
          ...indexedPost,
        },
        error: null,
        isLoading: false,
      }
    case types.ERRORS.COMMON.GET_POST_BY_IDENTITY:
      return {
        ...state,
        error: message,
        isLoading: false,
      }
      /** -------------------------- create post -------------------------> **/
    case types.COMMON.CREATE_POST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case types.SUCCESS.COMMON.CREATE_POST:
      // TODO:
      return {
        ...state,
        content: {
          ...content,
          [data.id]: {...data, error: null}
        },
        error: null,
        isLoading: false,
      }
    case types.ERRORS.COMMON.CREATE_POST:
      return {
        ...state,
        error: message,
        isLoading: false,
      }

    default:
      return {...state}
  }
}
export default posts