// @flow
import * as React from "react"
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
import {userInfoIcon, researchIcon, educationIcon} from "src/images/icons"
import {getUser} from "src/crud/user/user"

type UserInfoProps = {
  userId: number
}

type UserInfoState ={
  user: {},
  error:boolean,
  edit: boolean,
  isLoading:boolean
}
export class UserInfo extends React.Component<UserInfoProps, UserInfoState> {

  constructor(props:UserInfoProps) {
    super(props)
    this.state = {user:{}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.string.isRequired,
  }

  _showEdit = ():void => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = ():void => {
    this.setState({...this.state, edit: false})
  }

  _updateStateForView = (res:{}, error:boolean, isLoading:boolean):void => {
    this.setState({...this.state, user:res, error:error, isLoading:isLoading})
  }

  componentDidMount() {
    const {userId } = this.props;
    this.setState({...this.state, isLoading: true}, (): void => {
        getUser(userId, (res) =>
          this.setState({...this.state, user: res, isLoading: false})
        )
      }
    )
  }

  render() {
    const {user, edit, isLoading, error}:UserInfoState = this.state;
    return (

      <VerifyWrapper isLoading={isLoading} error={error}>

        {
          (edit) ? (
            <UserInfoItemWrapper icon={userInfoIcon}>
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

type ProfileInfoProps = {
  userId: number
}

type ProfileInfoState = {
  profile: {},
  error: boolean,
  edit: boolean,
  isLoading: boolean
}
export class ProfileInfo extends React.Component<ProfileInfoProps, ProfileInfoState> {
  constructor(props:ProfileInfoProps) {
    super(props);
    this.state = {profile: {}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired
  };

  _showEdit = () => {
    this.setState({...this.state , edit: true});
  };

  _hideEdit = () => {
    this.setState({...this.state , edit: false});
  };

  _updateStateForView = (res:{}, error:boolean, isLoading:boolean) => {
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
            <UserInfoItemWrapper icon={userInfoIcon}>
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

type EducationInfoProps = {
  education: {}
}

type EducationInfoState ={
  education:{},
  error:boolean,
  edit: boolean,
  isLoading: boolean
}
export class EducationInfo extends React.Component<EducationInfoProps, EducationInfoState> {
  constructor(props:EducationInfoProps) {
    super(props);
    this.state = {education:{}, error: false, edit: false, isLoading: false}
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

  _updateStateForView = (res:{}, error:boolean, isLoading: boolean) => {
    this.setState({...this.state, education:res, error:error, isLoading:isLoading});
  };

  componentDidMount() {
    this.setState({...this.state, education:this.props.education})
  }

  render() {
    const {education, edit, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper icon={educationIcon}>
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

type EducationsInfoProps = {
  userId: number
}

type EducationsInfoState ={
  educations:Array<{}>,
  error:boolean,
  edit: boolean,
  isLoading: boolean
}
export class EducationsInfo extends React.Component<EducationsInfoProps, EducationsInfoState>{
  constructor(props:EducationsInfoProps) {
    super(props);
    this.state = {educations: [], error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
  };

  _showEdit = () => {
    this.setState({...this.state , edit: true});
  };

  _hideEdit = () => {
    this.setState({...this.state , edit: false});
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

type ResearchInfoProps = {
  research: {}
}

type ResearchInfoState ={
  research: {},
  error:boolean,
  edit: boolean,
  isLoading: boolean
}
export class ResearchInfo extends React.Component<ResearchInfoProps, ResearchInfoState> {
  constructor(props:ResearchInfoProps) {
    super(props);
    this.state={research:{}, error: false, edit: false, isLoading: false}
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

  _updateStateForView = (res:{}, error:boolean, isLoading:boolean):void => {
    this.setState({...this.state, research:res, error:error, isLoading:isLoading});
  };

  componentDidMount() {
    this.setState({...this.state, research:this.props.research})
  }


  render() {
    const {research, edit, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper icon={researchIcon}>
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

type ResearchesInfoProps = {
  userId: number
}

type ResearchesInfoState ={
  researches: Array<{}>,
  error:boolean,
  edit: boolean,
  isLoading: boolean
}
export class ResearchesInfo extends React.Component<ResearchesInfoProps, ResearchesInfoState>{
  constructor(props:ResearchesInfoProps) {
    super(props);
    this.state = {researches: [], error: false, edit: false, isLoading: false}
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

  _updateStateForView = (res:Array<{}>, error:boolean, isLoading:boolean) => {
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

type UserBasicInformationProps = {
  userId: number
}
export default class UserBasicInformation extends React.Component<UserBasicInformationProps> {

  static propTypes = {
    userId: PropTypes.string.isRequired,
  }

  render() {
    const {userId} = this.props;
    return (
      <div>
        <CategoryTitle
          // title={__('Basic information')}
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

