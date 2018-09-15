// @flow
import * as React from "react";
import PropTypes from "prop-types";

import {Field, FieldLabel, FieldValue, ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import educationIcon from "../../../images/user/education_svg";
import type {userEducationType} from "../../../consts/flowTypes/user/basicInformation";

// flow type of EducationInfoView
type PropsEducationInfoView = {
  showEdit: Function,
  education: userEducationType,
  translate: { [string]: string }
}

export class EducationInfoView extends React.Component<PropsEducationInfoView> {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    education: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  render() {
    const {education, showEdit, translate} = this.props
    return (
        <ItemWrapper icon={educationIcon}>
          <ItemHeader title={translate['EducationInfo']} showEdit={showEdit}/>
          <Field>
            <FieldLabel label={translate['University'] + ": "}/>
            <FieldValue value={education.university}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Grade'] + ": "}/>
            <FieldValue value={education.grade}/>
          </Field>
          <Field>
            <FieldLabel label={translate['FromDate'] + ": "}/>
            <FieldValue value={education.from_date}/>
          </Field>
          <Field>
            <FieldLabel label={translate['ToDate'] + ": "}/>
            <FieldValue value={education.to_date}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Average'] + ": "}/>
            <FieldValue value={education.average}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Description'] + ": "}/>
            <FieldValue value={education.description}/>
          </Field>
        </ItemWrapper>
    )
  }
}