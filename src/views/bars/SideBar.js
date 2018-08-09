/*global __*/
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import {DefaultImageIcon} from "src/images/icons"
import {DefaultUserIcon, DefaultOrganIcon} from "src/images/icons"
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

export class UserSideBar extends Component {

  static propTypes = {
    translate: PropTypes.object.isRequired,
    userObject: PropTypes.object.isRequired,
    profileObject: PropTypes.object.isRequired
  }

  componentDidMount() {
    // TODO mohsen: get badges
  }

  render() {
    const {userObject, profileObject, translate} = this.props
    const user = userObject.content
    const profile = profileObject.content
    const name = (!(user.first_name && user.last_name)) ? user.username : (user.first_name + " " + user.last_name)
    const isLoading = userObject.isLoading || profileObject.isLoading
    const errorMessage = userObject.error.message || profileObject.error.message
    return (
      <SideBarContent
        name={name}
        banner={profile.profile_banner}
        description={profile.description}
        picture={profile.profile_media}
        badgesImgUrl={[]}
        isLoading={isLoading}
        errorMessage={errorMessage}
        translate={translate}
      />
    )
  }
}


export class OrganSideBar extends Component {

  static propTypes = {
    organObject: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
  }

  componentDidMount() {
    // TODO mohsen: get badges
  }

  render() {
    const {organObject, translate} = this.props
    const organization = organObject.content
    const name = organization.nike_name || organization.official_name
    const isLoading = organObject.isLoading
    const errorMessage = organObject.error.message
    return (
      <SideBarContent
        name={name}
        banner={organization.organization_banner}
        description={organization.biography}
        picture={organization.organization_logo}
        badgesImgUrl={[]}
        isLoading={isLoading}
        errorMessage={errorMessage}
        translate = {translate}
      />
    )
  }
}

class SideBarContent extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    banner: PropTypes.string,
    picture: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    badgesImgUrl: PropTypes.arrayOf(PropTypes.string),
     translate : PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {menuToggle: false}
  }

  _handleClickOutMenuBox = (e) => {
    if (!e.target.closest('#organization-sidebar-menu-box') && !e.target.closest('.menuBottom')) {
      this.setState({...this.state, menuToggle: false})
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutMenuBox);
  }

  _handleMenu = () => {
    this.setState({...this.state, menuToggle: !this.state.menuToggle})
  }

  render() {
    const {menuToggle} = this.state
    const {isLoading, errorMessage, banner, picture, name, description, badgesImgUrl, translate:tr} = this.props
    return (
      <VerifyWrapper isLoading={isLoading} error={errorMessage}>
        {
          (!banner) ? <DefaultImageIcon className="banner"/> :
            <img alt="" src={banner.file} className="banner"/>
        }
        <div className="-sidebar-child-wrapper col">
          {
            (!picture) ? (<DefaultUserIcon className="head-picture"/>) : (
              <img className="rounded-circle head-picture" alt="" src={picture.file}/>)
          }
          <div className="align-items-center flex-column">
            <i className="fa fa-ellipsis-v menuBottom" onClick={this._handleMenu}/>
            {
              (!menuToggle) ? ('') : (<MenuBox id="user-sidebar-menu-box"/>)
            }
            <span className="p-20px mt-4">{name}</span>
            <span className="-grey1">{description}</span>
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
        </div>
      </VerifyWrapper>
    )
  }
}