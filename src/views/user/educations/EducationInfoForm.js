// flow type of EducationInfoForm
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";

import type {userEducationType} from "../../../consts/flowTypes/user/basicInformation";
import {ReduxFormDateInput} from 'src/views/common/inputs/reduxFormDateInput'
import {Field, reduxForm} from "redux-form";
import educationInfoValidation from "../../../helpers/validations/userEducationInfo";
import renderTextField from "../../common/inputs/reduxFormRenderTextField";
import renderTextArea from "../../common/inputs/reduxFormRenderTextArea";

type PropsEducationInfoForm = {
  onSubmit: Function,
  education: userEducationType,
  translate: { [string]: string },
  children?: React.Node,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

class EducationInfoForm extends Component<PropsEducationInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    education: PropTypes.object,
    translate: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
  }

  componentDidMount() {
    const {initialize, education} = this.props
    if(education){
      const fromDateSplit = education.from_date === null ? [''] : education.from_date.split('/')
      const toDateSplit = education.to_date === null ? [''] : education.to_date.split('/')
      const defaultFormValue = {
        grade: education.grade,
        university: education.university,
        fieldOfStudy: education.field_of_study,
        average: education.average,
        description: education.description,
        yearFromDate: fromDateSplit[0],
        monthFromDate: fromDateSplit[1] === undefined ? '' : fromDateSplit[1],
        dayFromDate: fromDateSplit[2] === undefined ? '' : fromDateSplit[2],
        yearToDate: toDateSplit[0],
        monthToDate: toDateSplit[1] === undefined ? '' : toDateSplit[1],
        dayToDate: toDateSplit[2] === undefined ? '' : toDateSplit[2],
      }
      initialize(defaultFormValue)
    }
  }

  render() {
    const {onSubmit, translate, submitFailed, error, handleSubmit} = this.props
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label>
              {translate['University'] + ": "}
            </label>
            <Field
                name="university"
                type="text"
                component={renderTextField}
                label={translate['University']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Grade'] + ": "}
            </label>
            <Field
                name="grade"
                type="text"
                component={renderTextField}
                label={translate['Grade']}
                textFieldClass='form-control'
            />
          </div>

          <ReduxFormDateInput translate={translate} labelName={translate['From date']} dayName='dayFromDate'
                              monthName='monthFromDate' yearName='yearFromDate'/>
          <ReduxFormDateInput translate={translate} labelName={translate['To date']} dayName='dayToDate'
                              monthName='monthToDate' yearName='yearToDate'/>

          <div className='form-group'>
            <label>
              {translate['Average'] + ": "}
            </label>
            <Field
                name="average"
                type="text"
                component={renderTextField}
                label={translate['Average']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Description'] + ": "}
            </label>
            <Field
                name="description"
                type="text"
                component={renderTextArea}
                label={translate['Description']}
                textFieldClass='form-control'
            />
          </div>

          {submitFailed && <p className="error-message">{error}</p>}

          {this.props.children}

        </form>
    )
  }
}

EducationInfoForm = reduxForm({
  form: 'educationInfoForm',
  validate: educationInfoValidation,
})(EducationInfoForm)

export default EducationInfoForm