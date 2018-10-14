// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import type {badgeType} from "../../consts/flowTypes/common/badges"
import type {organizationType} from "src/consts/flowTypes/organization/organization"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import type {userProfileType, userType} from "src/consts/flowTypes/user/basicInformation"
import {DefaultImageIcon} from "src/images/icons"
import {DefaultUserIcon, DefaultOrganIcon} from "src/images/icons"
import cx from "classnames"

import AttachFile from "../common/inputs/AttachFile"
import CheckOwner from "../common/CheckOwner"
import connect from "react-redux/es/connect/connect";
import constants from "../../consts/constants";
import SocialActions from "../../redux/actions/commonActions/socialActions";
import {bindActionCreators} from "redux";
import {getFollowersSelector} from "../../redux/selectors/common/social/getFollowers";
import {TextareaInput} from "../common/inputs/TextareaInput"
import {TextInput} from "../common/inputs/TextInput"
import updateProfile from "src/redux/actions/user/updateProfileByProfileIdAction"
import OrganizationActions from "src/redux/actions/organization/organizationActions"
import types from "src/redux/actions/types"

const MenuBox = (props) => {
  const {showEditProfileFunc, id, editProfile, paramId} = props
  return (
    <div className="menu-box pt-0 pb-0" id={id}>
      <div>
        <span>اشتراک گذاری نمایه</span>
        <CheckOwner id={paramId}>
          <span onClick={showEditProfileFunc}>{(!editProfile) ? 'ویرایش ویترین' : 'بستن ویرایش ویترین'}</span>
        </CheckOwner>
      </div>
      <div>
        <span>بی صدا کردن اعلام</span>
        <span>بلاک</span>
        <span>گزارش تخلف</span>
      </div>
    </div>
  )
}


export const BadgesCard = (props: { badgesImg: (string)[] }) => {
  return (
    props.badgesImg.map((badgeImg, i) => (
      <span key={i + "BadgesCard"}>
          <img src={badgeImg} alt=""/>
      </span>
    ))
  )
}

export const TagsBox = (props: { tags: ({ title: string })[] }) => {
  return (
    props.tags.map((tag, i) => (
      <div className="mb-1" key={i + "TagsBox"}>
        <span className="badge -myBadge" dir="ltr">{tag.title}</span>
      </div>
    ))
  )
}

type PropsUserSideBar = {
  user: userType,
  profile: userProfileType,
  badges: (badgeType)[],
  className?: string,
  translate: TranslatorType,
  paramId: number,
  identityId: number,
}
export const UserSideBar = (props: PropsUserSideBar) => {

  const {user, profile, badges, translate, className, paramId, identityId} = props
  const name = !(user.first_name && user.last_name) ? user.username : (user.first_name + " " + user.last_name)
  const picture = (profile.profile_media && profile.profile_media.file) || null
  const banner = (profile.profile_banner && profile.profile_banner.file) || null
  const badgesImg = badges.map(badge => (
    (!badge) ? '' : (badge.badge_related_badge_category.badge_related_media.file))
  )
  const chosenBadgesImg = badgesImg.slice(0, 4)
  const socialNetworks = {
    telegram_account: profile['telegram_account'],
    instagram_account: profile['instagram_account'],
    linkedin_account: profile['linkedin_account'],
    youtube_account: profile['youtube_account']
  }
  return (
    <SideBarContent
      sideBarType={constants.USER_TYPES.PERSON}
      name={name}
      banner={banner}
      description={profile.description}
      picture={picture}
      translate={translate}
      className={className}
      chosenBadgesImg={chosenBadgesImg}
      socialNetworks={socialNetworks}
      paramId={paramId}
      identityId={identityId}
      owner={user}
      profile={profile}
    />
  )
}
UserSideBar.propTypes = {
  translate: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  badges: PropTypes.array.isRequired,
  className: PropTypes.string,
  paramId: PropTypes.number,
  identityId: PropTypes.number,
}


type PropsOrganSideBar = {
  organ: organizationType,
  badges: (badgeType)[],
  organLogo: ?string,
  organBanner: ?string,
  className?: string,
  translate: TranslatorType,
  paramId: number,
  identityId: number,
}
export const OrganSideBar = (props: PropsOrganSideBar) => {
  const {organ, badges, organLogo, organBanner, className, translate, paramId, identityId} = props
  const name = organ.nike_name || organ.official_name
  const badgesImg = badges.map(badge => (
    (!badge) ? '' : (badge.badge_related_badge_category.badge_related_media.file))
  )
  const chosenBadgesImg = badgesImg.slice(0, 4)
  const socialNetworks = { //TODO organ socialNetWorks get from backEnd
    telegram_account: '',
    instagram_account: '',
    linkedin_account: '',
    youtube_account: ''
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
      translate={translate}
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
  organLogo: PropTypes.string,
  organBanner: PropTypes.string,
  className: PropTypes.string,
  translate: PropTypes.object.isRequired,
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
  banner: ?string,
  picture: ?string,
  name: ?string,
  description: ?string,
  chosenBadgesImg: (string)[],
  socialNetworks: {
    telegram_account: ?string,
    instagram_account: ?string,
    linkedin_account: ?string,
    youtube_account: ?string
  },
  translate: TranslatorType,
  className?: string,
  actions?: {
    createFollow: Function,
    getFollowers: Function,
    updateProfile: Function,
    updateOrganization: Function
  },
  followers?: [],
}

type StateSideBarContent = {
  menuToggle: boolean,
  editProfile: boolean,
  uploadedMedia: ?string,
  uploadedBanner: ?string,
  mediaFileName: ?string,
  bannerFileName: ?string,
}

class SideBarContent extends Component<PropsSideBarContent, StateSideBarContent> {

  static propTypes = {
    sideBarType: PropTypes.string.isRequired,
    identityId: PropTypes.number,
    owner: PropTypes.object,
    clientIdentityId: PropTypes.number,
    profile: PropTypes.object,
    paramId: PropTypes.number,
    banner: PropTypes.string,
    picture: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    chosenBadgesImg: PropTypes.array.isRequired,
    socialNetworks: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    className: PropTypes.string,
    actions: PropTypes.object,
    followers: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      menuToggle: false,
      editProfile: false,
      uploadedMedia: null,
      uploadedBanner: null,
      mediaFileName: '',
      bannerFileName: '',
    }
  }

  descriptionInput: React.ElementRef<typeof TextInput>
  AttachBannerFileInput: React.ElementRef<typeof AttachFile>
  AttachMediaFileInput: React.ElementRef<typeof AttachFile>

  _getValues = () => {
    const {sideBarType, owner, profile} = this.props
    // const bannerFileName = this.AttachBannerFileInput._getFileName()
    // const mediaFileName = this.AttachMediaFileInput._getFileName()
    const banner = this.AttachBannerFileInput._getFile()
    const media = this.AttachMediaFileInput._getFile()
    if (sideBarType === constants.USER_TYPES.PERSON) {
      return {
        id: profile.id,
        profile_banner: (banner && banner.id) || null,
        profile_media: (media && media.id) || null,
        description: this.descriptionInput,
      }
    } else {
      return {
        id: owner.id,
        organization_banner: (banner && banner.id) || null,
        organization_logo: (media && media.id) || null,
        description: this.descriptionInput,
      }
    }
  }

  _formValidate = () => {
    let result = true;
    const validates = [
      this.AttachBannerFileInput._validate(),
      this.AttachMediaFileInput._validate(),
      this.descriptionInput.validate()
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break
      }
    }
    return result
  }

  _handleClickOutMenuBox = (e: any) => {
    if (!e.target.closest('#sidebar-menu-box') && !e.target.closest('.menuBottom')) {
      this.setState({...this.state, menuToggle: false})
    }
  }

  _showEditProfileFunc = (e: any) => {
    e.preventDefault()
    const editProfile = !(this.state.editProfile)
    this.setState({...this.state, editProfile})
  }

  _closeEditProfile = (e: any) => {
    this.setState({...this.state, editProfile: false})
  }


  componentDidMount() {
    // Without flow type: document.addEventListener('click', this._handleClickOutMenuBox)
    (document.addEventListener: Function)('click', this._handleClickOutMenuBox)

    const {actions, identityId, sideBarType, owner, banner, picture} = this.props
    this.setState({...this.state, uploadedBanner: banner, uploadedMedia: picture})
    const {getFollowers} = actions || {}
    getFollowers({followOwnerIdentity: identityId, followOwnerType: sideBarType, followOwnerId: owner.id})
  }

  componentWillUnmount() {
    (document.removeEventListener: Function)('click', this._handleClickOutMenuBox)
  }

  _handleMenu = () => {
    this.setState({...this.state, menuToggle: !this.state.menuToggle})
  }

  _getBanner = (media = {}, fileName) => {
    console.log("getBanner:", media, fileName)
    this.setState({...this.state, uploadedBanner: media.file, bannerFileName: fileName})
  }

  _getMedia = (media = {}, fileName) => {
    console.log("getMedia:", media, fileName)
    this.setState({...this.state, uploadedMedia: media.file, mediaFileName: fileName})
  }

  AttachBottom = (className) => (
    <div className={"edit-nav " + className}>
      <div className="edit-background"/>
      <span className="edit-text">تصویر جدید</span>
    </div>
  )

  _save = () => {
    const {actions, sideBarType, owner, profile} = this.props
    const {updateProfile, updateOrganization} = actions || {}
    const formValues = this._getValues()
    if (sideBarType === constants.USER_TYPES.PERSON) {
      return updateProfile({formValues, profileId:profile.id, userId: owner.id})
    } else {
      return updateOrganization({formValues, organizationId: owner.id})
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    if (this._formValidate()) {
      this._save()
    }
    return false;
  }

  _createFollow = () => {
    const {identityId, clientIdentityId, owner, sideBarType, actions} = this.props
    const {createFollow} = actions || {}
    const followOwnerId = owner.id
    const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
    createFollow({formValues, followOwnerId, followOwnerType: sideBarType})
  }

  render() {
    const {menuToggle, editProfile, uploadedMedia, uploadedBanner} = this.state
    const {sideBarType, name, description, chosenBadgesImg, socialNetworks, translate: tr, paramId, followers, clientIdentityId, profile, owner} = this.props
    const className = this.props.className || ''
    // const followNames = ["صابر منادی", "امیر امیری فر", "محسن فلاح", "یاسر رستگار", "علی اور     organ = {organ}وجی"] //TODO get followNames
    const showFollow = followers && !followers.map(follower => follower.id).includes(clientIdentityId)
    const bannerFileIdKey = (sideBarType === constants.USER_TYPES.PERSON) ? (
      'profile_banner'
    ) : 'organization_banner'
    const mediaFileIdKey = (sideBarType === constants.USER_TYPES.PERSON) ? (
      'profile_media'
    ) : 'organization_logo'
    const nextActionType = (sideBarType === constants.USER_TYPES.PERSON) ? (types.USER.UPDATE_PROFILE_BY_PROFILE_ID)
        : types.ORG.UPDATE_ORGANIZATION_INFO
    const bannerNextActionData = (sideBarType === constants.USER_TYPES.PERSON) ? (profile.profile_banner)
        : owner.organization_banner
    const mediaNextActionData = (sideBarType === constants.USER_TYPES.PERSON) ? (profile.profile_media)
        : owner.organization_logo
    return (
      <form className={className + ' pt-0'} onSubmit={this._handleSubmit}>
        <div className="editable-profile-img">
          {
            (!uploadedBanner) ? <DefaultImageIcon className="banner"/> : (
              <img alt="" src={uploadedBanner} className="banner"/>)
          }
          {
            (!editProfile) ? '' : (
              <AttachFile
                ref={AttachBannerFileInput => {
                  this.AttachBannerFileInput = AttachBannerFileInput
                }}
                getMedia={this._getBanner}
                AttachBottom={() => this.AttachBottom('edit-banner')}
                fileIdKey={bannerFileIdKey}
                nextActionData={bannerNextActionData}
                nextActionType={nextActionType}
              />
            )
          }
        </div>
        <div className="sidebar-organ-user col">
          <div className="editable-profile-img">
            {
              (!uploadedMedia) ? (
                (sideBarType === 'user') ? <DefaultUserIcon className="profile-media"/> :
                  <DefaultOrganIcon className="profile-media"/>
              ) : (
                <img className="rounded-circle profile-media" alt="" src={uploadedMedia}/>)
            }
            {
              (!editProfile) ? '' : (
                <AttachFile
                  ref={AttachMediaFileInput => {
                    this.AttachMediaFileInput = AttachMediaFileInput
                  }}
                  getMedia={this._getMedia}
                  AttachBottom={() => this.AttachBottom('edit-media')}
                  fileIdKey={mediaFileIdKey}
                  nextActionType={nextActionType}
                  nextActionData={mediaNextActionData}
                />
              )
            }
          </div>
          <div className="align-items-center flex-column info-section">
            <i className="fa fa-ellipsis-v menuBottom" onClick={this._handleMenu}/>
            {
              (!menuToggle) ? ('') : (
                <MenuBox id="sidebar-menu-box"
                         showEditProfileFunc={this._showEditProfileFunc}
                         editProfile={editProfile}
                         paramId={paramId}/>)
            }
            <span className="p-20px mt-4">{name}</span>
            {
              (!editProfile) ? (<span className="-grey1 text-center">{description}</span>) : (
                <TextareaInput
                  name="edit-description-input"
                  label=''
                  value={description}
                  ref={descriptionInput => {
                    this.descriptionInput = descriptionInput
                  }}
                />
              )
            }
          </div>
          {
            (!editProfile) ? '' : (
              <div className="flex-row pb-3">
                <div className="w-50 pl-2 pb-2">
                  <button type="submit" className="btn btn-outline-secondary btn-block sidebarBottom">
                    {tr['Save changes']}
                  </button>
                </div>
                <div className="w-50 pb-2">
                  <button type="button" className="btn btn-outline-secondary btn-block sidebarBottom"
                          onClick={this._closeEditProfile}>
                    {tr['Cancel']}
                  </button>
                </div>
              </div>
            )
          }
          {
            (chosenBadgesImg.length > 0) ? (
              <div className="badgesCard">
                <BadgesCard badgesImg={chosenBadgesImg}/>
              </div>
            ) : ("")
          }
          {/*<div className="followNames">*/}
          {/*<span className="item">{followNames[0]}،</span>*/}
          {/*<span className="item">{followNames[1]}</span>*/}
          {/*<span>{` و ${followNames.length - 2 } نفر دیگر `}</span>*/}
          {/*</div>*/}
          <CheckOwner showForOwner={false} id={paramId}>
            <div className="flex-row pb-3">
              <div className="w-50 pl-2 pb-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-block sidebarBottom">{tr['Send Message']}
                </button>
              </div>
              {showFollow ?
                <div className="w-50 pb-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-block sidebarBottom follow-button"
                    onClick={this._createFollow}>{tr['Follow']}
                  </button>
                </div>
                : <div className="w-50 pl-2 pb-2 followed-text">
                  {tr['Followed']}
                </div>
              }
            </div>
          </CheckOwner>
          <div className="social-network">
            <a href={socialNetworks.youtube_account || "#"} target="_blank">
              <i className={cx("fa fa-youtube-play", {'youtube-active': socialNetworks.youtube_account})}/>
            </a>
            <a href={socialNetworks.telegram_account || "#"} target="_blank">
              <i className={cx("fa fa-telegram", {'telegram-active': socialNetworks.telegram_account})}/>
            </a>
            <a href={socialNetworks.instagram_account || "#"} target="_blank">
              <i className={cx("fa fa-instagram", {'instagram-active': socialNetworks.instagram_account})}/>
            </a>
            <a href={socialNetworks.linkedin_account || "#"} target="_blank">
              <i className={cx("fa fa-linkedin-square", {'linkedin-active': socialNetworks.linkedin_account})}/>
            </a>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    clientIdentityId: state.auth.client.identity.content,
    followers: getFollowersSelector(state, ownProps),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createFollow: SocialActions.createFollow,
    getFollowers: SocialActions.getFollowers,
    updateProfile: updateProfile.updateProfile,
    updateOrganization: OrganizationActions.updateOrganization,
  }, dispatch)
})
SideBarContent = connect(mapStateToProps, mapDispatchToProps)(SideBarContent)