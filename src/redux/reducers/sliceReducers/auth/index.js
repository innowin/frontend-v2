import createCustomer from './createCustomer'
import createEducationByUserId from './createEducationByUserId'
import createFollow from './createFollow'
import createPost from './createPost'
import createResearchByUserId from './createResearchByUserId'
import createWorkExperienceByUserId from './createWorkExperienceByUserId'
import deleteCertificate from './deleteCertificate'
import deleteCustomer from './deleteCustomer'
import deleteEducationByUserId from './deleteEducationByUserId'
import deleteExchangeMembership from './deleteExchangeMembership'
import deleteFollow from './deleteFollow'
import deletePost from './deletePost'
import deleteProduct from './deleteProduct'
import deleteResearchByUserId from './deleteResearchByUserId'
import deleteWorkExperienceByUserId from './deleteWorkExperienceByUserId'
import deleteSkillByUserId from './deleteSkillByUserId'
import getEducationByUserId from './getEducationByUserId'
import getExchangeMembershipByMemberIdentity from './getExchangeMembershipByMemberIdentity'
import getCertificatesByIdentity from './getCertificatesByIdentity'
import getCustomersByOrganizationId from './getCustomersByOrganizationId'
import getFollowees from './getFollowees'
import getFollowers from './getFollowers'
import getPostByIdentity from './getPostByIdentity'
import getPost from './getPost'
import getProductsByIdentity from './getProductsByIdentity'
import getResearchByUserId from './getResearchByUserId'
import getSkillByUserId from './getSkillByUserId'
import getWorkExperienceByUserId from './getWorkExperienceByUserId'
import setToken from "./setToken"
import signIn from "./signIn"
import updateProfileByProfileId from './updateProfileByProfileId'
import updateUserByUserId from './updateUserByUserId'

export default {
  createCustomer,
  createEducationByUserId,
  createFollow,
  createPost,
  createResearchByUserId,
  deleteEducationByUserId,
  createWorkExperienceByUserId,
  deleteCertificate,
  deleteCustomer,
  deleteExchangeMembership,
  deleteFollow,
  deletePost,
  deleteProduct,
  deleteResearchByUserId,
  deleteWorkExperienceByUserId,
  getEducationByUserId,
  getExchangeMembershipByMemberIdentity,
  getCertificatesByIdentity,
  getCustomersByOrganizationId,
  getFollowees,
  getFollowers,
  getPostByIdentity,
  getPost,
  getProductsByIdentity,
  getResearchByUserId,
  getSkillByUserId,
  deleteSkillByUserId,
  getWorkExperienceByUserId,
  setToken,
  signIn,
  updateProfileByProfileId,
  updateUserByUserId,
}