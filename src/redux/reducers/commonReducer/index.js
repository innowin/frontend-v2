// import hashTag from "./hashTag";
import file from "./file";
import badge from "./badges/badge";
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
import hashTag from "./hashTag/index";
import badges from "./badges/index"

const locationPersistConfig = {key: 'location', storage: storage}

const productPersistConfig = {key: 'product', storage: storage}

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
})
