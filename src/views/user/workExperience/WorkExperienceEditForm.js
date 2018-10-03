// @flow
import * as React from "react"
import PropTypes from "prop-types"

import type {workExperienceType} from "../../../consts/flowTypes/user/others"
import {Confirm} from "../../common/cards/Confirm"
import {WorkExperienceFormInputType} from 'src/consts/flowTypes/user/others'
import {WorkExperienceForm} from "./WorkExperienceForm"

// flow type of WorkExperienceEditForm
type PropsWorkExperienceEditForm = {
  update: Function,
  deleteWorkExperience: Function,
  hideEdit: Function,
  workExperience: workExperienceType,
  translate: { [string]: string },
  userId: number,
}
type StateWorkExperienceEditForm = {
  confirm: boolean
}

class WorkExperienceEditForm extends React.Component<PropsWorkExperienceEditForm, StateWorkExperienceEditForm> {

  static propTypes = {
    update: PropTypes.func.isRequired,
    deleteWorkExperience: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    workExperience: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsWorkExperienceEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: WorkExperienceFormInputType) => {
    const {userId, workExperience, update, hideEdit} = this.props

    const workExperienceId: number = workExperience.id
    const from_date = values.yearFromDate === '' || values.monthFromDate === '' || values.dayFromDate === '' ? '' : `${values.yearFromDate}.${values.monthFromDate}.${values.dayFromDate}`
    const to_date = values.yearToDate === '' || values.monthToDate === '' || values.dayToDate === '' ? '' : `${values.yearToDate}.${values.monthToDate}.${values.dayToDate}`

    const formFormat = {
      name: workExperience.name === values.name ? null : values.name,
      position: workExperience.position === values.position ? null : values.position,
      from_date: workExperience.from_date === from_date ? null : from_date,
      to_date: workExperience.to_date === to_date ? null : to_date,
      work_experience_organization: workExperience.workExperienceOrganization
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    update({formValues, workExperienceId, userId})
    hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {hideEdit, workExperience, translate, deleteWorkExperience} = this.props
    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteWorkExperience}/>
            : <WorkExperienceForm translate={translate} onSubmit={this._onSubmit} workExperience={workExperience}>
              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>
            </WorkExperienceForm>
    )
  }
}

export default WorkExperienceEditForm