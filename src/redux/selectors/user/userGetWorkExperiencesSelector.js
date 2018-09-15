import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'

const getWorkExperiences = state => state.workExperience.list
const getUserWorkExperiences = (state, props) => {
  const {userId} = props
  if(state && state.users && state.users[userId] && state.users[userId].workExperiences)
    return state.users[userId].workExperiences.content
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

