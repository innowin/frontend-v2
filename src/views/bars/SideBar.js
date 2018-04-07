/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";

import {defaultImg, organLogo} from "../../images/icons";
import {REST_REQUEST} from "../../consts/Events";
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS";
import {TOKEN} from "src/consts/data";
import {VerifyWrapper} from "../common/cards/Frames";


export const BadgesCard = ({badges}) => {
  return (
    badges.map((badge, i) => (
      <span className="col-3 mb-2">
          <img key={i} src={badge.badge_media || defaultImg} style={{height: "35px"}} alt=""/>
      </span>
    ))
  )
};

export const TagsBox = ({tags}) => {
  return (
    tags.map((tag, i) => (
      <div className="mb-1">
        {/*// TODO mohsen : handle ltr for badges*/}
        <span key={i} className="badge -myBadge" dir="ltr">{tag.title}</span>
      </div>
    ))
  )
};


export class Sidebar extends Component {

  render() {

    const {children} = this.props;
    // TODO keep ltr and uncomment components
    return (
      <div className="col">
        {children}
      </div>
    )
  }
}

export default Sidebar;


export class UserSideView extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {user: {}, userProfile: {}, badges: [], tags: [], isLoading: false, error: null}
  }


  componentDidMount() {
    const {userId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);

      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `user-sidebar-get/${userId}`,
          token: TOKEN,
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/profiles/?profile_user=${userId}`,
          result: `profile_user-sidebar-get/${userId}`,
          token: TOKEN,
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/badges/?badge_user=${userId}`,
          result: `badge_user-sidebar-get/${userId}`,
          token: TOKEN,
        }
      );
      // TODO mohsen: socket.emit of tags
    };

    emitting();

    socket.on(`user-sidebar-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, user: res, isLoading: false};
      this.setState(newState);
    });

    socket.on(`profile_user-sidebar-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, userProfile: res[0], isLoading: false};
      this.setState(newState);
    });

    socket.on(`badge_user-sidebar-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, badges: res, isLoading: false};
      this.setState(newState);
    });
    // TODO mohsen: socket.on of tags
  }

  componentWillUnmount() {
    const {userId} = this.props;

    socket.off(`user-sidebar-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, user: res, isLoading: false};
      this.setState(newState);
    });

    socket.off(`profile_user-sidebar-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, userProfile: res[0], isLoading: false};
      this.setState(newState);
    });

    socket.off(`badge_user-sidebar-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, badges: res, isLoading: false};
      this.setState(newState);
    });

    // TODO mohsen: socket.off of tags
  }

  render() {
    const {user, userProfile, badges, tags, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-sidebar-child-wrapper">
        <div className="align-items-center flex-column">
          {/*TODO mohsen : handle profile_media.url*/}
          <img className="rounded-circle" alt="Person icon" src={userProfile.profile_media || defaultImg}
               style={{width: "100px"}}/>
          <span style={{padding: 20}}>{__('User')}: {user.first_name + " " + user.last_name || "------"}</span>
          <span className="-grey1">{userProfile.description}</span>
        </div>
        {
          (badges.length > 0) ? (
            <div className="flex-wrap pb-3">
              <BadgesCard badges={badges}/>
            </div>
          ) : ("")
        }
        <div className="flex-row pb-3">
          <div className="w-50 pl-2 pb-2">
            <button
              type="button"
              style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060'}}
              className="btn btn-outline-secondary btn-block">{__('Follow')}
            </button>
          </div>
          <div className="w-50 pb-2">
            <button
              type="button"
              style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060'}}
              className="btn btn-outline-secondary btn-block">{__('Send Message')}
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
    this.state = {organization: {}, badges: [], tags: [], isLoading: false, error: null}
  }

  static propTypes = {
    organizationId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const {organizationId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/organizations/${organizationId}/`,
          result: `organization-OrganizationSideView-get/${organizationId}`,
          token: TOKEN,
        }
      );
      // TODO mohsen: socket.emit of badges
      // TODO mohsen: socket.emit of tags
    };

    emitting();

    socket.on(`organization-OrganizationSideView-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, organization: res, isLoading: false};
      this.setState(newState);
    });
    // TODO mohsen: socket.on of badges
    // TODO mohsen: socket.on of tags;
  }

  componentWillUnmount() {
    const {organizationId} = this.props;
    socket.off(`organization-OrganizationSideView-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, organization: res, isLoading: false};
      this.setState(newState);
    });
    // TODO mohsen: socket.off of badges
    // TODO mohsen: socket.off of tags;
  }

  render() {
    const {organization, badges, tags, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-sidebar-child-wrapper">
        <div className="align-items-center flex-column">
          {/*TODO mohsen : handle profile_media.url*/}
          <img className="rounded-circle" alt="Person icon" src={organization.organization_logo || organLogo}
               style={{width: "100px"}}/>
          {/*TODO mohsen: check organization name is what??*/}
          <span
            style={{padding: 20}}>{__('Organization')}: {organization.nike_name || organization.official_name}</span>
          <span className="-grey1">{organization.biography}</span>
        </div>
        {
          (badges.length > 0) ? (
            <div className="flex-wrap pb-3">
              <BadgesCard badges={badges}/>
            </div>
          ) : ("")
        }
        <div className="flex-row pb-3">
          <div className="w-50 pl-2 pb-2">
            <button
              type="button"
              style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060'}}
              className="btn btn-outline-secondary btn-block">{__('Follow')}
            </button>
          </div>
          <div className="w-50 pb-2">
            <button
              type="button"
              style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060'}}
              className="btn btn-outline-secondary btn-block">{__('Send Message')}
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