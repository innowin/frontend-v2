//TODO: mohammad after changing common types need to remove this import and common file
import common from './common'
import socialTypes from './social'
import postTypes from './post'
import productTypes from './product'
import exchangeMembership from './exchangeMembership'
import certificateTypes from './certificate'
import commentTypes from './comment'
import fileTypes from './file'

const ERROR = {
  SOCIAL: socialTypes.ERROR,
  POST: postTypes.ERROR,
  EXCHANGE_MEMBERSHIP: exchangeMembership.ERROR,
  PRODUCT: productTypes.ERROR,
  CERTIFICATE: certificateTypes.ERROR,
  COMMENT: commentTypes.ERROR,
  FILE: fileTypes.ERROR,
  ...common.ERROR
}

const SUCCESS = {
  SOCIAL: socialTypes.SUCCESS,
  POST: postTypes.SUCCESS,
  EXCHANGE_MEMBERSHIP: exchangeMembership.SUCCESS,
  PRODUCT: productTypes.SUCCESS,
  CERTIFICATE: certificateTypes.SUCCESS,
  COMMENT: commentTypes.SUCCESS,
  FILE: fileTypes.SUCCESS,
  ...common.SUCCESS
}

const BASE = {
  SOCIAL: socialTypes.BASE,
  POST: postTypes.BASE,
  EXCHANGE_MEMBERSHIP: exchangeMembership.BASE,
  PRODUCT: productTypes.BASE,
  CERTIFICATE: certificateTypes.BASE,
  COMMENT: commentTypes.BASE,
  FILE: fileTypes.BASE,
  ...common.BASE
}


export default {
  BASE,
  ERROR,
  SUCCESS,
}