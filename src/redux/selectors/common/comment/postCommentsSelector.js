import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'
import constants from "src/consts/constants"

const getComments = state => state.common.comment.list
const getParentComments = (state, props) => {
  if (props.match && props.commentParentType === constants.COMMENT_PARENT.POST) {
    const {match} = props
    const {params} = match
    const parentId = +params.id
    if(state.common.post.list[parentId])
      return state.common.post.list[parentId].comments
  }
  return undefined
}


export const userCommentsSelector = createSelector(
    [getComments, getParentComments],
    (comments, parentComments) => {
      if (comments && Object.keys(comments).length !== 0 && comments.constructor === Object && parentComments) {
        const arrayComment = helpers.getObjectOfArrayKeysSortByReverseCreateTime(parentComments, comments)
        return [...arrayComment]
      }
      return []
    }
)

