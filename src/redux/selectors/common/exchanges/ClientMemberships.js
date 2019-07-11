import {createSelector} from 'reselect'

const getClientMemberships = (state) => {
  if (state.auth.client.identity.content && state.identities.list[state.auth.client.identity.content] && state.identities.list[state.auth.client.identity.content].exchangeMemberships && state.identities.list[state.auth.client.identity.content].exchangeMemberships.content)
    return state.identities.list[state.auth.client.identity.content].exchangeMemberships.content
  else return []
}

export const clientMemberships = createSelector(
    getClientMemberships,
    exchange => exchange,
)