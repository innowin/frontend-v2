import types from '../types'


export const getHashTags = () => ({
    type: types.COMMON.GET_HASH_TAGS,
    payload: {}
})

export const getObjHashTags = (parentId) => ({
  type: types.COMMON.GET_OBJ_HASH_TAGS,
  payload: {parentId}
})