import types from "../../../actions/types"
import {call, fork,take, put} from "redux-saga/effects"
import results from "../../../../consts/resultName";
import api from "../../../../consts/api";
import urls from "../../../../consts/URLS";


function* createProductPicture (action) {
    const productPicture = action.payload
    const dynamicResult = results.COMMON.CREATE_PRODUCT_PICTURE + productPicture.picture_media
    const socketChannel = yield call(api.createSocketChannel, dynamicResult)

    try {
        yield fork(api.post, urls.COMMON.PRODUCT_PICTURE, dynamicResult, productPicture)
        const data = yield take(socketChannel)
        yield put({type: types.SUCCESS.COMMON.CREATE_PRODUCT_PICTURE, data})
        yield put({
            type: types.COMMON.ADD_PICTURE_ID_TO_PRODUCT,
            payload: {destinationId: data.picture_product, relatedObjId: data.id}
        })

    } catch (error) {
        yield put({type: types.ERRORS.COMMON.CREATE_PRODUCT_PICTURE, error})

    } finally {
        socketChannel.close()
    }
}

export default createProductPicture