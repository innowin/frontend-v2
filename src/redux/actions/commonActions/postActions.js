import types from '../types'

const filterPostsByPostParentLimitOffset = ({parentId , postType , limit , offset}) => ({
	type: types.COMMON.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
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

const createPost = (formValues, resolveFunc: () => null) => {
  return{
    type: types.COMMON.CREATE_POST,
    payload: {
      formValues,
      resolveFunc
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
  filterPostsByPostParentLimitOffset,
}

export default PostActions