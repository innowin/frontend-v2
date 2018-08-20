import {createSelector} from 'reselect'


const getHashTags = (state) => state.common.hashTag

// a small selector for work with hashTags.
export const hashTagsListSelector = createSelector (
    getHashTags,
    hashTags => hashTags.list
)