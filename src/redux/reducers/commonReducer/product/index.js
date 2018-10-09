import productPicture from "./productPicture"
import products from "./products"
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import createEncryptor from "redux-persist-transform-encrypt";



const productsEncryptor = createEncryptor({
  secretKey: 'products-secret-key-is:podicvbcvgfhbgfhnfgh5yt544444464563454fjkghjh3834;jjfddd',
  onError: (error) => {
    throw new Error(error)
  }
})

const productPictureEncryptor = createEncryptor({
  secretKey: 'productPicture-secret-key-is:pf;kmcjrte65464gfcccccccf444444444444445555550lkf',
  onError: (error) => {
    throw new Error(error)
  }
})


const productsPersistConfig = {key: 'products', transforms: [productsEncryptor], storage: storage}

const productPicturePersistConfig = {key: 'productPicture', transforms: [productPictureEncryptor], storage: storage}

export default combineReducers({
  products: persistReducer(productsPersistConfig, products),
  productPicture: persistReducer(productPicturePersistConfig, productPicture)
})