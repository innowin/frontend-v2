import io from "socket.io-client"

export const SOCKET_URL = "https://socket.innowin.ir"
export const REST_URL = "https://beta.back.innowin.ir"
export const DOMAIN = "http://innowin.ir"
//Socket
// export const SOCKET = io(SOCKET_URL, {secure: true})
export const SOCKET = io(SOCKET_URL, {secure: true, extraHeader: {'Access-Control-Allow-Origin': '*'}})

const urls = {
  SIGN_IN: "api-token-auth",
  VERIFY_TOKEN: "api-token-verify",

  USER: {
    USERNAME_CHECK: "users/user_exist",
    EMAIL_CHECK: "users/email_exist",
    CREATE_USER_PERSON: "users",
    CREATE_USER_ORGAN: "organizations",
    GET_USER_BY_USER_ID: "users",
    GET_EDUCATIONS_BY_USER_ID: "users/educations",
    UPDATE_USER_BY_USER_ID: "users",
    UPDATE_PROFILE_BY_PROFILE_ID: "users/profiles",
    GET_USERS: "users",
    GET_ALL_USERS: "users/identities",
    GET_IDENTITY: "users/identities",
    PASSWORD_RESET_BY_SMS_REQUEST:'users/password_reset_by_sms_request',
    PASSWORD_RESET_BY_SMS_CHECK_CODE:'users/password_reset_by_sms_check_code',
    PASSWORD_RESET_BY_SMS:'users/password_reset_by_sms',
    PASSWORD_RECOVERY_BY_EMAIL: 'users/forget-password',
    SEARCH_USER: 'users/search_users',
  },
  ORG: {
    GET_ORGANIZATION: "organizations",
    GET_ORGANIZATION_MEMBERS: "organizations/staff",
    UPDATE_ORGANIZATION_INFO: "organizations",
    GET_PRODUCTS: "products",
    GET_ORG_FOLLOWERS: "users/identities",
    GET_ORG_FOLLOWERS_IDENTITIES: "organizations/follows",
    GET_ORG_FOLLOWINGS_IDENTITIES: "organizations/follows",
    GET_ORG_FOLLOWINGS: "users/identities",
    GET_ORG_EXCHANGES: "exchanges/identities",
    GET_ORG_CERTIFICATES: "base/certificates",
    CREATE_CERTIFICATE: "base/certificates",
    CREATE_PRODUCT: "products",
    GET_PRODUCT_CATEGORIES: "products/category",
    UPDATE_PRODUCT: "products",
    ADD_PRODUCT_PICTURE: "products/pictures",
    GET_PRODUCT_PICTURE: "products/pictures",
    GET_PRODUCT_PRICE: "products/prices",
    DELETE_PRODUCT: "products",
    GET_STAFF: "organizations/staff",
    AGENCY_REQUEST: "users/agent-requests",

    // customer
    CUSTOMER: "organizations/customers",
  },
  EXCHANGE_EXPLORER: "exchanges/explore",
  EXCHANGE: "exchanges",
  WORK_EXPERIENCE: "users/work-experiences",
  EDUCATION: "users/educations",
  RESEARCH: "users/researches",
  ABILITY: "organizations/abilities",

  COMMON: {
    // product
    PRODUCT: "products",
    PRODUCT_PICTURE: "products/pictures",
    PRICE: "products/prices",

    // file
    FILE: "files",

    // category
    CATEGORY: "products/category",

    // certificate
    CERTIFICATE: "base/certificates",

    // badge
    BADGE: "base/badges",

    // hashTags
    HASH_TAG_PARENT: "base/hashtag-parents",
    HASH_TAG: "base/hashtags",

    // location
    COUNTRY: "base/countries",
    PROVINCE: "base/provinces",
    CITY: "base/towns",

    UNIVERSITY: 'users/universities',
    EDUCATION_FIELDS: 'users/university-fields',

    POST: "base/posts",

    COMMENT: "base/comments",

    SOCIAL: {
      FOLLOW: "organizations/follows",
    },

    EXCHANGE_MEMBERSHIP: "exchanges/identities",
  },
  SKILL: "users/skills",
  FAVORITE: "base/favorites",
  EVENTS: "base/events",
  EVENT_ASSIGNMENT: 'base/event-assignments',
}
export default urls