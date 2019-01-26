import {createSelector} from 'reselect'

let postsSelector = (state, exchangeId) => {
  return Object.values(state.common.post.list).reverse().filter(p => p.post_parent && p.post_parent.id === exchangeId)
}

export const exchangePostSelector = createSelector(
    postsSelector,
    posts => posts
)