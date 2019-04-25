import getProductInfo from "./getProductInfo"
import createProduct from "./creataProductAsContribution"
import {getProductsByIdentity} from './getProductsByIdentity'
import {deleteProduct} from './deleteProduct'
import {updateProduct} from "./updateProduct"
import types from "../../../actions/types"
import {takeEvery} from "redux-saga/effects"
import {getAllProducts} from "./getAllProducts"
import {getProductPrice} from "./getProductPrice"

function* watchGetAllProductInfo() {
  yield takeEvery(types.COMMON.GET_ALL_PRODUCTS, getAllProducts)
}

function* watchGetProductPrice() {
  yield takeEvery(types.COMMON.PRODUCT.GET_PRODUCT_PRICE, getProductPrice)
}

function* watchGetProductInfo() {
  yield takeEvery(types.COMMON.GET_PRODUCT_INFO, getProductInfo)
}

function* watchCreateProduct() {
  yield takeEvery(types.COMMON.CREATE_PRODUCT, createProduct)
}

function* watchGetProductsByIdentity() {
  yield takeEvery(types.COMMON.PRODUCT.GET_PRODUCTS_BY_IDENTITY, getProductsByIdentity)
}

function* watchUpdateProduct() {
  yield takeEvery(types.COMMON.PRODUCT.UPDATE_PRODUCT, updateProduct)
}

function* watchDeleteProductByIdentity() {
  yield takeEvery(types.COMMON.PRODUCT.DELETE_PRODUCT, deleteProduct)
}

export default [
  watchGetAllProductInfo(),
  watchGetProductInfo(),
  watchUpdateProduct(),
  watchCreateProduct(),
  watchGetProductsByIdentity(),
  watchDeleteProductByIdentity(),
  watchGetProductPrice()
]