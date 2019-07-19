import createComment from './createComment'
import createPost from './createPost'
import createLike from './createLike'
import deleteComment from './deleteComment'
import deletePost from './deletePost'
import filterPostsStream from "./filterPostsStream"
import filterPostsByParentLimitOffset from "./filterPostsByParentLimitOffset"
import filterPostsByPostRelatedProduct from "./filterPostsByPostRelatedProduct"
import getCommentsByParentId from './getCommentsByParentId'
import getProposalsByPostId from './getProposalsByPostId'
import createProposal from './createProposal'
import updateProposal from './updateProposal'
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
  createLike,
  deleteComment,
  deletePost,
  filterPostsStream,
  filterPostsByParentLimitOffset,
  filterPostsByPostRelatedProduct,
  getCommentsByParentId,
  getProposalsByPostId,
  createProposal,
  updateProposal,
  getFileByRelatedParentId,
  getPost,
  getPostByIdentity,
  getPostViewerCount,
  updatePost,
  updateFile,
  deleteFile,
  getCommentById,
}