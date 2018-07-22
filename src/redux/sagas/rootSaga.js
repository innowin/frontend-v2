import {all} from 'redux-saga/effects'
import {watchGetOrganization,
	watchGetOrganizationSuccess,
	watchGetOrganizationMembers,
	// watchGetOrganizationMembersSuccess,
	watchUpdateOrganization,
	watchGetProducts,
	watchGetOrgFollowers,
	watchGetOrgFollowings,
	watchGetOrgExchanges,
	watchGetCustomers,
	watchGetCertificates,
	watchUpdateCustomer,
	watchCreateOrgProduct} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import {watchCreateSkill, watchCreateProduct} from './addingContribution/addContributionSagas'

const rootSaga = function* () {
	yield all([
		watchLSignInError(),
		watchLSignOut(),
		watchLSignIn(),
		// watchGetOrganization(),
		watchGetOrganizationSuccess(),
		// watchGetOrganizationMembers(),
		watchUpdateOrganization(),
		watchGetProducts(),
		watchGetOrgFollowers(),
		watchGetOrgFollowings(),
		watchGetOrgExchanges(),
		watchGetCustomers(),
		watchGetCertificates(),
		watchUpdateCustomer(),
		watchCreateSkill(),
		watchCreateProduct(),
		watchCreateOrgProduct(),
    ])
}


export default rootSaga;