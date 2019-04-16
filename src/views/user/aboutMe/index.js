//@flow
import * as React from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import Certificate from "./certificate"
import CertificateActions from 'src/redux/actions/commonActions/certificateActions'
import Education from "./education"
import EducationActions from 'src/redux/actions/user/educationActions'
import ModalActions from 'src/redux/actions/modalActions'
import Product from './product'
import Research from './research'
import Skill from './skill'
import type {certificateType, skillType, workExperienceType} from 'src/consts/flowTypes/user/others'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {userEducationType, userResearchType} from 'src/consts/flowTypes/user/basicInformation'
import WorkExperience from './workExperience'
import WorkExperienceActions from 'src/redux/actions/user/workExperienceActions'
import {getMessages} from "src/redux/selectors/translateSelector"
import {makeGetEducations} from 'src/redux/selectors/user/userGetEducationsSelector'
import {makeGetResearches} from 'src/redux/selectors/user/userGetResearchesSelector'
import {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {userCertificatesSelector} from 'src/redux/selectors/common/certificate/userCertificatesSelector'
import {makeGetWorkExperiences} from 'src/redux/selectors/user/userGetWorkExperiencesSelector'
import ResearchActions from 'src/redux/actions/user/researchActions'
import SkillActions from 'src/redux/actions/user/skillActions'
import {makeGetSkills} from '../../../redux/selectors/user/userGetSkillSelector'

type OrganAboutUsProps = {
  certificates: [certificateType],
  products: [Object],
  files: [fileType],
  user: identityType,
  translate: TranslatorType,
  actions: Object,
  showModal: Function,
  educations: [userEducationType],
  workExperiences: [workExperienceType],
  researches: [userResearchType],
  skills: [skillType],
}

const UserAboutUs = (props: OrganAboutUsProps) => {
  const {
    translate, user, actions, products, certificates, files, educations, workExperiences, researches, skills
  } = props
  const {
    getCertificatesByIdentity, showModal, createCertificate, updateCertificate,
    createEducation, updateEducation, getEducations, getWorkExperiences, createWorkExperience, updateWorkExperience,
    updateResearch, getResearches, createResearch, updateSkill, getSkills, createSkill
  } = actions
  return (
      <div className="about-us">
        <Education updateEducation={updateEducation} translate={translate} owner={user}
                   educations={educations} getEducations={getEducations} createEducation={createEducation}/>
        <WorkExperience updateWorkExperience={updateWorkExperience} translate={translate} owner={user}
                        workExperiences={workExperiences} getWorkExperiences={getWorkExperiences}
                        createWorkExperience={createWorkExperience}/>
        <Skill updateSkill={updateSkill} translate={translate} owner={user}
               skills={skills} getSkills={getSkills}
               createSkill={createSkill}/>
        <Certificate updateCertificate={updateCertificate} files={files} translate={translate} owner={user}
                     certificates={certificates} getCertificatesByIdentity={getCertificatesByIdentity}
                     createCertificate={createCertificate}/>
        <Product showModal={showModal} products={products} translate={translate} owner={user}/>
        <Research updateResearch={updateResearch} translate={translate} owner={user}
                  researches={researches} getResearches={getResearches}
                  createResearch={createResearch}/>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const getEducations = makeGetEducations(state, ownProps)
  const getResearches = makeGetResearches(state, ownProps)
  const getWorkExperiencesSelector = makeGetWorkExperiences(state, ownProps)
  const getSkills = makeGetSkills(state, ownProps)

  return (state, props) => {
    return {
      translate: getMessages(state),
      certificates: userCertificatesSelector(state, ownProps),
      files: state.common.file.list,
      products: [],
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
    updateCertificate: CertificateActions.updateCertificate,


    createEducation: EducationActions.createEducationByUserId,
    updateEducation: EducationActions.updateEducationByUserId,
    getEducations: EducationActions.getEducationByUserId,
    getWorkExperiences: WorkExperienceActions.getWorkExperienceByUserId,
    createWorkExperience: WorkExperienceActions.createWorkExperienceByUserId,
    updateWorkExperience: WorkExperienceActions.updateWorkExperienceByUserId,
    getResearches: ResearchActions.getResearchByUserId,
    updateResearch: ResearchActions.updateResearchByUserId,
    createResearch: ResearchActions.createResearchByUserId,
    createSkill: SkillActions.createSkill,
    updateSkill: SkillActions.updateSkillByUserId,
    getSkills: SkillActions.getSkillByUserId,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAboutUs);