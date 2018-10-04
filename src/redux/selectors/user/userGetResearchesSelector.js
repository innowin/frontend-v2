import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getResearches = state => state.research.list
const getUserResearches = (state, props) => {
  const {userId} = props
  const usersList = state.users.list
  if(usersList[userId] && usersList[userId].researches)
    return usersList[userId].researches.content
  else return undefined
}

/** this selector selects researches. **/
export const makeGetResearches = (state, props) => {
  return createSelector(
      [getResearches, getUserResearches],
      (researches, userResearches) => {
        const {userId} = props
        if (researches && Object.keys(researches).length !== 0 && researches.constructor === Object && userResearches && userId) {
          const arrayEducations = helpers.getObjectOfArrayKeys(userResearches, researches)
          return [...arrayEducations]
        }
        return []
      }
  )
}

