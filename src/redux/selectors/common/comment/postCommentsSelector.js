import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'
import constants from "src/consts/constants"

const getComments = state => state.common.comment.list
const getParentComments = (state, props) => {
  const {commentParentType, match} = props
  const {params} = match
  const parentId = +params.id
  if (commentParentType === constants.COMMENT_PARENT.POST) {
    if(state.common.post.list[parentId])
      return state.common.post.list[parentId].comments
  }
  return undefined
}


export const userCommentsSelector = createSelector(
    [getComments, getParentComments],
    (posts, parentComments) => {
      if (posts && Object.keys(posts).length !== 0 && posts.constructor === Object && parentComments) {
        const arrayComment = helpers.getObjectOfArrayKeysSortByCreateTime(parentComments, posts)
        return [...arrayComment]
      }
      return []
    }
)

