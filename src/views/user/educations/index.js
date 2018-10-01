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
import EducationActions from "../../../redux/actions/educationActions"
import ResearchActions from "../../../redux/actions/researchActions"

// flow type of WorkExperiences
type PropsEducations = {
  userId: number,
  translate: { [string]: string },
  actions: {
    createEducationByUserId: Function,
    createResearchByUserId: Function,
  },
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
    const {translate, userId} = this.props
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
            <div className='education-research-create-container'>
              <p className='education-research-create-header'>{translate['Education']}</p>
              <EducationInfoCreateForm hideEdit={this._hideEducationCreateForm} create={this._createEducation}
                                       translate={translate}
                                       userId={userId}/>

            </div>
            }
            {researchCreateForm &&
            <div className='education-research-create-container'>
              <p className='education-research-create-header'>{translate['Research']}</p>
              <ResearchInfoCreateForm hideEdit={this._hideResearchCreateForm} create={this._createResearch}
                                      translate={translate}
                                      userId={userId}/>
            </div>
            }
          </CheckOwner>
          <FrameCard>
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
}

const mapStateToProps = (state, props) => {
  return {
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createEducationByUserId: EducationActions.createEducationByUserId,
    createResearchByUserId: ResearchActions.createResearchByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Educations)