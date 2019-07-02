import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getPosts = state => state.common.post.list
const getExchangePosts = (state, props) => {
  const {exchangeId} = props
  return state.exchanges.list[exchangeId] && state.exchanges.list[exchangeId].posts && state.exchanges.list[exchangeId].posts.content
      ? Object.values(state.exchanges.list[exchangeId].posts.content).sort((a, b) => b - a) : []
}

export const exchangePostsSelector = createSelector(
    [getPosts, getExchangePosts],
    (posts, exchangePosts) => {
      if (posts && Object.keys(posts).length !== 0 && posts.constructor === Object && exchangePosts) {
        const arrayPost = helpers.getObjectOfArrayKeys(exchangePosts, posts)
        return [...arrayPost]
      }
      return []
    },
)

