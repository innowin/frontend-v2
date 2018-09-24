// @flow
import * as React from "react"
import PropTypes from 'prop-types'
import {connect} from "react-redux"

import {ItemWrapper} from "../../common/cards/Frames";
import {EducationInfo} from './EducationInfo'
import {makeGetEducations} from "../../../redux/selectors/user/userGetEducationsSelector";
import {bindActionCreators} from "redux";
import EducationActions from "../../../redux/actions/educationActions";
import workExperienceIcon from "../../../images/user/workExperience_svg";
import EducationInfoCreateForm from "./EducationInfoCreateForm";

// flow type of WorkExperiences
type PropsEducations = {
  userId: number,
  translate: { [string]: string },
  educations: [],
  actions: {
    getEducationByUserId: Function,
    updateEducationByUserId: Function,
    deleteEducationByUserId: Function,
    createWorkEducationByUserId: Function,
  },
  isLoading: boolean,
  error: null | {},
}
type StateEducations = {
  createForm: boolean,
}

class EducationInfoContainer extends React.Component<PropsEducations, StateEducations> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    educations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  constructor(props: PropsEducations) {
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
    const {createWorkEducationByUserId} = actions
    createWorkEducationByUserId({userId, formValues})
  }

  componentDidMount() {
    const {userId, actions} = this.props
    const {getEducationByUserId} = actions
    getEducationByUserId({userId})
  }

  render() {
    const {createForm} = this.state
    const {translate, userId, educations, actions} = this.props
    const {updateEducationByUserId, deleteEducationByUserId} = actions
    return (
        // <VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          {createForm &&
            <ItemWrapper icon={workExperienceIcon}>
              <EducationInfoCreateForm hideCreateForm={this._hideCreateForm} create={this._create}
                                       translate={translate}
                                       userId={userId}/>
            </ItemWrapper>
          }
          {
            educations.map((education, index) => (
                <EducationInfo userId={userId}
                               updateEducationByUserId={updateEducationByUserId}
                               deleteEducationByUserId={deleteEducationByUserId}
                               education={education}
                               key={index + "EducationsInfo"}
                               translate={translate}/>
            ))
          }
        </div>
        // </VerifyWrapper>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const getEducations = makeGetEducations(state, ownProps)

  return (state, props) => {
    const {userId} = props
    const stateUser = state.users[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const educationObject = (stateUser && stateUser.educations) || defaultObject

    return {
      educations: getEducations(state, props),
      isLoading: educationObject.isLoading,
      error: educationObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEducationByUserId: EducationActions.getEducationByUserId,
    updateEducationByUserId: EducationActions.updateEducationByUserId,
    deleteEducationByUserId: EducationActions.deleteEducationByUserId,
    createWorkEducationByUserId: EducationActions.createEducationByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EducationInfoContainer)