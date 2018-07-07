import {all, takeLatest} from 'redux-saga/effects'
import {addingContribution} from './product/workers'
import types, {REQUEST} from '../actions/actionTypes'
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
}

// =======
// import {all, takeLatest} from 'redux-saga/effects'
// import types, {REQUEST} from '../actions/actionTypes'
// import {watchAddNumber, watchGetPosts} from "./auth/testSaga"
// import {addingContribution} from './product/workers'
//
// const rootSaga = function* () {
//     yield takeLatest(types.ADD_CONTRIBUTION + REQUEST, addingContribution); // watches for adding contribution.
//
//     yield all([
//         watchAddNumber(),
//         watchGetPosts()
//     ])
// >>>>>>> ali
// };

export default rootSaga;