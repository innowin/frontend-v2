/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {ProfileInfoEditForm, UserInfoEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN} from "src/consts/data"
import {UserInfoItemWrapper, UserInfoView, ProfileInfoView} from "./Views"


export class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {user:{}, error: null, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  _showEdit = () => {
    this.setState({...this.state, edit: true});
  };

  _hideEdit = () => {
    this.setState({...this.state, edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, user:res, error:error, isLoading:isLoading});
  };

  componentDidMount() {
    const {userId } = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `UserInfo-get/${userId}`,
          token: TOKEN,
        }
      );
    };

    emitting();

    socket.on(`UserInfo-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, user: res, isLoading: false};
      this.setState(newState);
    });
  }

  render() {
    const {user, edit, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper>
              <UserInfoEditForm
                user={user}
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
              />
            </UserInfoItemWrapper>
          ) : (
            <UserInfoView user={user} showEdit={this._showEdit}/>
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
    userId: PropTypes.string.isRequired,
  };

  _showEdit = () => {
    this.setState({...this.state , edit: true});
  };

  _hideEdit = () => {
    this.setState({...this.state , edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, profile:res, error:error, isLoading:isLoading});
  };

  componentDidMount() {
    const {userId} = this.props;

    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/profiles/?profile_user=${userId}`,
          result: `ProfileInfo-get/${userId}`,
          token: TOKEN
        }
      );
    };

    emitting();

    socket.on(`ProfileInfo-get/${userId}`, (res) => {
      if (res.detail) {
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
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
              />
            </UserInfoItemWrapper>
          ) : (
            <ProfileInfoView profile={profile} showEdit={this._showEdit}/>
          )
        }
      </VerifyWrapper>
    )

  }
}


export default class UserBasicInformation extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  render() {
    const {userId} = this.props;
    return (
      <div>
        <CategoryTitle
          title={__('Basic information')}
          // showCreateForm={this.showCreateForm}
          createForm={true}
        />
        <FrameCard>
          <ListGroup>
            <UserInfo {...{userId}}/>
            <ProfileInfo {...{userId}}/>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

