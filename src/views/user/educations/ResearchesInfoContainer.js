import type {userResearchType} from "../../../consts/flowTypes/user/basicInformation";
import {Component} from "react";
import PropTypes from "prop-types";
import * as React from "react";

import ResearchInfo from './ResearchInfo'
import {bindActionCreators} from "redux";
import ResearchActions from "../../../redux/actions/researchActions";
import connect from "react-redux/es/connect/connect";
import {makeGetResearches} from "../../../redux/selectors/user/userGetResearchesSelector";
import {ItemWrapper} from "../../common/cards/Frames";
import workExperienceIcon from "../../../images/user/workExperience_svg";
import ResearchInfoCreateForm from "./ResearchInfoCreateForm";

//ResearchesInfo flowTypes
type ResearchesInfoProps = {
  userId: number,
  translate: {},
  researches: (userResearchType)[],
  actions: {
    deleteResearchByUserId: Function,
    getResearchByUserId: Function,
    createResearchByUserId: Function,
    updateResearchByUserId: Function,
  }
}
type ResearchesInfoState = {
  createForm: boolean,
}

class ResearchesInfoContainer extends Component<ResearchesInfoProps, ResearchesInfoState> {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    researches: PropTypes.array.isRequired,
    actions: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }

  constructor(props: ResearchesInfoProps) {
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
    const {createResearchByUserId} = actions
    createResearchByUserId({userId, formValues})
  }

  componentDidMount() {
    const {actions, userId} = this.props
    const {getResearchByUserId} = actions
    getResearchByUserId({userId})
  }

  render() {
    const {createForm} = this.state
    const {translate, researches, userId, actions} = this.props
    const {updateResearchByUserId, deleteResearchByUserId} = actions
    return (
        // <VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          {createForm &&
          <ItemWrapper icon={workExperienceIcon}>
            <ResearchInfoCreateForm hideCreateForm={this._hideCreateForm} create={this._create}
                                     translate={translate}
                                     userId={userId}/>
          </ItemWrapper>
          }
          {
            researches.map((research, index) => (
                <ResearchInfo research={research} key={index + "ResearchesInfo"} translate={translate}
                              updateResearchByUserId={updateResearchByUserId}
                              deleteResearchByUserId={deleteResearchByUserId}
                              userId={userId}/>
            ))
          }
        </div>
        // </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const getResearches = makeGetResearches(state, ownProps)

  return (state, props) => {
    const {userId} = props
    const stateUser = state.users[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const researchObject = (stateUser && stateUser.researches) || defaultObject

    return {
      researches: getResearches(state, props),
      isLoading: researchObject.isLoading,
      error: researchObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getResearchByUserId: ResearchActions.getResearchByUserId,
    createResearchByUserId: ResearchActions.createResearchByUserId,
    deleteResearchByUserId: ResearchActions.deleteResearchByUserId,
    updateResearchByUserId: ResearchActions.updateResearchByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ResearchesInfoContainer)