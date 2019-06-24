import badgeWatchers from "./badge/badge"
import categoryWatchers from "./category/category"
import certificateWatchers from "./certificate/certificate"
import commentWatchers from './comment/comment'
import educationFieldsWatchers from './educationField/educationField'
import exchangeMembershipWatchers from './exchangeMembership/exchangeMembership'
import fileWatchers from "./file"
import likeWatchers from "./like"
import hashTagWatchers from "./hashTag/hashTag"
import locationWatchers from "./location/location"
import postWatchers from './post/post'
import productWatchers from "./product/product"
import socialWatchers from './social/social'
import universityWatchers from './university/university'

export default [
  // product watchers
  ...productWatchers,

  // category watchers
  ...categoryWatchers,

  // file watchers
  ...fileWatchers,

  // like watchers
  ...likeWatchers,

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

  ...universityWatchers,

  ...educationFieldsWatchers

]