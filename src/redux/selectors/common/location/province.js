import { createSelector } from 'reselect'

const getProvinces = (state, countryId) => {
    /**
     this function filters the provinces (that takes from the state of the redux)
     by the id of country(that takes from the props)
     **/
    const {content: allProvinces, isLoaded, isLoading} = state.common.location.province
    if (countryId) {
        const filteredProvinces = Object.values(allProvinces).filter(province => (
            province.province_related_country === countryId))

        return {
            content: filteredProvinces,
            isLoaded,
            isLoading
        }
    }

    return {content: allProvinces, isLoading, isLoaded}
}

const makeProvinceSelector = () => {
    /**
     this function makes a copy of selector.
     we using this trick to prevent from recomputing when passing props to a selector.
     (according to documentation)
     **/
    return createSelector(
        getProvinces,
        provinces => provinces
    )
}

export default makeProvinceSelector