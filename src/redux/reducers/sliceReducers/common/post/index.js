import createComment from './createComment'
import createPost from './createPost'
import deleteComment from './deleteComment'
import deletePost from './deletePost'
import filterPostsByParentLimitOffset from "./filterPostsByParentLimitOffset"
import filterPostsByPostRelatedProduct from "./filterPostsByPostRelatedProduct"
import getCommentsByParentId from './getCommentsByParentId'
import getProposalsByPostId from './getProposalsByPostId'
import createProposal from './createProposal'
import getFileByRelatedParentId from './getFileByRelatedParentId'
import getPost from './getPost'
import getPostByIdentity from './getPostByIdentity'
import getPostViewerCount from "./getPostViewerCount"
import updatePost from './updatePost'
import updateFile from './updateFile'
import deleteFile from './deleteFile'
import getCommentById from './getCommentById'

export default {
  createComment,
  createPost,
  // createLike,
  deleteComment,
  deletePost,
  filterPostsByParentLimitOffset,
  filterPostsByPostRelatedProduct,
  getCommentsByParentId,
  getProposalsByPostId,
  createProposal,
  getFileByRelatedParentId,
  getPost,
  getPostByIdentity,
  getPostViewerCount,
  updatePost,
  updateFile,
  deleteFile,
  getCommentById,
}