/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";

import {defaultImg, ChartIcon, BookmarkIcon} from "../../images/icons";
import {REST_REQUEST} from "../../consts/Events";
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS";
import {TOKEN} from "src/consts/data";
import {VerifyWrapper} from "../common/cards/Frames";
import {BadgesCard, TagsBox} from "./SideBar";

class MediaSection extends Component {
  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  render(){
    const {userProfile, user} = this.props;
    return (
      <div className="flex-column">
        <div className="d-flex justify-content-between mb-4">
          <span>{user.first_name + " " + user.last_name || "----"}</span>
          <BookmarkIcon className="-rBarBookmark"/>
        </div>
        <img className="w-100 -rBarPicture" alt="Person icon" src={userProfile.profile_media || defaultImg}/>
      </div>
    )
  }
}

class OwnerSection extends Component {
  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  render(){
    const {userProfile, user} = this.props;
    return (
      <div className="align-items-center flex-row pt-3 pb-3">
        {/*TODO mohsen : handle profile_media.url*/}
        <img className="rounded-circle" alt="Person icon" src={userProfile.profile_media || defaultImg}
             style={{width: "40px"}}/>
        <span className="mr-4 -grey2">{user.first_name + " " + user.last_name || "----"}</span>
      </div>
    )
  }
}

class BottomSection extends Component {
  static propTypes = {
  };

  render(){
    return (
      <div className="row">
        <div className="col-12 d-flex justify-content-between pt-2 pb-2">
          <div>قیمت تماس</div>
          <span className="ml-2"><ChartIcon className="-rBarChart"/></span>
        </div>
        <div className="col-12 d-flex justify-content-between pt-2">
          <div className="-w-45 pb-2">
            <button
              type="button"
              style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060', fontSize:"12px"}}
              className="btn btn-outline-secondary btn-block p-0 pt-2 pb-2">تماس با ارايه دهنده
            </button>
          </div>
          <div className="-w-45 pb-2">
            <button
              type="button"
              style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060', fontSize:"12px"}}
              className="btn btn-outline-secondary btn-block p-0 pt-2 pb-2">درخواست کارگزاری محصول
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default class ProductSideView extends Component {

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
    // TODO mohsen: socket.off
  }

  render() {
    const {user, userProfile, badges, tags, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-sidebar-child-wrapper">
        <MediaSection userProfile={userProfile} user={user}/>
        <OwnerSection user={user} userProfile={userProfile}/>
        {
          (badges.length > 0) ? (
            <div className="flex-wrap pb-3">
              <BadgesCard badges={badges}/>
            </div>) : ("")
        }
        <BottomSection/>
        {
          (tags.length > 0) ? (
            <div className="flex-wrap pb-3">
              <TagsBox tags={tags}/>
            </div>
          ) : ("")
        }
      </VerifyWrapper>
    )
  }
}