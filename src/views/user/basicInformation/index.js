/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {ProfileInfoEditForm, UserInfoEditForm, ResearchInfoEditForm, EducationInfoEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN} from "src/consts/data"
import {UserInfoItemWrapper, UserInfoView, ProfileInfoView, ResearchInfoView, EducationInfoView} from "./Views"
import {getUserResearches} from "src/crud/user/research"
import {getUserEducations} from "src/crud/user/education"

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

export class EducationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.state , education:props.education, error: null, edit: false, isLoading: false}
  }

  static propTypes = {
    education: PropTypes.object.isRequired
  };

  _showEdit = () => {
    this.setState({...this.state , edit: true});
  };

  _hideEdit = () => {
    this.setState({...this.state , edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, educations:res, error:error, isLoading:isLoading});
  };

  render() {
    const {education, edit, isLoading, error} = this.state;
    let self = this;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper>
              <EducationInfoEditForm
                education={education}
                hideEdit={this._hideEdit} 
                updateStateForView={this._updateStateForView}
              /> 
            </UserInfoItemWrapper>
          ) : (
            <EducationInfoView education={education} showEdit={this._showEdit}/>
          )
        }
      </VerifyWrapper>
    )

  }
}

export class EducationsInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {...this.state , educations: [], error: null, edit: false, isLoading: false}
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

  _updateStateForView = (education, educationId, error, isLoading) => {
    let educations = this.state.educations;
    if(!error){
      let index = educations.findIndex((element)=>{
        return element.id === educationId
      })
      educations[index] = education;
    }

    this.setState({...this.state, educations:educations, error:error, isLoading:isLoading});
  };

  componentDidMount() {
    const {userId} = this.props;

    const newState = {...this.state, isLoading: true};
    this.setState(newState);

    getUserEducations(userId,(res)=>{
      if (res.error) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, educations: res, isLoading: false};
      this.setState(newState);
    })
      
  }

  render(){
    const{educations} = this.state;
    const Educations = educations.map((education,index)=>{
      return <EducationInfo education={education} key={index + "EducationsInfo"}/>
    })
    return (
      <div>
      {Educations}
      </div>
    )
  }
}

export class ResearchInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.state , research:props.research, error: null, edit: false, isLoading: false}
  }

  static propTypes = {
    research: PropTypes.object.isRequired
  };

  _showEdit = () => {
    this.setState({...this.state , edit: true});
  };

  _hideEdit = () => {
    this.setState({...this.state , edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, research:res, error:error, isLoading:isLoading});
  };


  render() {
    const {research, edit, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper>
              <ResearchInfoEditForm
                research={research}
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
              />
            </UserInfoItemWrapper>
          ) : (
            <ResearchInfoView research={research} showEdit={this._showEdit}/>
          )
        }
      </VerifyWrapper>
    )

  }
}

export class ResearchesInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {...this.state , researches: [], error: null, edit: false, isLoading: false}
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
    this.setState({...this.state, researches:res, error:error, isLoading:isLoading});
  };

  componentDidMount() {
    const {userId} = this.props;

    const newState = {...this.state, isLoading: true};
    this.setState(newState);

    getUserResearches(userId,(res)=>{
      if (res.error) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      }
      const newState = {...this.state, researches: res, isLoading: false};
      this.setState(newState);
    })
      
  }

  render(){
    const{researches} = this.state;
    const Researches = researches.map((research,index)=>{
      return <ResearchInfo research={research} key={index}/>
    })
    return (
      <div>
      {Researches}
      </div>
    )
  }
}

export default class UserBasicInformation extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  componentDidMount(){

  }

  render() {
    const {userId} = this.props;
    // const {educations, reseraches} = this.state;
    // const educationsView = educations.map((education,index)=>{
    //   return <EducationInfo education={education}/>
    // })
    // const researchesView = reseraches.map((research,index)=>{
    //   return <ResearchInfo research={research}/>
    // })
    return (
      <div>
        <CategoryTitle
          title={__('Basic information')}
        />
        <FrameCard>
          <ListGroup>
            <UserInfo {...{userId}}/>
            <ProfileInfo {...{userId}}/>
            <EducationsInfo {...{userId}}/>
            <ResearchesInfo {...{userId}}/>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

