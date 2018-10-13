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
import commentWatchers from './comment/comment'

export default [
  // product watchers
  ...productWatchers,

  // category watchers
  ...categoryWatchers,

  // file watchers
  ...fileWatchers,

  // certificate watchers
  ...certificateWatchers,

  // badge watchers
  ...badgeWatchers,

  // hashTag watchers
  ...hashTagWatchers,

  // location
  ...locationWatchers,

  // posts
  ...postWatchers,

  // social
  ...socialWatchers,

  // comment
  ...commentWatchers,

  // exchangeMembership
  ...exchangeMembershipWatchers,
]