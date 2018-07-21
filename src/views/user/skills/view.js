// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import "moment/locale/fa"
import {EditIcon} from "src/images/icons"
import {VerifyWrapper} from "src/views/common/cards/Frames"
import type {skillType} from "src/consts/flowTypes/user/others"

type PropsSkillItemWrapper = {
  showEdit: Function,
  children?: React.Node
}
export const SkillItemWrapper = (props: PropsSkillItemWrapper) => {
  const {showEdit, children} = props
  return (
    <div className="-itemWrapperSkill">
      <div className="-itemEditBtn" onClick={showEdit}><EditIcon/></div>
      {children}
    </div>
  )
}


const SkillBody = (props: { description: string }) => {
  const {description} = props
  return (
    <p className="skillDescription">
      {description}
    </p>
  )
}
SkillBody.propTypes = {
  description: PropTypes.string.isRequired
}

const SkillFooter = (props: { tags: (string)[] }) => {
  const {tags} = props
  return (
    <div className="skillTags">
      {tags}
    </div>
  )
}

type PropsSkillView = {
  showEdit: Function,
  skill: skillType,
}
type StateSkillView = {
  viewerCount: number,
  isLoading: boolean,
  error: boolean | string
}

export class SkillView extends Component<PropsSkillView, StateSkillView> {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    skill: PropTypes.object.isRequired,
  }

  constructor(props: PropsSkillView) {
    super(props)
    this.state = {viewerCount: 0, isLoading: false, error: false}
  }

  render() {
    const {showEdit, skill} = this.props
    const {isLoading, error, viewerCount} = this.state
    const tags = skill.tag.map((tag, index) => {
      return (<span className="badge badge-secondary skillTag m-1">{tag}</span>)
    })
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <SkillItemWrapper showEdit={showEdit}>
          <h6>{skill.title}</h6>
          <SkillBody description={skill.description}/>
          <SkillFooter skillId={skill.id} tags={tags}/>
        </SkillItemWrapper>
      </VerifyWrapper>
    )
  }
}
