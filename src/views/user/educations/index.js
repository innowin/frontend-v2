// @flow
import * as React from "react"
import {connect} from "react-redux"
import PropTypes from 'prop-types'

import {getMessages} from "../../../redux/selectors/translateSelector"
import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames"

import EducationInfoContainer from './EducationInfoContainer'
import ResearchesInfoContainer from "./ResearchesInfoContainer"
import CheckOwner from "../../common/CheckOwner"
import EducationInfoCreateForm from "./EducationInfoCreateForm"
import ResearchInfoCreateForm from "./ResearchInfoCreateForm"
import {bindActionCreators} from "redux"
import EducationActions from "../../../redux/actions/user/educationActions"
import ResearchActions from "../../../redux/actions/user/researchActions"
import {makeGetEducations} from "../../../redux/selectors/user/userGetEducationsSelector";
import {makeGetResearches} from "../../../redux/selectors/user/userGetResearchesSelector";
import type {userEducationType, userResearchType} from "../../../consts/flowTypes/user/basicInformation";

// flow type of WorkExperiences
type PropsEducations = {
  userId: number,
  translate: { [string]: string },
  actions: {
    createEducationByUserId: Function,
    createResearchByUserId: Function,
  },
  educations: userEducationType,
  researches: userResearchType,
}
type StatesEducations = {
  educationCreateForm: boolean,
  researchCreateForm: boolean,
}

class Educations extends React.Component<PropsEducations, StatesEducations> {

  constructor(props: PropsEducations) {
    super(props)

    this.state = {
      educationCreateForm: false,
      researchCreateForm: false,
    }
  }

  _showEducationCreateForm = () => {
    this.setState({educationCreateForm: true})
  }

  _hideEducationCreateForm = () => {
    this.setState({educationCreateForm: false})
  }

  _showResearchCreateForm = () => {
    this.setState({researchCreateForm: true})
  }

  _hideResearchCreateForm = () => {
    this.setState({researchCreateForm: false})
  }

  _createEducation = ({formValues}) => {
    const {actions, userId} = this.props
    const {createEducationByUserId} = actions
    createEducationByUserId({userId, formValues})
  }
  _createResearch = ({formValues}) => {
    const {actions, userId} = this.props
    const {createResearchByUserId} = actions
    createResearchByUserId({userId, formValues})
  }

  render() {
    const {translate, userId, educations, researches} = this.props
    const {educationCreateForm, researchCreateForm} = this.state
    return (
        <div>
          <CategoryTitle
              title={translate['Educations']}
          />
          <CheckOwner id={userId}>
            {!(educationCreateForm || researchCreateForm) &&
            <div className='education-add-container'>
              <button className='education-add-button pulse'
                      onClick={this._showEducationCreateForm}>{`${translate['Add']} ${translate['Education']}`}</button>
              <button className='education-add-button pulse'
                      onClick={this._showResearchCreateForm}>{`${translate['Add']} ${translate['Research']}`}</button>
            </div>
            }
            {educationCreateForm &&
            <FrameCard className='education-tab'>
              <ListGroup>
                <div className='education-research-create-container'>
                  <p className='education-research-create-header'>{translate['Education']}</p>
                  <EducationInfoCreateForm hideEdit={this._hideEducationCreateForm} create={this._createEducation}
                                           translate={translate}
                                           userId={userId}/>

                </div>
              </ListGroup>
            </FrameCard>
            }
            {researchCreateForm &&
            <FrameCard className='education-tab'>
              <ListGroup>
                <div className='education-research-create-container'>
                  <p className='education-research-create-header'>{translate['Research']}</p>
                  <ResearchInfoCreateForm hideEdit={this._hideResearchCreateForm} create={this._createResearch}
                                          translate={translate}
                                          userId={userId}/>
                </div>
              </ListGroup>
            </FrameCard>
            }
          </CheckOwner>
          <FrameCard className={educations.length === 0 && researches.length === 0 ? 'education-tab-frame' : ''}>
            <ListGroup>
              <EducationInfoContainer userId={userId} translate={translate}/>
              <ResearchesInfoContainer userId={userId} translate={translate}/>
            </ListGroup>
          </FrameCard>
        </div>
    )
  }
}

Educations.propTypes = {
  userId: PropTypes.number.isRequired,
  translate: PropTypes.object.isRequired,
  educations: PropTypes.array.isRequired,
  researches: PropTypes.array.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const getEducations = makeGetEducations(state, ownProps)
  const getResearches = makeGetResearches(state, ownProps)

  return (state, props) => {
    return {
      translate: getMessages(state),
      educations: getEducations(state, props),
      researches: getResearches(state, props),
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createEducationByUserId: EducationActions.createEducationByUserId,
    createResearchByUserId: ResearchActions.createResearchByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Educations)