import objHashTags from "./objHashTags";
import mainHashTags from "./mainHashTags";
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";


const objHashTagsPersistConfig = {key: 'objHashTags', storage: storage}

const mainHashTagsPersistConfig = {key: 'mainHashTags', storage: storage}

export default combineReducers({
  objHashTags: persistReducer(objHashTagsPersistConfig, objHashTags),
  mainHashTags: persistReducer(mainHashTagsPersistConfig, mainHashTags)
})