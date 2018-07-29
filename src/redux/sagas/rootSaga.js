import {all} from 'redux-saga/effects'
import {watchGetOrganization,
	watchGetOrganizationSuccess,
	watchGetOrganizationMembers,
	//watchGetOrganizationMembersSuccess,
	watchUpdateOrganization,
	watchGetProducts,
	watchGetOrgFollowers,
	watchGetOrgFollowings,
	watchGetOrgExchanges,
	watchGetCustomers,
	watchGetCertificates,
	watchUpdateCustomer,
	watchCreateOrgProduct,
	} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import {watchCreateSkill, watchCreateProduct} from './addingContribution/addContributionSagas'
import {watchGetProductInfo} from './common/commonSagas'
import {watchLGetExchangesByMemberIdentity} from "./exchange/exchange"

const rootSaga = function* () {
	yield all([
		watchLSignInError(),
		watchLSignOut(),
		watchLSignIn(),
		watchGetCertificates(),
		watchGetCustomers(),
		watchGetOrganization(),
		watchGetOrganizationMembers(),
		watchGetOrganizationSuccess(),
		watchGetOrgExchanges(),
		watchGetOrgFollowers(),
		watchGetOrgFollowings(),
		watchGetProducts(),
		watchUpdateOrganization(),
    watchLGetExchangesByMemberIdentity(),
		watchUpdateCustomer(),
		watchCreateSkill(),
		// watchCreateProduct(),
		watchCreateOrgProduct(),

		// common sagas
        watchGetProductInfo()
    ])
}


export default rootSaga;