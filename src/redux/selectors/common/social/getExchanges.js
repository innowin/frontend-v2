import {createSelector} from 'reselect'

const getExchanges = state => state.exchanges

/** this selector selects exchanges by identity **/
export const makeGetExchangesSelector = (state, props) => {
  return createSelector(
      [getExchanges],
      (exchanges) => {
        const {identityId} = props
        console.log(exchanges, 'exchangesss')
        // return Object.keys(exchanges).map(id => exchanges[id].exchange.content).filter(exchange => exchange.related_identity.id === identityId)
        return []
      }
  )
}