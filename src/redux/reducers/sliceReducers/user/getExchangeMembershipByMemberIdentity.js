const base = (state, action) => {
  const {exchangeMembershipOwnerId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousMembership = (state.list[exchangeMembershipOwnerId] && state.list[exchangeMembershipOwnerId].exchangeMemberships) || defaultObject2
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeMembershipOwnerId]: {
        ...state.list[exchangeMembershipOwnerId],
        exchangeMemberships: {
          ...previousMembership,
          isLoading: true,
          error: null,
        },
      },
    },
  }
}

const success = (state, action) => {
  const {exchangeMembershipOwnerId, data} = action.payload
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousMembership = (state.list[exchangeMembershipOwnerId] && state.list[exchangeMembershipOwnerId].exchangeMemberships) || defaultObject2
  const arrayOfMembershipId = data.map(exchangeMembership => exchangeMembership.id)
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeMembershipOwnerId]: {
        ...state.list[exchangeMembershipOwnerId],
        exchangeMemberships: {
          ...previousMembership,
          content: arrayOfMembershipId,
          isLoading: false,
          error: null,
        },
      },
    },
  }
}

const error = (state, action) => {
  const {exchangeMembershipOwnerId, message} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousMembership = (state.list[exchangeMembershipOwnerId] && state.list[exchangeMembershipOwnerId].exchangeMemberships) || defaultObject2
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeMembershipOwnerId]: {
        ...state.list[exchangeMembershipOwnerId],
        exchangeMemberships: {
          ...previousMembership,
          isLoading: false,
          error: message,
        },
      },
    },
  }
}

export default {
  base,
  success,
  error,
}