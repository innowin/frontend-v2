//TODO: mohammad need to separate this to appropriate files and change all the references to this
const SUCCESS = {
  // product
  GET_PRODUCT_INFO: 'COMMON_GET_PRODUCT_INFO_SUCCESS',
  CREATE_PRODUCT: 'COMMON_CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_PICTURE: 'COMMON_CREATE_PRODUCT_PICTURE_SUCCESS',
  GET_PRODUCT_PICTURES_BY_PRODUCT_ID: 'COMMON_GET_PRODUCT_PICTURES_BY_PRODUCT_ID_SUCCESS',
  GET_PRICE_BY_PRODUCT_ID: 'COMMON_GET_PRICE_BY_PRODUCT_ID_SUCCESS',

  // category
  GET_CATEGORIES: 'COMMON_GET_CATEGORIES_LIST_SUCCESS',
  GET_CATEGORY: 'COMMON_GET_CATEGORY_SUCCESS',

  // file
  GET_FILE: 'COMMON_GET_FILE_SUCCESS',
  GET_FILES: 'COMMON_GET_FILES_SUCCESS',
  CREATE_FILE: 'COMMON_CREATE_FILE_SUCCESS',
  UPDATE_FILE: 'COMMON_UPDATE_FILE_SUCCESS',

  // hashTag
  GET_HASH_TAGS: 'COMMON_GET_HASH_TAGS_SUCCESS',
  GET_OBJ_HASH_TAGS: 'COMMON_GET_OBJ_HASH_TAGS_SUCCESS',
  // CREATE_HASH_TAG_FOR: 'COMMON_CREATE_HASH_TAG_FOR_SUCCESS', // not used yet. but maybe used in future.

  // location
  GET_PROVINCES: 'COMMON_GET_PROVINCES_SUCCESS',
  GET_COUNTRIES: 'COMMON_GET_COUNTRIES_SUCCESS',
  GET_CITIES: 'COMMON_GET_CITIES_SUCCESS',
  GET_CITY: 'COMMON_GET_CITY_SUCCESS',
  GET_PROVINCE: 'COMMON_GET_PROVINCE_SUCCESS',
  GET_COUNTRY: 'COMMON_GET_COUNTRY_SUCCESS',

  // badge
  GET_USER_BADGES: "GET_USER_BADGES_SUCCESS",
  GET_ORG_BADGES: "GET_ORG_BADGES_SUCCESS",
  GET_BADGES: "COMMON_GET_BADGES_SUCCESS",
  GET_BADGES_CATEGORY: "COMMON_GET_BADGES_CATEGORY_SUCCESS",
  SET_BADGES_IN_USER: "SET_BADGES_IN_USER_SUCCESS",
  SET_BADGES_IN_ORG: "SET_BADGES_IN_ORG_SUCCESS",
}

const ERROR = {
  // product
  GET_PRODUCT_INFO: 'COMMON_GET_PRODUCT_INFO_ERROR',
  CREATE_PRODUCT: 'COMMON_CREATE_PRODUCT_ERROR',
  CREATE_PRODUCT_PICTURE: 'COMMON_CREATE_PRODUCT_PICTURE_ERROR',
  GET_PRODUCT_PICTURES_BY_PRODUCT_ID: 'COMMON_GET_PRODUCT_PICTURES_BY_PRODUCT_ID_ERROR',
  GET_PRICE_BY_PRODUCT_ID: 'COMMON_GET_PRICE_BY_PRODUCT_ID_ERROR',

  // category
  GET_CATEGORIES: 'COMMON_GET_CATEGORIES_LIST_ERROR',

  // file
  GET_FILE: 'COMMON_GET_FILE_ERROR',
  CREATE_FILE: 'COMMON_CREATE_FILE_ERROR',
  UPDATE_FILE: 'COMMON_UPDATE_FILE_ERROR',

  // hashTag
  GET_HASH_TAGS: 'COMMON_GET_HASH_TAGS_ERROR',
  GET_OBJ_HASH_TAGS: 'COMMON_GET_OBJ_HASH_TAGS_ERROR',
  // CREATE_HASH_TAG_FOR: 'COMMON_CREATE_HASH_TAG_FOR_ERROR',

  // location
  GET_PROVINCES: 'COMMON_GET_PROVINCES_ERROR',
  GET_COUNTRIES: 'COMMON_GET_COUNTRIES_ERROR',
  GET_CITIES: 'COMMON_GET_CITIES_ERROR',
  GET_CITY: 'COMMON_GET_CITY_ERROR',
  GET_PROVINCE: 'COMMON_GET_PROVINCE_ERROR',
  GET_COUNTRY: 'COMMON_GET_COUNTRY_ERROR',

  // badge
  GET_USER_BADGES: "GET_USER_BADGES_ERROR",
  GET_ORG_BADGES: "GET_ORG_BADGES_ERROR",
  SET_BADGES_IN_USER: "SET_BADGES_IN_USER_ERROR",
  SET_BADGES_IN_ORG: "SET_BADGES_IN_ORG_ERROR",
  GET_BADGES: "COMMON_GET_BADGES_ERROR",
}

const BASE = {
  // product
  GET_PRODUCT_INFO: 'COMMON_GET_PRODUCT_INFO_REQUEST',
  CREATE_PRODUCT: 'COMMON_CREATE_PRODUCT_REQUEST',
  CREATE_PRODUCT_PICTURE: 'COMMON_CREATE_PRODUCT_PICTURE_REQUEST',
  GET_PRODUCT_PICTURES_BY_PRODUCT_ID: 'COMMON_GET_PRODUCT_PICTURES_BY_PRODUCT_ID_REQUEST',
  GET_PRICE_BY_PRODUCT_ID: 'COMMON_GET_PRICE_BY_PRODUCT_ID_REQUEST',

  // category
  GET_CATEGORIES: 'COMMON_GET_CATEGORIES_LIST_REQUEST',

  // file
  GET_FILE: 'COMMON_GET_FILE',
  CREATE_FILE: 'COMMON_CREATE_FILE_REQUEST',
  UPDATE_FILE: 'COMMON_UPDATE_FILE_REQUEST',
  DEL_MIDDLEWARE_FILE_DATA: 'COMMON_DELETE_MIDDLEWARE_FILE_DATA_REQUEST',

  // hashTag
  GET_HASH_TAGS: 'COMMON_GET_HASH_TAGS_REQUEST',
  CREATE_HASH_TAG_FOR: 'COMMON_CREATE_HASH_TAG_FOR_REQUEST',
  ADD_PICTURE_ID_TO_PRODUCT: 'COMMON_ADD_PICTURE_ID_TO_PRODUCT_REQUEST',
  GET_OBJ_HASH_TAGS: 'COMMON_GET_OBJ_HASH_TAGS_REQUEST',
  // put the above type to add an id in the list of
  // a specific product's pictures.
  // (id ===> state.common.product.products[idOfSpecificProduct]: [...prevList, id]
  ADD_HASH_TAG_ID_TO_PRODUCT: 'COMMON_ADD_HASH_TAG_ID_TO_PRODUCT_REQUEST',
  SET_NOW_CREATED_PRODUCT_TO_NULL: 'COMMON_SET_NEW_CREATED_PRODUCT_TO_NULL_REQUEST',

  // location
  GET_COUNTRIES: 'COMMON__GET__COUNTRIES__REQUEST',
  GET_PROVINCES: 'COMMON__GET__PROVINCES__REQUEST',
  GET_CITIES: 'COMMON__GET__CITIES__REQUEST',
  GET_CITY: 'COMMON_GET_CITY_REQUEST',
  GET_PROVINCE: 'COMMON_GET_PROVINCE_REQUEST',
  GET_COUNTRY: 'COMMON_GET_COUNTRY_REQUEST',

  // badge
  GET_USER_BADGES: "GET_USER_BADGES",
  GET_ORG_BADGES: "GET_ORG_BADGES",
  SET_BADGES_IN_USER: "SET_BADGES_IN_USER",
  SET_BADGES_IN_ORG: "SET_BADGES_IN_ORG",
  GET_BADGES: "COMMON_GET_BADGES_REQUEST",
}

export default {
  SUCCESS,
  ERROR,
  BASE
}