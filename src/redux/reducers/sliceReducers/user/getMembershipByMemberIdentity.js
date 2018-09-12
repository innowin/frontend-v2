import constants from "../../../../consts/constants";

const base = (state, action) => {
  const {membershipOwnerId, membershipOwnerType} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousMembership = (state[membershipOwnerId] && state[membershipOwnerId].memberships) || defaultObject2

  if(membershipOwnerType === constants.USER_TYPES.PERSON){
    return {
      ...state,
      [membershipOwnerId]: {
        ...state[membershipOwnerId],
        memberships: {
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
  const {membershipOwnerId, membershipOwnerType, data} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousMembership = (state[membershipOwnerId] && state[membershipOwnerId].memberships) || defaultObject2

  if(membershipOwnerType === constants.USER_TYPES.PERSON) {
    const arrayOfMembershipId = data.map(membership => membership.id)
    return {
      ...state,
      [membershipOwnerId]: {
        ...state[membershipOwnerId],
        memberships: {
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
  const {membershipOwnerId, membershipOwnerType, message} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousMembership = (state[membershipOwnerId] && state[membershipOwnerId].memberships) || defaultObject2

  if(membershipOwnerType === constants.USER_TYPES.PERSON) {
    return {
      ...state,
      [membershipOwnerId]: {
        ...state[membershipOwnerId],
        memberships: {
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