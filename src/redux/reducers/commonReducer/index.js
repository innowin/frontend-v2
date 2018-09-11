import hashTag from "./hashTag";
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
import membership from "./membership";


const locationPersistConfig = {key: 'location', storage: storage}

const productPersistConfig = {key: 'product', storage: storage}

const hashTagPersistConfig = {key: 'hashTag', storage: storage}

export default combineReducers({
  category,
  product: persistReducer(productPersistConfig, product),
  certificate,
  file,
  hashTag: persistReducer(hashTagPersistConfig, hashTag),
  location: persistReducer(locationPersistConfig, location),
  badge,
  post,
  social,
  membership,
})
