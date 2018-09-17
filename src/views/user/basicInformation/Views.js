// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {list_of_badge} from "../../common/Functions"
import {researchIcon} from "src/images/icons"
import {
  Field,
  FieldLabel,
  FieldValue,
  ItemHeader,
  ItemWrapper,
} from "../../common/cards/Frames"
import type {
  userResearchType
} from "src/consts/flowTypes/user/basicInformation"

type PropsUserInfoItemWrapper = {
  icon: React.Element<any>,
  children?: React.Node
}
export const UserInfoItemWrapper = (props: PropsUserInfoItemWrapper) => {
  return (
    <ItemWrapper icon={props.icon}>{props.children}</ItemWrapper>
  )
}
UserInfoItemWrapper.propTypes = {
  icon: PropTypes.element.isRequired
}

type listOfBadge = (?React.Element<'span'>)[]


// flow type of ResearchInfoView
type PropsResearchInfoView = {
  showEdit: Function,
  research: userResearchType,
  translate: { [string]: string }
}

export class ResearchInfoView extends Component<PropsResearchInfoView> {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    research: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  render() {
    const {research, showEdit, translate} = this.props
    const listAuthor: listOfBadge = list_of_badge(research.author)
    return (
      <UserInfoItemWrapper icon={researchIcon}>
        <ItemHeader title={translate['ResearchInfo']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Title'] + ": "}/>
          <FieldValue value={research.title}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Author'] + ": "}/>
          <FieldValue value={<span className="dir-rtl">{listAuthor}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Publication'] + ": "}/>
          <FieldValue value={research.publication}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Year'] + ": "}/>
          <FieldValue value={research.year}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Page Count'] + ": "}/>
          <FieldValue value={research.page_count}/>
        </Field>
      </UserInfoItemWrapper>
    )
  }
}