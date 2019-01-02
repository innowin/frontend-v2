import {takeEvery} from "redux-saga/effects";
import types from "../../../actions/types";
import {
  getCities,
  getCountries,
  getProvinces,
  getCountry,
  getCity,
  getProvince
} from "./getLcation"


function* watchGetCountries() {
  yield takeEvery(types.COMMON.GET_COUNTRIES, getCountries)
}

function* watchGetProvinces() {
  yield takeEvery(types.COMMON.GET_PROVINCES, getProvinces)
}

function* watchGetCities() {
  yield takeEvery(types.COMMON.GET_CITIES, getCities)
}

function* watchGetProvince() {
  yield takeEvery(types.COMMON.GET_PROVINCE, getProvince)
}

function* watchGetCity() {
  yield takeEvery(types.COMMON.GET_CITY, getCity)
}

function* watchGetCountry() {
  yield takeEvery(types.COMMON.GET_COUNTRY, getCountry)
}

export default [
  watchGetCountries(),
  watchGetProvinces(),
  watchGetCities(),
  watchGetCountry(),
  watchGetCity(),
  watchGetProvince()
]