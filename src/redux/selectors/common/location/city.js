import { createSelector } from 'reselect'

// const getCities

const getCities = (state, provinceId) => {
    /**
     this function filters the cities (that takes from the state of the redux)
     by the id of province(that takes from the props)
     **/
    const {content: allCities, isLoaded, isLoading} = state.common.location.city

    if (provinceId) {
        const filteredCities = Object.values(allCities).filter(city => (
            city.town_related_province === provinceId))
        return {
            content: filteredCities,
            isLoaded,
            isLoading
        }
    }

    return {content: allCities, isLoading, isLoaded}
}

const makeCitySelector = () => {
    /**
     this function makes a copy of selector.
     we using this trick to prevent from recomputing when passing props to a selector.
     (according to documentation)
     **/
    return createSelector(
        getCities,
        cities => cities
    )
}

export default makeCitySelector