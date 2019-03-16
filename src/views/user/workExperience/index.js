// @flow
import * as React from "react"
import PropTypes from 'prop-types'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import type {workExperienceType} from "src/consts/flowTypes/user/others"
import WorkExperience from './WorkExperience'
import WorkExperienceActions from "../../../redux/actions/user/workExperienceActions";
import WorkExperienceCreateForm from "./WorkExperienceCreateForm"
import workExperienceIcon from "../../../images/user/workExperience_svg";
import {FrameCard, CategoryTitle, ListGroup, ItemWrapper} from "src/views/common/cards/Frames"
import {getMessages} from "../../../redux/selectors/translateSelector"
import {makeGetWorkExperiences} from "../../../redux/selectors/user/userGetWorkExperiencesSelector"

// flow type of WorkExperiences
type PropsWorkExperiences = {
  userId: number,
  translate: { [string]: string },
  actions: {
    getWorkExperienceByUserId: Function,
    updateWorkExperienceByUserId: Function,
    createWorkExperienceByUserId: Function,
    deleteWorkExperienceByUserId: Function,
  },
  workExperiences: (workExperienceType)[],
  isLoading: boolean,
  error: null | {},
}
type StateWorkExperiences = {
  createForm: boolean,
}

class WorkExperiences extends React.Component<PropsWorkExperiences, StateWorkExperiences> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    workExperiences: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      createForm: false,
    }
  }

  _showCreateForm = () => {
    this.setState({createForm: true})
  }

  _hideCreateForm = () => {
    this.setState({createForm: false})
  }

  _create = ({formValues}) => {
    const {actions, userId} = this.props
    const {createWorkExperienceByUserId} = actions
    //FixMe: mohammad organizationId need to change when organ select done
    createWorkExperienceByUserId({userId, organizationId: formValues.work_experience_organization, formValues})
  }

  componentDidMount() {
    const {userId} = this.props
    const {actions} = this.props
    const {getWorkExperienceByUserId} = actions
    getWorkExperienceByUserId({userId})
  }

  render() {
    const {createForm} = this.state
    const {translate, workExperiences, userId, actions} = this.props
    const {updateWorkExperienceByUserId, deleteWorkExperienceByUserId} = actions
    return (
        // <VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          <CategoryTitle
              title={translate['WorkExperience']}
              showCreateForm={this._showCreateForm}
              createForm={createForm}
          />
          {
            createForm &&
            <FrameCard>
              <ListGroup>
                <ItemWrapper icon={workExperienceIcon}>
                  <WorkExperienceCreateForm hideCreateForm={this._hideCreateForm} create={this._create}
                                            translate={translate}
                                            userId={userId}/>
                </ItemWrapper>
              </ListGroup>
            </FrameCard>
          }
          {
            workExperiences.length > 0 &&
            <FrameCard>
              <ListGroup>
                {
                  workExperiences.map((workExperience) => (
                      <WorkExperience
                          workExperience={workExperience}
                          updateWorkExperienceByUserId={updateWorkExperienceByUserId}
                          deleteWorkExperienceByUserId={deleteWorkExperienceByUserId}
                          translate={translate}
                          key={workExperience.id}
                          userId={userId}
                      />
                  ))
                }
              </ListGroup>
            </FrameCard>

          }
        </div>
        // </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const getWorkExperiencesSelector = makeGetWorkExperiences(state, ownProps)

  return (state, props) => {
    const {userId} = props
    const stateUser = state.identities.list[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const workExperienceObject = (stateUser && stateUser.workExperiences) || defaultObject

    return {
      translate: getMessages(state),
      workExperiences: getWorkExperiencesSelector(state, props),
      isLoading: workExperienceObject.isLoading,
      error: workExperienceObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getWorkExperienceByUserId: WorkExperienceActions.getWorkExperienceByUserId,
    updateWorkExperienceByUserId: WorkExperienceActions.updateWorkExperienceByUserId,
    createWorkExperienceByUserId: WorkExperienceActions.createWorkExperienceByUserId,
    deleteWorkExperienceByUserId: WorkExperienceActions.deleteWorkExperienceByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperiences)