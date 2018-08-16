import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, fork,take, put} from "redux-saga/effects";
import types from '../../../actions/types'


function* createProduct(action) { // payload: { formData: {} }
    const {formData} = action.payload
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.CREATE_PRODUCT)
    try {
        yield fork(api.post, urls.COMMON.PRODUCT, results.COMMON.CREATE_PRODUCT, formData)
        const data = yield take(socketChannel)
        console.log('-------------------- create product saga. data is : ', data)
        // yield put({type: types.SUCCESS.COMMON.CREATE_FILE, data})
    } catch (error) {
        console.log('-------------------- create product saga. error is: ', error)

    } finally {
        socketChannel.close()
    }
}

export default createProduct