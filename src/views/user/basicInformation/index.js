/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {ProfileInfoEditForm, UserInfoEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url} from "../../../consts/URLS"
import {UserInfoItemWrapper, UserInfoView, ProfileInfoView} from "./Views"


export class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {user:{}, error: null, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
  };

  showEdit = () => {
    this.setState({edit: true});
  };

  hideEdit = (updatedUser) => {
    this.setState({edit: false, user:updatedUser});
  };

  componentDidMount() {
    const {userId , socket} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `UserInfo-get/${userId}`,
          token: "",
        }
      );
    };

    emitting();

    socket.on(`UserInfo-get/${userId}`, (res) => {
      if (res.detail) {
        console.log(res.detail);
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, user: res, isLoading: false};
      this.setState(newState);
    });
  }

  render() {
    const {user, edit, isLoading, error} = this.state;
    const {socket} = this.props;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper>
              <UserInfoEditForm
                user={user}
                hideEdit={this.hideEdit}
                socket={socket}
              />
            </UserInfoItemWrapper>
          ) : (
            <UserInfoView user={user} showEdit={this.showEdit}/>
          )
        }
      </VerifyWrapper>
    )
  }
}

export class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.state , profile: {}, error: null, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.object.isRequired,
  };

  showEdit = () => {
    this.setState({...this.state , edit: true});
  };

  hideEdit = (updatedProfile, error, isLoading) => {
    this.setState({...this.state , edit: false, profile:updatedProfile, error:error, isLoading:isLoading});
  };

  componentDidMount() {
    const {userId , socket} = this.props;

    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/profiles/?profile_user=${userId}`,
          result: `ProfileInfo-get/${userId}`,
          token: "",
        }
      );
    };
    emitting();

    socket.on(`ProfileInfo-get/${userId}`, (res) => {
      if (res.detail) {
        console.log(res.detail);
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, profile: res[0], isLoading: false};
      this.setState(newState);
    });
  }

  render() {
    const {profile, edit, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper>
              <ProfileInfoEditForm
                profile={profile}
                hideEdit={this.hideEdit}
              />
            </UserInfoItemWrapper>
          ) : (
            <ProfileInfoView profile={profile} showEdit={this.showEdit}/>
          )
        }
      </VerifyWrapper>
    )

  }
}


export default class UserBasicInformation extends Component {

  static propTypes = {
    // userId: PropTypes.number.isRequired,
  };

  render() {
    const {userId , socket} = this.props;
    return (
      <div>
        <CategoryTitle
          title={__('Basic information')}
          // showCreateForm={this.showCreateForm}
          createForm={true}
        />
        <FrameCard>
          <ListGroup>
            <UserInfo {...{userId}} socket={socket}/>
            <ProfileInfo {...{userId}} socket={socket}/>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

