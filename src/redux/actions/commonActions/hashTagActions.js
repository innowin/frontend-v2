import types from '../types'

export const getHashTags = (identity_type) => ({
  type: types.COMMON.GET_HASH_TAGS,
  payload: {identity_type},
})