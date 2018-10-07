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
import CheckOwner from "../common/CheckOwner";

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
}
export const UserSideBar = (props: PropsUserSideBar) => {

  const {user, profile, badges, translate, className, paramId} = props
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
  }
  return (
    <SideBarContent
      sideBarType='user'
      name={name}
      banner={banner}
      description={profile.description}
      picture={picture}
      translate={translate}
      className={className}
      chosenBadgesImg={chosenBadgesImg}
      socialNetworks={socialNetworks}
      paramId={paramId}
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
}




type PropsOrganSideBar = {
  organ: organizationType,
  badges: (badgeType)[],
  organLogo: ?string,
  organBanner: ?string,
  className?: string,
  translate: TranslatorType,
  paramId: number,
}
export const OrganSideBar = (props: PropsOrganSideBar) => {
    const {organ, badges, organLogo, organBanner, className, translate, paramId} = props
    const name = organ.nike_name || organ.official_name
    const badgesImg = badges.map(badge => (
      (!badge) ? '' : (badge.badge_related_badge_category.badge_related_media.file))
    )
    const chosenBadgesImg = badgesImg.slice(0, 4)
    const socialNetworks = { //TODO organ socialNetWorks get from backEnd
      telegram_account: '',
      instagram_account: '',
      linkedin_account: '',
    }
    return (
      <SideBarContent
        sideBarType='organ'
        name={name}
        banner={organBanner}
        description={organ.description}
        picture={organLogo}
        chosenBadgesImg={chosenBadgesImg}
        socialNetworks={socialNetworks}
        translate={translate}
        className={className}
        paramId={paramId}
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
}



type PropsSideBarContent = {
  sideBarType: string,
  banner: ?string,
  picture: ?string,
  name: ?string,
  description: ?string,
  chosenBadgesImg: (string)[],
  socialNetworks: {
    telegram_account: ?string,
    instagram_account: ?string,
    linkedin_account: ?string,
  },
  translate: TranslatorType,
  className?: string,
  paramId: number,
}

class SideBarContent extends Component<PropsSideBarContent, { menuToggle: boolean }> {

  static propTypes = {
    sideBarType: PropTypes.string.isRequired,
    banner: PropTypes.string,
    picture: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    chosenBadgesImg: PropTypes.array.isRequired,
    socialNetworks: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    className: PropTypes.string,
    paramId: PropTypes.number,
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
    const {sideBarType, banner, picture, name, description, chosenBadgesImg, socialNetworks, translate: tr, className, paramId} = this.props
    const followNames = ["صابر منادی", "امیر امیری فر", "محسن فلاح", "یاسر رستگار", "علی اوروجی"] //TODO get followNames
    return (
      <div className={className}>
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
              <div className="badgesCard">
                <BadgesCard badgesImg={chosenBadgesImg}/>
              </div>
            ) : ("")
          }
          <div className="followNames">
            <span className="item">{followNames[0]}،</span>
            <span className="item">{followNames[1]}</span>
            <span>{` و ${followNames.length - 2 } نفر دیگر `}</span>
          </div>
          <CheckOwner showForOwner={false} id={paramId}>
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
          </CheckOwner>
          <div className="social-network">
            <a href={socialNetworks.telegram_account || "#"} target="_blank">
              <i className={cx("fa fa-youtube-play", {'active': socialNetworks.telegram_account})}/>
            </a>
            <a href={socialNetworks.telegram_account || "#"} target="_blank">
              <i className={cx("fa fa-telegram", {'active': socialNetworks.telegram_account})}/>
            </a>
            <a href={socialNetworks.instagram_account || "#"} target="_blank">
              <i className={cx("fa fa-instagram", {'active': socialNetworks.instagram_account})}/>
            </a>
            <a href={socialNetworks.linkedin_account || "#"} target="_blank">
              <i className={cx("fa fa-linkedin-square", {'active': socialNetworks.linkedin_account})}/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}