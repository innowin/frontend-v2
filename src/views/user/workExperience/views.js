// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {workExperienceIcon} from "src/images/icons"
import {workExperienceType} from "../../../consts/flowTypes/user/workExperience"
import {
  ItemHeader,
  ItemWrapper,
  Field,
  FieldLabel,
  FieldValue
} from "../../common/cards/Frames"

type PropsWorkExperienceItemWrapper = {
  children?: React.Node
}
export const WorkExperienceItemWrapper = (props: PropsWorkExperienceItemWrapper) => {
  return <ItemWrapper icon={workExperienceIcon}>{props.children}</ItemWrapper>
}


// flow type of WorkExperienceView
type PropsWorkExperienceView = {
  showEdit: Function,
  workExperience: workExperienceType,
  translate: { [string]: string }
}

export class WorkExperienceView extends Component<PropsWorkExperienceView> {

  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    workExperience: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  render() {
    const {translate, workExperience, showEdit} = this.props
    return (
      <WorkExperienceItemWrapper>
        <ItemHeader title={workExperience.name} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Position'] + ": "}/>
          <FieldValue value={workExperience.position}/>
        </Field>
        <Field>
          <FieldLabel label={translate['From date'] + ": "}/>
          <FieldValue value={workExperience.from_date}/>
        </Field>
        <Field>
          <FieldLabel label={translate['To date'] + ": "}/>
          <FieldValue value={workExperience.to_date}/>
        </Field>
      </WorkExperienceItemWrapper>
    )
  }
}

