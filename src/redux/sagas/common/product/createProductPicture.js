import types from "../../../actions/types"
import {call, fork,take, put, all} from "redux-saga/effects"
import results from "../../../../consts/resultName";
import api from "../../../../consts/api";
import urls from "../../../../consts/URLS";


function* createProductPicture (action) {
    const productPicture = action.payload
    const dynamicResult = results.COMMON.CREATE_PRODUCT_PICTURE + productPicture.picture_media
    const socketChannel = yield call(api.createSocketChannel, dynamicResult)
    console.log('\n ------- SAGA ------ >> createProductPicture >> dynamicResult:\n',  dynamicResult)

    try {
        yield fork(api.post, urls.COMMON.PRODUCT_PICTURE, dynamicResult, productPicture)
        const {data} = yield take(socketChannel)
        console.log('\n ------- SAGA ------ >> createProductPicture >> try >> data:\n',  data)
        yield put({type: types.SUCCESS.COMMON.CREATE_PRODUCT_PICTURE, data})

    } catch (error) {
        yield put({type: types.ERROR.COMMON.CREATE_PRODUCT_PICTURE, error})

    } finally {
        socketChannel.close()
    }
}

export default createProductPicture