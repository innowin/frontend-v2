import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'

const getUserPosts = state => state.common.posts.content

const getPostIdentity = (state, props) => props.postIdentity

/** this selector selects posts by postIdentity or without that. **/
export const makeUserPostsSelector = () => {
  return createSelector(
      [getUserPosts, getPostIdentity],
      (content, postIdentity) => {
        if (content && content !== undefined && postIdentity) {
          const arrayPost = helpers.filterNestedObjByNestedKey(content, 'post_identity', 'id', postIdentity)
          return [...arrayPost]
        }
        if (Object.keys(content).length === 0)
          return []
        return content
      }
  )
}

