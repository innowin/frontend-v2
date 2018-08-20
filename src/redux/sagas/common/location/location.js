import {takeEvery} from "redux-saga/effects";
import types from "../../../actions/types";
import {getCities, getCountries, getProvinces} from "./getLcation"


function* watchGetCountries() {
    yield takeEvery(types.COMMON.GET_COUNTRIES, getCountries)
}

function* watchGetProvinces() {
    yield takeEvery(types.COMMON.GET_PROVINCES, getProvinces)
}

function* watchGetCities() {
    yield takeEvery(types.COMMON.GET_CITIES, getCities)
}

export default {
    watchGetCountries,
    watchGetProvinces,
    watchGetCities
}