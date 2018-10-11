import {call, fork, put, take} from "redux-saga/effects";
import api from "../../../../consts/api";
import results from "../../../../consts/resultName";
import urls from "../../../../consts/URLS";
import types from "../../../actions/types";
import helpers from "../../../../consts/helperFunctions/helperFunctions";

function* getPriceByProductId(action) {
  const {productId} = action.payload
  const socketChannel = yield call(api.createSocketChannel, results.COMMON.GET_PRICE_BY_PRODUCT_ID)
  const query = `?price_product=${productId}`
  try {
    yield fork(api.get, urls.COMMON.PRICE, results.COMMON.GET_PRICE_BY_PRODUCT_ID, query)
    const data = yield take(socketChannel)
    const {items, ids} =  helpers.arrayToIdKeyedObjectWithIds(data) || {}
    // destinationId, relatedObjId
    // console.log('the guy new complete data is: ', data)
    yield put({
      type: types.SUCCESS.COMMON.GET_PRICE_BY_PRODUCT_ID,
      payload: {
        data: items,
        destinationId: productId,
        ids
      }
    })
  } catch (error) {
    // yield put({type: types.ERRORS.COMMON.GET_PRODUCT_INFO, error})
  } finally {
    socketChannel.close()
  }
}

export default getPriceByProductId