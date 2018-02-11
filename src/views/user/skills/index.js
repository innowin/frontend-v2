/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {createSkill, deleteSkill, updateSkill} from 'src/crud/user/skills'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {SkillCreateForm} from "./forms"
import {SkillEditForm} from './forms'
import {SkillItemWrapper, SkillView} from "./view"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"


class SkillInfo extends Component {
  static propTypes = {
    skill: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    updateSkill: PropTypes.func.isRequired,
    deleteSkill: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const {skill} = props;
    this.state = {edit: false, skill: skill, error:false, isLoading:false};
    this._updateStateForView = this._updateStateForView.bind(this);
    this._showEdit = this._showEdit.bind(this);
    this._showEdit = this._showEdit.bind(this);
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, skill: res, error:error, isLoading:isLoading})
  };

  render() {
    const {skill} = this.state;
    const {user, profile} = this.props;
    if (this.state.edit) {
      return <SkillItemWrapper>
        <SkillEditForm
          skill={skill}
          hideEdit={this._hideEdit}
          updateStateForView={this._updateStateForView}
          remove={this.props.deleteSkill}
          update={this.props.updateSkill}
        />
      </SkillItemWrapper>;
    }
    return <SkillView skill={skill} user={user} profile={profile} showEdit={this._showEdit}/>;
  }
}

class Skill extends Component {

  static propTypes = {
    skill: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._delete = this._delete.bind(this);
    this._update = this._update.bind(this);
    this._updateStateForView = this._updateStateForView.bind(this)
  }


  _delete = (skillId, updateStateForView, hideEdit) => {
    return deleteSkill(skillId, updateStateForView, hideEdit);
  };

  _update = (formValues, skillId, updateStateForView, hideEdit) => {
    return updateSkill(formValues, skillId, updateStateForView, hideEdit);
  };

  _updateStateForView = (res, error, isLoading) => {
    const {updateStateForView} = this.props;
    updateStateForView({error: error, isLoading: isLoading});
    this.setState({...this.state, skill: res, error: error, isLoading: isLoading});
  };

  render() {
    const {skill, user, profile} = this.props;
    return (
      <SkillInfo
        skill={skill}
        user={user}
        profile={profile}
        updateStateForView={this._updateStateForView}
        deleteSkill={this._delete}
        updateSkill={this._update}
      />
    )
  }
}

class Skills extends Component {

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null,products:[], skills: [], user: {}, profile: {}};
  }

  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {userId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);

      //skills
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/skills/?skill_user=${userId}`,
          result: `userSkills-Skills-get/${userId}`,
          token: TOKEN
        }
      );
      //products
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/products/?product_owner=${userId}`,
          result: `userSkills-Products-get/${userId}`,
          token: TOKEN
        }
      );

      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `user-Skills-get/${userId}`,
          token: TOKEN
        }
      );
    };

    emitting();
    socket.on(`userSkills-Products-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, products: res, isLoading: false};
        this.setState(newState);
      }
    })
    socket.on(`userSkills-Skills-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, skills: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.on(`user-Skills-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    })

  }

  componentWillUnmount() {
    const {userId} = this.props;

    socket.off(`userSkills-Products-get/${userId}`);

    socket.off(`userSkills-Skills-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, skills: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.off(`user-Skills-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

    socket.off(`profileUser-Skills-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, profile: res[0], isLoading: false};
        this.setState(newState);
      }
    });

  }

  _showCreateForm = () => {
    this.setState({createForm: true});
  };

  _hideCreateForm = () => {
    this.setState({createForm: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, skill:res, error: error, isLoading: isLoading})
  };

  _create = (formValues, hideCreateForm) => {
    const updateStateForView = this._updateStateForView;
    return createSkill(formValues, updateStateForView, hideCreateForm);
  };

  render() {
    const {createForm, skills, user, profile, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Skills')}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardSkill">
          <ListGroup>
            {
              createForm &&
              <SkillItemWrapper>
                <SkillCreateForm hideCreateForm={this._hideCreateForm} create={this._create}/>
              </SkillItemWrapper>
            }
            {
              skills.map((skill, i) => (
                <Skill
                  skill={skill}
                  user={user}
                  profile={profile}
                  updateStateForView={this._updateStateForView}
                  key={i}
                />
              ))
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Skills;