const results = {
    SIGN_IN: 'sign-in',
    VERIFY_TOKEN: 'verify',
    USER: {
        USERNAME_CHECK: "USERNAME_CHECK",
        CREATE_USER_PERSON: "CREATE_USER_PERSON",
        CREATE_USER_ORGAN: "CREATE_USER_ORGAN",
        GET_USER_BY_USER_ID: "GET_USER_BY_USER_ID",
        GET_PROFILE_BY_USER_ID: "GET_PROFILE_BY_USER_ID",
        GET_USER_IDENTITY: "GET_USER_IDENTITY",
        UPDATE_USER_BY_USER_ID: "UPDATE_USER_BY_USER_ID",
        UPDATE_PROFILE_BY_PROFILE_ID: 'UPDATE_PROFILE_BY_PROFILE_ID',
        GET_USERS: 'GET_USERS',
    },
    ORG: {
        GET_ORGANIZATION: 'get-organization',
        GET_ORGANIZATION_MEMBERS: 'get-organization-members',
        UPDATE_ORGANIZATION_INFO: 'update-organization-info',
        GET_USER_IDENTITY: 'get-user-identity',
        GET_ORG_FOLLOWERS: 'get-org-followers',
        GET_ORG_FOLLOWERS_IDENTITIES: 'get-org-followers-identities',
        GET_ORG_FOLLOWINGS: 'get-org-followings',
        GET_ORG_EXCHANGES: 'get-org-exchanges',
        GET_ORG_FOLLOWING: 'get-org-following',
        GET_ORG_FOLLOWINGS_IDENTITIES: 'get-org-followings-identities',
        GET_ORG_CUSTOMERS: 'get-org-customers',
        GET_ORG_CERTIFICATES: 'get-org-certificates',
        UPDATE_CUSTOMER: 'update-org-customer',
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
        CREATE_CUSTOMER: 'create-org-customer',
        DELETE_CUSTOMER: 'delete-org-customer',
        AGENCY_REQUEST: 'agent-request',
    },
    COMMON: {
        // product
        GET_PRODUCT_BASIC_INFO: 'get-product-basic-info-result',
        UPDATE_PRODUCT: 'update-product-result',
        CREATE_PRODUCT: 'create-product-result',
        CREATE_PRODUCT_PICTURE: 'create-product-picture-result',

        // file
        GET_FILE: 'COMMON_GET_FILE',
        CREATE_FILE: 'common-create-file-result',
        UPDATE_FILE: 'common-update-file-result',

        // category
        GET_CATEGORIES: 'common-get-categories-list-result',

        // certificate
        GET_CERTIFICATES: 'common-get-object-certificates-list-result',
        CREATE_OBJECT_CERTIFICATE: 'common-create-object-certificate-result',

        // badge
        GET_USER_BADGES: "GET_USER_BADGES",
        GET_ORG_BADGES: "GET_ORG_BADGES",
        POST: {
            FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET: 'filterPostsByPostParentLimitOffset',
            GET_POST_BY_IDENTITY: 'get-post-by-identity',
            CREATE_POST: 'create-post',
            UPDATE_POST: 'update-post',
            DELETE_POST: 'delete-post',
        },

        SOCIAL: {
            GET_FOLLOWEES: 'get-followees',
            GET_FOLLOWERS: 'get-followers',
            DELETE_FOLLOWERS: 'delete-followers,'
        },

        // hashTag
        GET_HASH_TAGS: 'common-get-hashTags-result',
        CREATE_HASH_TAG_FOR: 'common-create-hashTag-for-object-result',

        // location
        GET_COUNTRIES: 'common--get--countries--result',
        GET_PROVINCES: 'common-get-provinces-result',
        GET_CITIES: 'common-get-cities-result',
        
    },

    EXCHANGE: {
        GET_EXCHANGES: 'get-exchanges',
        GET_EXCHANGE_BY_ID: 'get-exchanges-{id}',
        GET_EXCHANGES_BY_MEMBER_IDENTITY: 'getExchangesByMemberIdentity',
        GET_EXCHANGE_BY_EX_ID: 'get-exchange-by-ex-id',
        DELETE_EXCHANGE_MEMBERSHIP: 'delete-exchange-membership',
        CREATE_EXCHANGE: 'create-exchange',
        ADD_TO_EXCHANGE:'add-to-exchange',
    },
    //contribution
    CREATE_PRODUCT: 'create-product',
    CREATE_Skill: 'create-skill',
}
export default results