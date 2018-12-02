const results = {
  SIGN_IN: 'sign-in',
  VERIFY_TOKEN: 'verify-token',
  USER: {
    USERNAME_CHECK: "USERNAME_CHECK",
    EMAIL_CHECK:"EMAIL_CHECK",
    CREATE_USER_PERSON: "CREATE_USER_PERSON",
    CREATE_USER_ORGAN: "CREATE_USER_ORGAN",
    GET_USER_BY_USER_ID: "GET_USER_BY_USER_ID",
    GET_PROFILE_BY_USER_ID: "GET_PROFILE_BY_USER_ID",
    GET_EDUCATIONS_BY_USER_ID: "GET_EDUCATIONS_BY_USER_ID",
    UPDATE_USER_BY_USER_ID: "UPDATE_USER_BY_USER_ID",
    UPDATE_PROFILE_BY_PROFILE_ID: 'UPDATE_PROFILE_BY_PROFILE_ID',
    GET_USERS: 'GET_USERS',
    GET_ALL_USERS: 'GET_ALL_USERS',
    GET_IDENTITY: 'get-identity',
    PASSWORD_RESET_BY_SMS_REQUEST:'password_reset_by_sms_request',
    PASSWORD_RESET_BY_SMS_CHECK_CODE:'password_reset_by_sms_check_code',
    PASSWORD_RESET_BY_SMS:'password_reset_by_sms',
  },
  ORG: {
    GET_ORGANIZATION: 'get-organization',
    GET_ORGANIZATION_MEMBERS: 'get-organization-members',
    UPDATE_ORGANIZATION_INFO: 'update-organization-info',
    GET_ORG_FOLLOWERS: 'get-org-followers',
    GET_ORG_FOLLOWERS_IDENTITIES: 'get-org-followers-identities',
    GET_ORG_FOLLOWINGS: 'get-org-followings',
    GET_ORG_EXCHANGES: 'get-org-exchanges',
    GET_ORG_FOLLOWING: 'get-org-following',
    GET_ORG_FOLLOWINGS_IDENTITIES: 'get-org-followings-identities',
    GET_ORG_CERTIFICATES: 'get-org-certificates',
    CREATE_PRODUCT: 'create-org-product',
    GET_PRODUCT_CATEGORIES: 'get-product-category',
    GET_PRODUCTS: 'get-org-products',
    UPDATE_PRODUCT: 'update-org-product',
    ADD_PRODUCT_PICTURE: 'add-org-product-picture',
    GET_PRODUCT_PICTURE: 'get-org-product-picture',
    GET_PRODUCT_PRICE: 'get-org-product-price',
    DELETE_PRODUCT: 'delete-org-product',
    CREATE_CERTIFICATE: 'create-org-certificate',
    GET_STAFF: 'get-org-staff',

    AGENCY_REQUEST: 'agent-request',

    // customer
    GET_CUSTOMERS_BY_ORGANIZATION_ID: 'get-org-customers',
    CREATE_CUSTOMER: 'create-org-customer',
    DELETE_CUSTOMER: 'delete-org-customer',
    UPDATE_CUSTOMER: 'update-org-customer',

  },
  COMMON: {
    // product
    GET_PRODUCT_BASIC_INFO: 'get-product-basic-info-result',
    CREATE_PRODUCT: 'create-product-result',
    CREATE_PRODUCT_PICTURE: 'create-product-picture-result',
    GET_PRODUCT_PICTURES_BY_PRODUCT_ID: 'get-product-pictures-by-product-id-result',
    GET_PRICE_BY_PRODUCT_ID: 'get-price-by-product-id-result',

    // file
    GET_FILE: 'COMMON_GET_FILE',
    GET_FILES: 'common-get-files-result',
    CREATE_FILE: 'common-create-file-result',
    UPDATE_FILE: 'common-update-file-result',

    // category
    GET_CATEGORIES: 'common-get-categories-list-result',

    // badge
    GET_USER_BADGES: "GET_USER_BADGES",
    GET_ORG_BADGES: "GET_ORG_BADGES",
    GET_BADGES: 'get-badges-result',
    GET_ALL_BADGES: 'get-all-result',

    CERTIFICATE: {
      GET_CERTIFICATES: 'common-get-object-certificates-list-result',
      CREATE_OBJECT_CERTIFICATE: 'common-create-object-certificate-result',

      GET_CERTIFICATES_BY_IDENTITY: 'get-certificates-by-identity',
      DELETE_CERTIFICATE: 'delete-certificate',
      UPDATE_CERTIFICATE: 'update-certificate',
    },

    POST: {
      FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET: 'filterPostsByPostParentLimitOffset',
      GET_POST_BY_IDENTITY: 'get-post-by-identity',
      GET_POST_VIEWER_COUNT: 'get-post-viewer-count',
      SET_POST_VIEWER: 'set-post-viewer',
      CREATE_POST: 'create-post',
      UPDATE_POST: 'update-post',
      DELETE_POST: 'delete-post',
      GET_POST: 'get-post',
    },

    SOCIAL: {
      GET_FOLLOWEES: 'get-followees',
      GET_FOLLOWERS: 'get-followers',
      DELETE_FOLLOW: 'delete-follow,',
      UPDATE_FOLLOW: 'update-follow',
      CREATE_FOLLOW: 'create-follow',
    },

    EXCHANGE_MEMBERSHIP: {
      DELETE_EXCHANGE_MEMBERSHIP: 'delete-exchange-membership',
      GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY: 'get-exchange-membership-by-member-identity',
      GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID: 'get-exchange-membership-by-exchange-id',
      CREATE_EXCHANGE_MEMBERSHIP: 'create-exchange-membership',
    },

    PRODUCT: {
      GET_PRODUCTS_BY_IDENTITY: 'get-products-by-identity',
      UPDATE_PRODUCT: 'update-product',
      DELETE_PRODUCT: 'delete-product',
    },

    COMMENT: {
      GET_COMMENTS_BY_PARENT_ID: 'get-comments-by-parent-id',
      CREATE_COMMENT: 'create-comment',
      DELETE_COMMENT: 'delete-comment',
    },

    // hashTag
    GET_HASH_TAGS: 'common-get-hashTags-result',
    CREATE_HASH_TAG_FOR: 'common-create-hashTag-for-object-result',
    GET_OBJ_HASH_TAGS: 'common-get-obj-hash-tags-result',

    // location
    GET_COUNTRIES: 'common--get--countries--result',
    GET_PROVINCES: 'common-get-provinces-result',
    GET_CITIES: 'common-get-cities-result',
    GET_COUNTRY: 'common--get--country--result',
    GET_PROVINCE: 'common-get-province-result',
    GET_CITY: 'common-get-city-result',
  },
  EXCHANGE: {
    GET_EXCHANGES: 'get-exchanges',
    SEARCH_EXCHANGES_BY_WORD: 'search-exchanges-by-word',
    GET_EXCHANGE_BY_EX_ID: 'get-exchange-by-ex-id',
    CREATE_EXCHANGE: 'create-exchange',
    EDIT_EXCHANGE: 'edit-exchange',
  },
  WORK_EXPERIENCE: {
    GET_USER_WORK_EXPERIENCES_BY_USER_ID: 'get-user-work-experiences-by-user-id',
    UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID: 'update-user-work-experiences-by-user-id',
    CREATE_USER_WORK_EXPERIENCES_BY_USER_ID: 'create-user-work-experiences-by-user-id',
    DELETE_USER_WORK_EXPERIENCES_BY_USER_ID: 'delete-user-work-experiences-by-user-id',
  },
  EDUCATION: {
    GET_USER_EDUCATION_BY_USER_ID: 'get-user-education-by-user-id',
    CREATE_USER_EDUCATION_BY_USER_ID: 'create-user-education-by-user-id',
    DELETE_USER_EDUCATION_BY_USER_ID: 'delete-user-education-by-user-id',
    UPDATE_USER_EDUCATION_BY_USER_ID: 'update-user-education-by-user-id'
  },
  RESEARCH: {
    GET_USER_RESEARCH_BY_USER_ID: 'get-user-research-by-user-id',
    CREATE_USER_RESEARCH_BY_USER_ID: 'create-user-research-by-user-id',
    DELETE_USER_RESEARCH_BY_USER_ID: 'delete-user-research-by-user-id',
    UPDATE_USER_RESEARCH_BY_USER_ID: 'update-user-research-by-user-id',
  },
  SKILL: {
    CREATE_SKILL_RESULT: 'create-skill-result',
    GET_SKILL_BY_USER_ID: 'get-skill-by-user-id',
    DELETE_SKILL_BY_USER_ID: 'delete-skill-by-user-id',
    UPDATE_SKILL_BY_USER_ID: 'update-skill-by-user-id',
  },
  ABILITY: {
    GET_ABILITIES_BY_ORGANIZATION_ID: 'get-org-abilities',
    CREATE_ABILITY: 'create-org-ability',
    DELETE_ABILITY: 'delete-org-ability',
    UPDATE_ABILITY: 'update-org-ability',
  },
  FAVORITE: {
    GET_FAVORITES: 'get-favorite',
  }
}
export default results