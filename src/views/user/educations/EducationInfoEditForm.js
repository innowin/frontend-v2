// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import {Confirm} from "../../common/cards/Confirm"
import EducationInfoForm from './EducationInfoForm'
import type {userEducationType, userEducationInputType} from "../../../consts/flowTypes/user/basicInformation"
import constants from "../../../consts/constants";

// flow type of EducationInfoForm
type PropsEducationInfoForm = {
  update: Function,
  deleteEducationByUserId: Function,
  hideEdit: Function,
  education: userEducationType,
  translate: { [string]: string },
  userId: number,
}
type StateEducationEditForm = {
  confirm: boolean
}

class EducationInfoEditForm extends Component<PropsEducationInfoForm, StateEducationEditForm> {
  static propTypes = {
    update: PropTypes.func.isRequired,
    deleteEducationByUserId: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    education: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsEducationInfoForm) {
    super(props)
    this.state = {confirm: false}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: userEducationInputType) => {
    const {userId, education, update, hideEdit, translate} = this.props

    const educationId: number = education.id
    const from_date = values.yearFromDate === '' || values.monthFromDate === '' || values.dayFromDate === '' ? '' : `${values.yearFromDate}.${values.monthFromDate}.${values.dayFromDate}`
    const to_date = values.yearToDate === '' || values.monthToDate === '' || values.dayToDate === '' ? '' : `${values.yearToDate}.${values.monthToDate}.${values.dayToDate}`

    let grade
    if(values.grade === translate['Bachelor']) {
      grade = constants.SERVER_GRADES.BACHELOR
    }
    else if (values.grade === translate['Master']) {
      grade = constants.SERVER_GRADES.MASTER
    }
    else if (values.grade === translate['Phd']) {
      grade = constants.SERVER_GRADES.PHD
    }
    const formFormat = {
      grade: education.grade === grade ? null : grade,
      university: education.university === values.university ? null : values.university,
      field_of_study: education.field_of_study === values.fieldOfStudy ? null : values.fieldOfStudy,
      description: education.description === values.description ? null : values.description,
      average: education.average === values.average ? null : values.average,
      from_date: education.from_date === from_date ? null : from_date,
      to_date: education.to_date === to_date ? null : to_date,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    update({formValues, educationId, userId})
    hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {translate, education, deleteEducationByUserId, hideEdit} = this.props
    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteEducationByUserId}/>
            : <EducationInfoForm onSubmit={this._onSubmit} education={education} translate={translate}>
              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>
            </EducationInfoForm>
    )
  }
}

export default EducationInfoEditForm