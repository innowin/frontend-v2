// flow type of EducationInfoForm
import * as React from "react"
import PropTypes from "prop-types"
import ResearchInfoForm from './ResearchInfoForm'
import type {userResearchInputType} from "../../../consts/flowTypes/user/basicInformation"

type PropsResearchInfoCreateForm = {
  create: Function,
  hideEdit: Function,
  translate: { [string]: string },
  userId: number,
}

const ResearchInfoCreateForm = (props: PropsResearchInfoCreateForm) => {
  const _onSubmit = (values: userResearchInputType) => {
    const {hideEdit, create} = props

    const formFormat = {
      title: values.title ? values.title : null,
      page_count: values.pageCount ? values.pageCount : null,
      year: values.year ? values.year : null,
      publication: values.publication ? values.publication : null,
      research_link: values.researchLink ? values.researchLink : null,
      url: values.url ? values.url : null,
      author: values.author ? values.author : null,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      if(formFormat[key] === null) delete(formFormat[key])
      return formFormat
    })

    const formValues: {} = {...formFormat}
    create({formValues})
    hideEdit()
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
  hideEdit: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}

export default ResearchInfoCreateForm