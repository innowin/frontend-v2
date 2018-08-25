import initialState from '../initialState'
import types from '../../actions/types'

const posts = (state = initialState.common.posts, action) => {
  const {data, message} = action.payload || []
  const {previousContent} = state.content || {}

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
      data.map(post => indexedPost[post.id] = {...post, error: null})
      return {
        ...state,
        content: {
          ...previousContent,
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
      // TODO: full identity_object or just id
      return {
        ...state,
        content: {
          ...previousContent,
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
      /** -------------------------- update post -------------------------> **/
    case types.COMMON.UPDATE_POST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case types.SUCCESS.COMMON.UPDATE_POST:
      return {
        ...state,
        content: {
          ...previousContent,
          [data.id]: {...data, error: null}
        },
        error: null,
        isLoading: false,
      }
    case types.ERRORS.COMMON.UPDATE_POST:
      return {
        ...state,
        error: message,
        isLoading: false,
      }
    /** -------------------------- delete post -------------------------> **/
    case types.COMMON.DELETE_POST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case types.SUCCESS.COMMON.DELETE_POST:
      return {
        ...state,
        content: {
          ...previousContent,
          [data.id]: {...data, error: null}
        },
        error: null,
        isLoading: false,
      }
    case types.ERRORS.COMMON.DELETE_POST:
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