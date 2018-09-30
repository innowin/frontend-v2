import {call, fork, put, take} from "redux-saga/effects";
import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import types from "../../../actions/types";
import helpers from "src/consts/helperFunctions"


function* getProductPicturesByProductId(action) {
  const {productId} = action.payload
  const socketChannel = yield call(api.createSocketChannel,
      results.COMMON.GET_PRODUCT_PICTURES_BY_PRODUCT_ID + productId)
  try {
    yield fork(
        api.get, urls.COMMON.PRODUCT_PICTURE,
        results.COMMON.GET_PRODUCT_PICTURES_BY_PRODUCT_ID + productId,
        `?picture_product=${productId}` // FIXME: in this moment the server isn't filtering the pictures.
    )
    const data = yield take(socketChannel)
    const normalData = helpers.normalizer(data) || {}
    const payload = {
      destinationId: productId,
      data: normalData.idKeyedObj,
      ids: normalData.ids
    }
    yield put({type: types.SUCCESS.COMMON.GET_PRODUCT_PICTURES_BY_PRODUCT_ID, payload})
  } catch (error) {
  } finally {
    socketChannel.close()
  }
}

export default getProductPicturesByProductId