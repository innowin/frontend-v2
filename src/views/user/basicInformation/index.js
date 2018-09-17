// @flow
import * as React from "react"
import {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import {FrameCard, CategoryTitle, VerifyWrapper, ListGroup} from "src/views/common/cards/Frames"
import {getMessages} from "src/redux/selectors/translateSelector"
import {getUserResearches} from "src/crud/user/research"
import {ResearchInfoEditForm} from "./Forms"
import {researchIcon} from "src/images/icons"
import {UserInfoItemWrapper, ResearchInfoView} from "./Views"
import {UserInfo} from './UserInfo'
import {ProfileInfo} from './ProfileInfo'
import type {
  userProfileType,
  userResearchType,
  userType
} from "src/consts/flowTypes/user/basicInformation"


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
  user: userType,
}

export class UserBasicInformation extends Component<UserBasicInformationProps> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const {userId, translate, profile, user} = this.props
    return (
      <div>
        <CategoryTitle
          title={translate['Basic information']}
        />
        <FrameCard>
          <ListGroup>
            <UserInfo {...{userId}} translate={translate} user={user.content} isLoading={user.isLoading}/>
            <ProfileInfo {...{userId}} translate={translate} profile={profile.content} isLoading={profile.isLoading}/>
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

