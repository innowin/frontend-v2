// @flow
import * as React from "react"
import PropTypes from "prop-types"

import type {userResearchInputType, userResearchType} from "../../../consts/flowTypes/user/basicInformation"
import ResearchInfoForm from './ResearchInfoForm'
import {Confirm} from "../../common/cards/Confirm"

// flow type of ResearchInfoEditForm
type PropsResearchInfoEditForm = {
  update: Function,
  deleteResearchByUserId: Function,
  hideEdit: Function,
  research: userResearchType,
  translate: { [string]: string },
  userId: number,
}
type StateResearchInfoEditForm = {
  confirm: boolean
}

class ResearchInfoEditForm extends React.Component<PropsResearchInfoEditForm, StateResearchInfoEditForm> {
  state = {confirm: false}

  static propTypes = {
    update: PropTypes.func.isRequired,
    deleteResearchByUserId: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    research: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsResearchInfoEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: userResearchInputType) => {
    const {userId, research, update, hideEdit} = this.props
    const researchId: number = research.id

    const formFormat = {
      title: research.title === values.title ? null : values.title,
      page_count: research.page_count === values.pageCount ? null : values.pageCount,
      year: research.year === values.year ? null : values.year,
      publication: research.publication === values.publication ? null : values.publication,
      research_link: research.research_link === values.researchLink ? null : values.researchLink,
      author: research.author === values.author ? null : values.author,
      url: research.url === values.url? null : values.url,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    update({formValues, researchId, userId})
    hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {translate, research, deleteResearchByUserId, hideEdit} = this.props
    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteResearchByUserId}/>
            : <ResearchInfoForm onSubmit={this._onSubmit} research={research} translate={translate}>
              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>
            </ResearchInfoForm>
    )
  }
}

export default ResearchInfoEditForm