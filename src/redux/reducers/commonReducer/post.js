import initialState from '../initialState'
import types from '../../actions/types'
import slices from '../sliceReducers/common/post'

const post = (state = initialState.common.post, action) => {

  switch (action.type) {
    /** -------------------------- get post by identity -------------------------> **/
    case types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY:
      return slices.getPostByIdentity.success(state, action)
    /** ------------------------------ get posts by parentId ---------------------- **/
    case types.SUCCESS.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET:
      return slices.filterPostsByParentLimitOffset.success(state, action)

    case types.SUCCESS.COMMON.POST.FILTER_POSTS_BY_POST_RELATED_PRODUCT:
      return slices.filterPostsByPostRelatedProduct.success(state, action)
    /** ------------------------------ get post viewer counts ---------------------- **/
    case types.SUCCESS.COMMON.POST.GET_POST_VIEWER_COUNT:
      return slices.getPostViewerCount.success(state, action)
    /** ------------------------------ get post ---------------------- **/
    case types.SUCCESS.COMMON.POST.GET_POST:
      return slices.getPost.success(state, action)
    /** -------------------------- create post -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      return slices.createPost.success(state, action)
    /** -------------------------- update post -------------------------> **/
    case types.COMMON.POST.UPDATE_POST:
      return slices.updatePost.base(state, action)
    case types.SUCCESS.COMMON.POST.UPDATE_POST:
      return slices.updatePost.success(state, action)
    case types.ERRORS.COMMON.POST.UPDATE_POST:
      return slices.updatePost.error(state, action)
    /** -------------------------- delete post -------------------------> **/
    case types.COMMON.POST.DELETE_POST:
      return slices.deletePost.base(state, action)
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      return slices.deletePost.success(state, action)
    case types.ERRORS.COMMON.POST.DELETE_POST:
      return slices.deletePost.error(state, action)
    /** -------------------------- get comments by parent id -------------------------> **/
    case types.SUCCESS.COMMON.COMMENT.GET_COMMENTS_BY_PARENT_ID:
      return slices.getCommentsByParentId.success(state, action)
    /** -------------------------- create comment -------------------------> **/
    case types.SUCCESS.COMMON.COMMENT.CREATE_COMMENT:
      return slices.createComment.success(state, action)
    /** -------------------------- delete comment -------------------------> **/
    case types.SUCCESS.COMMON.COMMENT.DELETE_COMMENT:
      return slices.deleteComment.success(state, action)
    /** -------------------------- get file by related parent id  -------------------------> **/
    case types.SUCCESS.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID:
      return slices.getFileByRelatedParentId.success(state, action)
    /** -------------------------- update file  -------------------------> **/
    case types.SUCCESS.COMMON.FILE.UPDATE_FILE:
      return slices.updateFile.success(state, action)
      /** -------------------------- update file  -------------------------> **/
    case types.SUCCESS.COMMON.FILE.DELETE_FILE:
      return slices.deleteFile.success(state, action)
    /** -------------------------- reset -------------------------> **/
    case types.RESET:
      return initialState.common.post
    default:
      return state
  }
}
export default post