import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getWorkExperiences = state => state.workExperience.list
const getUserWorkExperiences = (state, props) => {
  const {userId} = props
  const usersList = state.identities.list
  if(usersList[userId] && usersList[userId].workExperiences)
    return usersList[userId].workExperiences.content
  else return undefined
}

/** this selector selects posts by postIdentity or without that. **/
export const makeGetWorkExperiences = (state, props) => {
  return createSelector(
      [getWorkExperiences, getUserWorkExperiences],
      (workExperiences, userWorkExperiences) => {
        const {userId} = props
        if (workExperiences && Object.keys(workExperiences).length !== 0 && workExperiences.constructor === Object && userWorkExperiences && userId) {
          const arrayWorkExperiences = helpers.getObjectOfArrayKeys(userWorkExperiences, workExperiences)
          return [...arrayWorkExperiences]
        }
        return []
      }
  )
}

