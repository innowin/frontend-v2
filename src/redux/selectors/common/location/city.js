import { createSelector } from 'reselect'


const getCities = state => state.common.location.city

// selects all cities from state of redux
export const citySelector = createSelector(getCities, cities => cities)


const getCitiesByProvinceId = (state, provinceId) => {
    /**
     this function filters the cities (that takes from the state of the redux)
     by the id of province(that takes from the props)
     **/
    const {list: allCities, isLoaded, isLoading} = state.common.location.city

    if (provinceId) {
        const filteredCities = Object.values(allCities).filter(city => (
            city.town_related_province === provinceId))
        return {
            list: filteredCities,
            isLoaded,
            isLoading
        }
    }

    return {list: allCities, isLoading, isLoaded}
}

export const makeCitySelector = () => {
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