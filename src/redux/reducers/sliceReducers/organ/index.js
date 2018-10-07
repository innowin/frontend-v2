import createWorkExperienceByUserId from './createWorkExperienceByUserId'
import deleteWorkExperienceByUserId from './deleteWorkExperienceByUserId'
import getWorkExperienceByUserId from './getWorkExperienceByUserId'
import getExchangeMembershipByMemberIdentity from "./getExchangeMembershipByMemberIdentity"
import getFollowees from "./getFollowees"
import getFollowers from "./getFollowers"
import createFollow from "./createFollow"
import deleteFollow from "./deleteFollow"
import getCertificatesByIdentity from "./getCertificatesByIdentity"
import deleteCertificate from "./deleteCertificate"
import createPost from "./createPost"
import deletePost from "./deletePost"
import getPostByIdentity from "./getPostByIdentity"

export default {
  createFollow,
  createPost,
  createWorkExperienceByUserId,
  deleteCertificate,
  deleteFollow,
  deletePost,
  deleteWorkExperienceByUserId,
  getCertificatesByIdentity,
  getExchangeMembershipByMemberIdentity,
  getFollowees,
  getFollowers,
  getPostByIdentity,
  getWorkExperienceByUserId,
}