/*global __*/
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import {DefaultImageIcon} from "src/images/icons"
import {DefaultUserIcon, DefaultOrganIcon} from "src/images/icons"
import {getFile} from "src/crud/media/media"
import {getOrganization} from "src/crud/organization/organization"
import {VerifyWrapper} from "../common/cards/Frames"

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

export const BadgesCard = ({badgesImgUrl}) => {
  return (
    badgesImgUrl.map((imgUrl, i) => (
      <span className="col-3 mb-2" key={i + "BadgesCard"}>
          <img src={imgUrl} className="-badgeImg" alt=""/>
      </span>
    ))
  )
}

export const TagsBox = ({tags}) => {
  return (
    tags.map((tag, i) => (
      <div className="mb-1" key={i + "TagsBox"}>
        {/*// TODO mohsen : handle ltr for badges*/}
        <span className="badge -myBadge" dir="ltr">{tag.title}</span>
      </div>
    ))
  )
}

export class UserSideView extends Component {

  static propTypes = {
    translate: PropTypes.object.isRequired,
    userObject: PropTypes.object.isRequired,
    profileObject: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      badgesImgUrl: [],
      tags: [],
      menuToggle: false,
    }
  }

  _handleClickOutMenuBox = (e) => {
    if (!e.target.closest('#user-sidebar-menu-box') && !e.target.closest('.menuBottom')) {
      this.setState({...this.state, menuToggle: false})
    }
  }

  componentDidMount() {
// TODO mohsen: socket of tags && socket.badges
    document.addEventListener('click', this._handleClickOutMenuBox)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutMenuBox);
  }

  _handleMenu = () => {
    this.setState({...this.state, menuToggle: !this.state.menuToggle})
  }

  render() {
    const {userObject, profileObject, translate: tr} = this.props
    const {badgesImgUrl, tags, menuToggle} = this.state
    const user = userObject.content
    const profile = profileObject.content
    const name = (!(user.first_name && user.last_name)) ? user.username : (user.first_name + " " + user.last_name)
    return (
      <VerifyWrapper isLoading={userObject.isLoading || profileObject.isLoading}
                     error={userObject.error.message || profileObject.error.message}>
        {
          (!profile.profile_banner) ? <DefaultImageIcon className="banner"/> :
            <img alt="" src={profile.profile_banner.file} className="banner"/>
        }
        <div className="-sidebar-child-wrapper col">
          {
            (!profile.profile_media) ? (<DefaultUserIcon className="head-picture"/>) : (
              <img className="rounded-circle head-picture" alt="" src={profile.profile_media.file}/>)
          }
          <div className="align-items-center flex-column">
            <i className="fa fa-ellipsis-v menuBottom" onClick={this._handleMenu}/>
            {
              (!menuToggle) ? ('') : (<MenuBox id="user-sidebar-menu-box"/>)
            }
            <span className="p-20px mt-4">{name}</span>
            <span className="-grey1">{profile.description}</span>
          </div>
          {
            (badgesImgUrl.length > 0) ? (
              <div className="flex-wrap pb-3">
                <BadgesCard badgesImgUrl={badgesImgUrl}/>
              </div>
            ) : ("")
          }
          <div className="flex-row pb-3">
            <div className="w-50 pl-2 pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarBottom">{tr['Follow']}
              </button>
            </div>
            <div className="w-50 pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarBottom">{tr['Send Message']}
              </button>
            </div>
          </div>
          {
            (tags.length > 0) ? (
              <div className="flex-wrap pb-3">
                <TagsBox tags={tags}/>
              </div>) : ("")
          }
        </div>
      </VerifyWrapper>
    )
  }
}


export class OrganizationSideView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      organization: {},
      organizationLogo: null,
      organizationBanner: null,
      badgesImgUrl: [],
      tags: [],
      menuToggle: false,
      isLoading: false,
      error: null
    }
  }

  static propTypes = {
    organizationId: PropTypes.number.isRequired,
  }

  _handleClickOutMenuBox = (e) => {
    if (!e.target.closest('#organization-sidebar-menu-box') && !e.target.closest('.menuBottom')) {
      this.setState({...this.state, menuToggle: false})
    }
  }

  componentDidMount() {
    const {organizationId} = this.props;
    this.setState({...this.state, isLoading: true})
    getOrganization(organizationId, (res) => {
      this.setState({...this.state, organization: res})
      if (res.organization_banner) {
        getFile(res.organization_banner, (res) =>
          this.setState({...this.state, organizationBanner: res.file}))
      }
      if (res.organization_logo) {
        getFile(res.organization_logo, (res) =>
          this.setState({...this.state, organizationLogo: res.file}))
      }
      this.setState({...this.state, isLoading: false})
    })
    // TODO mohsen: socket of badges
    // TODO mohsen: socket  of tags
    document.addEventListener('click', this._handleClickOutMenuBox)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutMenuBox);
  }

  _handleMenu = () => {
    this.setState({...this.state, menuToggle: !this.state.menuToggle})
  }

  render() {
    const {
      organization, organizationLogo, organizationBanner, badgesImgUrl, tags, menuToggle,
      isLoading, error
    } = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (organizationBanner) ? (<img alt="" src={organizationBanner} className="banner"/>) : ('')
        }
        <div className="-sidebar-child-wrapper col">
          <i className="fa fa-ellipsis-v menuBottom" onClick={this._handleMenu}/>
          {
            (!menuToggle) ? ('') : (<MenuBox id="organization-sidebar-menu-box"/>)
          }
          <div className="align-items-center flex-column">
            {
              (!organizationLogo) ? (<DefaultOrganIcon className="head-picture"/>) : (
                <img className="rounded-circle head-picture" alt="Person icon" src={organizationLogo}/>)
            }
            {/*TODO mohsen: check organization name is what??*/}
            <span className="p-20px mt-4">{__('Organization')}: {organization.nike_name || organization.official_name}</span>
            <span className="-grey1">{organization.biography}</span>
          </div>
          {
            (badgesImgUrl.length > 0) ? (
              <div className="flex-wrap pb-3">
                <BadgesCard badgesImgUrl={badgesImgUrl}/>
              </div>
            ) : ("")
          }
          <div className="flex-row pb-3">
            <div className="w-50 pl-2 pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarBottom">{__('Follow')}
              </button>
            </div>
            <div className="w-50 pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarBottom">{__('Send Message')}
              </button>
            </div>
          </div>
          {
            (tags.length > 0) ? (
              <div className="flex-wrap pb-3">
                <TagsBox tags={tags}/>
              </div>) : ("")
          }
        </div>
      </VerifyWrapper>
    )
  }
}