import types from '../types'

const createLike = ({like_sender, like_parent}) => ({
  type: types.COMMON.LIKE.CREATE_LIKE,
  payload: {like_sender, like_parent},
})

// const getLikeById = ({likeId}) => ({
//   type: types.COMMON.LIKE.GET_LIKE_BY_ID,
//   payload: {likeId},
// })
//
// const deleteLike = ({likeId, parentId, likeParentType}) => ({
//   type: types.COMMON.LIKE.DELETE_LIKE,
//   payload: {likeId, parentId, likeParentType},
// })

const likeActions = {
  createLike,
  // deleteLike,
  // getLikeById,
}

export default likeActions