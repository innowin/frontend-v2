import io from 'socket.io-client'

export const SOCKET_URL = 'http://socket.daneshboom.ir'
export const REST_URL = 'http://restful.daneshboom.ir'

//Socket
export const SOCKET = io(SOCKET_URL)

const urls =  {
	SIGN_IN : "api-token-auth",
	GET_ORGANIZATION : 'organizations',
	GET_ORGANIZATION_MEMBERS : 'organizations/staff',
	UPDATE_ORGANIZATION_INFO:'organizations',
	GET_PRODUCTS:'products',
	GET_USER_IDENTITY:'users/identities',
	GET_ORG_FOLLOWERS:'organizations/follows',
	GET_ORG_FOLLOWINGS:'organizations/follows',
	GET_ORG_EXCHANGES:'exchanges/identities',
	GET_ORG_CUSTOMERS:'organizations/customers',
	GET_ORG_CERTIFICATES:'base/certificates',
	UPDATE_CUSTOMER:'organizations/customers',
	CREATE_PRODUCT: '',
	CREATE_Skill: 'users/skills'
}
export default urls