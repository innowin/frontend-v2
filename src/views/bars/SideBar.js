// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import type {organizationType} from 'src/consts/flowTypes/organization/organization'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {userType} from 'src/consts/flowTypes/user/basicInformation'
import {
  DefaultUserIcon,
  DefaultOrganIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedInIcon,
  InstagramIcon
} from 'src/images/icons'
import CertificateActions from 'src/redux/actions/commonActions/certificateActions'
import CertificateForm from '../common/newCertificate/CertificateForm'
import CheckOwner from '../common/CheckOwner'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import EducationActions from 'src/redux/actions/user/educationActions'
import EducationForm from '../user/aboutMe/education/EducationForm'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import getFile from 'src/redux/actions/commonActions/fileActions'
import Material from '../common/components/Material'
import Modal from '../pages/modal/modal'
import ModalActions from 'src/redux/actions/modalActions'
import ResearchActions from 'src/redux/actions/user/researchActions'
import ResearchForm from '../user/aboutMe/research/ResearchForm'
import SkillActions from 'src/redux/actions/user/skillActions'
import SkillForm from '../user/aboutMe/skill/SkillForm'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import TempActions from 'src/redux/actions/tempActions'
import types from 'src/redux/actions/types'
import updateUserByUserIdAction from 'src/redux/actions/user/updateUserByUserIdAction'
import uuid from 'uuid'
import WorkExperienceActions from 'src/redux/actions/user/workExperienceActions'
import WorkExperienceForm from '../user/aboutMe/workExperience/WorkExperienceForm'
import {bindActionCreators} from 'redux'
import {createFileFunc} from 'src/views/common/Functions'
import {getFollowersSelector} from 'src/redux/selectors/common/social/getFollowers'
import {getMessages} from 'src/redux/selectors/translateSelector'


export const BadgesCard = (props: { badgesImg: (string)[] }) => {
  return <React.Fragment>
    {
      props.badgesImg.map((badgeImg, i) =>
          <span key={i + 'BadgesCard'}>
          <img src={badgeImg} alt=""/>
      </span>)
    }
  </React.Fragment>
}

export const TagsBox = (props: { tags: ({ title: string })[] }) => {
  return <React.Fragment>
    {
      props.tags.map((tag, i) =>
          <div className="mb-1" key={i + 'TagsBox'}>
            <span className="badge -myBadge" dir="ltr">{tag.title}</span>
          </div>)
    }
  </React.Fragment>
}

type PropsSideBarContent = {
  sideBarType: string,
  owner: userType | organizationType,
  paramId: number,
  translate?: TranslatorType,
  className?: string,
  actions: {
    createFollow: Function,
    getFollowers: Function,
    updateOrganization: Function,
    createFile: Function,
    removeFileFromTemp: Function,
    createWorkExperience: Function,
    createEducation: Function,
    createResearch: Function,
    createSkill: Function,
    createCertificate: Function,
    showModal: Function,
  },
  followers?: [],
}
type StateSideBarContent = {
  menuToggle: boolean,
  editProfile: boolean,
  saving: boolean,
  descriptionState: ?string,
  selectedImage: string | ArrayBuffer,
  selectedBannerFile: string,
  selectedBanner: ArrayBuffer | string,
  descriptionClass: ?string,
  processing: boolean,
  processingBanner: boolean,
  profileBannerId: null,
  profileMediaId: null,
  showModalState: {
    add: boolean,
    education: boolean,
    workExperience: boolean,
    skill: boolean,
    certificate: boolean,
    research: boolean,
  }
}

class SideBarContent extends React.Component<PropsSideBarContent, StateSideBarContent> {

  static propTypes = {
    sideBarType: PropTypes.string.isRequired,
    className: PropTypes.string,
    owner: PropTypes.object,
    paramId: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuToggle: false,
      editProfile: false,
      saving: false,
      descriptionState: '',
      selectedImageFile: '',
      selectedImage: '',
      selectedBannerFile: '',
      selectedBanner: '',
      descriptionClass: 'hide-message',
      processing: false,
      processingBanner: false,
      profileBannerId: null,
      profileMediaId: null,
      showModalState: {
        add: false,
        education: false,
        workExperience: false,
        skill: false,
        certificate: false,
        research: false,
      }
    }
  }

  _uploadHandler = (fileString: any) => {
    const reader = new FileReader()
    if (fileString) {
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedImage: reader.result,
          selectedImageFile: fileString,
        }, this._createFile)
      }
      reader.readAsDataURL(fileString)
    }
  }

  _createFile = () => {
    const {createFile} = this.props.actions
    const {selectedImageFile, selectedImage} = this.state
    this.setState({...this.state, processing: true})
    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionData = 'profile_media'
    const createArguments = {
      fileIdKey: 'fileId',
      nextActionType,
      nextActionData: {tempFileKeyName: nextActionData},
    }
    const fileId = uuid()
    this.setState({...this.state, profileMediaId: fileId})
    const file = {fileId, formFile: selectedImageFile}
    createFileFunc(createFile, selectedImage, createArguments, constants.CREATE_FILE_TYPES.IMAGE, constants.CREATE_FILE_CATEGORIES.PROFILE.PROFILE_PICTURE, file)
  }

  _uploadHandlerBanner = (fileString: any) => {
    const reader = new FileReader()
    if (fileString) {
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedBanner: reader.result,
          selectedBannerFile: fileString,
        }, this._createFileBanner)
      }
      reader.readAsDataURL(fileString)
    }
  }

  _createFileBanner = () => {
    const {createFile} = this.props.actions
    const {selectedBannerFile, selectedBanner} = this.state
    this.setState({...this.state, processingBanner: true})
    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionData = 'profile_banner'
    const createArguments = {
      fileIdKey: 'fileId',
      nextActionType,
      nextActionData: {tempFileKeyName: nextActionData},
    }
    const fileId = uuid()
    this.setState({...this.state, profileBannerId: fileId})
    const file = {fileId, formFile: selectedBannerFile}
    createFileFunc(createFile, selectedBanner, createArguments, constants.CREATE_FILE_TYPES.IMAGE, constants.CREATE_FILE_CATEGORIES.PROFILE.BANNER, file)
  }

  _getValues = () => {
    const {owner, bannerIdTemp, pictureIdTemp, sideBarType} = this.props
    const {descriptionState} = this.state
    const bannerId = bannerIdTemp ? bannerIdTemp : owner.profile_banner
    const pictureId = pictureIdTemp ? pictureIdTemp : owner.profile_media
    if (sideBarType === constants.USER_TYPES.USER) {
      return {
        id: owner.id,
        description: descriptionState,
        profile_banner: bannerId,
        profile_media: pictureId,
      }
    } else return {
      id: owner.id,
      description: descriptionState,
      profile_banner: bannerId,
      profile_media: pictureId,
      organization_banner: bannerId,
      organization_logo: pictureId,
    }
  }

  _formValidate = () => {
    let result = true
    const {descriptionState} = this.state
    const descriptionLength = descriptionState ? descriptionState.trim().length : 0
    const descriptionError = descriptionLength > 70
    const validates = [
      descriptionError,
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  _handleEditProfile = (e: any) => {
    e.preventDefault()
    const description = this.props.owner.description
    this.setState({
      ...this.state,
      editProfile: !this.state.editProfile,
      menuToggle: false,
      descriptionState: description,
    })
  }

  _createFollow = () => {
    const {clientIdentityId, owner, actions} = this.props
    const {createFollow} = actions || {}
    const followOwnerId = owner.id
    const formValues = {follow_follower: clientIdentityId, follow_followed: owner.id}
    createFollow({formValues, followOwnerId})
  }

  _checkCharacter = (description) => {
    const descriptionLength = description ? description.trim().length : 0
    if (descriptionLength === 0)
      this.setState({...this.state, descriptionClass: 'hide-message'})
    if (descriptionLength > 0 && descriptionLength < 65)
      this.setState({...this.state, descriptionClass: 'neutral-message'})
    if (descriptionLength >= 65 && descriptionLength < 70)
      this.setState({...this.state, descriptionClass: 'warning-message'})
  }

  _handleChangeText = (e) => {
    const description = e.target.value
    if (description.trim().length <= 70)
      this.setState({...this.state, descriptionState: description}, () => this._checkCharacter(description))
  }

  _handleBlurText = () => {
    this.setState({...this.state, descriptionClass: ''})
  }

  _save = () => {
    const {actions, owner} = this.props
    const {updateUserByUserId, removeFileFromTemp} = actions || {}
    const formValues = this._getValues()
    updateUserByUserId(formValues, owner.id)
    removeFileFromTemp('profile_banner')
    removeFileFromTemp('profile_media')
    this.setState({...this.state, saving: false, profileBannerId: null, profileMediaId: null})
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    if (this._formValidate()) {
      this.setState({...this.state, saving: true, editProfile: false})
    }
    return false
  }

  componentDidUpdate() {
    const {profileBannerId, profileMediaId, saving} = this.state
    const {bannerIdTemp, pictureIdTemp, temp} = this.props
    if (
        ((profileBannerId && temp[profileBannerId].progress === 100 && bannerIdTemp) || profileBannerId === null) &&
        ((profileMediaId && temp[profileMediaId].progress === 100 && pictureIdTemp) || profileMediaId === null)
    ) {
      if (saving) this._save()
    }
  }

  componentDidMount() {
    // (document.addEventListener: Function)('click', this._handleClickOutMenuBox)
    const {actions, description, paramId, owner} = this.props
    const {getFollowers, getFile} = actions || {}
    getFollowers({
      notProfile: true,
      followOwnerIdentity: paramId,
      followOwnerId: paramId,
    })
    getFile(owner.profile_media)
    getFile(owner.profile_banner)
    this.setState({...this.state, descriptionState: description}, () => this._checkCharacter(description))
  }

  _toggleAddModal = () => {
    const {showModalState} = this.state
    this.setState({
      ...this.state,
      showModalState: {
        ...showModalState,
        add: !showModalState.add,
      }
    })
  }

  _toggleEducationModal = (modal) => {
    const {showModalState} = this.state
    const {actions} = this.props
    const {showModal} = actions

    if (modal === 'product') {
      this.setState({
        ...this.state,
        showModalState: {
          ...showModalState,
          add: false,
        }
      })
      showModal({modalKey: 'productModal'})
    } else {

      this.setState({
        ...this.state,
        showModalState: {
          ...showModalState,
          add: false,
          [modal]: !showModalState[modal],
        }
      })
    }
  }


  render() {
    const {
      editProfile, selectedBanner, selectedImage, descriptionState, descriptionClass, processing, processingBanner,
      profileBannerId, profileMediaId, showModalState
    } = this.state
    const {
      sideBarType, badges, translate: tr, paramId, followers, clientIdentityId, owner, files, bannerIdTemp,
      pictureIdTemp, actions,
    } = this.props
    const {createWorkExperience, createEducation, createCertificate, createSkill, createResearch} = actions
    const {add, education, research, certificate, skill, workExperience} = showModalState
    const socialNetworks = {
      telegram_account: owner['telegram_account'],
      instagram_account: owner['instagram_account'],
      linkedin_account: owner['linkedin_account'],
      twitter_account: owner['twitter_account'],
    }
    const badgesImg = badges.map(badge => (
        (!badge) ? '' : (badge.badge_related_badge_category.badge_related_media.file)),
    )
    const chosenBadgesImg = badgesImg.slice(0, 4)
    const className = this.props.className ? this.props.className : ''
    const showFollow = followers && !followers.map(follower => follower.id).includes(clientIdentityId)
    const bannerString = selectedBanner || (owner.profile_banner && files[owner.profile_banner] && files[owner.profile_banner].file)
    const pictureString = selectedImage || (owner.profile_media && files[owner.profile_media] && files[owner.profile_media].file)
    const name = sideBarType === constants.USER_TYPES.USER ?
        (owner.first_name ? owner.first_name + ' ' : '' + owner.last_name ? owner.last_name : '') :
        (owner.nike_name || owner.official_name)
    return (
        <React.Fragment>
          <form className={className + ' pt-0'} onSubmit={this._handleSubmit}>
            <div className="editable-profile-img">
              {
                !bannerString ?
                    <div className="background-strips banner covered-img"/> :
                    <img alt="" src={bannerString} className="banner covered-img"/>
              }
              {
                editProfile ?
                    <input type="file" className='abel-input' onChange={!processingBanner ? e => this._uploadHandlerBanner(e.currentTarget.files[0]) : console.log('Still Uploading')}/>
                    : null
              }
            </div>
            <div className="sidebar-organ-user col">
              <div className="editable-profile-img profile-media">
                {
                  !pictureString ?
                      sideBarType === constants.USER_TYPES.USER ?
                          <DefaultUserIcon/> :
                          <DefaultOrganIcon/>
                      : <img className="covered-img" alt="" src={pictureString}/>
                }
                {
                  editProfile ?
                      <input type="file" className='abel-input' onChange={!processing ? e => this._uploadHandler(e.currentTarget.files[0]) : console.log('Still Uploading')}/>
                      : null
                }
              </div>
              <div className="align-items-center flex-column info-section">
                <div className="sidebar-name">{name}</div>
                {
                  (!editProfile) ? (
                      <span className="-grey1 sidebar-description text-center">{owner.description}</span>) : (
                      <div className='description'>
                        {
                          descriptionClass && <span
                              className={descriptionClass}>{descriptionState && descriptionState.trim().length + '/70'}</span>
                        }
                        <textarea
                            value={descriptionState}
                            onBlur={this._handleBlurText}
                            onChange={this._handleChangeText}
                        />
                      </div>
                  )
                }
              </div>
              {
                (chosenBadgesImg.length > 0) ? (
                    <div className="badgesCard">
                      <BadgesCard badgesImg={chosenBadgesImg}/>
                    </div>
                ) : ('')
              }
              {/*<div className="followNames">*/}
              {/*<span className="item">{followNames[0]}،</span>*/}
              {/*<span className="item">{followNames[1]}</span>*/}
              {/*<span>{` و ${followNames.length - 2 } نفر دیگر `}</span>*/}
              {/*</div>*/}
              <section className='user-sidebar-buttons'>
                <CheckOwner showForOwner={false} id={paramId}>
                  <div className="sidebarBottomParent">
                    <Material className="btn btn-outline-secondary sidebarBottom side-user"
                              content={tr && tr['Send Message']}/>
                    {showFollow ?
                        <Material
                            className="btn btn-outline-secondary sidebarFollowBottom follow-green-button side-user-follow"
                            onClick={this._createFollow}
                            content={tr && tr['Follow']}/>
                        : <div className="followed-text">
                          {tr && tr['Followed']}
                        </div>
                    }
                  </div>
                </CheckOwner>
                <CheckOwner showForOwner={true} id={paramId}>
                  <div className="sidebarBottomParent">
                    <Material className="btn btn-outline-secondary sidebarBottom side-user"
                              onClick={editProfile ? this._handleEditProfile : this._toggleAddModal}
                              content={(!editProfile) ? (tr && tr['Complete profile']) : (
                                  tr && tr['Cancel']
                              )}/>
                    <Material className={!editProfile
                        ? 'sidebarFollowBottom follow-green-button side-user-follow'
                        : 'side-user-follow-parent'}
                              onClick={!editProfile ? this._handleEditProfile : undefined}
                              content={(!editProfile) ? tr && tr['Edit Dashboard'] : (
                                  <button type="submit" className={
                                    (
                                        ((profileBannerId && this.props.temp[profileBannerId].progress === 100 && bannerIdTemp) || profileBannerId === null)
                                        &&
                                        ((profileMediaId && this.props.temp[profileMediaId].progress === 100 && pictureIdTemp) || profileMediaId === null)
                                    )
                                        ? 'sidebarFollowBottom follow-green-button side-user-follow' : 'disabled sidebarFollowBottom follow-green-button side-user-follow'
                                  }>
                                    {tr && tr['Save changes']}
                                  </button>
                              )}/>
                  </div>
                </CheckOwner>
              </section>
              <div className="social-network">
                {socialNetworks.twitter_account
                    ? <a href={socialNetworks.twitter_account} className='link' target="_blank">
                      <TwitterIcon className='social-icon twitter-active'/>
                    </a>
                    : <TwitterIcon className='social-icon'/>
                }
                {socialNetworks.telegram_account
                    ? <a href={socialNetworks.telegram_account} className='link' target="_blank">
                      <TelegramIcon className='social-icon telegram-active'/>
                    </a>
                    : <TelegramIcon className='social-icon'/>
                }
                {socialNetworks.instagram_account
                    ? <a href={socialNetworks.instagram_account} className='link' target={'_blank'}>
                      <InstagramIcon className='social-icon instagram-active'/>
                    </a>
                    : <InstagramIcon className='social-icon'/>
                }
                {socialNetworks.linkedin_account
                    ? <a href={socialNetworks.linkedin_account} className='link' target="_blank">
                      <LinkedInIcon className='social-icon linkedin-active'/>
                    </a>
                    : <LinkedInIcon className='social-icon'/>
                }
              </div>
            </div>
          </form>
          <Modal open={add} closer={this._toggleAddModal}>
            <div className="event-modal add-experience-modal">
              <div className="head">
                <div className="title">{tr && tr['Add new expereince']}</div>
              </div>
              <p onClick={() => this._toggleEducationModal('education')}
                 className='item pulse'>{tr && tr['Education Experience']}</p>
              <p onClick={() => this._toggleEducationModal('workExperience')}
                 className='item pulse'>{tr && tr['Work experience']}</p>
              <p onClick={() => this._toggleEducationModal('skill')} className='item pulse'>{tr && tr['Skill']}</p>
              <p onClick={() => this._toggleEducationModal('certificate')}
                 className='item pulse'>{tr && tr['Certificate']}</p>
              <p onClick={() => this._toggleEducationModal('product')} className='item pulse'>{tr && tr['Product']}</p>
              <p onClick={() => this._toggleEducationModal('research')}
                 className='item pulse'>{tr && tr['Scientific Research']}</p>
            </div>
          </Modal>

          {education && <EducationForm createEducation={createEducation} translate={tr} owner={owner}
                                       toggleEdit={() => this._toggleEducationModal('education')}/>}
          {workExperience && <WorkExperienceForm createWorkExperience={createWorkExperience} translate={tr}
                                                 toggleEdit={() => this._toggleEducationModal('workExperience')}
                                                 owner={owner}/>}
          {skill && <SkillForm createSkill={createSkill} toggleEdit={() => this._toggleEducationModal('skill')}
                               translate={tr} owner={owner}/>}
          {certificate && <CertificateForm createCertificate={createCertificate} owner={owner} translate={tr}
                                           toggleEdit={() => this._toggleEducationModal('certificate')}/>}
          {research && <ResearchForm createResearch={createResearch} translate={tr} owner={owner}
                                     toggleEdit={() => this._toggleEducationModal('research')}/>}
        </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const bannerIdTemp = state.temp.file['profile_banner'] || null
  const pictureIdTemp = state.temp.file['profile_media'] || null
  return {
    translate: getMessages(state),
    clientIdentityId: state.auth.client.identity.content,
    bannerIdTemp,
    pictureIdTemp,
    followers: getFollowersSelector(state, ownProps),
    files: state.common.file.list,
    temp: state.temp.file,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
    createFollow: SocialActions.createFollow,
    getFollowers: SocialActions.getFollowers,
    createFile: FileActions.createFile,
    removeFileFromTemp: TempActions.removeFileFromTemp,
    getFile: getFile.getFile,
    showModal: ModalActions.showModal,
    createWorkExperience: WorkExperienceActions.createWorkExperienceByUserId,
    createEducation: EducationActions.createEducationByUserId,
    createResearch: ResearchActions.createResearchByUserId,
    createSkill: SkillActions.createSkill,
    createCertificate: CertificateActions.createCertificate,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(SideBarContent)