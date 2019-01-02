// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import NewSkillIcon from "../../../images/user/new_skill_svg"
import SkillActions from "../../../redux/actions/user/skillActions"
import SkillInfo from './SkillInfo'
import type {skillType} from "../../../consts/flowTypes/user/others"
import {ItemHeader, ItemWrapper} from "../cards/Frames"
import {makeGetSkills} from "../../../redux/selectors/user/userGetSkillSelector"

type PropsSkills = {
  userId: number,
  translate: { [string]: string },
  skills: (skillType)[],
  actions: {
    getSkillByUserId: Function,
    updateSkillByUserId: Function,
    deleteSkillByUserId: Function,
  },
  isLoading: boolean,
  error: {} | string | null,
}

class SkillInfoContainer extends React.Component<PropsSkills> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    skills: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  componentDidMount() {
    const {userId, actions} = this.props
    const {getSkillByUserId} = actions
    getSkillByUserId({userId})
  }

  render() {
    const {translate, skills, userId, actions} = this.props
    const {updateSkillByUserId, deleteSkillByUserId} = actions
    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <ItemWrapper icon={<NewSkillIcon/>}>
          <ItemHeader title={translate['Skills']}/>
          {
            skills.map((skill, index) => (
                <SkillInfo
                    userId={userId}
                    updateSkillByUserId={updateSkillByUserId}
                    deleteSkillByUserId={deleteSkillByUserId}
                    skill={skill}
                    key={index + "SkillInfo"}
                    translate={translate}
                />
            ))
          }
        </ItemWrapper>
        //</VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const getSkills = makeGetSkills(state, ownProps)

  return (state, props) => {
    const {userId} = props
    const stateUser = state.users[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const skillObject = (stateUser && stateUser.skills) || defaultObject

    return {
      skills: getSkills(state, props),
      isLoading: skillObject.isLoading,
      error: skillObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getSkillByUserId: SkillActions.getSkillByUserId,
    updateSkillByUserId: SkillActions.updateSkillByUserId,
    deleteSkillByUserId: SkillActions.deleteSkillByUserId,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(SkillInfoContainer)