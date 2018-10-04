import getProductInfo from "./getProductInfo"
import createProduct from "./creataProductAsContribution"
import createProductPicture from "./createProductPicture"
import {getProductsByIdentity} from './getProductsByIdentity'
import {deleteProduct} from './deleteProduct'
import {updateProduct} from "./updateProduct"
import types from "../../../actions/types"
import {takeEvery} from "redux-saga/effects"
import getProductPicturesByProductId from "./getProductPicturesByPorductId";


function* watchGetProductInfo() {
  yield takeEvery(types.COMMON.GET_PRODUCT_INFO, getProductInfo)
}

function* watchCreateProduct() {
  yield takeEvery(types.COMMON.CREATE_PRODUCT, createProduct)
}

function* watchCreateProductPicture() {
  yield takeEvery(types.COMMON.CREATE_PRODUCT_PICTURE, createProductPicture)
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

function* watchGetProductPicturesByProductId() {
  yield takeEvery(types.COMMON.GET_PRODUCT_PICTURES_BY_PRODUCT_ID, getProductPicturesByProductId)
}

export default [
  watchGetProductInfo(),
  watchUpdateProduct(),
  watchCreateProduct(),
  watchCreateProductPicture(),
  watchGetProductsByIdentity(),
  watchDeleteProductByIdentity(),
  watchGetProductPicturesByProductId()
]
