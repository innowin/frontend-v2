import constants from 'src/consts/constants'

const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const {identity} = data || {}
  if(identity.identity_type === constants.USER_TYPES.ORG) {
    return {
      ...state,
      list: {
        ...state.list,
        [identity.id]: {
          ...state.list[identity.id],
          ...identity
        }
      }
    }
  }
  else {
    return state
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}