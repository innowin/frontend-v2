import badges from './badges/index'
import category from './category'
import certificate from './certificate'
import comment from './comment'
import exchangeMembership from './exchangeMembership'
import file from './file'
import hashTag from './hashTag/index'
import location from './location'
import post from './post'
import product from './product'
import social from './social'
import {combineReducers} from 'redux'

export default combineReducers({
	category,
	product,
	certificate,
	file,
	hashTag,
	location,
	badges,
	post,
	social,
	exchangeMembership,
	comment,
})
