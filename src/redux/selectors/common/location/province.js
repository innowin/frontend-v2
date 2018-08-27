import { createSelector } from 'reselect'

const getProvinces = state => state.common.location.province

// selects all provinces from state of redux.
export const provinceSelector = createSelector(getProvinces, provinces => provinces)


const getProvincesByCountryId = (state, countryId) => {
    /**
     this function filters the provinces (that takes from the state of the redux)
     by the id of country(that takes from the props)
     **/
    const {list: allProvinces, isLoaded, isLoading} = state.common.location.province
    if (countryId) {
        const filteredProvinces = Object.values(allProvinces).filter(province => (
            province.province_related_country === countryId))

        return {
            list: filteredProvinces,
            isLoaded,
            isLoading
        }
    }

    return {list: allProvinces, isLoading, isLoaded}
}

export const makeProvinceSelector = () => {
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
