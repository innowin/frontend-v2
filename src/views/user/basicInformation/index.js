// @flow
import * as React from "react"
import {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import {FrameCard, CategoryTitle, VerifyWrapper, ListGroup} from "src/views/common/cards/Frames"
import {getMessages} from "src/redux/selectors/translateSelector"
import {getUserEducations} from "src/crud/user/education"
import {getUserResearches} from "src/crud/user/research"
import {ResearchInfoEditForm, EducationInfoEditForm} from "./Forms"
import {researchIcon, educationIcon} from "src/images/icons"
import {UserInfoItemWrapper, ResearchInfoView, EducationInfoView} from "./Views"
import {UserInfo} from './UserInfo'
import {ProfileInfo} from './ProfileInfo'
import type {
  userProfileType,
  userEducationType,
  userResearchType
} from "src/consts/flowTypes/user/basicInformation"


//EducationInfo flowTypes

type EducationInfoProps = {
  education: userEducationType,
  translate: {}
}
type EducationInfoState = {
  education: userEducationType,
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class EducationInfo extends Component<EducationInfoProps, EducationInfoState> {
  constructor(props: EducationInfoProps) {
    super(props)
    this.state = {education: {}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    education: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  _updateStateForView = (res: userEducationType, error: boolean, isLoading: boolean) => {
    this.setState({...this.state, education: res, error: error, isLoading: isLoading})
  }

  componentDidMount() {
    this.setState({...this.state, education: this.props.education})
  }

  render() {
    const {translate} = this.props
    const {education, edit, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper icon={educationIcon}>
              <EducationInfoEditForm
                education={education}
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
                translate={translate}
              />
            </UserInfoItemWrapper>
          ) : (
            <EducationInfoView education={education} showEdit={this._showEdit} translate={translate}/>
          )
        }
      </VerifyWrapper>
    )
  }
}


//EducationsInfo flowTypes
type EducationsInfoProps = {
  userId: number,
  translate: {}
}
type EducationsInfoState = {
  educations: (userEducationType)[],
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class EducationsInfo extends Component<EducationsInfoProps, EducationsInfoState> {
  constructor(props: EducationsInfoProps) {
    super(props)
    this.state = {educations: [], error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  componentDidMount() {
    const {userId} = this.props
    this.setState({...this.state, isLoading: true}, () => {
      getUserEducations(userId, (res: (userEducationType)[]) => {
        this.setState({...this.state, educations: res, isLoading: false})
      })
    })
  }

  render() {
    const {translate} = this.props
    const {educations} = this.state
    const Educations = educations.map((education, index) => {
      return <EducationInfo education={education} key={index + "EducationsInfo"} translate={translate}/>
    })
    return (
      <div>
        {Educations}
      </div>
    )
  }
}


//ResearchInfo flowTypes
type ResearchInfoProps = {
  research: userResearchType,
  translate: {}
}
type ResearchInfoState = {
  research: userResearchType,
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class ResearchInfo extends Component<ResearchInfoProps, ResearchInfoState> {
  constructor(props: ResearchInfoProps) {
    super(props)
    this.state = {research: {}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    research: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  _updateStateForView = (res: userResearchType, error: boolean, isLoading: boolean) => {
    this.setState({...this.state, research: res, error: error, isLoading: isLoading})
  }

  componentDidMount() {
    this.setState({...this.state, research: this.props.research})
  }


  render() {
    const {translate} = this.props
    const {research, edit, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper icon={researchIcon}>
              <ResearchInfoEditForm
                research={research}
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
                translate={translate}
              />
            </UserInfoItemWrapper>
          ) : (
            <ResearchInfoView research={research} showEdit={this._showEdit} translate={translate}/>
          )
        }
      </VerifyWrapper>
    )

  }
}


//ResearchesInfo flowTypes
type ResearchesInfoProps = {
  userId: number,
  translate: {}
}
type ResearchesInfoState = {
  researches: (userResearchType)[],
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class ResearchesInfo extends Component<ResearchesInfoProps, ResearchesInfoState> {
  constructor(props: ResearchesInfoProps) {
    super(props)
    this.state = {researches: [], error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  componentDidMount() {
    const {userId} = this.props
    this.setState({...this.state, isLoading: true}, () => {
      getUserResearches(userId, (res: (userResearchType)[]) => {
        this.setState({...this.state, researches: res, isLoading: false})
      })
    })
  }

  render() {
    const {translate} = this.props
    const {researches} = this.state
    const Researches = researches.map((research, index) => {
      return <ResearchInfo research={research} key={index + "ResearchesInfo"} translate={translate}/>
    })
    return (
      <div>
        {Researches}
      </div>
    )
  }
}


//UserBasicInformation flowTypes
type UserBasicInformationProps = {
  userId: number,
  translate: { [string]: string },
  profile: userProfileType,
}

export class UserBasicInformation extends Component<UserBasicInformationProps> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  }

  render() {
    const {userId, translate, profile} = this.props
    return (
      <div>
        <CategoryTitle
          title={translate['Basic information']}
        />
        <FrameCard>
          <ListGroup>
            <UserInfo {...{userId}} translate={translate}/>
            <ProfileInfo {...{userId}} translate={translate} profile={profile}/>
            <EducationsInfo {...{userId}} translate={translate}/>
            <ResearchesInfo {...{userId}} translate={translate}/>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

const mapStateToProps = state => ({translate: getMessages(state)})
export default connect(
  mapStateToProps
)(UserBasicInformation)

