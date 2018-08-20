import io from 'socket.io-client'

export const SOCKET_URL = 'http://socket.daneshboom.ir'
export const REST_URL = 'http://restful.daneshboom.ir'

//Socket
export const SOCKET = io(SOCKET_URL)

const urls = {

  SIGN_IN: "api-token-auth",
  VERIFY_TOKEN: "api-token-verify",
  USER: {
    USERNAME_CHECK: "users/user_exist",
    CREATE_USER_PERSON: "users",
    CREATE_USER_ORGAN: "users/user-organization",
    GET_USER_BY_USER_ID: "users",
    GET_PROFILE_BY_USER_ID: "users/profiles",
    GET_USER_IDENTITY:"users/identities",
    UPDATE_USER_BY_USER_ID: "users",
  },
  ORG: {
    GET_ORGANIZATION: 'organizations',
    GET_ORGANIZATION_MEMBERS: 'organizations/staff',
    UPDATE_ORGANIZATION_INFO: 'organizations',
    GET_PRODUCTS: 'products',
    GET_USER_IDENTITY: 'users/identities',
    GET_ORG_FOLLOWERS: 'users/identities',
    GET_ORG_FOLLOWERS_IDENTITIES:'organizations/follows',
    GET_ORG_FOLLOWINGS_IDENTITIES:'organizations/follows',
    GET_ORG_FOLLOWINGS: 'users/identities',
    GET_ORG_EXCHANGES: 'exchanges/identities',
    GET_ORG_CUSTOMERS: 'organizations/customers',
    GET_ORG_CERTIFICATES: 'base/certificates',
    CREATE_CERTIFICATE: 'base/certificates',
    UPDATE_CUSTOMER: 'organizations/customers',
    DELETE_CUSTOMER:'organizations/customers',
    CREATE_PRODUCT: 'products',
    GET_PRODUCT_CATEGORIES: 'products/category',
    UPDATE_PRODUCT: 'products',
    ADD_PRODUCT_PICTURE: 'products/pictures',
    GET_PRODUCT_PICTURE: 'products/pictures',
    GET_PRODUCT_PRICE: 'products/prices',
    DELETE_PRODUCT: 'products',
    GET_STAFF:'organizations/staff',
    CREATE_CUSTOMER:'organizations/customers',
  },
  EXCHANGE: {
    GET_EXCHANGES: 'exchanges',
    GET_EXCHANGES_BY_MEMBER_IDENTITY: 'exchanges/identities',
  },

  CREATE_PRODUCT: 'products',
  CREATE_Skill: 'users/skills',
  COMMON: {
    // product
    PRODUCT: 'products',

    // file
    FILE: 'files',

    // category
    CATEGORY: 'products/category',

    // certificate
    CERTIFICATE: 'base/certificates',

    // badge
    BADGE:'base/badges'
  }
}
export default urls