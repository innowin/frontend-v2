//TODO: mohammad after changing common types need to remove this import and common file
import common from './common'
import socialTypes from './social'
import postTypes from './post'

const ERROR = {
  SOCIAL: socialTypes.ERROR,
  POST: postTypes.ERROR,
  ...common.ERROR
}

const SUCCESS = {
  SOCIAL: socialTypes.SUCCESS,
  POST: postTypes.SUCCESS,
  ...common.SUCCESS
}

const BASE = {
  SOCIAL: socialTypes.BASE,
  POST: postTypes.BASE,
  ...common.BASE
}


export default {
  BASE,
  ERROR,
  SUCCESS,
}