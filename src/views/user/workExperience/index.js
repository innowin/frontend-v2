// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from 'prop-types'
import {bindActionCreators} from "redux"
import {WorkExperienceCreateForm} from "./forms"
import {WorkExperienceEditForm} from './forms'
import {WorkExperienceItemWrapper, WorkExperienceView} from "./views"
import {connect} from "react-redux"
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {
  getWorkExperiences,
  createWorkExperience,
  deleteWorkExperience,
  updateWorkExperience
} from 'src/crud/user/workExperience'
import {getMessages} from "../../../redux/selectors/translateSelector"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {routerActions,} from "react-router-redux"
import {TOKEN} from "src/consts/data"
import type {workExperienceType} from "src/consts/flowTypes/user/others"
import type {userType, userProfileType} from "src/consts/flowTypes/user/basicInformation"


// flow type of WorkExperience
type PropsWorkExperience = {
  updateWorkExperiences: Function,
  workExperience: workExperienceType,
  workExperiences: (workExperienceType)[],
  user: userType,
  profile: userProfileType,
  translate: { [string]: string },
}
type StateWorkExperience = {
  edit: boolean,
  error: boolean | string,
  isLoading: boolean,
  workExperience: ?workExperienceType
}

class WorkExperience extends Component<PropsWorkExperience, StateWorkExperience> {

  static propTypes = {
    workExperiences: PropTypes.array.isRequired,
    workExperience: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    updateWorkExperiences: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  constructor(props: PropsWorkExperience) {
    super(props)
    this.state = {edit: false, error: false, isLoading: false, workExperience: null}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _handleErrorLoading = (error: boolean | string = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _updateView = (res: workExperienceType) => {
    this.setState({...this.state, workExperience: res})
  }

  _update = (formValues: {}, workExperienceId: number) => {
    this.setState({...this.state, isLoading: true})
    updateWorkExperience(formValues, workExperienceId, this._updateView, this._hideEdit, this._handleErrorLoading)
  }

  _delete = () => {
    this.setState({...this.state, isLoading: true})
    deleteWorkExperience(this.props.workExperiences, this.props.workExperience, this.props.updateWorkExperiences, this._hideEdit, this._handleErrorLoading)
  }

  componentDidMount() {
    const {workExperience} = this.props
    this.setState({...this.state, workExperience: workExperience})
  }

  render() {
    const {workExperience, isLoading, error, edit} = this.state
    const {user, profile, translate} = this.props
    if (edit) {
      return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <WorkExperienceItemWrapper>
            <WorkExperienceEditForm
              workExperience={workExperience}
              hideEdit={this._hideEdit}
              delete={this._delete}
              update={this._update}
              translate={translate}
            />
          </WorkExperienceItemWrapper>
        </VerifyWrapper>
      )
    }
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <WorkExperienceView workExperience={workExperience} user={user} profile={profile} showEdit={this._showEdit}
                            translate={translate}/>
      </VerifyWrapper>
    )
  }
}


// flow type of WorkExperiences
type PropsWorkExperiences = {
  userId: number,
  translate: { [string]: string },
}
type StateWorkExperiences = {
  createForm: boolean,
  edit: boolean,
  error: boolean | string,
  isLoading: boolean,
  workExperiences: (workExperienceType)[],
  user: userType,
  profile: userProfileType,
  resetState: boolean
}

class WorkExperiences extends Component<PropsWorkExperiences, StateWorkExperiences> {

  constructor(props) {
    super(props)
    this.state = {
      createForm: false,
      edit: false, isLoading: false, error: false, workExperiences: [], user: {}, profile: {}, resetState: false
    }
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired
  }

  _delete = (workExperienceId: number, updateStateForView: Function, hideEdit: Function) => {
    deleteWorkExperience(workExperienceId, updateStateForView, hideEdit)
  }

  _showCreateForm = () => {
    this.setState({createForm: true})
  }

  _hideCreateForm = () => {
    this.setState({createForm: false})
  }

  _handleErrorLoading = (error: boolean | string = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _updateWorkExperiences = (res: (workExperienceType)[] | workExperienceType, type: string, deletedIndex: number | null = null) => {
    const {workExperiences} = this.state
    if (type === 'get') {
      this.setState({...this.state, workExperiences: [...workExperiences, ...res]})
      return false
    }
    if (type === 'post') {
      this.setState({...this.state, workExperiences: [res, ...workExperiences]})
      return false
    }
    if (type === 'delete' && deletedIndex) {
      const remainWorkExperiences = workExperiences.slice(0, deletedIndex).concat(workExperiences.slice(deletedIndex + 1))
      this.setState({...this.state, workExperiences: remainWorkExperiences})
    }
  }

  _getWorkExperiences = () => {
    const {userId} = this.props
    this.setState({...this.state, isLoading: true})
    getWorkExperiences(userId, this._updateWorkExperiences, this._handleErrorLoading)
  }

  _create = (formValues:{}) => {
    this.setState({...this.state, isLoading: true})
    createWorkExperience(formValues, this._updateWorkExperiences, this._handleErrorLoading, this._hideCreateForm)
  }

  componentDidMount() {
    const {userId} = this.props
    const emitting = () => {
      const newState = {...this.state, isLoading: true}
      this.setState(newState)
      this._getWorkExperiences()
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `user-WorkExperiences-get/${userId}`,
          token: TOKEN
        }
      )
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/profiles/?profile_user=${userId}`,
          result: `profileUser-WorkExperiences-get/${userId}`,
          token: TOKEN
        }
      )
    }

    emitting()

    socket.on(`user-WorkExperiences-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false}
        this.setState(newState)
      } else {
        const newState = {...this.state, user: res, isLoading: false}
        this.setState(newState)
      }
    })

  }

  render() {
    const {createForm, user, profile, isLoading, error} = this.state
    const {translate} = this.props
    const workExperiences = [...new Set(this.state.workExperiences)]
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={translate['WorkExperience']}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard>
          <ListGroup>
            {
              createForm &&
              <WorkExperienceItemWrapper>
                <WorkExperienceCreateForm hideCreateForm={this._hideCreateForm} create={this._create}
                                          translate={translate}/>
              </WorkExperienceItemWrapper>
            }
            {
              workExperiences.map((workExperience) => (
                <WorkExperience
                  workExperiences={workExperiences}
                  workExperience={workExperience}
                  user={user}
                  profile={profile}
                  updateWorkExperiences={this._updateWorkExperiences}
                  translate={translate}
                  key={workExperience.id}
                />
              ))
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = state => (
  {
    translate: getMessages(state)
  }
)
// const mapDispatchToProps = dispatch => (
//   bindActionCreators({actions: bindActionCreators({push: routerActions.push}, dispatch)})
// )

export default connect(mapStateToProps)(WorkExperiences)