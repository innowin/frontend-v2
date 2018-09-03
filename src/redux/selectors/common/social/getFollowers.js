import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'

const getFollows = state => state.common.social.follows.list
const getUserFollows = (state, props) => {
  if (state && state.users && state.users[props.userId] && state.users[props.userId].social && state.users[props.userId].social.follows)
    return state.users[props.userId].social.follows.content
  else return undefined
}
const getIdentityId = (state, props) => props.identityId

/** this selector selects followers by identity **/
export const makeGetFollowersSelector = (state) => {
  return createSelector(
      [getFollows, getUserFollows, getIdentityId],
      (follows, userFollows, identityId) => {
        if (follows && Object.keys(follows).length !== 0 && follows.constructor === Object && userFollows && identityId) {
          const arrayFollows = helpers.getObjectOfArrayKeys(userFollows, follows)
          const followerList = arrayFollows.filter(follow => follow.follow_followed.id === identityId).map(follow => {
            let id = 0, img = ''
            if(follow.follow_follower.identity_user){
              id = follow.follow_follower.identity_user
              if(state.users[id] && state.users[id].profile.content.profile_media){
                img = state.users[id].profile.content.profile_media.file
              }
              else{
                img = null
              }
            }
            else{
              id = follow.follow_follower.identity_organization
              if(state.organs[id] && state.organs[id].organization.content.organization_logo){
                img = state.organs[id].organization.content.organization_logo.file
              }
              else{
                img = ''
              }
            }
            return {
              ...follow.follow_follower,
              img: img
            }
          })
          return [...followerList]
        }
        return []
      }
  )
}