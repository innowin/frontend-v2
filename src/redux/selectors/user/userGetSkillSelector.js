import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getSkills = state => state.skill.list
const getUserSkills = (state, props) => {
  const {userId} = props
  const usersList = state.users.list
  if(usersList[userId] && usersList[userId].skills)
    return usersList[userId].skills.content
  else return undefined
}

/** this selector selects skills. **/
export const makeGetSkills = (state, props) => {
  return createSelector(
      [getSkills, getUserSkills],
      (skills, userSkills) => {
        const {userId} = props
        if (skills && Object.keys(skills).length !== 0 && skills.constructor === Object && userSkills && userId) {
          const arraySkills = helpers.getObjectOfArrayKeys(userSkills, skills)
          return [...arraySkills]
        }
        return []
      }
  )
}

