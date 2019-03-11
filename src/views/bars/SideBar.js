// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import type {badgeType} from '../../consts/flowTypes/common/badges'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {userProfileType, userType} from 'src/consts/flowTypes/user/basicInformation'
import {DefaultUserIcon, DefaultOrganIcon, TwitterIcon, TelegramIcon, LinkedInIcon, InstagramIcon} from 'src/images/icons'
import AttachFile from '../common/inputs/AttachFile'
import CheckOwner from '../common/CheckOwner'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import SocialActions from '../../redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {getFollowersSelector} from '../../redux/selectors/common/social/getFollowers'
import updateProfile from 'src/redux/actions/user/updateProfileByProfileIdAction'
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import types from 'src/redux/actions/types'
import type {fileType} from '../../consts/flowTypes/common/fileType'
import {BeatLoader} from 'react-spinners'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import TempActions from 'src/redux/actions/tempActions'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {createFileFunc} from 'src/views/common/Functions'
import Material from '../common/components/Material'
import updateUserByUserIdAction from '../../redux/actions/user/updateUserByUserIdAction'


const UserSideBarPictureTempKeyName = 'UserSideBarPictureTempKeyName'
const UserSideBarBannerTempKeyName = 'UserSideBarBannerTempKeyName'


// const MenuBox = (props) => {
//   const {handleEditProfile, id, editProfile, paramId} = props
//   return (
//       <div className="menu-box pt-0 pb-0" id={id}>
//         <div>
//           <span>اشتراک گذاری نمایه</span>
//           <CheckOwner id={paramId}>
//             <span onClick={handleEditProfile}>{(!editProfile) ? 'ویرایش ویترین' : 'بستن ویرایش ویترین'}</span>
//           </CheckOwner>
//         </div>
//         <div>
//           <span>بی صدا کردن اعلام</span>
//           <span>بلاک</span>
//           <span>گزارش تخلف</span>
//         </div>
//       </div>
//   )
// }

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

type PropsOrganSideBar = {
  organ: organizationType,
  badges: (badgeType)[],
  organLogo: fileType | {},
  organBanner: fileType | {},
  className?: string,
  paramId: number,
  identityId: number,
}
export const OrganSideBar = (props: PropsOrganSideBar) => {
  const {organ, badges, organLogo, organBanner, className, paramId, identityId} = props
  const name = organ.nike_name || organ.official_name
  const badgesImg = badges.map(badge => (
      (!badge) ? '' : (badge.badge_related_badge_category.badge_related_media.file)),
  )
  const chosenBadgesImg = badgesImg.slice(0, 4)
  const socialNetworks = { //TODO organ socialNetWorks get from backEnd
    telegram_account: organ.telegram_account,
    instagram_account: organ.instagram_account,
    linkedin_account: organ.linkedin_account,
    twitter_account: organ.twitter_account,
  }
  return (
      <SideBarContent
          sideBarType={constants.USER_TYPES.ORG}
          name={name}
          banner={organBanner}
          description={organ.description}
          picture={organLogo}
          chosenBadgesImg={chosenBadgesImg}
          socialNetworks={socialNetworks}
          className={className}
          paramId={paramId}
          identityId={identityId}
          owner={organ}
      />
  )
}
OrganSideBar.propTypes = {
  organ: PropTypes.object.isRequired,
  badges: PropTypes.array.isRequired,
  organLogo: PropTypes.object,
  organBanner: PropTypes.object,
  className: PropTypes.string,
  paramId: PropTypes.number,
  identityId: PropTypes.number,
}


type PropsSideBarContent = {
  sideBarType: string,
  identityId: number,
  owner: userType | organizationType,
  clientIdentityId?: number,
  profile?: userProfileType,
  paramId: number,
  banner: fileType | Object,
  picture: fileType | Object,
  bannerTempId?: ?number,
  pictureTempId?: ?number,
  name: ?string,
  description: ?string,
  chosenBadgesImg: (string)[],
  socialNetworks: {
    telegram_account: ?string,
    instagram_account: ?string,
    linkedin_account: ?string,
    twitter_account: ?string
  },
  translate?: TranslatorType,
  className?: string,
  actions?: {
    createFollow: Function,
    getFollowers: Function,
    updateProfile: Function,
    updateOrganization: Function,
    createFile: Function,
    removeFileFromTemp: Function
  },
  followers?: [],
}
type StateSideBarContent = {
  menuToggle: boolean,
  editProfile: boolean,
  bannerState: ?string,
  pictureState: ?string,
  descriptionState: ?string,
  descriptionClass: ?string,
  saving: boolean,
}

class SideBarContent extends Component<PropsSideBarContent, StateSideBarContent> {

  static propTypes = {
    sideBarType: PropTypes.string.isRequired,
    name: PropTypes.string,
    picture: PropTypes.object,
    description: PropTypes.string,
    chosenBadgesImg: PropTypes.array.isRequired,
    socialNetworks: PropTypes.object.isRequired,
    className: PropTypes.string,
    identityId: PropTypes.number,
    owner: PropTypes.object,
    paramId: PropTypes.number,
    profile: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuToggle: false,
      editProfile: false,
      bannerState: '',
      pictureState: '',
      saving: false,
      descriptionState: '',
      descriptionClass: 'hide-message',
    }
  }

  AttachBannerFileInput: React.ElementRef<typeof AttachFile>
  AttachPictureFileInput: React.ElementRef<typeof AttachFile>

  _getValues = () => {
    const {sideBarType, owner, bannerTempId, pictureTempId} = this.props
    const {descriptionState} = this.state
    const bannerId = bannerTempId || (owner ? owner.profile_media && owner.profile_media.id : null)
    const pictureId = pictureTempId || (owner ? owner.profile_banner && owner.profile_banner.id : null)
    if (sideBarType === constants.USER_TYPES.USER && owner) {
      return {
        id: owner.id,
        profile_banner: bannerId,
        profile_media: pictureId,
        description: descriptionState,
      }
    }
    else {
      return {
        id: owner.id,
        organization_banner: bannerId,
        organization_logo: pictureId,
        description: descriptionState,
      }
    }
  }

  _formValidate = () => {
    let result = true
    const {descriptionState} = this.state
    const descriptionLength = descriptionState ? descriptionState.trim().length : 0
    const descriptionError = descriptionLength > 70
    const validates = [
      this.AttachBannerFileInput && this.AttachBannerFileInput._validate(),
      this.AttachPictureFileInput && this.AttachPictureFileInput._validate(),
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
    const description = this.props.owner.description
    e.preventDefault()
    const editProfile = !(this.state.editProfile)
    this.setState({
      ...this.state,
      editProfile,
      menuToggle: false,
      bannerState: '',
      pictureState: '',
      descriptionState: description,
    })
  }

  // _handleMenu = () => {
  //   this.setState({...this.state, menuToggle: !this.state.menuToggle})
  // }

  _AttachBottom = () => (
      <div>
        <div className="edit-background"/>
        <span className="edit-text">تصویر جدید</span>
      </div>
  )

  _LoadingFile = () => <BeatLoader color="#999" size={10} margin="4px" loading={true}/>

  _createFollow = () => {
    const {clientIdentityId, owner, sideBarType, actions} = this.props
    const {createFollow} = actions || {}
    const followOwnerId = owner.id
    const formValues = {follow_follower: clientIdentityId, follow_followed: owner.id}
    createFollow({formValues, followOwnerId, followOwnerType: sideBarType})
  }

  _handleClickOutMenuBox = (e: any) => {
    if (!e.target.closest('#sidebar-menu-box') && !e.target.closest('.menuBottom')) {
      this.setState({...this.state, menuToggle: false})
    }
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

  _handleBlurText = (e) => {
    this.setState({...this.state, descriptionClass: ''})
  }


  _preSave = () => {
    this.setState({...this.state, saving: true})
    const {actions} = this.props
    const {bannerState, pictureState} = this.state
    const {createFile} = actions || {}
    const nextActionDataForBanner = {tempFileKeyName: UserSideBarBannerTempKeyName}
    const nextActionDataForPicture = {tempFileKeyName: UserSideBarPictureTempKeyName}
    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const fileIdKey = 'fileId'
    const bannerCreateArguments = {
      fileIdKey,
      nextActionType,
      nextActionData: nextActionDataForBanner,
    }
    const pictureCreateArguments = {
      fileIdKey,
      nextActionType,
      nextActionData: nextActionDataForPicture,
    }
    if (bannerState) createFileFunc(createFile, bannerState, bannerCreateArguments, constants.CREATE_FILE_TYPES.IMAGE, constants.CREATE_FILE_CATEGORIES.PROFILE.BANNER)
    if (pictureState) createFileFunc(createFile, pictureState, pictureCreateArguments, constants.CREATE_FILE_TYPES.IMAGE, constants.CREATE_FILE_CATEGORIES.PROFILE.PROFILE_PICTURE)
  }

  _save = () => {
    const {actions, owner} = this.props
    const {updateUserByUserId, removeFileFromTemp} = actions || {}
    const formValues = this._getValues()
    updateUserByUserId(formValues, owner.id)
    removeFileFromTemp(UserSideBarBannerTempKeyName)
    removeFileFromTemp(UserSideBarPictureTempKeyName)
    this.setState({...this.state, saving: false})
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    if (this._formValidate()) {
      this._preSave()
    }
    return false
  }


  componentDidUpdate() {
    const {saving, bannerState, pictureState} = this.state
    const {bannerTempId, pictureTempId} = this.props
    const completeCreatingFile = (bannerState ? bannerTempId : true) && (pictureState ? pictureTempId : true)
    if (saving && completeCreatingFile) this._save()
  }

  componentDidMount() {
    // Without flow type: document.addEventListener('click', this._handleClickOutMenuBox)
    (document.addEventListener: Function)('click', this._handleClickOutMenuBox)

    const {actions, sideBarType, description, paramId} = this.props
    const {getFollowers} = actions || {}
    getFollowers({
      notProfile: true,
      followOwnerIdentity: paramId,
      followOwnerType: sideBarType,
      followOwnerId: paramId,
    })
    this.setState({...this.state, descriptionState: description}, () => this._checkCharacter(description))
  }

  componentWillUnmount() {
    (document.removeEventListener: Function)('click', this._handleClickOutMenuBox)
  }


  render() {
    const {editProfile, bannerState, pictureState, descriptionState, descriptionClass} = this.state
    const {sideBarType, badges, translate: tr, paramId, followers, clientIdentityId, owner} = this.props
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
    const bannerString = bannerState || (owner.profile_banner && owner.profile_banner.file)
    const pictureString = pictureState || (owner.profile_media && owner.profile_media.file)
    return (
        <form className={className + ' pt-0'} onSubmit={this._handleSubmit}>
          <div className="editable-profile-img">
            {
              !bannerString ?
                  <div className="background-strips banner covered-img"/> :
                  <img alt="" src={bannerString} className="banner covered-img"/>
            }
            {
              (!editProfile) ? '' : (
                  <AttachFile
                      AttachButton={this._AttachBottom}
                      inputId="AttachBannerFileInput"
                      LoadingFile={this._LoadingFile}
                      handleBase64={(fileString) => this.setState({...this.state, bannerState: fileString})}
                      handleError={(error) => alert(error)}
                      className="edit-nav"
                      ref={e => this.AttachBannerFileInput = e}
                      allowableFormat={constants.FILE_TYPE.PHOTO}
                      translate={tr}
                  />
              )
            }
          </div>
          <div className="sidebar-organ-user col">
            <div className="editable-profile-img profile-media">
              {
                (!pictureString) ? (
                    (sideBarType === constants.USER_TYPES.USER) ?
                        <DefaultUserIcon/> :
                        <DefaultOrganIcon/>
                ) : (
                    <img className="covered-img" alt="" src={pictureString}/>)
              }
              {
                (!editProfile) ? '' : (
                    <AttachFile
                        AttachButton={this._AttachBottom}
                        inputId="AttachPictureFileInput"
                        LoadingFile={this._LoadingFile}
                        handleBase64={(fileString) => this.setState({...this.state, pictureState: fileString})}
                        handleError={(error) => alert(error)}
                        className="edit-nav"
                        ref={e => this.AttachPictureFileInput = e}
                        allowableFormat={constants.FILE_TYPE.PHOTO}
                        translate={tr}
                    />
                )
              }
            </div>
            <div className="align-items-center flex-column info-section">
              {/*<CheckOwner id={paramId} showForOwner={false}>*/}
              {/*<i className="fa fa-ellipsis-v menuBottom" onClick={this._handleMenu}/>*/}
              {/*{*/}
              {/*(!menuToggle) ? ('') : (*/}
              {/*<MenuBox id="sidebar-menu-box"*/}
              {/*handleEditProfile={this._handleEditProfile}*/}
              {/*editProfile={editProfile}*/}
              {/*paramId={paramId}/>)*/}
              {/*}*/}
              {/*</CheckOwner>*/}
              <div className="sidebar-name">{owner.first_name ? owner.first_name : ''} {owner.last_name ? owner.last_name : ''}</div>
              {
                (!editProfile) ? (<span className="-grey1 sidebar-description text-center">{owner.description}</span>) : (
                    <div className='description'>
                      {descriptionClass &&
                      <span className={descriptionClass}>
                    {descriptionState && descriptionState.trim().length + '/70'}
                  </span>
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
                      <Material className="btn btn-outline-secondary sidebarFollowBottom follow-green-button side-user-follow"
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
                            onClick={editProfile ? this._handleEditProfile : undefined}
                            content={(!editProfile) ? (tr && tr['Complete profile']) : (
                                tr && tr['Cancel']
                            )}/>
                  <Material className={!editProfile
                      ? 'sidebarFollowBottom follow-green-button side-user-follow'
                      : 'side-user-follow-parent'}
                            onClick={!editProfile ? this._handleEditProfile : undefined}
                            content={(!editProfile) ? tr && tr['Edit Dashboard'] : (
                                <button type="submit" className='sidebarFollowBottom follow-green-button side-user-follow'>
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
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const bannerIdTemp = state.temp.file[UserSideBarBannerTempKeyName] || null
  const pictureIdTemp = state.temp.file[UserSideBarPictureTempKeyName] || null
  return {
    translate: getMessages(state),
    clientIdentityId: state.auth.client.identity.content,
    bannerTempId: bannerIdTemp,
    pictureTempId: pictureIdTemp,
    followers: getFollowersSelector(state, ownProps),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
    createFollow: SocialActions.createFollow,
    getFollowers: SocialActions.getFollowers,
    createFile: FileActions.createFile,
    removeFileFromTemp: TempActions.removeFileFromTemp,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(SideBarContent)