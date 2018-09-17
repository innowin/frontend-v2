import * as React from "react";
import PropTypes from "prop-types";
import {Field, FieldLabel, FieldValue, ItemHeader, VerifyWrapper} from "../../common/cards/Frames";
import educationIcon from "../../../images/user/education_svg";
import {ItemWrapper} from "../../common/cards/Frames";
import EducationInfoEditForm from "./EducationInfoEditForm";

//EducationInfo flowTypes
type PropsEducation = {
  updateEducationByUserId: Function,
  deleteEducationByUserId: Function,
  education: educationType,
  userId: number,
  translate: { [string]: string },
}
type StateEducation = {
  edit: boolean,
}

export class EducationInfo extends React.Component<PropsEducation, StateEducation> {
  static propTypes = {
    education: PropTypes.object.isRequired,
    updateEducationByUserId: PropTypes.func.isRequired,
    deleteEducationByUserId: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsEducation) {
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
    const {userId, deleteEducationByUserId, education} = this.props
    const educationId = education.id
    this._hideEdit()
    deleteEducationByUserId({userId, educationId})
  }

  // FixMe: mohammad isLoading and error come from redux
  render() {
    const {translate, updateEducationByUserId, userId, education} = this.props
    const {edit, isLoading, error} = this.state
    return (
        <VerifyWrapper isLoading={false} error={false}>
          <ItemWrapper icon={educationIcon}>
            {edit ? (
                <EducationInfoEditForm
                    userId={userId}
                    education={education}
                    hideEdit={this._hideEdit}
                    update={updateEducationByUserId}
                    deleteEducationByUserId={this._delete}
                    translate={translate}
                />
            ) : (
                education &&
                <div>
                  <ItemHeader title={translate['EducationInfo']} showEdit={this._showEdit}/>
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
                </div>
            )}
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}