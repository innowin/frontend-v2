import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, fork,take, put} from "redux-saga/effects";
import types from '../../../actions/types'


function* createProduct(action) { // payload: { formData: {} }
    const {formData} = action.payload
    const {product, certificates, galleryImages, galleryVideo, tags} = formData
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.CREATE_PRODUCT)
    console.log('\n', '\n')
    console.log('--------------- createProduct >> the formData is ----------------------------> ', formData)
    console.log('\n', '\n')
    try {
        yield fork(api.post, urls.COMMON.PRODUCT, results.COMMON.CREATE_PRODUCT, product)
        const {data} = yield take(socketChannel)
        console.log('\n', '\n')
        console.log('--------------- createProduct >> the data is ----------------------------> ', data)
        console.log('\n', '\n')
        yield put({type: types.SUCCESS.COMMON.CREATE_PRODUCT, data})

    } catch (error) {
        yield put({type: types.ERROR.COMMON.CREATE_PRODUCT, error})

    } finally {
        socketChannel.close()
    }
}

export default createProduct