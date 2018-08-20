import getProductInfo from "./getProductInfo";
import updateProduct from "./updateProduct";
import createProduct from "./creataProduct"
import types from "../../../actions/types";
import {takeEvery} from "redux-saga/effects";


export function* watchGetProductInfo() {
    yield takeEvery(types.COMMON.GET_PRODUCT_INFO, getProductInfo)
}

export function* watchUpdateProduct() {
    yield takeEvery(types.COMMON.UPDATE_PRODUCT, updateProduct)
}

export function* watchCreateProduct() {
    yield takeEvery(types.COMMON.CREATE_PRODUCT, createProduct)
}

export default {
    watchGetProductInfo,
    watchUpdateProduct,
    watchCreateProduct
}