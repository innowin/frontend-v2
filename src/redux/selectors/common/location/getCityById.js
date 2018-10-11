import {createSelector} from "reselect";


const getCityById = (state, id) => state.common.location.city.list[id]

export default () => {
  return createSelector(
      getCityById,
      city => city || {}
  )
}