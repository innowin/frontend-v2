import initialState from '../initialState'
import types from '../../actions/types'
import slices from '../sliceReducers/common/comment'


const comment = (state = initialState.common.comment, action) => {
  switch (action.type) {
    /** -------------------------- get comments by parent id -------------------------> **/
    case types.SUCCESS.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID:
      return slices.getCommentsByParentId.success(state, action)
    /** -------------------------- create comment -------------------------> **/
    case types.SUCCESS.COMMON.COMMENT.CREATE_COMMENT:
      return slices.createComment.success(state, action)
    /** -------------------------- delete comment -------------------------> **/
    case types.COMMON.COMMENT.DELETE_COMMENT:
      return slices.deleteComment.base(state, action)
    case types.SUCCESS.COMMON.COMMENT.DELETE_COMMENT:
      return slices.deleteComment.success(state, action)
    case types.ERRORS.COMMON.COMMENT.DELETE_COMMENT:
      return slices.deleteComment.error(state, action)
    /** -------------------------- get comment -------------------------> **/
    case types.SUCCESS.COMMON.COMMENT.GET_COMMENT_BY_ID:
      return slices.getCommentById.success(state, action)
    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.common.comment
    default:
      return state
  }
}
export default comment