import api from "../../../../consts/api"
import results from "../../../../consts/resultName"
import urls from "../../../../consts/URLS"
import {call, fork, take, put, all} from "redux-saga/effects"
import types from "../../../actions/types"


function* createProductAsContribution(action) { // payload: { formData: {} }
  const {formData} = action.payload
  // the galleryItems should be empty Array by default.
  // the payload may has galleryVideo but hasn't galleyImages
  const {product, certificates, galleryImages = [], galleryVideo, tags, mainGalleryImageIndex} = formData
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.CREATE_PRODUCT)

  try {
    yield fork(api.post, urls.COMMON.PRODUCT, results.COMMON.CREATE_PRODUCT, product)
    const data = yield take(socketChannel)
    const productId = data.id

    // TODO <----- may change in future -----------------------------

    /** in this moment there is no different between video and image in the database. **/
    galleryVideo && galleryImages.push(galleryVideo)
    // TODO ------ may change in future ----------------------------->

    yield put({type: types.SUCCESS.COMMON.CREATE_PRODUCT, data})

    if (galleryImages.length >= 1) {
      yield all(galleryImages.map((imageId, index) => {

        const payload = {
          id: imageId,
          formData: {
            file_related_parent: productId,
          }
          // nextActionData: {
          //     picture_product: productId,
          //     picture_original: mainGalleryImageIndex === index
          // },
          // nextActionType: types.COMMON.CREATE_PRODUCT_PICTURE,
          // fileIdKey: 'picture_media',
          // nextActionErrorType: types.ERRORS.COMMON.CREATE_PRODUCT_PICTURE
        }

        return put({type: types.COMMON.UPDATE_FILE, payload})
      }))
    }

    if (tags) {
      yield all(tags.map(tag => {
        const payload = {
          formData: {
            title: tag.label,
            hashtag_base: productId
          },
          setIdForParentType: types.COMMON.ADD_HASH_TAG_ID_TO_PRODUCT
        }

        return put({type: types.COMMON.CREATE_HASH_TAG_FOR, payload})
      }))
    }

    if (certificates) {
      yield all(certificates.map(cert => {
        const twoNextActionData = {
          certificate_parent: productId,
          title: cert.title,
          validation_request_flag: cert.validation_request_flag
        }
        const nextActionData = {
          file_string: cert.certLogo,
          nextActionType: types.COMMON.CREATE_OBJECT_CERTIFICATE,
          fileIdKey: "certificate_logo",
          nextActionData: twoNextActionData,
        }
        const payload = {
          file_string: cert.certPicture,
          nextActionType: types.COMMON.CREATE_FILE,
          toWhatLayer: 2,
          fileIdKey: "certificate_picture",
          nextActionData,
        }
        return put({type: types.COMMON.CREATE_FILE, payload})
      }))
    }

  }
  catch (error) {
    console.log("-- saga --- >> createProduct >> the error is: \n", error)
    yield put({type: types.ERRORS.COMMON.CREATE_PRODUCT, error})

  }
  finally {
    socketChannel.close()
  }
}

export default createProductAsContribution