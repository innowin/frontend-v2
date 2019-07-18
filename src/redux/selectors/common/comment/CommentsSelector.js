import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getComments = state => state.common.comment.list
const getParentComments = (state, props) => {
  const {post} = props
  const parentId = post.id
  if (state.common.post.list[parentId])
    return state.common.post.list[parentId].comments
}

export const CommentsSelector = createSelector(
    [getComments, getParentComments],
    (comments, parentComments) => {
      if (comments && Object.keys(comments).length !== 0 && comments.constructor === Object && parentComments) {
        const arrayComment = helpers.getObjectOfArrayKeysSortByReverseCreateTime(parentComments, comments)
        return [...arrayComment]
      }
      else return []
    },
)

export const GetAllComments = createSelector(
    [getComments, getParentComments],
    (comments, parentComments) => {
      if (comments && Object.keys(comments).length !== 0 && comments.constructor === Object && parentComments) {
        let data = {}
        parentComments.forEach(comment => {
          data[comment] = comments[comment]
        })
        return data
      }
      else return {}
    },
)