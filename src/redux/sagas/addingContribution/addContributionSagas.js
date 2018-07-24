import {call, fork, put, take, takeEvery} from "redux-saga/effects"
import types from "../../actions/actionTypes"
import api from "../../../consts/api"
import urls from "../../../consts/URLS"
import results from "../../../consts/resultName"

function* createSkill(action){
    const formValues = action.data
    const socketChannel = yield call(api.createSocketChannel, results.CREATE_Skill)
    try {
        yield fork(api.post ,urls.CREATE_Skill, results.CREATE_Skill ,formValues )
        const data = yield take(socketChannel)
        console.log(data)
        yield put({ type: types.SUCCESS.CREATE_SKILL, payload:data })
    } catch (e) {
        const {message} = e
        console.log(message)
        yield put({type:types.ERRORS.CREATE_SKILL, payload:{type:types.ERRORS.CREATE_SKILL,message}})
    } finally {
        socketChannel.close()
    }
}

function* createProduct(action){
    const formValues = action.data
    console.log('formvalue is: ', formValues)
    const socketChannel = yield call(api.createSocketChannel, results.CREATE_PRODUCT)
    try {
        yield fork(api.post ,urls.CREATE_PRODUCT, results.CREATE_PRODUCT ,formValues)
        const data = yield take(socketChannel)
        console.log(data)
        yield put({ type: types.SUCCESS.CREATE_PRODUCT, payload:data })
    } catch (e) {
        const {message} = e
        console.log(message)
        yield put({type:types.ERRORS.CREATE_PRODUCT, payload:{type:types.ERRORS.CREATE_PRODUCT,message}})
    } finally {
        socketChannel.close()
    }
}


/**********    %% WATCHERS %%    **********/

export function* watchCreateSkill() {
    yield takeEvery(types.CREATE_SKILL, createSkill)
}

export function* watchCreateProduct() {
    yield takeEvery(types.CREATE_PRODUCT, createProduct)
}