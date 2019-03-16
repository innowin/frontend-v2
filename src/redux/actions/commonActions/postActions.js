import types from '../types'

const filterPostsByPostParentLimitOffset = ({postParentId, postType, postParentType, limit, offset}) => ({
  type: types.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
  payload: {
    postParentId,
    postType,
    limit,
    offset,
    postParentType
  }
})

const filterPostsByPostRelatedProduct = ({postRelatedProductId, postType, postParentType, limit, offset}) => ({
  type: types.COMMON.POST.FILTER_POSTS_BY_POST_RELATED_PRODUCT,
  payload: {
    postRelatedProductId,
    postType,
    limit,
    offset,
    postParentType
  }
})

const getPostByIdentity = ({postIdentity, postOwnerId}) => {
  return {
    type: types.COMMON.POST.GET_POST_BY_IDENTITY,
    payload: {
      postIdentity,
      postOwnerId,
    }
  }
}

const getPostViewerCount = (postId) => {
  return {
    // type: types.COMMON.POST.GET_POST_VIEWER_COUNT,
    type: '',
    payload: {
      postId
    }
  }
}

const setPostViewer = (postId, getPostViewerCount) => {
  return {
    type: types.COMMON.POST.SET_POST_VIEWER,
    payload: {
      postId,
      getPostViewerCount
    }
  }
}

const getPost = ({postId, postOwnerId}) => {
  return {
    type: types.COMMON.POST.GET_POST,
    payload: {postId, postOwnerId}
  }
}

const createPost = ({formValues, postOwnerId, postParentId, postParentType, postFileIds = []}) => {
  return {
    type: types.COMMON.POST.CREATE_POST,
    payload: {
      formValues,
      postOwnerId,
      postParentId,
      postParentType,
      postFileIds
    }
  }
}

const updatePost = ({formValues, postId, postOwnerId, postFileIds}) => {
  return {
    type: types.COMMON.POST.UPDATE_POST,
    payload: {
      formValues,
      postId,
      postOwnerId,
      postFileIds,
    }
  }
}

const deletePost = ({postId, postOwnerId, postParentId, postParentType}) => {
  return {
    type: types.COMMON.POST.DELETE_POST,
    payload: {
      postId,
      postOwnerId,
      postParentId,
      postParentType
    }
  }
}

const PostActions = {
  getPostByIdentity,
  getPostViewerCount,
  setPostViewer,
  getPost,
  createPost,
  updatePost,
  deletePost,
  filterPostsByPostParentLimitOffset,
  filterPostsByPostRelatedProduct
}

export default PostActions