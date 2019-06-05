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
const getIdentities = state => state.identities.list

/** this selector selects posts by postIdentity or without that. **/
export const makeGetWorkExperiences = (state, props) => {
  return createSelector(
      [getWorkExperiences, getUserWorkExperiences, getIdentities],
      (workExperiences, userWorkExperiences, identities) => {
        const {userId} = props
        if (workExperiences && Object.keys(workExperiences).length !== 0 && workExperiences.constructor === Object && userWorkExperiences && userId) {
          const arrayWorkExperiences = helpers.getObjectOfArrayKeys(userWorkExperiences, workExperiences)
          for (let i = 0; i < arrayWorkExperiences.length; i++) {
            const organizationId = arrayWorkExperiences[i].work_experience_organization
            if (organizationId && identities[organizationId]) {
              arrayWorkExperiences[i].organizationOfficialName = identities[organizationId].official_name
            } else {
              arrayWorkExperiences[i].organizationOfficialName = ''
            }
          }
          return [...arrayWorkExperiences]
        }
        return []
      }
  )
}

