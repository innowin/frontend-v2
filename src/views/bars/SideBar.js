/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";

import {defaultImg, organLogo} from "../../images/icons";
import {REST_REQUEST} from "../../consts/Events";
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS";
import {TOKEN} from "src/consts/data";
import {VerifyWrapper} from "../common/cards/Frames";


const CertificatesBox = ({urlOfCertificates}) => {
  return (
    urlOfCertificates.map((urlOfCertificate, i) => (
      <span className="col-3 mb-2">
          <img key={i} src={urlOfCertificate.picture_media || defaultImg} style={{height: "35px"}} alt=""/>
      </span>
    ))
  )
};

const TagsBox = ({tags}) => {
  return (
    tags.map((item, i) => (
      <div className="mb-1">
        {/*// TODO mohsen : handle ltr for badges*/}
        <span key={i} className="badge -myBadge" dir="ltr">{item.title}</span>
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
    this.state = {user: {}, userProfile: {}, badges: [], urlOfCertificates: [], isLoading: false, error: null}
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
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/certificates/?certificate_user=${userId}`,
          result: `certificate_user-sidebar-get/${userId}`,
          token: TOKEN,
        }
      );
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
    socket.on(`certificate_user-sidebar-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, urlOfCertificates: res, isLoading: false};
      this.setState(newState);
    });
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
    socket.off(`certificate_user-sidebar-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, urlOfCertificates: res, isLoading: false};
      this.setState(newState);
    });
  }

  render() {
    const {user, userProfile, badges, urlOfCertificates, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-sidebar-child-wrapper">
        <div className="align-items-center flex-column">
          {/*TODO mohsen : handle profile_media.url*/}
          <img className="rounded-circle" alt="Person icon" src={userProfile.profile_media || defaultImg}
               style={{width: "100px"}}/>
          <span style={{padding: 20}}>{__('User')}: {user.first_name + " " + user.last_name || "----"}</span>
          <span className="-green1">{userProfile.description}</span>
        </div>
        {
          (urlOfCertificates.length > 0) ? (
            <div className="flex-wrap pb-3">
              <CertificatesBox urlOfCertificates={urlOfCertificates}/>
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
          (badges.length > 0) ? (
            <div className="flex-wrap pb-3">
              <TagsBox tags={badges}/>
            </div>) : ("")
        }
      </VerifyWrapper>
    )
  }
}

export class OrganizationSideView extends Component {

  constructor(props) {
    super(props);
    this.state = {organization: {}, badges:[], urlOfCertificates:[], isLoading: false, error: null}
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
      // socket.emit(REST_REQUEST,
      //   {
      //     method: "get",
      //     url: `${url}/organizations/badges/?badge_organization=${organizationId}`,
      //     result: `badge_organization-OrganizationSideView-get/${organizationId}`,
      //     token: TOKEN,
      //   }
      // );
      // socket.emit(REST_REQUEST,
      //   {
      //     method: "get",
      //     url: `${url}/organizations/certificates/?certificate_organization=${organizationId}`,
      //     result: `certificate_organization-OrganizationSideView-get/${organizationId}`,
      //     token: TOKEN,
      //   }
      // );
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
    // socket.on(`badge_organization-OrganizationSideView-get/${organizationId}`, (res) => {
    //   if (res.detail) {
    //     const newState = {...this.state, error: res.detail, isLoading: false};
    //     this.setState(newState);
    //   }
    //   const newState = {...this.state, badges: res, isLoading: false};
    //   this.setState(newState);
    // });
    // socket.on(`certificate_organization-OrganizationSideView-get/${organizationId}`, (res) => {
    //   if (res.detail) {
    //     const newState = {...this.state, error: res.detail, isLoading: false};
    //     this.setState(newState);
    //   }
    //   const newState = {...this.state, urlOfCertificates: res, isLoading: false};
    //   this.setState(newState);
    // });
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
    // socket.off(`badge_organization-OrganizationSideView-get/${organizationId}`, (res) => {
    //   if (res.detail) {
    //     const newState = {...this.state, error: res.detail, isLoading: false};
    //     this.setState(newState);
    //   }
    //   const newState = {...this.state, badges: res, isLoading: false};
    //   this.setState(newState);
    // });
    // socket.off(`certificate_organization-OrganizationSideView-get/${organizationId}`, (res) => {
    //   if (res.detail) {
    //     const newState = {...this.state, error: res.detail, isLoading: false};
    //     this.setState(newState);
    //   }
    //   const newState = {...this.state, urlOfCertificates: res, isLoading: false};
    //   this.setState(newState);
    // });
  }

  render() {
    const {organization,badges, urlOfCertificates, isLoading, error} = this.state;
    console.log(organization);
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-sidebar-child-wrapper">
        <div className="align-items-center flex-column">
          {/*TODO mohsen : handle profile_media.url*/}
          <img className="rounded-circle" alt="Person icon" src={organization.organization_logo || organLogo}
               style={{width: "100px"}}/>
          {/*TODO mohsen: check organization name is what??*/}
          <span style={{padding: 20}}>{__('Organization')}: {organization.nike_name || organization.official_name}</span>
          <span className="-green1">{organization.biography}</span>
        </div>
        {
          (urlOfCertificates.length > 0) ? (
            <div className="flex-wrap pb-3">
              <CertificatesBox urlOfCertificates={urlOfCertificates}/>
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
          (badges.length > 0) ? (
            <div className="flex-wrap pb-3">
              <TagsBox tags={badges}/>
            </div>) : ("")
        }
      </VerifyWrapper>
    )
  }
}