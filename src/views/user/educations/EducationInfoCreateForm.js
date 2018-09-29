// flow type of EducationInfoForm
import * as React from "react";
import PropTypes from "prop-types";

import EducationInfoForm from './EducationInfoForm'
import type {userEducationInputType} from "../../../consts/flowTypes/user/basicInformation";

type PropsEducationInfoForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string },
  userId: number,
}

const EducationInfoCreateForm = (props: PropsEducationInfoForm) => {
  const _onSubmit = (values: userEducationInputType) => {
    const {hideCreateForm, create} = props

    const from_date = values.yearFromDate === '' || values.monthFromDate === '' || values.dayFromDate === '' ? '' : `${values.yearFromDate}/${values.monthFromDate}/${values.dayFromDate}`
    const to_date = values.yearToDate === '' || values.monthToDate === '' || values.dayToDate === '' ? '' : `${values.yearToDate}/${values.monthToDate}/${values.dayToDate}`

    const formFormat = {
      grade: values.grade,
      university: values.university,
      field_of_study: values.fieldOfStudy,
      description: values.description,
      average: values.average,
      from_date: from_date ,
      to_date: to_date,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    create({formValues})
    hideCreateForm()
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
  hideCreateForm: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}

export default EducationInfoCreateForm