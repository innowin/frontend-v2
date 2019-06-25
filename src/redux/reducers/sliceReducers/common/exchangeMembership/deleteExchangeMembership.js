const base = (state, action) => {
  const {exchangeMembershipId} = action.payload
  const prevMembership = state.list[exchangeMembershipId]
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeMembershipId]: {...prevMembership, error: null, isLoading: true},
    },
  }
}

const success = (state, action) => {
  const {exchangeMembershipId} = action.payload
  const temp = {...state.list}
  delete temp[exchangeMembershipId]
  return {
    ...state,
    list: {...temp},
  }
}

const error = (state, action) => {
  const {message, exchangeMembershipId} = action.payload
  const prevMembership = state.list[exchangeMembershipId]
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeMembershipId]: {...prevMembership, isLoading: true, error: message},
    },
  }
}

export default {
  base,
  success,
  error,
}