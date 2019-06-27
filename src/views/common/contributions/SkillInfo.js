// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'

import SkillInfoForm from "./SkillInfoForm"
import SkillInfoView from "./SkillInfoView"
import type {skillType} from "../../../consts/flowTypes/user/others"
import {VerifyWrapper} from "../cards/Frames"

type PropsSkillInfo = {
  updateSkillByUserId: Function,
  deleteSkillByUserId: Function,
  skill: skillType,
  userId: number,
  translate: { [string]: string },
}
type StateSkillInfo = {
  edit: boolean,
}

class SkillInfo extends React.Component<PropsSkillInfo, StateSkillInfo> {
  static propTypes = {
    skill: PropTypes.object.isRequired,
    updateSkillByUserId: PropTypes.func.isRequired,
    deleteSkillByUserId: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsSkillInfo) {
    super(props)
    this.state = {edit: false}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _delete = () => {
    const {userId, deleteSkillByUserId, skill} = this.props
    const skillId = skill.id
    this._hideEdit()
    deleteSkillByUserId({userId, skillId})
  }

  render() {
    const {translate, updateSkillByUserId, userId, skill} = this.props
    const {edit} = this.state
    // FixMe: mohammad isLoading and error come from redux
    return (
        <VerifyWrapper isLoading={false} error={false}>
          {edit ?
              <SkillInfoForm
                  userId={userId}
                  skill={skill}
                  hideEdit={this._hideEdit}
                  update={updateSkillByUserId}
                  deleteSkillByUserId={this._delete}
                  translate={translate}
              />
              : <SkillInfoView skill={skill} userId={userId} showEdit={this._showEdit}/>
          }
        </VerifyWrapper>
    )
  }
}

export default SkillInfo