import types from '../types'

const getCommentsByParentId = ({parentId, commentParentType, limit, offset}) => ({
  type: types.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID,
  payload: {parentId, commentParentType, limit, offset},
})

const createComment = ({formValues, parentId, commentParentType}) => ({
  type: types.COMMON.COMMENT.CREATE_COMMENT,
  payload: {formValues, parentId, commentParentType},
})

const deleteComment = ({commentId, parentId, commentParentType}) => ({
  type: types.COMMON.COMMENT.DELETE_COMMENT,
  payload: {commentId, parentId, commentParentType},
})

const CommentActions = {
  getCommentsByParentId,
  createComment,
  deleteComment,
}

export default CommentActions