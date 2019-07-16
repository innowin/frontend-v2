import {createSelector} from 'reselect'

const getClient = (state) => {
  const allIdentities = state.identities.list
  const clientIdentityId = state.auth.client.identity.content
  return allIdentities[clientIdentityId]
}

export const getClientObject = createSelector(
    getClient,
    user => user,
)

const getClientId = (state) => state.auth.client.identity.content

export const getClientIdentity = createSelector(
    getClientId,
    user => user,
)