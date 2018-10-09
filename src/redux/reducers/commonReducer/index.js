// import hashTag from "./hashTag";
import file from "./file";
import badge from "./badge";
import certificate from "./certificate";
import location from "./location";
import {combineReducers} from "redux";
import category from "./category";
import product from "./product";
import post from './post'
import social from './social'
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import exchangeMembership from "./exchangeMembership";
import hashTag from "./hashTag/mainHashTags";
import createEncryptor from "redux-persist-transform-encrypt";


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

// const hashTagPersistConfig = {key: 'hashTag', storage: storage}

export default combineReducers({
  category,
  product: persistReducer(productPersistConfig, product),
  certificate,
  file,
  hashTag,
  location: persistReducer(locationPersistConfig, location),
  badge,
  post,
  social,
  exchangeMembership,
})
