import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'

const getPosts = state => state.common.post.list
const getUserPosts = (state, props) => {
  if(state && state.users && state.users[props.id] && state.users[props.id].posts)
    return state.users[props.id].posts.content
  else return undefined
}

/** this selector selects posts by postIdentity or without that. **/
export const makeUserPostsSelector = (state, props) => {
  return createSelector(
      [getPosts, getUserPosts],
      (posts, userPosts) => {
        const userId = props.id
        if (posts && Object.keys(posts).length !== 0 && posts.constructor === Object && userPosts && userId) {
          const arrayPost = helpers.getObjectOfArrayKeys(userPosts, posts)
          return [...arrayPost]
        }
        return []
      }
  )
}

