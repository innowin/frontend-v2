import {createSelector} from 'reselect'

const getHashTags = (state) => {
  return state.common.hashTag.hashTags.list || {}
}

// a small selector for work with hashTags.
export const hashTagsListSelector = createSelector(
    getHashTags,
    hashTags => hashTags,
)
