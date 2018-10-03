import constants from "src/consts/constants"

const base = (state, action) => {
}

const success = (state, action) => {
  const {rememberMe, data} = action.payload
  const {user, profile, identity, organization} = data || {}
  const {client} = state
  const user_type = profile.is_user_organization ? constants.USER_TYPES.ORG : constants.USER_TYPES.PERSON
  return {
    ...state,
    client: {
      ...client,
      user,
      profile,
      identity:{
        content:identity.id,
        isLoading:false,
        error:null
    },
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
}

const error = (state, action) => {
  const {message: errorMessage} = action.payload
  const {client} = state
  return {
    ...state,
    client: {
      ...client,
      error: errorMessage
    }
  }
}

export default {
  base,
  success,
  error,
}