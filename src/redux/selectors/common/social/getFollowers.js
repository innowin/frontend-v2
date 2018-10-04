import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getFollows = state => state.common.social.follows.list
const getUserFollows = (state, props) => {
  const id = props.userId || props.id
  const usersList = state.users.list
  if (usersList[id] && usersList[id].social && usersList[id].social.follows)
    return usersList[id].social.follows.content
  else return undefined
}
const getUsers = state => state.users.list
const getOrgans = state => state.organs.list

/** this selector selects followers by identity **/
export const makeGetFollowersSelector = (state, props) => {
  return createSelector(
      [getFollows, getUserFollows, getUsers, getOrgans],
      (follows, userFollows, users, organsList) => {
        const identityId = props.identityId
        if (follows && Object.keys(follows).length !== 0 && follows.constructor === Object && userFollows && identityId) {
          const arrayFollows = helpers.getObjectOfArrayKeys(userFollows, follows)
          const followerList = arrayFollows.filter(follow => follow.follow_followed.id === identityId).map(follow => {
            let id = 0, img = ''
            if(follow.follow_follower.identity_user){
              id = follow.follow_follower.identity_user
              if(users[id] && users[id].profile && users[id].profile.content.profile_media){
                img = users[id].profile.content.profile_media.file
              }
              else{
                img = ''
              }
            }
            else{
              id = follow.follow_follower.identity_organization
              if(organsList[id] && organsList[id].organization && organsList[id].organization.content.organization_logo){
                img = organsList[id].organization.content.organization_logo.file
              }
              else{
                img = ''
              }
            }
            return {
              ...follow.follow_follower,
              img: img,
              follow_id: follow.id,
              follow_accepted: follow.follow_accepted,
            }
          })
          return [...followerList]
        }
        return []
      }
  )
}