//TODO: mohammad after changing common types need to remove this import and common file
import common from './common'
import socialTypes from './social'
import postTypes from './post'
import exchangeMembership from './exchangeMembership'

const ERROR = {
  SOCIAL: socialTypes.ERROR,
  POST: postTypes.ERROR,
  EXCHANGE_MEMBERSHIP: exchangeMembership.ERROR,
  ...common.ERROR
}

const SUCCESS = {
  SOCIAL: socialTypes.SUCCESS,
  POST: postTypes.SUCCESS,
  EXCHANGE_MEMBERSHIP: exchangeMembership.SUCCESS,
  ...common.SUCCESS
}

const BASE = {
  SOCIAL: socialTypes.BASE,
  POST: postTypes.BASE,
  EXCHANGE_MEMBERSHIP: exchangeMembership.BASE,
  ...common.BASE
}


export default {
  BASE,
  ERROR,
  SUCCESS,
}