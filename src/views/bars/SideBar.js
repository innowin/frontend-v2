// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {userType} from 'src/consts/flowTypes/user/basicInformation'
import {DefaultUserIcon, DefaultOrganIcon, TwitterIcon, TelegramIcon, LinkedInIcon, InstagramIcon} from 'src/images/icons'
import CheckOwner from '../common/CheckOwner'
import connect from 'react-redux/es/connect/connect'
import getFile from 'src/redux/actions/commonActions/fileActions'
import constants from 'src/consts/constants'
import SocialActions from '../../redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {getFollowersSelector} from '../../redux/selectors/common/social/getFollowers'
import types from 'src/redux/actions/types'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {createFileFunc} from 'src/views/common/Functions'
import Material from '../common/components/Material'
import updateUserByUserIdAction from '../../redux/actions/user/updateUserByUserIdAction'
import uuid from 'uuid'
import TempActions from 'src/redux/actions/tempActions'

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

type PropsSideBarContent = {
  sideBarType: string,
  owner: userType | organizationType,
  paramId: number,
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
  descriptionState: ?string,
  descriptionClass: ?string,
  saving: boolean,
}

class SideBarContent extends Component<PropsSideBarContent, StateSideBarContent> {

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
    }
    else return {
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

  // _handleClickOutMenuBox = (e: any) => {
  //   if (!e.target.closest('#sidebar-menu-box') && !e.target.closest('.menuBottom')) {
  //     this.setState({...this.state, menuToggle: false})
  //   }
  // }

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

  // componentWillUnmount() {
  //   (document.removeEventListener: Function)('click', this._handleClickOutMenuBox)
  // }


  render() {
    const {editProfile, selectedBanner, selectedImage, descriptionState, descriptionClass, processing, processingBanner, profileBannerId, profileMediaId} = this.state
    const {sideBarType, badges, translate: tr, paramId, followers, clientIdentityId, owner, files, bannerIdTemp, pictureIdTemp} = this.props
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
              {/*{*/}
              {/*(!editProfile) ? '' : (*/}
              {/*<AttachFile*/}
              {/*AttachButton={this._AttachBottom}*/}
              {/*inputId="AttachPictureFileInput"*/}
              {/*LoadingFile={this._LoadingFile}*/}
              {/*handleBase64={(fileString) => this.setState({...this.state, pictureState: fileString})}*/}
              {/*handleError={(error) => alert(error)}*/}
              {/*className="edit-nav"*/}
              {/*ref={e => this.AttachPictureFileInput = e}*/}
              {/*allowableFormat={constants.FILE_TYPE.PHOTO}*/}
              {/*translate={tr}*/}
              {/*/>*/}
              {/*)*/}
              {/*}*/}
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
              <div className="sidebar-name">{name}</div>
              {
                (!editProfile) ? (<span className="-grey1 sidebar-description text-center">{owner.description}</span>) : (
                    <div className='description'>
                      {
                        descriptionClass && <span className={descriptionClass}>{descriptionState && descriptionState.trim().length + '/70'}</span>
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
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(SideBarContent)