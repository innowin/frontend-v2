// @flow
import * as React from 'react'
import PropTypes from "prop-types"
import {WorkExperienceForm} from './WorkExperienceForm'
import {WorkExperienceFormInputType} from 'src/consts/flowTypes/user/others'

// flow type of WorkExperienceCreateForm
type PropsWorkExperienceCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string },
  userId: number,
}

const WorkExperienceCreateForm = (props: PropsWorkExperienceCreateForm) =>  {

  const _onSubmit = (values: WorkExperienceFormInputType) => {
    const {hideCreateForm, create, userId} = props

    const from_date = values.yearFromDate === '' || values.monthFromDate === '' || values.dayFromDate === '' ? '' : `${values.yearFromDate}/${values.monthFromDate}/${values.dayFromDate}`
    const to_date = values.yearToDate === '' || values.monthToDate === '' || values.dayToDate === '' ? '' : `${values.yearToDate}/${values.monthToDate}/${values.dayToDate}`

    const formFormat = {
      name: values.name,
      position: values.position,
      from_date: from_date,
      to_date: to_date,
      work_experience_organization: values.workExperienceOrganization,
      work_experience_user: userId,
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

  const {hideCreateForm, translate} = props
  return (
    <WorkExperienceForm translate={translate} onSubmit={_onSubmit}>
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
          {translate['Cancel']}
        </button>
        <button type="submit" className="btn btn-success">{translate['Create']}</button>
      </div>
    </WorkExperienceForm>
  )
}

WorkExperienceCreateForm.propTypes = {
  create: PropTypes.func.isRequired,
  hideCreateForm: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}

export default WorkExperienceCreateForm