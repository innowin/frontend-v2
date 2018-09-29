import type {skillType} from "../../../consts/flowTypes/user/others";
import {Component} from "react";
import PropTypes from "prop-types";
import SkillInfoEditForm from "./SkillInfoEditForm";
import * as React from "react";
import {ItemHeader, ItemWrapper, VerifyWrapper} from "../../common/cards/Frames";
import {SkillIcon} from "src/images/icons";

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

class SkillInfo extends Component<PropsSkillInfo, StateSkillInfo> {
  static propTypes = {
    skill: PropTypes.object.isRequired,
    updateSkillByUserId: PropTypes.func.isRequired,
    deleteSkillByUserId: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props) {
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
    // TODO: mohammad SkillIcon not shown
    // FixMe: mohammad isLoading and error come from redux
    return (
        <VerifyWrapper isLoading={false} error={false}>
          <ItemWrapper icon={SkillIcon}>
            {edit ?
                <SkillInfoEditForm
                    userId={userId}
                    skill={skill}
                    hideEdit={this._hideEdit}
                    update={updateSkillByUserId}
                    deleteSkillByUserId={this._delete}
                    translate={translate}
                />
                :
                <div className='skill-view-container'>
                  <ItemHeader title={translate['Skills']} showEdit={this._showEdit}/>
                  <h6>{skill.title}</h6>
                  <p className="skillDescription">
                    {skill.description}
                  </p>
                  <div className="skillTags">
                    {skill.tag.map((tag, index) => <span className="badge badge-secondary skillTag m-1">{tag}</span>)}
                  </div>
                </div>
            }
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

export default SkillInfo