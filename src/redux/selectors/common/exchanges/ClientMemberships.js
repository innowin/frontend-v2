import {createSelector} from 'reselect'

const getClientMemberships = (state) => {
  return state.auth.client.exchangeMemberships
}

export const clientMemberships = createSelector(
    getClientMemberships,
    exchange => exchange,
)