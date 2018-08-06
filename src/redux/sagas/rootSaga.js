import {all, fork} from 'redux-saga/effects'
import {
    watchGetOrganization,
    watchGetOrganizationSuccess,
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
} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import {watchLGetExchangesByMemberIdentity} from "./exchange/exchange"
import {watchUsernameCheck, watchCreateUserPerson, watchCreateUserOrgan} from "./user/userSagas"
import productWatchers from './common/product/product'
import categoryWatchers from './common/category/category'
import fileWatchers from './common/file/file'
import certificateWatchers from './common/certificate/certificate'


const rootSaga = function* () {
    yield all([
        fork(watchUsernameCheck),
        watchCreateUserPerson(),
        watchCreateUserOrgan(),
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
        watchUpdateOrgProduct(),
        watchAddProductPicture(),
        watchGetProductPictures(),
        watchGetProductsSuccess(),
        watchDeleteProduct(),
        watchCreateCertificate(),
        watchCreateOrgProduct(),

        // product watchers
        productWatchers.watchGetProductInfo(),
        productWatchers.watchUpdateProduct(),

        // category watchers
        categoryWatchers.watchGetCategoriesList(),

        // file watchers
        fileWatchers.watchCreateFile(),
        fileWatchers.watchUpdateFile(),
        fileWatchers.watchDelFileMiddleWareData(),

        // certificate watchers
        certificateWatchers.watchGetObjectCertificates(),
        certificateWatchers.watchCreateObjectCertificate(),

    ])
}


export default rootSaga
