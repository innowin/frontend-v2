import types from '../types'

const filterPostsByPostParentLmitOffset = ({parentId , postType , limit , offset}) => ({
	type: types.COMMON.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
	payload: {parentId , postType , limit , offset}
})

// TODO: mohammad organizationId and other id must be added
const getPostByIdentity = (postIdentity, userId) => {
  return{
    type: types.COMMON.POST.GET_POST_BY_IDENTITY,
    payload: {
      postIdentity,
      userId,
    }
  }
}

const createPost = (formValues, userId) => {
  return{
    type: types.COMMON.POST.CREATE_POST,
    payload: {
      formValues,
      userId,
    }
  }
}

const updatePost = (formValues, postId, userId) => {
  return{
    type: types.COMMON.POST.UPDATE_POST,
    payload: {
      formValues,
      postId,
      userId,
    }
  }
}

const deletePost = (postId, userId) => {
  return{
    type: types.COMMON.POST.DELETE_POST,
    payload: {
      postId,
      userId,
    }
  }
}

const PostActions = {
  getPostByIdentity,
  createPost,
  updatePost,
  deletePost,
  filterPostsByPostParentLmitOffset,
}

export default PostActions