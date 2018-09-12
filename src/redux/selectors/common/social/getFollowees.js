import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'

const getFollows = state => state.common.social.follows.list
const getUserFollows = (state, props) => {
  if (state && state.users && state.users[props.userId] && state.users[props.userId].social && state.users[props.userId].social.follows)
    return state.users[props.userId].social.follows.content
  else return undefined
}
const getUsers = state => state.users
const getOrgans = state => state.organs

/** this selector selects followees by identity **/
export const makeGetFolloweesSelector = (state, props) => {
  return createSelector(
      [getFollows, getUserFollows, getUsers, getOrgans],
      (follows, userFollows, users, organs) => {
        const identityId = props.identityId
        if (follows && Object.keys(follows).length !== 0 && follows.constructor === Object && userFollows && identityId) {
          const arrayFollows = helpers.getObjectOfArrayKeys(userFollows, follows)
          const followeeList = arrayFollows.filter(follow => follow.follow_follower.id === identityId).map(follow => {
            let id, img
            if(follow.follow_followed.identity_user){
              id = follow.follow_followed.identity_user
              if(users[id] && users[id].profile && users[id].profile.content.profile_media){
                img = users[id].profile.content.profile_media.file
              }
              else{
                img = ''
              }
            }
            else{
              id = follow.follow_followed.identity_organization
              if(organs[id] && organs[id].organization && organs[id].organization.content.organization_logo){
                img = organs[id].organization.content.organization_logo.file
              }
              else{
                img = ''
              }
            }
            return {
              ...follow.follow_followed,
              img: img,
              follow_id: follow.id,
              follow_accepted: follow.follow_accepted,
            }
          })
          return [...followeeList]
        }
        return []
      }
  )
}