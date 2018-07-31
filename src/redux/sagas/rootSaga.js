import {all} from 'redux-saga/effects'
import {
    watchGetOrganizationSuccess,
    watchUpdateOrganization,
    watchGetProducts,
    watchGetOrgFollowers,
    watchGetOrgFollowings,
    watchGetOrgExchanges,
    watchGetCustomers,
    watchGetCertificates,
    watchUpdateCustomer,
    watchCreateOrgProduct
} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import productWatchers from './common/product/product'
import categoryWatchers from './common/category/category'
import fileWatchers from './common/file/file'
import certificateWatchers from './common/certificate/certificate'


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
        watchCreateOrgProduct(),

        // product watchers
        productWatchers.watchGetProductInfo(),
        productWatchers.watchUpdateProduct(),

        // category watchers
        categoryWatchers.watchGetCategoriesList(),

        // file watchers
        fileWatchers.watchCreateFile(),
        fileWatchers.watchUpdateFile(),

        // certificate watchers
        certificateWatchers.watchGetObjectCertificates(),
    ])
}


export default rootSaga;