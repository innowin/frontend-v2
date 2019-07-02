import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getPosts = state => state.common.post.list
const getUserPosts = (state, props) => {
  const ownerId = props.id
  if (state.identities.list[ownerId] && state.identities.list[ownerId].posts)
    return Object.values(state.identities.list[ownerId].posts.content).sort((a, b) => b - a)
  else return undefined
}

export const userPostsSelector = createSelector(
    [getPosts, getUserPosts],
    (posts, userPosts) => {
      if (posts && Object.keys(posts).length !== 0 && posts.constructor === Object && userPosts) {
        const arrayPost = helpers.getObjectOfArrayKeys(userPosts, posts)
        return [...arrayPost]
      }
      else return []
    },
)

