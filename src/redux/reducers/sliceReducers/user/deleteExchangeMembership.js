const base = (state, action) => {
}

const success = (state, action) => {
  const {exchangeMembershipOwnerId, exchangeMembershipId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousMembership = (state.list[exchangeMembershipOwnerId] && state.list[exchangeMembershipOwnerId].exchangeMemberships) || defaultObject2
  const newDeletedMemberships = previousMembership.content.filter(id => id !== exchangeMembershipId);
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

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}