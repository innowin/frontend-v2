import objHashTags from "./objHashTags";
import hashTags from "./mainHashTags";
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";


const objHashTagsPersistConfig = {key: 'objHashTags', storage: storage}

const mainHashTagsPersistConfig = {key: 'hashTags', storage: storage}

export default combineReducers({
  objHashTags: persistReducer(objHashTagsPersistConfig, objHashTags),
  hashTags: persistReducer(mainHashTagsPersistConfig, hashTags)
})