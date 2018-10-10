import constants from "src/consts/constants"

const base = (state, action) => {
}

const success = (state, action) => {
  const {exchangeMembershipOwnerId, exchangeMembershipOwnerType, exchangeMembershipId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousMembership = (state.list[exchangeMembershipOwnerId] && state.list[exchangeMembershipOwnerId].exchangeMemberships) || defaultObject2

  if (exchangeMembershipOwnerType === constants.USER_TYPES.ORG) {
    const newDeletedMemberships = previousMembership.content.filter(id => id !== exchangeMembershipId)
    return {
      ...state,
      list: {
        ...state.list,
        [exchangeMembershipOwnerId]: {
          ...state.list[exchangeMembershipOwnerId],
          exchangeMemberships: {
            ...previousMembership,
            content: [...newDeletedMemberships],
            isLoading: false,
            error: null
          }
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