import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getEducations = state => state.education.list
const getUserEducations = (state, props) => {
  const {userId} = props
  const usersList = state.identities.list
  if(usersList[userId] && usersList[userId].educations)
    return usersList[userId].educations.content
  else return undefined
}

/** this selector selects educations. **/
export const makeGetEducations = (state, props) => {
  return createSelector(
      [getEducations, getUserEducations],
      (educations, userEducations) => {
        const {userId} = props
        if (educations && Object.keys(educations).length !== 0 && educations.constructor === Object && userEducations && userId) {
          const arrayEducations = helpers.getObjectOfArrayKeys(userEducations, educations)
          return [...arrayEducations]
        }
        return []
      }
  )
}

