import { createSelector } from 'reselect'


const getCountries = state => state.common.location.country

const countrySelector = createSelector(
    getCountries,
    country => country
)

export default countrySelector