import {all} from 'redux-saga/effects'
import {watchGetOrganization, 
	watchGetOrganizationSuccess,
	watchGetOrganizationMembers,
	watchGetOrganizationMembersSuccess,
	watchUpdateOrganization,
	watchGetProducts,
	watchGetOrgFollowers,
	watchGetOrgFollowings,
	watchGetOrgExchanges,
	watchGetCustomers,
	watchGetCertificates} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'

const rootSaga = function* () {
	yield all([
		watchLSignInError(),
		watchLSignOut(),
		watchLSignIn(),
		watchGetOrganization(),
		watchGetOrganizationSuccess(),
		watchGetOrganizationMembers(),
		watchUpdateOrganization(),
		watchGetProducts(),
		watchGetOrgFollowers(),
		watchGetOrgFollowings(),
		watchGetOrgExchanges(),
		watchGetCustomers(),
		watchGetCertificates()

	])
};

export default rootSaga;