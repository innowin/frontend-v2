import types from '../types'

const createLike = ({like_sender, like_parent}) => ({
  type: types.COMMON.LIKE.CREATE_LIKE,
  payload: {like_sender, like_parent},
})

const likeActions = {
  createLike,
}

export default likeActions