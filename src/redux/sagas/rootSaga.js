import {all} from 'redux-saga/effects'
import {watchGetOrganization, watchGetOrganizationSuccess} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'

const rootSaga = function* () {
	yield all([
		watchLSignInError(),
		watchLSignOut(),
		watchLSignIn(),
		watchGetOrganization(),
		watchGetOrganizationSuccess(),
	])
};

export default rootSaga;