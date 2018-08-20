import types from '../types'

export const getCountries = () => ({
    type: types.COMMON.GET_COUNTRIES,
    payload: {}
})


export const getProvinces = (parentId) => ({
    type: types.COMMON.GET_PROVINCES,
    payload: {parentId}
})


export const getCities = (parentId) => ({
    type: types.COMMON.GET_CITIES,
    payload: {parentId}
})