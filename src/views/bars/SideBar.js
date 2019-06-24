// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {userType} from 'src/consts/flowTypes/user/basicInformation'
import {DefaultUserIcon, DefaultOrganIcon, TwitterIcon, TelegramIcon, LinkedInIcon, InstagramIcon, Location, CalendarEmpty, StaffCount} from 'src/images/icons'
import CertificateActions from 'src/redux/actions/commonActions/certificateActions'
import CertificateForm from '../common/newCertificate/CertificateForm'
import CheckOwner from '../common/CheckOwner'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import EducationActions from 'src/redux/actions/user/educationActions'
import EducationForm from '../user/aboutMe/education/EducationForm'
import FileActions from 'src/redux/actions/commonActions/fileActions'
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
import getAllCountries from '../../redux/selectors/common/location/getCountry'
import {getCountries} from '../../redux/actions/commonActions/location'
import MyDatePicker from '../common/components/DatePicker'

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
      editStatus: false,
      saving: false,
      descriptionState: '',
      selectedImageFile: '',
      selectedImage: '',
      selectedBannerFile: '',
      selectedBanner: '',
      editStatusTitle: null,
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
      },
    }
  }

  componentDidMount() {
    const {actions, description, paramId} = this.props
    const {getFollowers, getCountries} = actions || {}
    getFollowers({
      notProfile: true,
      followOwnerIdentity: paramId,
      followOwnerId: paramId,
    })
    getCountries()
    this.setState({...this.state, descriptionState: description}, () => this._checkCharacter(description))
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
    const {descriptionState, editName, editLastName, editTown, editBirthDate, editTelegram, editInstagram, editLinkedIn, editTwitter, editStaff, editStatusTitle} = this.state
    const bannerId = bannerIdTemp ? bannerIdTemp : owner.profile_banner
    const pictureId = pictureIdTemp ? pictureIdTemp : owner.profile_media
    const name = sideBarType === constants.USER_TYPES.USER ? {first_name: editName, last_name: editLastName} : {nike_name: editName, official_name: editLastName}
    const birth_date = sideBarType === constants.USER_TYPES.USER ? {birth_date: editBirthDate} : {established_year: editBirthDate}
    return {
      id: owner.id,
      description: descriptionState,
      profile_banner: bannerId,
      profile_media: pictureId,
      country: editTown,
      telegram_account: editTelegram,
      instagram_account: editInstagram,
      linkedin_account: editLinkedIn,
      twitter_account: editTwitter,
      staff_count: editStaff,
      work_status: editStatusTitle,
      ...name,
      ...birth_date,
    }
  }

  _formValidate = () => {
    let result = true
    const {sideBarType} = this.props
    const {descriptionState, editName, editLastName} = this.state
    const descriptionLength = descriptionState ? descriptionState.trim().length : 0
    const descriptionError = descriptionLength > 70
    const nameError = editName !== null && editName.length === 0
    const lastNameError = sideBarType === constants.USER_TYPES.USER ? editLastName !== null && editLastName.length === 0 : false

    const validates = [
      descriptionError,
      nameError,
      lastNameError,
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
    const {owner, sideBarType} = this.props
    const editName = sideBarType === constants.USER_TYPES.USER ? owner.first_name : owner.nike_name
    const editLastName = sideBarType === constants.USER_TYPES.USER ? owner.last_name : owner.official_name
    const editBirthDate = sideBarType === constants.USER_TYPES.USER ? owner.birth_date : owner.established_year
    this.setState({
      ...this.state,
      selectedImageFile: '',
      selectedImage: '',
      selectedBannerFile: '',
      selectedBanner: '',
      menuToggle: false,
      descriptionState: owner.description,
      editName,
      editLastName,
      editTown: owner.country,
      editStaff: owner.staff_count,
      editBirthDate,
      editTelegram: owner.telegram_account,
      editInstagram: owner.instagram_account,
      editLinkedIn: owner.linkedin_account,
      editTwitter: owner.twitter_account,
      editProfile: !this.state.editProfile,
      editStatus: false,
      editStatusTitle: owner.work_status,
    })
  }

  changeStatus(status) {
    this.setState({...this.state, editStatusTitle: status.name, editStatus: false})
  }

  _changeEditStatus = () => {
    if (this.state.editProfile) {
      this.setState({...this.state, editStatus: !this.state.editStatus})
    }
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

  handleParameter = (title, e) => {
    this.setState({...this.state, [title]: e.target.value})
  }

  handleDate = (title, e) => {
    this.setState({...this.state, [title]: e})
  }

  handleDateCompany = (title, e) => {
    this.setState({...this.state, [title]: e.target.value.substring(0, 4)})
  }

  handleCountry = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, editTown: value === 0 ? null : value})
  }

  handleStaff = (e) => {
    const value = parseInt(e.target.value, 10)
    this.setState({...this.state, editStaff: value === 0 ? null : value})
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

  _toggleAddModal = () => {
    const {showModalState} = this.state
    this.setState({
      ...this.state,
      showModalState: {
        ...showModalState,
        add: !showModalState.add,
      },
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
        },
      })
      showModal({modalKey: 'productModal'})
    }
    else {
      this.setState({
        ...this.state,
        showModalState: {
          ...showModalState,
          add: false,
          [modal]: !showModalState[modal],
        },
      })
    }
  }

  render() {
    const {
      editProfile, selectedBanner, selectedImage, descriptionState, descriptionClass, processing,
      processingBanner, profileBannerId, profileMediaId, showModalState, editName, editLastName,
      editBirthDate, editTelegram, editInstagram, editLinkedIn, editTwitter, editStatus, editStatusTitle,
    } = this.state
    const {sideBarType, badges, translate: tr, paramId, followers, clientIdentityId, owner, bannerIdTemp, pictureIdTemp, actions, temp, countries} = this.props
    const {createWorkExperience, createEducation, createCertificate, createSkill, createResearch} = actions
    const {add, education, research, certificate, skill, workExperience} = showModalState
    const badgesImg = badges.map(badge => !badge ? '' : badge.badge_related_badge_category.badge_related_media.file)
    const chosenBadgesImg = badgesImg.slice(0, 4)
    const showFollow = !followers.map(follower => follower.follow_follower.id ? follower.follow_follower.id : follower.follow_follower).includes(clientIdentityId)
    const bannerString = selectedBanner || (owner.profile_banner && owner.profile_banner.file)
    const pictureString = selectedImage || (owner.profile_media && owner.profile_media.file)
    const name = sideBarType === constants.USER_TYPES.USER ?
        (owner.first_name && owner.last_name ? owner.first_name + ' ' + owner.last_name : owner.last_name ? owner.last_name : owner.first_name ? owner.first_name : '') :
        (owner.nike_name || owner.official_name)

    return (
        <div className='col-md-3 col-sm-1 -right-sidebar-wrapper col'>
          <form className='-right-sidebar-wrapper-cont' onSubmit={this._handleSubmit}>
            <div className="editable-profile-img">
              {
                !bannerString ?
                    <div className="background-strips banner banner-radius covered-img"/> :
                    <img alt="" src={bannerString} className="banner banner-radius covered-img" style={{opacity: temp[profileBannerId] && temp[profileBannerId].progress ? temp[profileBannerId].progress / 100 : 1}}/>
              }
              {
                editProfile ?
                    <div>
                      <input type="file" className='abel-input' onChange={!processingBanner ? e => this._uploadHandlerBanner(e.currentTarget.files[0]) : console.log('Still Uploading')}/>
                      <button className='user-submit-short' type="submit">ثبت</button>
                      <div className='user-cancel-short' onClick={this._handleEditProfile}>لغو</div>
                    </div>
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
                      : <img className="covered-img" alt="" src={pictureString} style={{opacity: temp[profileMediaId] && temp[profileMediaId].progress ? temp[profileMediaId].progress / 100 : 1}}/>
                }
                {
                  editProfile ?
                      <div>
                        <input type="file" className='abel-input' onChange={!processing ? e => this._uploadHandler(e.currentTarget.files[0]) : console.log('Still Uploading')}/>
                      </div>
                      : null
                }
              </div>
              <div className="align-items-center flex-column info-section">
                <div className="sidebar-name">
                  {
                    editProfile ?
                        <div>
                          <div className='user-edit-name-title-required'>{sideBarType === constants.USER_TYPES.USER ? 'نام' : 'نام کاربری'}</div>
                          <input className='user-edit-name' type='text' value={editName} onChange={e => this.handleParameter('editName', e)}/>
                          <div className={sideBarType === constants.USER_TYPES.USER ? 'user-edit-name-title-required-second' : 'user-edit-name-title-second'}>{sideBarType === constants.USER_TYPES.USER ? 'نام خانوادگی' : 'نام رسمی'}</div>
                          <input className='user-edit-name' type='text' value={editLastName} onChange={e => this.handleParameter('editLastName', e)}/>
                        </div>
                        :
                        name
                  }
                </div>
                {
                  editProfile ?
                      <div className='description'>
                        <div className='user-edit-name-title'>بیوگرافی</div>
                        {
                          descriptionClass && <span className={descriptionClass}>{descriptionState && descriptionState.trim().length + '/70'}</span>
                        }
                        <textarea
                            value={descriptionState}
                            onBlur={this._handleBlurText}
                            onChange={this._handleChangeText}
                        />
                      </div>
                      :
                      <div className='user-description-side'>
                        <span className="-grey1 sidebar-description text-center">{owner.description}</span>
                      </div>
                }
                <div className='sidebar-position'>
                  {
                    editProfile ?
                        <div>
                          <div className='user-edit-name-title'>موقعیت</div>
                          <select className='user-edit-name' onChange={this.handleCountry}>
                            <option className='user-edit-name' value={0}>انتخاب</option>
                            {
                              Object.values(countries.list).map((country, index) => {
                                    if (owner.country === country.id) {
                                      return <option className='user-edit-name' key={index} value={country.id} selected>{country.name}</option>
                                    }
                                    else return <option className='user-edit-name' key={index} value={country.id}>{country.name}</option>
                                  },
                              )
                            }
                          </select>
                        </div>
                        :
                        <div className='user-sidebar-loc'>
                          {
                            countries.list[owner.country] && countries.list[owner.country].name &&
                            <span>
                              <Location className='user-view-sidebar-loc-svg'/>
                              {countries.list[owner.country] && countries.list[owner.country].name}
                            </span>
                          }
                          {
                            (owner.birth_date || owner.established_year) &&
                            <span>
                              <CalendarEmpty className='user-view-cal-sidebar-svg'/>
                              {owner.birth_date || owner.established_year}
                            </span>
                          }
                          {
                            (sideBarType === constants.USER_TYPES.ORG && owner.staff_count) &&
                            <span>
                              <StaffCount className='user-view-staff-sidebar-svg'/>
                              {
                                owner.staff_count === 10 ? '1 - 10' :
                                    owner.staff_count === 50 ? '10 - 20' :
                                        owner.staff_count === 100 ? '20 - 50' :
                                            owner.staff_count === 200 ? 'بیشتر از 50' : owner.staff_count
                              }
                              <span> عضو</span>
                            </span>
                          }
                        </div>
                  }
                </div>

                {
                  editProfile &&
                  <div className='sidebar-position'>
                    <div>
                      <div className='user-edit-name-title'>{sideBarType === constants.USER_TYPES.USER ? 'تاریخ تولد' : 'سال تاسیس'}</div>
                      {
                        sideBarType === constants.USER_TYPES.USER ?
                            <MyDatePicker className='user-edit-name' defaultValue={editBirthDate} getValue={e => this.handleDate('editBirthDate', e)}/>
                            :
                            <input className='user-edit-name' type='number' placeholder='مثال: 1397' value={editBirthDate} onChange={e => this.handleDateCompany('editBirthDate', e)}/>
                      }
                    </div>
                  </div>
                }

                {
                  sideBarType === constants.USER_TYPES.ORG && editProfile &&
                  <div className='sidebar-position'>
                    <div>
                      <div className='user-edit-name-title'>تعداد اعضا</div>
                      <select className='user-edit-name' onChange={this.handleStaff}>
                        <option className='user-edit-name' value={0}>انتخاب</option>
                        <option className='user-edit-name' selected={owner.staff_count === 10} value={10}>1 - 10</option>
                        <option className='user-edit-name' selected={owner.staff_count === 50} value={50}>10 - 20</option>
                        <option className='user-edit-name' selected={owner.staff_count === 100} value={100}>20 - 50</option>
                        <option className='user-edit-name' selected={owner.staff_count === 200} value={200}>بیشتر از 50</option>
                      </select>
                    </div>
                  </div>
                }

              </div>
              {
                chosenBadgesImg.length > 0 &&
                <div className="badgesCard">
                  {
                    chosenBadgesImg.map((badgeImg, i) =>
                        <span key={i + 'BadgesCard'}><img src={badgeImg} alt=""/></span>,
                    )
                  }
                </div>
              }

              {
                (owner.work_status || editProfile) &&
                <section className='user-sidebar-status'>
                  <Material className={`user-sidebar-status-content ${
                      editStatusTitle || owner.work_status ?
                          sideBarType === constants.USER_TYPES.ORG ? constants.PROFILE_STATUS.ORG[editStatusTitle || owner.work_status].buttonClass
                              :
                              constants.PROFILE_STATUS.USER[editStatusTitle || owner.work_status].buttonClass
                          :
                          'user-sidebar-status-default'
                      }`}
                            content={editStatusTitle || owner.work_status ?
                                <div className='user-sidebar-status-changed-show'>
                                  <div>
                                    <div>{tr[editStatusTitle || owner.work_status]}</div>
                                    {
                                      editStatusTitle || owner.work_status ?
                                          sideBarType === constants.USER_TYPES.ORG ? constants.PROFILE_STATUS.ORG[editStatusTitle || owner.work_status].icon
                                              :
                                              constants.PROFILE_STATUS.USER[editStatusTitle || owner.work_status].icon
                                          :
                                          null
                                    }
                                  </div>
                                </div>
                                :
                                'انتخاب وضعیت'
                            }
                            onClick={this._changeEditStatus}
                  />

                  <div className={`user-sidebar-status-change ${editProfile && editStatus ? 'show' : 'hide'}`}>
                    {
                      sideBarType === constants.USER_TYPES.ORG ?
                          Object.values(constants.PROFILE_STATUS.ORG).map((status, index) =>
                              <Material key={index} className='user-sidebar-status-change-material' content={
                                <div>
                                  <div>{tr[status.name]}</div>
                                  {status.icon}
                                </div>
                              } onClick={() => this.changeStatus(status)}/>,
                          )
                          :
                          Object.values(constants.PROFILE_STATUS.USER).map((status, index) =>
                              <Material key={index} className='user-sidebar-status-change-material' content={
                                <div>
                                  <div>{tr[status.name]}</div>
                                  {status.icon}
                                </div>
                              } onClick={() => this.changeStatus(status)}/>,
                          )
                    }
                  </div>
                </section>
              }

              {
                !editProfile &&
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
                                          ((profileBannerId && this.props.temp[profileBannerId].progress === 100 && bannerIdTemp) || profileBannerId === null) &&
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
              }

              {
                editProfile ?
                    <section className='user-sidebar-buttons-edit'>
                      <div className='user-edit-social-title'>آدرس تلگرام</div>
                      <div className='user-social-cont'>
                        <TelegramIcon className='user-social-icon telegram-side-active'/>
                        <div className='user-social-cont-text'>t.me/</div>
                        <input type='text' className='user-edit-social-input' value={editTelegram} onChange={e => this.handleParameter('editTelegram', e)}/>
                      </div>
                      <div className='user-edit-social-title'>آدرس لینکدین</div>
                      <div className='user-social-cont'>
                        <LinkedInIcon className='user-social-icon linkedin-side-active'/>
                        <div className='user-social-cont-text'>linkedin.com/in/</div>
                        <input type='text' className='user-edit-social-input' value={editLinkedIn} onChange={e => this.handleParameter('editLinkedIn', e)}/>
                      </div>
                      <div className='user-edit-social-title'>آدرس اینستاگرام</div>
                      <div className='user-social-cont'>
                        <InstagramIcon className='user-social-icon instagram-side-active'/>
                        <div className='user-social-cont-text'>instagram.com/</div>
                        <input type='text' className='user-edit-social-input' value={editInstagram} onChange={e => this.handleParameter('editInstagram', e)}/>
                      </div>
                      <div className='user-edit-social-title'>آدرس تویتر</div>
                      <div className='user-social-cont'>
                        <TwitterIcon className='user-social-icon twitter-side-active'/>
                        <div className='user-social-cont-text'>twitter.com/</div>
                        <input type='text' className='user-edit-social-input' value={editTwitter} onChange={e => this.handleParameter('editTwitter', e)}/>
                      </div>
                    </section>
                    :
                    <div className="social-network">
                      {
                        owner.twitter_account
                            ? <a href={owner.twitter_account.includes('twitter.com') ? owner.twitter_account : 'https://twitter.com/' + owner.twitter_account} className='link' target="_blank"><TwitterIcon className='social-icon twitter-active'/></a>
                            : <TwitterIcon className='social-icon'/>
                      }
                      {
                        owner.telegram_account
                            ? <a href={owner.telegram_account.includes('t.me') ? owner.telegram_account : 'https://t.me/' + owner.telegram_account} className='link' target="_blank"><TelegramIcon className='social-icon telegram-active'/></a>
                            : <TelegramIcon className='social-icon'/>
                      }
                      {
                        owner.instagram_account
                            ? <a href={owner.instagram_account.includes('instagram.com') ? owner.instagram_account : 'https://instagram.com/' + owner.instagram_account} className='link' target={'_blank'}><InstagramIcon className='social-icon instagram-active'/></a>
                            : <InstagramIcon className='social-icon'/>
                      }
                      {
                        owner.linkedin_account
                            ? <a href={owner.linkedin_account.includes('linkedin.com') ? owner.linkedin_account : 'https://linkedin.com/in/' + owner.linkedin_account} className='link' target="_blank"><LinkedInIcon className='social-icon linkedin-active'/></a>
                            : <LinkedInIcon className='social-icon'/>
                      }
                    </div>
              }

              {
                editProfile &&
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
              }

            </div>
          </form>
          <Modal open={add} closer={this._toggleAddModal}>
            <div className="event-modal add-experience-modal">
              <div className="head">
                <div className="title">{tr && tr['Add new expereince']}</div>
              </div>
              <p onClick={() => this._toggleEducationModal('education')} className='item pulse'>{tr && tr['Education Experience']}</p>
              <p onClick={() => this._toggleEducationModal('workExperience')} className='item pulse'>{tr && tr['Work experience']}</p>
              <p onClick={() => this._toggleEducationModal('skill')} className='item pulse'>{tr && tr['Skill']}</p>
              <p onClick={() => this._toggleEducationModal('certificate')} className='item pulse'>{tr && tr['Certificate']}</p>
              <p onClick={() => this._toggleEducationModal('product')} className='item pulse'>{tr && tr['Product']}</p>
              <p onClick={() => this._toggleEducationModal('research')} className='item pulse'>{tr && tr['Scientific Research']}</p>
            </div>
          </Modal>

          {
            education && <EducationForm createEducation={createEducation}
                                        translate={tr}
                                        owner={owner}
                                        toggleEdit={() => this._toggleEducationModal('education')}
            />
          }
          {
            workExperience && <WorkExperienceForm createWorkExperience={createWorkExperience}
                                                  translate={tr}
                                                  toggleEdit={() => this._toggleEducationModal('workExperience')}
                                                  owner={owner}
            />
          }
          {
            skill && <SkillForm createSkill={createSkill}
                                toggleEdit={() => this._toggleEducationModal('skill')}
                                translate={tr}
                                owner={owner}
            />
          }
          {
            certificate && <CertificateForm createCertificate={createCertificate}
                                            owner={owner}
                                            translate={tr}
                                            toggleEdit={() => this._toggleEducationModal('certificate')}
            />
          }
          {
            research && <ResearchForm createResearch={createResearch}
                                      translate={tr}
                                      owner={owner}
                                      toggleEdit={() => this._toggleEducationModal('research')}
            />
          }

        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const bannerIdTemp = (state.temp && state.temp.file['profile_banner']) || null
  const pictureIdTemp = (state.temp && state.temp.file['profile_media']) || null
  return {
    countries: getAllCountries(state),
    translate: getMessages(state),
    clientIdentityId: state.auth.client.identity.content,
    bannerIdTemp,
    pictureIdTemp,
    followers: getFollowersSelector(state, ownProps),
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
    showModal: ModalActions.showModal,
    createWorkExperience: WorkExperienceActions.createWorkExperienceByUserId,
    createEducation: EducationActions.createEducationByUserId,
    createResearch: ResearchActions.createResearchByUserId,
    createSkill: SkillActions.createSkill,
    createCertificate: CertificateActions.createCertificate,
    getCountries,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(SideBarContent)