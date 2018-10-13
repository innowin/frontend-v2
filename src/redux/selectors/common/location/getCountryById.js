import {createSelector} from "reselect";


const getCountryById = (state, id) => state.common.location.country.list[id]

export default () => {
  return createSelector(
      getCountryById,
      country => country || {}
  )
}