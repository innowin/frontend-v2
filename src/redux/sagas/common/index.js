import hashTagWatchers from "./hashTag/hashTag";
import locationWatchers from "./location/location";
import categoryWatchers from "./category/category";
import certificateWatchers from "./certificate/certificate";
import badgeWatchers from "./badge/badge";
import productWatchers from "./product/product";
import fileWatchers from "./file/file";

export default [
    // product watchers
    productWatchers.watchGetProductInfo(),
    productWatchers.watchUpdateProduct(),
    productWatchers.watchCreateProduct(),
    productWatchers.watchCreateProductPicture(),

    // category watchers
    categoryWatchers.watchGetCategoriesList(),

    // file watchers
    fileWatchers.watchGetFile(),
    fileWatchers.watchCreateFile(),
    fileWatchers.watchUpdateFile(),
    fileWatchers.watchDelFileMiddleWareData(),

    // certificate watchers
    certificateWatchers.watchGetObjectCertificates(),
    certificateWatchers.watchCreateObjectCertificate(),
    certificateWatchers.watchResetCreatingObjectCertStatus(),

    // badge watchers
    badgeWatchers.watchGetOrganBadges(),
    badgeWatchers.watchGetUserBadges(),

    // hashTag watchers
    hashTagWatchers.watchGetHashTags(),
    hashTagWatchers.watchCreateHashTagFor(),

    // location
    locationWatchers.watchGetCountries(),
    locationWatchers.watchGetProvinces(),
    locationWatchers.watchGetCities(),
]