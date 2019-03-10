import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getPosts = state => state.common.post.list
const getUserPosts = (state, props) => {
  const ownerId = props.id
  if (state.identities.list[ownerId] && state.identities.list[ownerId].posts)
    return state.identities.list[ownerId].posts.content
  else return undefined
}
const getOwnerId = (state, props) => props.id


export const userPostsSelector = createSelector(
    [getPosts, getUserPosts, getOwnerId],
    (posts, userPosts, ownerId) => {
      if (posts && Object.keys(posts).length !== 0 && posts.constructor === Object && userPosts && ownerId) {
        const arrayPost = helpers.getObjectOfArrayKeys(userPosts, posts)
        return [...arrayPost]
      }
      return []
    },
)

