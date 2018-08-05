import getProductInfo from "./getProductInfo";
import updateProduct from "./updateProduct";
import types from "../../../actions/types";
import {takeEvery} from "redux-saga/effects";


export function* watchGetProductInfo() {
    yield takeEvery(types.COMMON.GET_PRODUCT_INFO, getProductInfo)
}

export function* watchUpdateProduct() {
    yield takeEvery(types.COMMON.UPDATE_PRODUCT, updateProduct)
}

export default {
    watchGetProductInfo,
    watchUpdateProduct
}