import {all, fork} from 'redux-saga/effects'
import {
    watchGetOrganizationMembers,
    watchUpdateOrganization,
    watchGetProducts,
    watchGetOrgFollowers,
    watchGetOrgFollowings,
    watchGetOrgExchanges,
    watchGetCustomers,
    watchGetCertificates,
    watchUpdateCustomer,
    watchCreateOrgProduct,
    watchUpdateOrgProduct,
    watchAddProductPicture,
    watchGetProductPictures,
    watchGetProductsSuccess,
    watchDeleteProduct,
    watchCreateCertificate,
    watchGetStaff,
    watchCreateCustomer,
    watchDeleteCustomer,
    watchAgencyRequest,
} from './organization/organizationSaga'
import {watchGetOrganization} from "./organization/getOrganSagas"
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import watchUsernameCheck from "./user/checkUsernameSaga"
import {
    watchGetExchangesByMemberIdentity,
    watchGetExchangeByExId,
    watchGetExchangeMembersByExId,
    watchDeleteExchangeMembership
} from "./exchange/exchange"
import {watchFilterPostsByPostParentPostTypeLimitOffset} from "./common/post/post"
import {watchGetUserByUserId, watchGetProfileByUserId, watchGetIdentityByUserId} from "./user/getUserSagas"
import {watchCreateUserPerson, watchCreateUserOrgan,} from "./user/createUserSagas"
import commonWatchers from './common/index'


const rootSaga = function* () {
    yield all([
        fork(watchUsernameCheck),
        watchCreateUserPerson(),
        watchCreateUserOrgan(),
        watchGetUserByUserId(),
        watchGetProfileByUserId(),
        watchGetIdentityByUserId(),
        watchLSignInError(),
        watchLSignOut(),
        watchLSignIn(),
        watchGetCertificates(),
        watchGetCustomers(),
        watchGetOrganization(),
        watchGetOrganizationMembers(),
        watchGetOrgExchanges(),
        watchGetOrgFollowers(),
        watchGetOrgFollowings(),
        watchGetProducts(),
        watchUpdateOrganization(),
        watchUpdateCustomer(),
        watchUpdateOrgProduct(),
        watchAddProductPicture(),
        watchGetProductPictures(),
        watchGetProductsSuccess(),
        watchDeleteProduct(),
        watchCreateCertificate(),
        watchCreateOrgProduct(),
        watchGetStaff(),
        watchCreateCustomer(),
        watchDeleteCustomer(),

        //Exchange sagas
        watchGetExchangeByExId(),
        watchGetExchangesByMemberIdentity(),
        watchGetExchangeMembersByExId(),
        watchDeleteExchangeMembership(),
        watchUpdateCustomer(),
        watchAgencyRequest(),

        // NOTE: the common watchers pushed to common/index.js to prevent from conflict.
        // common
        ...commonWatchers
    ])
}

export default rootSaga
