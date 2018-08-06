import initialState from "../initialState"
import types from "../../actions/types/index"

const usersInfo = (state = initialState.usersInfo, action) => {
  const {userId, data, message} = action.payload
  switch (action.type) {
    //type of  USERNAME_CHECK is not need to set in states because its result and error is handle by result handler function
    case types.USER.GET_USER_BY_USER_ID:
      // initial structure build in first request for get user is call but user isLoading is true:
      return {
        ...state,
        [userId]: {
          user: {
            error: {
              message: null
            },
            content: {},
            isLoading: true
          },
          profile: {
            content: {},
            isLoading: false,
            error: {
              message: null
            }
          }
        }
      }
    case types.SUCCESS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          user: {
            ...state[userId].user,
            content: {...data},
            isLoading: false
          }
        }
      }
    case types.ERRORS.USER.GET_USER_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          user: {
            ...state[userId].user,
            isLoading: false,
            error: {
              message
            }
          }
        }
      }
    case types.USER.GET_PROFILE_BY_USER_ID:
      // initial structure build in first request for get user is call but profile isLoading is true:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            content: {},
            isLoading: true,
            error: {
              message: null
            }
          }
        }
      }
    case types.SUCCESS.USER.GET_PROFILE_BY_USER_ID:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          profile: {
            ...state[userId].profile,
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
            ...state[userId].profile,
            error: {
              message
            },
            content: {...data},
            isLoading: false
          }
        }

      }
    case types.RESET:
      return initialState.users
    default:
      return state
  }
}

export default usersInfo