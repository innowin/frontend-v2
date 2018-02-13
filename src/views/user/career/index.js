/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getCareers, createCareer, deleteCareer, updateCareer} from 'src/crud/user/career'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {CareerCreateForm} from "./forms"
import {CareerEditForm} from './forms'
import {CareerItemWrapper, CareerView} from "./views"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"

class Career extends Component {

  static propTypes = {
    careers: PropTypes.array.isRequired,
    career: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    updateCareers: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {edit: false, error: false, isLoading: false, career: this.props.career || {}};
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updateView = (res) => {
    this.setState({...this.state, career: res})
  };

  _update = (formValues, careerId) => {
    this.setState({...this.state, isLoading: true});
    return updateCareer(formValues, careerId, this._updateView, this._hideEdit, this._handleErrorLoading);
  };

  _delete = () => {
    this.setState({...this.state, isLoading: true});
    return deleteCareer(this.props.careers, this.props.career, this.props.updateCareers, this._hideEdit, this._handleErrorLoading);
  };

  render() {
    const {career, isLoading, error} = this.state;
    const {user, profile} = this.props;
    if (this.state.edit) {
      return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <CareerItemWrapper>
            <CareerEditForm
              career={career}
              hideEdit={this._hideEdit}
              delete={this._delete}
              update={this._update}
            />
          </CareerItemWrapper>
        </VerifyWrapper>
      )
    }
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CareerView career={career} user={user} profile={profile} showEdit={this._showEdit}/>
      </VerifyWrapper>
    )
  }
}

class Careers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createForm: false,
      edit: false, isLoading: false, error: null, careers: [], user: {}, profile: {}, resetState: false
    };
  }


  _delete = (careerId, updateStateForView, hideEdit) => {
    return deleteCareer(careerId, updateStateForView, hideEdit);
  };

  _showCreateForm = () => {
    this.setState({createForm: true});
  };

  _hideCreateForm = () => {
    this.setState({createForm: false});
  };


  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updateCareers = (res, type, deletedIndex = null) => {
    const {careers} = this.state;
    if (type === 'get') {
      this.setState({...this.state, careers: [...careers, ...res]});
      return false;
    }
    if (type === 'post') {
      this.setState({...this.state, careers: [res, ...careers]});
      return false;
    }
    if (type === 'delete') {
      const remainCareers = careers.slice(0, deletedIndex).concat(careers.slice(deletedIndex + 1));
      this.setState({...this.state, careers: remainCareers});
    }
  };

  _getCareers = () => {
    this.setState({...this.state, isLoading: true});
    getCareers(this.props.userId, this._updateCareers, this._handleErrorLoading);
  };

  _create = (formValues) => {
    this.setState({...this.state, isLoading: true});
    formValues.work_experience_user = this.props.userId;
    createCareer(formValues, this._updateCareers, this._handleErrorLoading, this._hideCreateForm);
  };

  componentDidMount() {
    const {userId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      this._getCareers();
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `user-Careers-get/${userId}`,
          token: TOKEN
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/profiles/?profile_user=${userId}`,
          result: `profileUser-Careers-get/${userId}`,
          token: TOKEN
        }
      );
    };

    emitting();

    socket.on(`user-Careers-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

  }

  componentWillUnmount() {
    const {userId} = this.props;
    // TODO amir: socket.off of update and delete requests
    socket.off(`userCareers-Careers-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, careers: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.off(`user-Careers-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

  }

  render() {
    const {createForm, user, profile, isLoading, error} = this.state;
    const careers = [...new Set(this.state.careers)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Career')}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardCareer">
          <ListGroup>
            {
              createForm &&
              <CareerItemWrapper>
                <CareerCreateForm hideCreateForm={this._hideCreateForm} create={this._create}/>
              </CareerItemWrapper>
            }
            {
              careers.map((career) => (
                <Career
                  careers={careers}
                  career={career}
                  user={user}
                  profile={profile}
                  updateCareers={this._updateCareers}
                  key={career.id}
                />
              ))
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Careers;