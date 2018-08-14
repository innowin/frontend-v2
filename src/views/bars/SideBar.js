// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import {DefaultImageIcon} from "src/images/icons"
import {DefaultUserIcon, DefaultOrganIcon} from "src/images/icons"
import {VerifyWrapper} from "../common/cards/Frames"
import type {userProfileType, userType} from "src/consts/flowTypes/user/basicInformation"
import type {organizationType} from "src/consts/flowTypes/organization/organization"
import type {errorObjectType, TranslatorType} from "src/consts/flowTypes/common/commonTypes"

const MenuBox = (props) => (
  <div className="menu-box pt-0 pb-0" id={props.id}>
    <div>
      <span>اشتراک گذاری نمایه</span>
      <span>ویرایش ویترین</span>
    </div>
    <div>
      <span>بی صدا کردن اعلام</span>
      <span>بلاک</span>
      <span>گزارش تخلف</span>
    </div>
  </div>
)

export const BadgesCard = (props: { badgesImg: (string)[] }) => {
  return (
    props.badgesImg.map((badgeImg, i) => (
      <span className="pr-1 pl-1" key={i + "BadgesCard"}>
          <img src={badgeImg} className="-badgeImg rounded" alt=""/>
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
  translate: TranslatorType,
  userObject: userType,
  profileObject: userProfileType,
  className?: string
}

export const UserSideBar = (props: PropsUserSideBar) => {

  const {userObject, profileObject, translate, className} = props
  const user = userObject.content
  const profile = profileObject.content
  const name = (!(user.first_name && user.last_name)) ? user.username : (user.first_name + " " + user.last_name)
  const isLoading = userObject.isLoading || profileObject.isLoading
  const errorMessage = userObject.error.message || profileObject.error.message
  const picture = (profile.profile_media && profile.profile_media.file) || null
  const banner = (profile.profile_banner && profile.profile_banner.file) || null
  const badgesImg = [
    "http://restful.daneshboom.ir/media/c6fabb8055cc44a4843f7fa1e8a63397.jpg",
    "http://restful.daneshboom.ir/media/75f00defdde44fd4b0d8bee05617e9c7.jpg",
    "http://restful.daneshboom.ir/media/c6fabb8055cc44a4843f7fa1e8a63397.jpg",
    "http://restful.daneshboom.ir/media/75f00defdde44fd4b0d8bee05617e9c7.jpg",
    "http://restful.daneshboom.ir/media/75f00defdde44fd4b0d8bee05617e9c7.jpg"
  ]
  return (
    <SideBarContent
      sideBarType='user'
      name={name}
      banner={banner}
      description={profile.description}
      picture={picture}
      isLoading={isLoading}
      errorMessage={errorMessage}
      translate={translate}
      className={className}
      badgesImg={badgesImg}
    />
  )
}
UserSideBar.propTypes = {
  translate: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired,
  profileObject: PropTypes.object.isRequired,
  className: PropTypes.string
}

type PropsOrganSideBar = {
  translate: TranslatorType,
  getFile: Function,
  organObject: {
    content: organizationType,
    isLoading: boolean,
    error: errorObjectType
  },
  organLogo: ?string,
  organBanner: ?string,
  className?: string
}

export class OrganSideBar extends Component<PropsOrganSideBar> {

  static propTypes = {
    organObject: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    getFile: PropTypes.func.isRequired,
    organLogo: PropTypes.string,
    organBanner: PropTypes.string,
    className: PropTypes.string
  }

  componentDidMount() {
    // TODO mohsen: get badges
    const {getFile, organObject} = this.props
    const {organization_logo, organization_banner} = organObject.content
    if (organization_logo) {
      getFile(organization_logo)
    }
    if (organization_banner) {
      getFile(organization_banner)
    }
  }

  render() {
    const {organObject, translate, organLogo, organBanner, className} = this.props
    const organization = organObject.content
    const name = organization.nike_name || organization.official_name
    const isLoading = organObject.isLoading
    const errorMessage = organObject.error.message
    return (
      <SideBarContent
        sideBarType='organ'
        name={name}
        banner={organBanner}
        description={organization.biography}
        picture={organLogo}
        badgesImg={[]}
        isLoading={isLoading}
        errorMessage={errorMessage}
        translate={translate}
        className={className}
      />
    )
  }
}

type PropsSideBarContent = {
  sideBarType: string,
  isLoading: boolean,
  errorMessage: ?string,
  banner: ?string,
  picture: ?string,
  name: string,
  description: ?string,
  badgesImg: (string)[],
  translate: TranslatorType,
  className?: string
}

class SideBarContent extends Component<PropsSideBarContent, { menuToggle: boolean }> {

  static propTypes = {
    sideBarType: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    banner: PropTypes.string,
    picture: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    badgesImg: PropTypes.array.isRequired,
    translate: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {menuToggle: false}
  }

  _handleClickOutMenuBox = (e: any) => {
    if (!e.target.closest('#sidebar-menu-box') && !e.target.closest('.menuBottom')) {
      this.setState({...this.state, menuToggle: false})
    }
  }


  componentDidMount() {
    // Without flow type: document.addEventListener('click', this._handleClickOutMenuBox)
    (document.addEventListener: Function)('click', this._handleClickOutMenuBox)
  }

  componentWillUnmount() {
    (document.removeEventListener: Function)('click', this._handleClickOutMenuBox)
  }

  _handleMenu = () => {
    this.setState({...this.state, menuToggle: !this.state.menuToggle})
  }

  render() {
    const {menuToggle} = this.state
    const {sideBarType, isLoading, errorMessage, banner, picture, name, description, badgesImg, translate: tr, className} = this.props
    // picture and banner is link of file and are string
    // chosenBadges is the first four badge arrays that sort by order
    const chosenBadgesImg = badgesImg.slice(0, 4)
    return (
      <VerifyWrapper isLoading={isLoading} error={errorMessage} className={className}>
        {
          (!banner) ? <DefaultImageIcon className="banner"/> :
            <img alt="" src={banner} className="banner"/>
        }
        <div className="-sidebar-child-wrapper col">
          {
            (!picture) ? (
              (sideBarType === 'user') ? <DefaultUserIcon className="head-picture"/> :
                <DefaultOrganIcon className="head-picture"/>
            ) : (
              <img className="rounded-circle head-picture" alt="" src={picture}/>)
          }
          <div className="align-items-center flex-column info-section">
            <i className="fa fa-ellipsis-v menuBottom" onClick={this._handleMenu}/>
            {
              (!menuToggle) ? ('') : (<MenuBox id="sidebar-menu-box"/>)
            }
            <span className="p-20px mt-4">{name}</span>
            <span className="-grey1 text-center">{description}</span>
          </div>
          {
            (chosenBadgesImg.length > 0) ? (
              <div className="row mr-0 ml-0 justify-content-between">
                <BadgesCard badgesImg={chosenBadgesImg}/>
              </div>
            ) : ("")
          }
          <div className="flex-row pb-3">
            <div className="w-50 pl-2 pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarBottom">{tr['Send Message']}
              </button>
            </div>
            <div className="w-50 pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarBottom">{tr['Follow']}
              </button>
            </div>
          </div>
        </div>
      </VerifyWrapper>
    )
  }
}