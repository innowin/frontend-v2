const base = (state, action) => {
}

const success = (state, action) => {
  const {data, exchangeId} = action.payload
  let object = {}
  let members = []
  data.forEach(p => members.push({id: p.exchange_identity_related_identity}))
  object[exchangeId] = members
  return {
    ...state,
    members: {...state.members, ...object},
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}