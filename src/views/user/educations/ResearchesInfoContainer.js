// @flow
import type {userResearchType} from "../../../consts/flowTypes/user/basicInformation"
import {Component} from "react"
import PropTypes from "prop-types"
import * as React from "react"

import ResearchInfo from './ResearchInfo'
import {bindActionCreators} from "redux"
import ResearchActions from "../../../redux/actions/user/researchActions"
import connect from "react-redux/es/connect/connect"
import {makeGetResearches} from "../../../redux/selectors/user/userGetResearchesSelector"

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

class ResearchesInfoContainer extends Component<ResearchesInfoProps> {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    researches: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const {actions, userId} = this.props
    const {getResearchByUserId} = actions
    getResearchByUserId({userId})
  }

  render() {
    const {translate, researches, userId, actions} = this.props
    const {updateResearchByUserId, deleteResearchByUserId} = actions
    return (
        // <VerifyWrapper isLoading={isLoading} error={error}>
        <div>
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
    deleteResearchByUserId: ResearchActions.deleteResearchByUserId,
    updateResearchByUserId: ResearchActions.updateResearchByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ResearchesInfoContainer)