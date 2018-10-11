import badgeCategory from "./badgeCategories"
import badge from "./badge"
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";


const badgePersistConfig = {key: 'badge', storage: storage}

const badgeCategoryPersistConfig = {key: 'badgeCategory', storage: storage}

export default combineReducers({
  badge: persistReducer(badgePersistConfig, badge),
  badgeCategory: persistReducer(badgeCategoryPersistConfig, badgeCategory)
})