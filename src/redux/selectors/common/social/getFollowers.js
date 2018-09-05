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

/** this selector selects followers by identity **/
export const makeGetFollowersSelector = (state, props) => {
  return createSelector(
      [getFollows, getUserFollows, getUsers, getOrgans],
      (follows, userFollows, users, organs) => {
        const identityId = props.identityId
        if (follows && Object.keys(follows).length !== 0 && follows.constructor === Object && userFollows && identityId) {
          const arrayFollows = helpers.getObjectOfArrayKeys(userFollows, follows)
          const followerList = arrayFollows.filter(follow => follow.follow_followed.id === identityId).map(follow => {
            let id = 0, img = ''
            if(follow.follow_follower.identity_user){
              id = follow.follow_follower.identity_user
              if(users[id] && users[id].profile.content.profile_media){
                img = users[id].profile.content.profile_media.file
              }
              else{
                img = ''
              }
            }
            else{
              id = follow.follow_follower.identity_organization
              if(organs[id] && organs[id].organization.content.organization_logo){
                img = organs[id].organization.content.organization_logo.file
              }
              else{
                img = ''
              }
            }
            return {
              ...follow.follow_follower,
              img: img,
              follow_id: follow.id,
            }
          })
          return [...followerList]
        }
        return []
      }
  )
}