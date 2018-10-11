import productPicture from "./productPicture"
import products from "./products"
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import price from "./price"

const productsPersistConfig = {key: 'products', storage: storage}

const productPicturePersistConfig = {key: 'productPicture', storage: storage}

const pricePersistConfig = {key: 'price', storage: storage}

export default combineReducers({
  products: persistReducer(productsPersistConfig, products),
  productPicture: persistReducer(productPicturePersistConfig, productPicture),
  price: persistReducer(pricePersistConfig, price)
})