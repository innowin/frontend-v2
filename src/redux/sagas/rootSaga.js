import {all} from 'redux-saga/effects'
import {watchGetOrganization,
	watchGetOrganizationSuccess,
	watchGetOrganizationMembers,
	// watchGetOrganizationMembersSuccess,
	watchUpdateOrganization,
	watchGetProducts} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import {watchAddingContribution} from './addingContribution/wW'

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
        watchAddingContribution(),
    ])
}


export default rootSaga;