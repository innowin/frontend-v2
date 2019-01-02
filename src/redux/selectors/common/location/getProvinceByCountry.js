import {createSelector} from 'reselect'
import helpers from "../../../../consts/helperFunctions/helperFunctions";

const getProvinces = state => state.common.location.province

// selects all provinces from state of redux.
export const provinceSelector = createSelector(getProvinces, provinces => provinces)


const getProvincesByCountryId = (state, countryId) => {
  const list = helpers.filterNestedObjByKey(
      state.common.location.province.list,
      'province_related_country',
      countryId
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
      getProvincesByCountryId,
      provinces => provinces
  )
}