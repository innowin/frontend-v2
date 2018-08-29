import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'

const getUserPosts = state => state.common.post.list

const getPostIdentity = (state, props) => props.postIdentity

/** this selector selects posts by postIdentity or without that. **/
export const makeUserPostsSelector = () => {
  return createSelector(
      [getUserPosts, getPostIdentity],
      (posts, postIdentity) => {
        console.log(posts, 'postssss')
        if (posts && posts !== undefined && posts !== {} && postIdentity) {
          const arrayPost = helpers.filterNestedObjByNestedKey(posts, 'post_identity', 'id', postIdentity)
          return [...arrayPost]
        }
        return []
      }
  )
}

