// @flow
import type {workExperienceType} from "../../../consts/flowTypes/user/others";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import workExperienceValidation from "../../../helpers/validations/workExperienceValidation";

import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"
import {ReduxFormDateInput} from "../../common/inputs/reduxFormDateInput";

// flow type of WorkExperienceForm
type PropsWorkExperienceForm = {
  onSubmit: Function,
  workExperience: workExperienceType,
  translate: { [string]: string },
  children?: React.Node,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

class WorkExperienceForm extends Component<PropsWorkExperienceForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    workExperience: PropTypes.object,
    translate: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
  }

  componentDidMount(){
    const {initialize, workExperience} = this.props
    if(workExperience){
      const fromDateSplit = workExperience.from_date === null ? [''] : workExperience.from_date.split('/')
      const toDateSplit = workExperience.to_date === null ? [''] : workExperience.to_date.split('/')
      const defaultFormValue = {
        name: workExperience.name,
        position: workExperience.position,
        yearFromDate: fromDateSplit[0],
        monthFromDate: fromDateSplit[1] === undefined ? '' : fromDateSplit[1],
        dayFromDate: fromDateSplit[2] === undefined ? '' : fromDateSplit[2],
        yearToDate: toDateSplit[0],
        monthToDate: toDateSplit[1] === undefined ? '' : toDateSplit[1],
        dayToDate: toDateSplit[2] === undefined ? '' : toDateSplit[2],
        // FixMe: mohammad remove this when organ select done
        workExperienceOrganization: 8012
      }
      initialize(defaultFormValue)
    }
    else{
      const defaultFormValue = {
        workExperienceOrganization: 8012
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
              {translate['Name'] + ": "}
            </label>
            <Field
                name="name"
                type="text"
                component={renderTextField}
                label={translate['Name']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Position'] + ": "}
            </label>
            <Field
                name="position"
                type="text"
                component={renderTextField}
                label={translate['Position']}
                textFieldClass='form-control'
            />
          </div>

          <ReduxFormDateInput translate={translate} labelName={translate['From date']} dayName='dayFromDate' monthName='monthFromDate' yearName='yearFromDate'/>
          <ReduxFormDateInput translate={translate} labelName={translate['To date']} dayName='dayToDate' monthName='monthToDate' yearName='yearToDate'/>

          {/*FixMe: mohammad select organ from here or add new organ with 0 id*/}
          <div className='form-group'>
            <label>
              {translate['Organization worked'] + ": "}
            </label>
            <Field
                name="workExperienceOrganization"
                type="text"
                component='input'
                label={translate['Organization worked']}
                className='form-control'
                disabled={true}
            />
          </div>

          {submitFailed && <p className="error-message">{error}</p>}

          {this.props.children}

        </form>
    )
  }
}

WorkExperienceForm = reduxForm({
  form: 'workExperienceForm',
  validate: workExperienceValidation,
})(WorkExperienceForm)

export {WorkExperienceForm}