import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import {call, fork,take, put, all} from "redux-saga/effects";
import types from '../../../actions/types'
import client from "../../../../consts/client";


function* createProductAsContribution(action) { // payload: { formData: {} }
    const identityId = client.getIdentityId()
    const {formData} = action.payload
    const {product, certificates, galleryImages, galleryVideo, tags, mainGalleryImageIndex} = formData
    const socketChannel = yield call(api.createSocketChannel, results.COMMON.CREATE_PRODUCT)

    try {
        yield fork(api.post, urls.COMMON.PRODUCT, results.COMMON.CREATE_PRODUCT, product)
        const {data} = yield take(socketChannel)

        // <------------------------ may change in future -----------

        // ------ may change in future ----------------------------->
        console.log('\n', '\n')
        console.log('--------------- createProduct >> the data is ----------------------------> ', data)
        console.log('\n', '\n')
        yield put({type: types.SUCCESS.COMMON.CREATE_PRODUCT, data})

        yield all(galleryImages.map((image, index) => {

            const payload = {
                file_string: image,
                nextActionData: {
                    picture_product: data.id,
                    picture_original: mainGalleryImageIndex === index
                },
                nextActionType: types.COMMON.CREATE_PRODUCT_PICTURE,
                nextActionErrorType: types.ERRORS.COMMON.CREATE_PRODUCT_PICTURE
            }

            return put({
                type: types.COMMON.CREATE_FILE,
                payload
            })
        }))
        // yield all(galleryImages.map(ac => put(ac)))

    } catch (error) {
        yield put({type: types.ERROR.COMMON.CREATE_PRODUCT, error})

    } finally {
        socketChannel.close()
    }
}

export default createProductAsContribution