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

const getPostByIdentity = ({postIdentity, postOwnerId, postOwnerType}) => {
  return {
    type: types.COMMON.POST.GET_POST_BY_IDENTITY,
    payload: {
      postIdentity,
      postOwnerId,
      postOwnerType
    }
  }
}

const getPostViewerCount = (postId) => {
  return {
    type: types.COMMON.POST.GET_POST_VIEWER_COUNT,
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

const getPost = ({postId, postOwnerType, postOwnerId}) => {
  return {
    type: types.COMMON.POST.GET_POST,
    payload: {postId, postOwnerType, postOwnerId}
  }
}

const createPost = ({formValues, postOwnerId, postOwnerType, postParentId, postParentType}) => {
  return {
    type: types.COMMON.POST.CREATE_POST,
    payload: {
      formValues,
      postOwnerId,
      postOwnerType,
      postParentId,
      postParentType
    }
  }
}

const updatePost = ({formValues, postId, postOwnerId}) => {
  return {
    type: types.COMMON.POST.UPDATE_POST,
    payload: {
      formValues,
      postId,
      postOwnerId,
    }
  }
}

const deletePost = ({postId, postOwnerId, postOwnerType, postParentId, postParentType}) => {
  return {
    type: types.COMMON.POST.DELETE_POST,
    payload: {
      postId,
      postOwnerId,
      postOwnerType,
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
}

export default PostActions