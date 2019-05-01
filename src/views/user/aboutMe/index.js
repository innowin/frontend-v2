//@flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Certificate from '../../common/newCertificate'
import CertificateActions from 'src/redux/actions/commonActions/certificateActions'
import Education from './education'
import EducationActions from 'src/redux/actions/user/educationActions'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import ModalActions from 'src/redux/actions/modalActions'
import Products from './product/Products'
import Research from './research'
import ResearchActions from 'src/redux/actions/user/researchActions'
import Resume from './resume'
import Skill from './skill'
import SkillActions from 'src/redux/actions/user/skillActions'
import type {certificateType, skillType, workExperienceType} from 'src/consts/flowTypes/user/others'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {userEducationType, userResearchType} from 'src/consts/flowTypes/user/basicInformation'
import updateUserByUserIdAction from 'src/redux/actions/user/updateUserByUserIdAction'
import WorkExperience from './workExperience'
import WorkExperienceActions from 'src/redux/actions/user/workExperienceActions'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getProductsSelector} from 'src/redux/selectors/common/product/userGetProductSelector'
import {makeGetEducations} from 'src/redux/selectors/user/userGetEducationsSelector'
import {makeGetResearches} from 'src/redux/selectors/user/userGetResearchesSelector'
import {makeGetSkills} from 'src/redux/selectors/user/userGetSkillSelector'
import {makeGetWorkExperiences} from 'src/redux/selectors/user/userGetWorkExperiencesSelector'
import {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {userCertificatesSelector} from 'src/redux/selectors/common/certificate/userCertificatesSelector'


type OrganAboutMeProps = {
  certificates: [certificateType],
  products: [Object],
  files: { [number]: fileType },
  user: identityType,
  translate: TranslatorType,
  educations: [userEducationType],
  workExperiences: [workExperienceType],
  researches: [userResearchType],
  skills: [skillType],
  actions: {
    showModal: Function,
    getCertificatesByIdentity: Function,
    createCertificate: Function,
    deleteCertificate: Function,
    updateCertificate: Function,
    createEducation: Function,
    deleteEducation: Function,
    updateEducation: Function,
    getEducations: Function,
    getWorkExperiences: Function,
    createWorkExperience: Function,
    deleteWorkExperience: Function,
    updateWorkExperience: Function,
    getResearches: Function,
    updateResearch: Function,
    createResearch: Function,
    deleteResearch: Function,
    createSkill: Function,
    deleteSkill: Function,
    updateSkill: Function,
    getSkills: Function,
    deleteFile: Function,
    updateUser: Function,
  },
}

const UserAboutMe = (props: OrganAboutMeProps) => {
  const {
    translate, user, actions, products, certificates, files, educations, workExperiences, researches, skills,
  } = props
  const {
    getCertificatesByIdentity, createCertificate, updateCertificate,
    createEducation, updateEducation, getEducations, getWorkExperiences, createWorkExperience, updateWorkExperience,
    updateResearch, getResearches, createResearch, updateSkill, getSkills, createSkill, deleteSkill, deleteEducation,
    deleteWorkExperience, deleteResearch, deleteCertificate, deleteFile, updateUser
  } = actions
  return (
      <div className="about-us">
        <Education deleteEducation={deleteEducation} updateEducation={updateEducation} translate={translate}
                   owner={user} educations={educations} getEducations={getEducations}
                   createEducation={createEducation}/>

        <WorkExperience deleteWorkExperience={deleteWorkExperience} updateWorkExperience={updateWorkExperience}
                        translate={translate} owner={user} workExperiences={workExperiences}
                        getWorkExperiences={getWorkExperiences} createWorkExperience={createWorkExperience}/>

        <Skill deleteSkill={deleteSkill} updateSkill={updateSkill} translate={translate} owner={user} skills={skills}
               getSkills={getSkills} createSkill={createSkill}/>

        <Certificate updateCertificate={updateCertificate} files={files} translate={translate} owner={user}
                     certificates={certificates} getCertificatesByIdentity={getCertificatesByIdentity}
                     createCertificate={createCertificate} deleteCertificate={deleteCertificate}/>

        <Resume updateUser={updateUser} translate={translate} owner={user} files={files} deleteFile={deleteFile}/>

        <Products translate={translate} products={products}/>

        <Research updateResearch={updateResearch} translate={translate} owner={user} researches={researches}
                  getResearches={getResearches} deleteResearch={deleteResearch} createResearch={createResearch}/>
      </div>
  )
}

UserAboutMe.propTypes = {
  certificates: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  files: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  educations: PropTypes.array.isRequired,
  workExperiences: PropTypes.array.isRequired,
  researches: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const getEducations = makeGetEducations(state, ownProps)
  const getResearches = makeGetResearches(state, ownProps)
  const getWorkExperiencesSelector = makeGetWorkExperiences(state, ownProps)
  const getSkills = makeGetSkills(state, ownProps)

  return (state, props) => {
    return {
      translate: getMessages(state),
      products: getProductsSelector(state, {ownerId: ownProps.userId}),
      certificates: userCertificatesSelector(state, ownProps),
      files: state.common.file.list,
      educations: getEducations(state, props),
      researches: getResearches(state, props),
      workExperiences: getWorkExperiencesSelector(state, props),
      skills: getSkills(state, props),
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    showModal: ModalActions.showModal,
    getCertificatesByIdentity: CertificateActions.getCertificatesByIdentity,
    createCertificate: CertificateActions.createCertificate,
    deleteCertificate: CertificateActions.deleteCertificate,
    updateCertificate: CertificateActions.updateCertificate,
    createEducation: EducationActions.createEducationByUserId,
    deleteEducation: EducationActions.deleteEducationByUserId,
    updateEducation: EducationActions.updateEducationByUserId,
    getEducations: EducationActions.getEducationByUserId,
    getWorkExperiences: WorkExperienceActions.getWorkExperienceByUserId,
    createWorkExperience: WorkExperienceActions.createWorkExperienceByUserId,
    deleteWorkExperience: WorkExperienceActions.deleteWorkExperienceByUserId,
    updateWorkExperience: WorkExperienceActions.updateWorkExperienceByUserId,
    getResearches: ResearchActions.getResearchByUserId,
    updateResearch: ResearchActions.updateResearchByUserId,
    createResearch: ResearchActions.createResearchByUserId,
    deleteResearch: ResearchActions.deleteResearchByUserId,
    createSkill: SkillActions.createSkill,
    deleteSkill: SkillActions.deleteSkillByUserId,
    updateSkill: SkillActions.updateSkillByUserId,
    getSkills: SkillActions.getSkillByUserId,
    deleteFile: FileActions.deleteFile,
    updateUser: updateUserByUserIdAction.updateUser,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAboutMe)