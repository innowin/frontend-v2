import badges from './badges/index'
import category from './category'
import certificate from './certificate'
import comment from './comment'
import createEncryptor from 'redux-persist-transform-encrypt'
import exchangeMembership from './exchangeMembership'
import file from './file'
import hashTag from './hashTag/index'
import location from './location'
import migrations from 'src/redux/migrations'
import post from './post'
import product from './product'
import social from './social'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import {createMigrate} from 'redux-persist'
import {persistReducer} from 'redux-persist'

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

const locationPersistConfig = {
	key: 'location',
	transforms: [locationEncryptor],
	storage: storage,
	version: migrations.LATEST_VERSION,
	migrate: createMigrate(migrations.LOCATION, {debug: true})
}

const productPersistConfig = {
	key: 'product',
	transforms: [productEncryptor],
	storage: storage,
	version: migrations.LATEST_VERSION,
	migrate: createMigrate(migrations.PRODUCT, {debug: true})
}

const badgesPersistConfig = {
	key: 'badges',
	storage: storage,
	version: migrations.LATEST_VERSION,
	migrate: createMigrate(migrations.BADGE, {debug: true})
}

const hashTagPersistConfig = {
	key: 'hashTag',
	storage: storage,
	version: migrations.LATEST_VERSION,
	migrate: createMigrate(migrations.HASH_TAG, {debug: true})
}

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
