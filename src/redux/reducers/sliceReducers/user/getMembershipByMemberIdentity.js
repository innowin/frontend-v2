import constants from "../../../../consts/constants";

const base = (state, action) => {
  const {exchangeMembershipOwnerId, exchangeMembershipOwnerType} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousMembership = (state[exchangeMembershipOwnerId] && state[exchangeMembershipOwnerId].exchangeMemberships) || defaultObject2

  if(exchangeMembershipOwnerType === constants.USER_TYPES.PERSON){
    return {
      ...state,
      [exchangeMembershipOwnerId]: {
        ...state[exchangeMembershipOwnerId],
        exchangeMemberships: {
          ...previousMembership,
          isLoading: true,
          error: null
        }
      }
    }
  }
  else{
    return state
  }
}

const success = (state, action) => {
  const {exchangeMembershipOwnerId, exchangeMembershipOwnerType, data} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousMembership = (state[exchangeMembershipOwnerId] && state[exchangeMembershipOwnerId].exchangeMemberships) || defaultObject2

  if(exchangeMembershipOwnerType === constants.USER_TYPES.PERSON) {
    const arrayOfMembershipId = data.map(exchangeMembership => exchangeMembership.id)
    return {
      ...state,
      [exchangeMembershipOwnerId]: {
        ...state[exchangeMembershipOwnerId],
        exchangeMemberships: {
          ...previousMembership,
          content: [...new Set([...previousMembership.content, ...arrayOfMembershipId])],
          isLoading: false,
          error: null
        }
      }
    }
  }
  else{
    return state
  }
}

const error = (state, action) => {
  const {exchangeMembershipOwnerId, exchangeMembershipOwnerType, message} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousMembership = (state[exchangeMembershipOwnerId] && state[exchangeMembershipOwnerId].exchangeMemberships) || defaultObject2

  if(exchangeMembershipOwnerType === constants.USER_TYPES.PERSON) {
    return {
      ...state,
      [exchangeMembershipOwnerId]: {
        ...state[exchangeMembershipOwnerId],
        exchangeMemberships: {
          ...previousMembership,
          isLoading: false,
          error: message
        }
      }
    }
  }
  else{
    return state
  }
}

export default {
  base,
  success,
  error,
}