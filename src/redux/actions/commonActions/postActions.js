import types from '../types'

const filterPostsByPostParentLmitOffset = ({parentId , postType , limit , offset}) => ({
	type: types.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
	payload: {parentId , postType , limit , offset}
})

const getPostByIdentity = (postIdentity) => {
  return{
    type: types.COMMON.GET_POST_BY_IDENTITY,
    payload: {
      postIdentity
    }
  }
}

const createPost = (formValues) => {
  return{
    type: types.COMMON.CREATE_POST,
    payload: {
      formValues
    }
  }
}

const updatePost = (formValues, postId) => {
  return{
    type: types.COMMON.UPDATE_POST,
    payload: {
      formValues,
      postId,
    }
  }
}

const deletePost = (postId) => {
  return{
    type: types.COMMON.DELETE_POST,
    payload: {
      postId,
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