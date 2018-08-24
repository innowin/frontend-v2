import initialState from '../initialState'
import types from '../../actions/types'

const posts = (state = initialState.common.posts, action) => {
  const {data} = action.payload || []
  const {content} = state || {}

  switch (action.type) {
      /** -------------------------- get post by identity -------------------------> **/
    case types.COMMON.GET_POST_BY_IDENTITY:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case types.SUCCESS.COMMON.GET_POST_BY_IDENTITY:
      const indexedPost = {}
      data.map(post => {
        return indexedPost[post.id] = {...post}
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
      const {message} = action.payload
      return {
        ...state,
        error: {
          message
        },
        isLoading: false,
      }
    default:
      return {...state}
  }
}
export default posts