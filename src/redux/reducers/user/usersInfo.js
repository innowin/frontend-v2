import initialState from "../initialState"
import types from "../../actions/types/index"

const usersInfo = (state = initialState.usersInfo, action) => {
  const {userId, data, message} = action.payload ? action.payload : {}
  const previousUser = (state[userId] && state[userId].user) ? (state[userId].user) : ({
    /* this object is default value for user object if this state[userId] or state[userId].user
    not exist in state object */
    content: {},
    isLoading: false,
    error: {
      message: null
    }
  })
  const previousProfile = (state[userId] && state[userId].profile) ? (state[userId].profile) : ({
    content: {},
    isLoading: false,
    error: {
      message: null
    }
  })
  switch (action.type) {
    /** -------------------------- get user -------------------------> **/
    case types.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            isLoading: true
          }
        }
      }
    case types.SUCCESS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            content: {...data},
            isLoading: false
          }
        }
      }
    case types.ERRORS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...previousUser,
            isLoading: false,
            error: {
              message
            }
          }
        }
      }

    /** -------------------------- get profile -------------------------> **/
    case types.USER.GET_PROFILE_BY_USER_ID:
      // initial structure build in first request for getProfile is called but profile isLoading is true:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...previousProfile,
            isLoading: true
          }
        }
      }
    case types.SUCCESS.USER.GET_PROFILE_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...previousProfile,
            content: {...data},
            isLoading: false
          }
        }
      }
    case types.ERRORS.USER.GET_PROFILE_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...previousProfile,
            error: {
              message
            },
            isLoading: false
          }
        }

      }

    /** -------------------------- reset usersInfo -------------------------> **/
    case types.RESET:
      return initialState.usersInfo
    default:
      return state
  }
}

export default usersInfo