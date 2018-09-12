import io from 'socket.io-client'

export const SOCKET_URL = 'http://socket.daneshboom.ir'
export const REST_URL = 'http://restful.daneshboom.ir'

//Socket
export const SOCKET = io(SOCKET_URL)

const urls = {
  SIGN_IN: "api-token-auth",
  VERIFY_TOKEN: "api-token-verify",
  GET_IDENTITY: "users/identities",
  USER: {
    USERNAME_CHECK: "users/user_exist",
    CREATE_USER_PERSON: "users",
    CREATE_USER_ORGAN: "users/user-organization",
    GET_USER_BY_USER_ID: "users",
    GET_PROFILE_BY_USER_ID: "users/profiles",
    UPDATE_USER_BY_USER_ID: "users",
    UPDATE_PROFILE_BY_PROFILE_ID: "users/profiles",
    GET_USERS: 'users',
  },
  ORG: {
    GET_ORGANIZATION: 'organizations',
    GET_ORGANIZATION_MEMBERS: 'organizations/staff',
    UPDATE_ORGANIZATION_INFO: 'organizations',
    GET_PRODUCTS: 'products',
    GET_ORG_FOLLOWERS: 'users/identities',
    GET_ORG_FOLLOWERS_IDENTITIES: 'organizations/follows',
    GET_ORG_FOLLOWINGS_IDENTITIES: 'organizations/follows',
    GET_ORG_FOLLOWINGS: 'users/identities',
    GET_ORG_EXCHANGES: 'exchanges/identities',
    GET_ORG_CUSTOMERS: 'organizations/customers',
    GET_ORG_CERTIFICATES: 'base/certificates',
    CREATE_CERTIFICATE: 'base/certificates',
    UPDATE_CUSTOMER: 'organizations/customers',
    DELETE_CUSTOMER: 'organizations/customers',
    CREATE_PRODUCT: 'products',
    GET_PRODUCT_CATEGORIES: 'products/category',
    UPDATE_PRODUCT: 'products',
    ADD_PRODUCT_PICTURE: 'products/pictures',
    GET_PRODUCT_PICTURE: 'products/pictures',
    GET_PRODUCT_PRICE: 'products/prices',
    DELETE_PRODUCT: 'products',
    GET_STAFF: 'organizations/staff',
    CREATE_CUSTOMER: 'organizations/customers',
    AGENCY_REQUEST: 'users/agent-requests',

  },
  EXCHANGE: {
    GET_EXCHANGES: 'exchanges',
    GET_EXCHANGE_BY_EX_ID: 'exchanges',
    CREATE_EXCHANGE: 'exchanges',
  },

  CREATE_PRODUCT: 'products',
  CREATE_Skill: 'users/skills',
  COMMON: {
    // product
    PRODUCT: 'products',
    PRODUCT_PICTURE: 'products/pictures',

    // file
    FILE: 'files',

    // category
    CATEGORY: 'products/category',

    // certificate
    CERTIFICATE: 'base/certificates',

    // badge
    BADGE: 'base/badges',

    // hashTags
    HASH_TAG_PARENT: 'base/hashtag-parents',
    HASH_TAG: 'base/hashtags',

    // location
    COUNTRY: 'base/countries',
    PROVINCE: 'base/provinces',
    CITY: 'base/towns',

    POST: {
      FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET: 'base/posts',
      GET_POST_BY_IDENTITY: 'base/posts',
      CREATE_POST: 'base/posts',
      UPDATE_POST: 'base/posts',
      DELETE_POST: 'base/posts',
    },

    SOCIAL: {
      GET_FOLLOWEES: 'organizations/follows',
      GET_FOLLOWERS: 'organizations/follows',
      DELETE_FOLLOW: 'organizations/follows',
      UPDATE_FOLLOW: 'organizations/follows',
      CREATE_FOLLOW: 'organizations/follows',
    },

    EXCHANGE_MEMBERSHIP: {
      DELETE_EXCHANGE_MEMBERSHIP: 'exchanges/identities',
      GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY: 'exchanges/identities',
      GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID: 'exchanges/identities', // TODO: not complete
      CREATE_EXCHANGE_MEMBERSHIP: 'exchanges/identities', // TODO: not complete
    }
  }
}
export default urls