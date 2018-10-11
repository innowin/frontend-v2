const base = (state, action) => {
}

const success = (state, action) => {
  const {data, exchangeId} = action.payload

  let object = {}
  let members = []

  data.forEach(p => {
    members.push({
      type: p.exchange_identity_related_identity.identity_user ? 'USER' : 'ORGANIZATION',
      id: p.exchange_identity_related_identity.identity_user ? p.exchange_identity_related_identity.identity_user.id :
          p.exchange_identity_related_identity.identity_organization.id,
    })
    console.log(p.exchange_identity_related_identity.identity_organization ? p.exchange_identity_related_identity.identity_organization.id : "")
  })
  object[exchangeId] = members
  return {
    ...state,
    members: {...state.members, ...object}
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}