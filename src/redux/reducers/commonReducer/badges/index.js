import badge from "./badge"
import badgeCategory from "./badgeCategories"
import migrations from 'src/redux/migrations'
import storage from "redux-persist/lib/storage";
import {combineReducers} from "redux";
import {persistReducer, createMigrate} from "redux-persist";

const badgePersistConfig = {
	key: 'badge', storage: storage, version: migrations.LATEST_VERSION,
	migrate: createMigrate(migrations.BADGE, {debug: true})
}

const badgeCategoryPersistConfig = {
	key: 'badgeCategory', storage: storage, version: migrations.LATEST_VERSION,
	migrate: createMigrate(migrations.BADGE_CATEGORY, {debug: true})
}

export default combineReducers({
	badge: persistReducer(badgePersistConfig, badge),
	badgeCategory: persistReducer(badgeCategoryPersistConfig, badgeCategory)
})