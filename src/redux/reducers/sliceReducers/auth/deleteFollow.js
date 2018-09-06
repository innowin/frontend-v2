import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {followOwnerType, followId} = action.payload || {}
  const {client} = state
  const previousSocial= (client && client.social) || {}
  const previousFollows = (client && client.social && client.social.follows) || []

  if(followOwnerType === constants.USER_TYPES.PERSON) {
    const newDeletedFollows = previousFollows.filter(id => id !== followId);
    return {
      ...state,
      client: {
        ...client,
        social:{
          ...previousSocial,
          follows: [...newDeletedFollows]
        }
      }
    }
  }
  else{
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