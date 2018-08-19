import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, put, fork, take} from "redux-saga/effects";
import helpers from "../../../../consts/helperFunctions"
import types from "../../../actions/types"


export function* getCountries(action) {
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_COUNTRIES)
    console.log('------- >>> getCountries >> action : ', action)
    try {
        yield fork(api.get, urls.COMMON.COUNTRY, results.COMMON.GET_COUNTRIES)
        const {data, status} = yield take(socketChannel)
        const normalData = helpers.arrayToIdKeyedObject(data)
        yield put({type: types.SUCCESS.COMMON.GET_COUNTRIES, data: normalData})

    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_COUNTRIES, error})

     } finally {
        socketChannel.close()
    }
}


export function* getProvinces(action) { // action: { payload: { parentId } }
    const {parentId} = action.payload
    const suffix = parentId ? `?province_related_country=${parentId}` : ''
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_PROVINCES)

    console.log('------- >>> getProvinces >> action : ', action)

    try {
        yield fork(api.get, urls.COMMON.PROVINCE, results.COMMON.GET_PROVINCES, suffix)
        const {data, status} = yield take(socketChannel)
        console.log('------- >>> getProvinces >> data : ', data)
        const normalData = helpers.arrayToIdKeyedObject(data)
        yield put({type: types.SUCCESS.COMMON.GET_PROVINCES, data: normalData})

    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_PROVINCES, error})

    } finally {
        socketChannel.close()
    }
}


export function* getCities(action) { // action: { payload: { parentId } }
    const {parentId} = action.payload
    const suffix = parentId ? `?town_related_province=${parentId}` : ''
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_CITIES)

    try {
        yield fork(api.get, urls.COMMON.CITY, results.COMMON.GET_CITIES, suffix)
        const {data} = yield take(socketChannel)
        const normalData = helpers.arrayToIdKeyedObject(data)
        yield put({type: types.SUCCESS.COMMON.GET_CITIES, data: normalData})

    } catch (error) {
        yield put({type: types.ERRORS.COMMON.GET_CITIES, error})

    } finally {
        socketChannel.close()

    }
}
