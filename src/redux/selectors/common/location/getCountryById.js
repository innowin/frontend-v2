import {createSelector} from "reselect"

const getCountryById = (state, id) => state.common.location.country.list[id]

export default () => createSelector(getCountryById, country => country || {})