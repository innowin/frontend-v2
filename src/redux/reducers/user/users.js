import initialState from "../initialState"
import types from "../../actions/types/index"

const users = (state = initialState.users, action) => {
  const {userId, badges, message} = action.payload ? action.payload : {}
  const previousUser = state[userId] || {}
  const previousBadges = (state[userId] && state[userId].badges) || {}
  switch (action.type) {
    /** -------------------------- badge -------------------------> **/
    case types.COMMON.SET_BADGES_IN_USER:
      return {
        ...state,
        [userId]: {
          ...previousUser,
          badges: {
            ...previousBadges,
            isLoading: true
          }
        }
      }
    case types.SUCCESS.COMMON.SET_BADGES_IN_USER:
      const ArrayOfBadgeId = badges.map((badge) => badge.id)
      return {
        ...state,
        [userId]: {
          ...previousUser,
          badges: {
            ...previousBadges,
            content: ArrayOfBadgeId,
            isLoading: false
          }
        }
      }
    case types.ERRORS.COMMON.SET_BADGES_IN_USER:
      return {
        ...state,
        [userId]: {
          ...previousUser,
          badges: {
            ...previousBadges,
            isLoading: false,
            error: {
              message
            }
          }
        }
      }

    /** -------------------------- reset users -------------------------> **/
    case types.RESET:
      return initialState.users
    default:
      return state
  }
}

export default users