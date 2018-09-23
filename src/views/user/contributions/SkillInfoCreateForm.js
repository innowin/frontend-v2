import PropTypes from "prop-types";
import * as React from "react";
import SkillInfoForm from './SkillInfoForm'
import type {skillFormValuesType} from "../../../consts/flowTypes/user/others";

type PropsSkillCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string },
  userId: number,
}

const SkillInfoCreateForm = (props: PropsSkillCreateForm) => {

  const _onSubmit = (values: skillFormValuesType) => {
    const {hideCreateForm, create} = props

    // FixMe: mohammad tag input not work
    const formFormat = {
      title : values.title,
      tag: values.tag,
      description: values.description,
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
      <SkillInfoForm userId={userId}
                     translate={translate}
                     onSubmit={_onSubmit}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Create']}</button>
        </div>
      </SkillInfoForm>
  )
}

SkillInfoCreateForm.propTypes = {
  hideCreateForm: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}

export default SkillInfoCreateForm