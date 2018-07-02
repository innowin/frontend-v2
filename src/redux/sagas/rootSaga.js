import {all} from 'redux-saga/effects'
import {watchLoginFlow, watchSignInSuccess} from './auth/authSaga'
import {watchGetOrganization, watchGetOrganizationSuccess} from './organization/organizationSaga'

const rootSaga = function* () {
	yield all([
		watchLoginFlow(),
		watchSignInSuccess(),
		watchGetOrganization(),
		watchGetOrganizationSuccess(),

	])
};
export default rootSaga;