import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'

const getUserPosts = state => state.common.posts


const getPostIdentity = (state, props) => props.postIdentity

/** this selector selects posts by postIdentity or without that. **/
export const makeUserPostsSelector = () => {
  return createSelector(
      [getUserPosts, getPostIdentity],
      (posts, postIdentity) => {
        const allPosts = posts.content
        if (allPosts && postIdentity) {
          const content = helpers.filterNestedObjByNestedKey(allPosts, 'post_identity', 'id', postIdentity)
          return (content)
        }
        return allPosts
      }
  )
}

