import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'


const getCities = state => state.common.location.city

// selects all cities from state of redux
export const citySelector = createSelector(getCities, cities => cities)


const getCitiesByProvinceId = (state, provinceId) => {
  const list = helpers.filterNestedObjByKey(
      state.common.location.city.list,
      'town_related_province',
      provinceId
  )
  return {list}
}

export default () => {
  /**
   this function makes a copy of selector.
   we using this trick to prevent from recomputing when passing props to a selector.
   (according to documentation)
   **/
  return createSelector(
      getCitiesByProvinceId,
      cities => cities
  )
}