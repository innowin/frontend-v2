import {all} from 'redux-saga/effects'
import {watchLoginFlow, watchSignInSuccess} from './auth/authSaga'
import {watchGetOrganization, 
	watchGetOrganizationSuccess,
	watchGetOrganizationMembers,
	watchGetOrganizationMembersSuccess,
	watchUpdateOrganization,
	watchGetProducts} from './organization/organizationSaga'

const rootSaga = function* () {
	yield all([
		watchLoginFlow(),
		watchSignInSuccess(),
		watchGetOrganization(),
		watchGetOrganizationSuccess(),
		watchGetOrganizationMembers(),
		watchUpdateOrganization(),
		watchGetProducts()

	])
};
export default rootSaga;