import createComment from './createComment'
import createPost from './createPost'
import deleteComment from './deleteComment'
import deletePost from './deletePost'
import filterPostsByParentLimitOffset from "./filterPostsByParentLimitOffset"
import getCommentsByParentId from './getCommentsByParentId'
import getPost from './getPost'
import getPostByIdentity from './getPostByIdentity'
import getPostViewerCount from "./getPostViewerCount"
import updatePost from './updatePost'

export default {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  filterPostsByParentLimitOffset,
  getCommentsByParentId,
  getPost,
  getPostByIdentity,
  getPostViewerCount,
  updatePost,
}