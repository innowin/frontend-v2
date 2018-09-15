import initialState from './initialState'
import types from '../actions/types'
import constants from 'src/consts/constants'
import slices from './sliceReducers/auth'

const auth = (state = initialState.auth, action) => {
  const {data} = action.payload || {}
  const {user, profile, identity} = data || {}
  const {client} = state

  switch (action.type) {
    /** -------------------------- sign in -------------------------> **/
    case types.AUTH.SET_TOKEN:
      return {
        ...state,
        client: {
          ...client,
          token: action.payload.token
        }
      }
    case types.SUCCESS.AUTH.SIGN_IN:
      const {rememberMe} = action.payload
      const {organization} = data
      const user_type = profile.is_user_organization ? constants.USER_TYPES.ORG : constants.USER_TYPES.PERSON
      return {
        ...state,
        client: {
          ...client,
          user,
          profile,
          identity,
          organization,
          user_type,
          rememberMe,
          posts: [],
          social: {
            follows: []
          },
          isLoggedIn: true,
          error: null,
        }
      }
    case types.ERRORS.AUTH.SIGN_IN:
      const {message: errorMessage} = action.payload
      return {
        ...state,
        client: {
          ...client,
          error: errorMessage
        }
      }
    /** -------------------------- update user by user id -------------------------> **/
    case types.SUCCESS.USER.UPDATE_USER_BY_USER_ID:
      return slices.updateUserByUserId.success(state, action)
    /** -------------------------- update profile by profile id -------------------------> **/
    case types.SUCCESS.USER.UPDATE_PROFILE_BY_PROFILE_ID:
      return slices.updateProfileByProfileId.success(state, action)
    /** -------------------------- get posts by identity  -------------------------> **/
    case types.SUCCESS.COMMON.POST.GET_POST_BY_IDENTITY:
      return slices.getPostByIdentity.success(state, action)
    /** -------------------------- create post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.CREATE_POST:
      return slices.createPost.success(state, action)
    /** -------------------------- delete post  -------------------------> **/
    case types.SUCCESS.COMMON.POST.DELETE_POST:
      return slices.deletePost.success(state, action)
    /** -------------------------- get followers  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWERS:
      return slices.getFollowers.success(state, action)
    /** -------------------------- get followees  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.GET_FOLLOWEES:
      return slices.getFollowees.success(state, action)
    /** -------------------------- delete follow  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.DELETE_FOLLOW:
      return slices.deleteFollow.success(state, action)
    /** -------------------------- delete follow  -------------------------> **/
    case types.SUCCESS.COMMON.SOCIAL.CREATE_FOLLOW:
      return slices.createFollow.success(state, action)
    /** -------------------------- get exchange membership by member identity -------------------------> **/
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY:
      return slices.getExchangeMembershipByMemberIdentity.success(state, action)
    /** -------------------------- delete exchange membership  -------------------------> **/
    case types.SUCCESS.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP:
      return slices.deleteExchangeMembership.success(state, action)
    /** -------------------------- reset  -------------------------> **/
    case types.RESET:
      return initialState.auth
    default:
      return state
  }
}

export default auth