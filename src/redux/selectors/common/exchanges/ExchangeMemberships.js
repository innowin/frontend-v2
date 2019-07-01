import {createSelector} from 'reselect'

const getExchangeMemberships = (state) => {
  return state.common.exchangeMembership.list
}

export const exchangeMemberships = createSelector(
    getExchangeMemberships,
    exchange => exchange,
)