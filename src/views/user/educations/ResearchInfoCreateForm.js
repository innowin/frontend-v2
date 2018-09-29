// flow type of EducationInfoForm
import * as React from "react";
import PropTypes from "prop-types";

import ResearchInfoForm from './ResearchInfoForm'
import type {userResearchInputType} from "../../../consts/flowTypes/user/basicInformation";

type PropsResearchInfoCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string },
  userId: number,
}

const ResearchInfoCreateForm = (props: PropsResearchInfoCreateForm) => {
  const _onSubmit = (values: userResearchInputType) => {
    const {hideCreateForm, create} = props

    const formFormat = {
      title: values.title,
      page_count: values.pageCount,
      year: values.year,
      publication: values.publication,
      research_link: values.researchLink,
      url: values.url,
      author: values.author,
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
      <ResearchInfoForm userId={userId}
                         translate={translate}
                         onSubmit={_onSubmit}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </ResearchInfoForm>
  )
}

ResearchInfoCreateForm.propTypes = {
  hideCreateForm: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}

export default ResearchInfoCreateForm