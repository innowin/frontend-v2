import hashTagWatchers from "./hashTag/hashTag";
import locationWatchers from "./location/location";
import categoryWatchers from "./category/category";
import certificateWatchers from "./certificate/certificate";
import badgeWatchers from "./badge/badge";
import productWatchers from "./product/product";
import fileWatchers from "./file/file";
import postWatchers from './post/post'
import socialWatchers from './social/social'
import exchangeMembershipWatchers from './exchangeMembership/exchangeMembership'

export default [
  // product watchers
  productWatchers.watchGetProductInfo(),
  productWatchers.watchUpdateProduct(),
  productWatchers.watchCreateProduct(),
  productWatchers.watchCreateProductPicture(),
  productWatchers.watchGetProductsByIdentity(),
  productWatchers.watchDeleteProductByIdentity(),

  // category watchers
  categoryWatchers.watchGetCategoriesList(),

  // file watchers
  fileWatchers.watchGetFile(),
  fileWatchers.watchCreateFile(),
  fileWatchers.watchUpdateFile(),
  fileWatchers.watchDelFileMiddleWareData(),

  // certificate watchers
  // certificateWatchers.watchGetObjectCertificates(),
  certificateWatchers.watchCreateObjectCertificate(),
  certificateWatchers.watchResetCreatingObjectCertStatus(),

  // badge watchers
  badgeWatchers.watchGetOrganBadges(),
  badgeWatchers.watchGetUserBadges(),

  // hashTag watchers
  hashTagWatchers.watchGetHashTags(),
  // hashTagWatchers.watchCreateHashTagFor(),

  // location
  locationWatchers.watchGetCountries(),
  locationWatchers.watchGetProvinces(),
  locationWatchers.watchGetCities(),

  // posts
  postWatchers.watchFilterPostsByPostParentPostTypeLimitOffset(),
  postWatchers.watchGetPostByIdentity(),
  postWatchers.watchGetPostViewerCount(),
  postWatchers.watchSetPostViewer(),
  postWatchers.watchCreatePost(),
  postWatchers.watchUpdatePost(),
  postWatchers.watchDeletePost(),

  // social
  socialWatchers.watchGetFollowees(),
  socialWatchers.watchGetFollowers(),
  socialWatchers.watchDeleteFollow(),
  socialWatchers.watchUpdateFollow(),
  socialWatchers.watchCreateFollow(),

  // exchangeMembership
  exchangeMembershipWatchers.watchDeleteExchangeMembership(),
  exchangeMembershipWatchers.watchGetExchangeMembershipByMemberIdentity(),
  exchangeMembershipWatchers.watchGetExchangeMembershipByExchangeId(),
  exchangeMembershipWatchers.watchCreateExchangeMembership(),
]