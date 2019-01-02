// @flow
import * as React from "react"
import PropTypes from 'prop-types'
import {connect} from "react-redux"

import {EducationInfo} from './EducationInfo'
import {makeGetEducations} from "../../../redux/selectors/user/userGetEducationsSelector"
import {bindActionCreators} from "redux";
import EducationActions from "../../../redux/actions/user/educationActions"

// flow type of WorkExperiences
type PropsEducations = {
  userId: number,
  translate: { [string]: string },
  educations: [],
  actions: {
    getEducationByUserId: Function,
    updateEducationByUserId: Function,
    deleteEducationByUserId: Function,
  },
  isLoading: boolean,
  error: null | {},
}

class EducationInfoContainer extends React.Component<PropsEducations> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    educations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  componentDidMount() {
    const {userId, actions} = this.props
    const {getEducationByUserId} = actions
    getEducationByUserId({userId})
  }

  render() {
    const {translate, userId, educations, actions} = this.props
    const {updateEducationByUserId, deleteEducationByUserId} = actions
    return (
        // <VerifyWrapper isLoading={isLoading} error={error}>
        <div>{
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
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EducationInfoContainer)