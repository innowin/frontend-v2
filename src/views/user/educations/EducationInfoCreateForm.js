// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'

import EducationInfoForm from './EducationInfoForm'
import type {userEducationInputType} from "../../../consts/flowTypes/user/basicInformation"
import constants from "../../../consts/constants";

// flow type of EducationInfoForm
type PropsEducationInfoForm = {
  create: Function,
  hideEdit: Function,
  translate: { [string]: string },
  userId: number,
}

const EducationInfoCreateForm = (props: PropsEducationInfoForm) => {
  const _onSubmit = (values: userEducationInputType) => {
    const {hideEdit, create} = props

    const from_date = (values.dayFromDate === undefined || values.monthFromDate === undefined || values.yearFromDate === undefined || values.yearFromDate === '' || values.monthFromDate === '' || values.dayFromDate === '') ? null : `${values.yearFromDate}.${values.monthFromDate}.${values.dayFromDate}`
    const to_date = (values.dayToDate === undefined || values.monthToDate === undefined || values.yearToDate === undefined || values.yearToDate === '' || values.monthToDate === '' || values.dayToDate === '') ? null : `${values.yearToDate}.${values.monthToDate}.${values.dayToDate}`

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
      grade: grade ? grade : null,
      university: values.university ? values.university : null,
      field_of_study: values.fieldOfStudy ? values.fieldOfStudy : null,
      description: values.description ? values.description : null,
      average: values.average ? values.average : null,
      from_date: from_date,
      to_date: to_date,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      // formFormat[key] === null ? delete(formFormat[key]) : ''
      // return formFormat
      if (formFormat[key] === null) {
        delete (formFormat[key])
      }
      return formFormat
    })

    const formValues: {} = {...formFormat}
    create({formValues})
    hideEdit()
  }
  const {translate, userId, hideEdit} = props

  return (
      <EducationInfoForm userId={userId}
                         translate={translate}
                         onSubmit={_onSubmit}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </EducationInfoForm>
  )
}

EducationInfoCreateForm.propTypes = {
  hideEdit: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}

export default EducationInfoCreateForm