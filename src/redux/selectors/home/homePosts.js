import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getPosts = state => state.common.post.list
const getExchanges = state => state.exchanges.list
const getProducts = state => state.common.product.products.list
const getExchangePosts = (state, props) => {
  const {exchangeId} = props
  return state.exchanges.list[exchangeId] && state.exchanges.list[exchangeId].posts && state.exchanges.list[exchangeId].posts.content
      ? Object.values(state.exchanges.list[exchangeId].posts.content).sort((a, b) => b - a)
      : []
}
const getExchangeId = (state, props) => props.exchangeId

export const exchangePostsSelector = createSelector(
    [getPosts, getExchanges, getProducts, getExchangePosts, getExchangeId],
    (posts, exchanges, products, exchangePosts, exchangeId) => {
      if (posts && Object.keys(posts).length !== 0 && posts.constructor === Object && exchangePosts && exchangeId) {
        const arrayPost = helpers.getObjectOfArrayKeys(exchangePosts, posts)

        return [...arrayPost.map(post => {
          const postRelatedProduct = post && post.post_related_product
          const postRelatedProductId = postRelatedProduct && post.post_related_product.id
          if (postRelatedProduct && postRelatedProductId) {
            return {...post, post_related_product: products[postRelatedProductId]}
          }
          else if (postRelatedProduct && !postRelatedProductId) {
            return {...post, post_related_product: products[postRelatedProduct]}
          }
          else {
            return post
          }
        })]
      }
      return []
    },
)

