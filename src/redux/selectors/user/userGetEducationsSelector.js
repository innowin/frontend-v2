import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'

const getEducations = state => state.education.list
const getUserEducations = (state, props) => {
  const {userId} = props
  if(state.users[userId] && state.users[userId].educations)
    return state.users[userId].educations.content
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

