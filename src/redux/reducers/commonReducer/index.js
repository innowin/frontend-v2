import badges from './badges/index'
import category from './category'
import certificate from './certificate'
import comment from './comment'
import proposal from './proposal'
import educationField from './educationField'
import exchangeMembership from './exchangeMembership'
import file from './file'
import hashTag from './hashTag/index'
import location from './location'
import post from './post'
import product from './product'
import social from './social'
import university from './university'
import {combineReducers} from 'redux'

export default combineReducers({
  badges,
  category,
  certificate,
  comment,
  proposal,
  educationField,
  exchangeMembership,
  file,
  hashTag,
  location,
  post,
  product,
  social,
  university,
})
