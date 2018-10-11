import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'
import constants from "src/consts/constants"

const getComments = state => state.common.comment.list
const getParentComments = (state, props) => {
  // const ownerId = props.id
  // const {identityType} = props
  // if (identityType === constants.USER_TYPES.PERSON) {
  //   if(state.users.list[ownerId] && state.users.list[ownerId].posts)
  //     return state.users.list[ownerId].posts.content
  // }
  // else if (identityType === constants.USER_TYPES.ORG){
  //   if(state.organs.list[ownerId] && state.organs.list[ownerId].posts)
  //     return state.organs.list[ownerId].posts.content
  // }
  // return undefined
  return [8847, 8893, 8894, 8895]
}


export const userCommentsSelector = createSelector(
    [getComments, getParentComments],
    (posts, parentComments) => {
      if (posts && Object.keys(posts).length !== 0 && posts.constructor === Object && parentComments) {
        const arrayComment = helpers.getObjectOfArrayKeys(parentComments, posts)
        return [...arrayComment]
      }
      return []
    }
)

