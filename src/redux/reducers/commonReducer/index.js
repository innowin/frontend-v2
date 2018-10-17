// import hashTag from "./hashTag";
import file from "./file"
import certificate from "./certificate"
import location from "./location"
import {combineReducers} from "redux"
import category from "./category"
import product from "./product"
import post from './post'
import social from './social'
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import exchangeMembership from "./exchangeMembership";
import createEncryptor from "redux-persist-transform-encrypt";
import comment from './comment'
import hashTag from "./hashTag/index"
import badges from "./badges/index"

const locationEncryptor = createEncryptor({
  secretKey: 'location-secret-key-is:podicvbcvbdfsdkfpojjknwnrkilksdf;lsdlffjkghjh3834;jjfddd',
  onError: (error) => {
    throw new Error(error)
  }
})

const productEncryptor = createEncryptor({
  secretKey: 'product-secret-key-is:pf;kldkpokmcjmmmmmmmmmmmmmmmmddddmcnhndnslucvxcvcxgfdj0lkf',
  onError: (error) => {
    throw new Error(error)
  }
})

const locationPersistConfig = {key: 'location',transforms: [locationEncryptor], storage: storage}

const productPersistConfig = {key: 'product',transforms: [productEncryptor], storage: storage}

const badgesPersistConfig = {key: 'badges', storage: storage}

const hashTagPersistConfig = {key: 'hashTag', storage: storage}
// const hashTagPersistConfig = {key: 'hashTag', storage: storage}

export default combineReducers({
  category,
  product: persistReducer(productPersistConfig, product),
  certificate,
  file,
  hashTag: persistReducer(hashTagPersistConfig, hashTag),
  location: persistReducer(locationPersistConfig, location),
  badges: persistReducer(badgesPersistConfig, badges),
  post,
  social,
  exchangeMembership,
  comment,
})
