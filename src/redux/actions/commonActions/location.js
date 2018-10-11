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

export const getCityById = (id) => ({
  type: types.COMMON.GET_CITY,
  payload: {id}
})

export const getProvinceById = (id) => ({
  type: types.COMMON.GET_PROVINCE,
  payload: {id}
})

export const getCountryById = (id) => ({
  type: types.COMMON.GET_COUNTRY,
  payload: {id}
})