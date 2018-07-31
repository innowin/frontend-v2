const results = {
	//sign in
	SIGN_IN : 'sign-in',
	ORGANIZATION:{
		GET_ORGANIZATION : 'get-organization',
		GET_ORGANIZATION_MEMBERS: 'get-organization-members',
		UPDATE_ORGANIZATION_INFO:'update-organization-info',
		GET_USER_IDENTITY:'get-user-identity',
		GET_ORG_FOLLOWERS:'get-org-followers',
		GET_ORG_FOLLOWINGS:'get-org-followings',
		GET_ORG_EXCHANGES:'get-org-exchanges',
		GET_ORG_FOLLOWING:'get-org-following',
		GET_ORG_FOLLOWINGS_IDENTITIES:'get-org-followings-identities',
		GET_ORG_CUSTOMERS:'get-org-customers',
		GET_ORG_CERTIFICATES:'get-org-certificates',
		UPDATE_CUSTOMER:'update-org-customer',
		CREATE_PRODUCT:'create-org-product',
	},
	COMMON: {
		// product
		GET_PRODUCT_BASIC_INFO: 'common-get-product-basic-info-result',
		UPDATE_PRODUCT: 'common-update-product-result',

		// file
		CREATE_FILE: 'common-create-file-result',
		UPDATE_FILE: 'common-update-file-result',

		// category
		GET_CATEGORIES: 'common-get-categories-list-result',

		// certificate
        GET_OBJECT_CERTIFICATES: 'common-get-object-certificates-list',
		CREATE_OBJECT_CERTIFICATE: 'common-create-object-certificate',
	},
	//contribution
	CREATE_PRODUCT: 'create-product',
	CREATE_Skill: 'create-skill',

}
export default results