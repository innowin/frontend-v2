// @flow
import * as React from "react"
import PropTypes from 'prop-types'
import {connect} from "react-redux"

import {getMessages} from "../../../redux/selectors/translateSelector"
import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames";
import {EducationInfo} from './EducationInfo'
import {getUserEducations} from "../../../crud/user/education";
import type {userEducationType} from "../../../consts/flowTypes/user/basicInformation";
import {makeGetEducations} from "../../../redux/selectors/user/userGetEducationsSelector";
import {bindActionCreators} from "redux";
import EducationActions from "../../../redux/actions/educationActions";

// flow type of WorkExperiences
type PropsEducations = {
  userId: number,
  translate: { [string]: string },
  educations: [],
  actions:{
    getEducationByUserId: Function,
  }
}
type StateEducations = {
  educations: [],
}

class Educations extends React.Component<PropsEducations, StateEducations> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    educations: PropTypes.array.isRequired,
  }

  constructor(props: PropsEducations) {
    super(props)
    this.state = {
      createForm: false,
      edit: false, resetState: false,
      educations: [],
    }
  }

  componentDidMount() {
    const {userId, actions} = this.props
    const {getEducationByUserId} = actions
    getUserEducations(userId, (res: (userEducationType)[]) => {
      this.setState({...this.state, educations: res})
    })
    getEducationByUserId({userId})
  }

  render() {
    const {translate, userId} = this.props
    const {educations} = this.state

    return (
        // <VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          <CategoryTitle title={translate['Educations']}/>
          <FrameCard>
            <ListGroup>
              <div>
                {
                  educations.map((education, index) =>
                    <EducationInfo education={education} key={index + "EducationsInfo"} translate={translate}/>
                  )
                }
              </div>
            </ListGroup>
          </FrameCard>
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
      translate: getMessages(state),
      educations: getEducations(state, props),
      isLoading: educationObject.isLoading,
      error: educationObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEducationByUserId: EducationActions.getEducationByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Educations)