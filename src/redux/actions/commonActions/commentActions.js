import types from '../types'

const getCommentsByParentId = ({parentId, commentParentType, limit, offset}) => ({
  type: types.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID,
  payload: {parentId, commentParentType, limit, offset},
})

const createComment = ({formValues, parentId, commentParentType, getComments = true}) => ({
  type: types.COMMON.COMMENT.CREATE_COMMENT,
  payload: {formValues, parentId, commentParentType, getComments},
})

const deleteComment = ({commentId, parentId, commentParentType}) => ({
  type: types.COMMON.COMMENT.DELETE_COMMENT,
  payload: {commentId, parentId, commentParentType},
})

// never used
const getCommentById = ({commentId}) => ({
  type: types.COMMON.COMMENT.GET_COMMENT_BY_ID,
  payload: {commentId},
})

const CommentActions = {
  getCommentsByParentId,
  createComment,
  deleteComment,
  getCommentById,
}

export default CommentActions