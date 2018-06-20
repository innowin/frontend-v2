/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";

import {defaultImg, organLogo} from "../../images/icons";
import {REST_REQUEST} from "../../consts/Events";
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS";
import {TOKEN} from "src/consts/data";
import {VerifyWrapper} from "../common/cards/Frames";
import {getUser} from "../../crud/user/user";
import {getProfile} from "../../crud/user/profile";
import {getOrganization} from "../../crud/organization/organization";
import {getFile} from "../../crud/media/media";


export const BadgesCard = ({badgesImgUrl}) => {
  return (
    badgesImgUrl.map((imgUrl, i) => (
      <span className="col-3 mb-2" key={i + "BadgesCard"}>
          <img src={imgUrl} className="-badgeImg" alt=""/>
      </span>
    ))
  )
};

export const TagsBox = ({tags}) => {
  return (
    tags.map((tag, i) => (
      <div className="mb-1" key={i + "TagsBox"}>
        {/*// TODO mohsen : handle ltr for badges*/}
        <span className="badge -myBadge" dir="ltr">{tag.title}</span>
      </div>
    ))
  )
};

const Sidebar = (props) => {
  return (
    <div className="col">
      {props.children}
    </div>
  )
}

export default Sidebar;

export class UserSideView extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userProfile: {},
      profile_img: null,
      badgesImgUrl: [],
      tags: [],
      isLoading: false,
      error: null
    }
  }

  componentDidMount() {
    const {userId} = this.props;
    this.setState({...this.state, isLoading: true})
    getUser(userId, (res) => this.setState({...this.state, user: res}))
    getProfile(userId, (res) => this.setState({...this.state, userProfile: res}, () => {
      if (res.profile_media) {
        getFile(res.profile_media, (res) => this.setState({...this.state, profile_img: res.file}))
      }
    }))

    const getBadge_func = (res) => {
      if (res.detail) {
        this.setState({...this.state, error: res.detail, isLoading: false})
        return false;
      }
      this.setState({...this.state, badgesImgUrl: res, isLoading: false})
      socket.off(`badge_user-sidebar-get/${userId}`, getBadge_func)
    }
    socket.on(`badge_user-sidebar-get/${userId}`, getBadge_func)
    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/users/badges/?badge_user=${userId}`,
        result: `badge_user-sidebar-get/${userId}`,
        token: TOKEN,
      }
    );
// TODO mohsen: socket of tags
  }

  render() {
    const {user, userProfile, profile_img, badgesImgUrl, tags, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-sidebar-child-wrapper">
        <div className="align-items-center flex-column">
          {/*TODO mohsen : handle profile_media.url*/}
          <img className="rounded-circle img-rounded-100px" alt="" src={profile_img || defaultImg}/>
          <span className="p-20px">{__('User')}: {user.first_name + " " + user.last_name || "------"}</span>
          <span className="-grey1">{userProfile.description}</span>
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
      </VerifyWrapper>
    )
  }
}

export class OrganizationSideView extends Component {

  constructor(props) {
    super(props);
    this.state = {organization: {}, organizationLogo: null, badgesImgUrl: [], tags: [], isLoading: false, error: null}
  }

  static propTypes = {
    organizationId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const {organizationId} = this.props;
    this.setState({...this.state, isLoading: true})
    getOrganization(organizationId, (res) => this.setState({...this.state, organization: res},
      () => {
        if (res.organization_logo) {
          getFile(res.organization_logo, (res) =>
            this.setState({...this.state, organizationLogo: res.file, isLoading:false}))
        }
        else this.setState({...this.state, organizationLogo: null, isLoading:false})
      }
    ))
    // TODO mohsen: socket of badges
    // TODO mohsen: socket  of tags
  }

  render() {
    const {organization, organizationLogo, badgesImgUrl, tags, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-sidebar-child-wrapper">
        <div className="align-items-center flex-column">
          {/*TODO mohsen : handle profile_media.url*/}
          <img className="rounded-circle img-rounded-100px" alt="Person icon" src={organizationLogo || organLogo}/>
          {/*TODO mohsen: check organization name is what??*/}
          <span className="p-20px">{__('Organization')}: {organization.nike_name || organization.official_name}</span>
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
      </VerifyWrapper>
    )
  }
}