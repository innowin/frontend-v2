// flow type of EducationInfoForm
import type {userEducationType} from "../../../consts/flowTypes/user/basicInformation";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";
import {TextInput} from "../../common/inputs/TextInput";
import {DateInput} from "../../common/inputs/DateInput";
import {updateEducation} from "../../../crud/user/education";

type PropsEducationInfoForm = {
  onSubmit: Function,
  education: ?userEducationType,
  children?: React.Node,
  translate: { [string]: string }
}

export class EducationInfoForm extends Component<PropsEducationInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    education: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  universityInput: React.ElementRef<typeof TextInput>
  gradeInput: React.ElementRef<typeof TextInput>
  fieldInput: React.ElementRef<typeof TextInput>
  fromDateInput: React.ElementRef<typeof DateInput>
  toDateInput: React.ElementRef<typeof DateInput>

  _getValues = (): {} => {
    return {
      university: this.universityInput.getValue(),
      grade: this.gradeInput.getValue(),
      field_of_study: this.fieldInput.getValue(),
      from_date: this.fromDateInput.getValue(),
      to_date: this.toDateInput.getValue()
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates: (string | boolean)[] = [
      this.universityInput.validate(),
      this.gradeInput.validate(),
      this.fieldInput.validate(),
      this.fromDateInput.validate(),
      this.toDateInput.validate(),
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  _save = (updateStateForView: Function, hideEdit: Function) => {
    const educationId:number = this.props.education.id
    if (this.form) {
      const formValues:{} = this.form._getValues()
      updateEducation(educationId, formValues, hideEdit, (res) => {updateStateForView(res, educationId, false, false)})
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>): boolean | void => {
    e.preventDefault()
    const {updateStateForView, hideEdit} = this.props
    if (this.form && this.form._formValidate()) {
      this._save(updateStateForView, hideEdit)
    }
    return false
  }

  render() {
    const {translate} = this.props
    const education = this.props.education || {}
    return (
        <form onSubmit={this.props.onSubmit}>
          <div className="row">
            <TextInput
                name="university"
                label={translate['University'] + ": "}
                value={education.university}
                ref={universityInput => {
                  this.universityInput = universityInput
                }}
            />
            <TextInput
                name="grade"
                label={translate['Grade']}
                value={education.grade}
                ref={gradeInput => {
                  this.gradeInput = gradeInput
                }}
            />
            <TextInput
                name="fieldOfStudy"
                label={translate['Field Of Study'] + ": "}
                value={education.field_of_study}
                ref={fieldInput => {
                  this.fieldInput = fieldInput
                }}
            />
            {/*TODO EMAIL INPUT*/}
            <DateInput
                name="FromDateEducationInfoForm"
                label={translate['FromDate'] + ": "}
                value={education.from_date}
                ref={fromDateInput => {
                  this.fromDateInput = fromDateInput
                }}
            />
            <DateInput
                name="ToDateEducationInfoForm"
                label={translate['ToDate'] + ": "}
                value={education.to_date}
                ref={toDateInput => {
                  this.toDateInput = toDateInput
                }}
            />

            <div className="col-12 d-flex justify-content-end">
              <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
                {translate['Cancel']}
              </button>
              <button type="submit" className="btn btn-success">{translate['Save']}</button>
            </div>

          </div>
        </form>
    )
  }
}