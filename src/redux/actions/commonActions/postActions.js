import types from '../types'

const filterPostsByPostParentLimitOffset = ({postParentId , postType, postParentType , limit , offset}) => ({
  type: types.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
	payload: {
    postParentId,
    postType,
    limit,
    offset,
    postParentType
  }
})

// TODO: mohammad organizationId and other id must be added
const getPostByIdentity = (postIdentity, postOwnerId) => {
  return{
    type: types.COMMON.POST.GET_POST_BY_IDENTITY,
    payload: {
      postIdentity,
      postOwnerId,
    }
  }
}

const createPost = (formValues, postOwnerId, postParentType="identity") => {
  return{
    type: types.COMMON.POST.CREATE_POST,
    payload: {
      formValues,
      postOwnerId,
      postParentType
    }
  }
}

const updatePost = (formValues, postId, postOwnerId) => {
  return{
    type: types.COMMON.POST.UPDATE_POST,
    payload: {
      formValues,
      postId,
      postOwnerId,
    }
  }
}

const deletePost = (postId, postOwnerId, postParentId, postParentType="identity") => {
  return{
    type: types.COMMON.POST.DELETE_POST,
    payload: {
      postId,
      postOwnerId,
      postParentType
    }
  }
}

const PostActions = {
  getPostByIdentity,
  createPost,
  updatePost,
  deletePost,
  filterPostsByPostParentLimitOffset,
}

export default PostActions