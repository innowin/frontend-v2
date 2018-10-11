import {createSelector} from "reselect";


const getProvinceById = (state, id) => state.common.location.province.list[id]

export default () => {
  return createSelector(
      getProvinceById,
      province => province || {}
  )
}