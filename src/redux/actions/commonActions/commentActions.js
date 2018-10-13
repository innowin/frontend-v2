import types from '../types'

const getCommentsByParentId = ({parentId}) => ({
  type: types.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID,
  payload: {parentId},
})

const CommentActions = {
  getCommentsByParentId,
}

export default CommentActions