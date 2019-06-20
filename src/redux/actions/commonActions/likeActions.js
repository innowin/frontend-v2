import types from '../types'

const getLikeById = ({likeId}) => ({
  type: types.COMMON.LIKE.GET_LIKE_BY_ID,
  payload: {likeId},
})

const createLike = ({formValues, parentId, likeParentType, getLikes = true}) => ({
  type: types.COMMON.LIKE.CREATE_LIKE,
  payload: {formValues, parentId, likeParentType, getLikes},
})

const deleteLike = ({likeId, parentId, likeParentType}) => ({
  type: types.COMMON.LIKE.DELETE_LIKE,
  payload: {likeId, parentId, likeParentType},
})

const likeActions = {
  createLike,
  deleteLike,
  getLikeById,
}

export default likeActions