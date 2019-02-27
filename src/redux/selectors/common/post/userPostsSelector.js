import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'
import constants from "src/consts/constants"

const getPosts = state => state.common.post.list
const getUserPosts = (state, props) => {
  const ownerId = props.id
  const {identityType} = props
  if (identityType === constants.USER_TYPES.USER) {
    if (state.users.list[ownerId] && state.users.list[ownerId].posts)
      return state.users.list[ownerId].posts.content
  }
  else if (identityType === constants.USER_TYPES.ORG) {
    if (state.organs.list[ownerId] && state.organs.list[ownerId].posts)
      return state.organs.list[ownerId].posts.content
  }
  return undefined
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
    }
)

