// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Component} from "react"

import {DateInput} from "src/views/common/inputs/DateInput"
import {IntInput} from "src/views/common/inputs/IntInput"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateEducation} from "src/crud/user/education"
import {updateResearch} from "src/crud/user/research"
import type {
  userEducationType,
  userResearchType
} from "src/consts/flowTypes/user/basicInformation"


// flow type of ResearchInfoForm
type  PropsResearchInfoForm = {
  onSubmit: Function,
  research: ?userResearchType,
  children?: React.Node,
  translate: { [string]: string }
}
// flow type of ResearchInfoEditForm
type PropsResearchInfoEditForm = {
  hideEdit: Function,
  updateStateForView: Function,
  research: userResearchType,
  translate: { [string]: string }
}
type StateResearchInfoEditForm = {
  confirm: boolean
}

export class ResearchInfoForm extends Component<PropsResearchInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    research: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  titleInput: React.ElementRef<typeof TextInput>
  authorInput: React.ElementRef<typeof TextInput>
  yearInput: React.ElementRef<typeof DateInput>
  publicationInput: React.ElementRef<typeof TextInput>
  pageCountInput: React.ElementRef<typeof IntInput>

  _getValues = (): {} => {
    return {
      title: this.titleInput.getValue(),
      author: this.authorInput.getValue(),
      year: this.yearInput.getValue(),
      publication: this.publicationInput.getValue(),
      page_count: this.pageCountInput.getValue()
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates: (string | boolean)[] = [
      this.titleInput.validate(),
      this.authorInput.validate(),
      this.yearInput.validate(),
      this.pageCountInput.validate()
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  render() {
    const {translate} = this.props
    const research = this.props.research || {}
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <TextInput
            name="title"
            label={translate['Title'] + ": "}
            value={research.title}
            ref={titleInput => {
              this.titleInput = titleInput
            }}
          />
          <TextInput
            name="author"
            label={translate['Author']}
            value={research.author}
            ref={authorInput => {
              this.authorInput = authorInput
            }}
          />
          <TextInput
            name="publication"
            label={translate['Publication'] + ": "}
            value={research.publication}
            ref={publicationInput => {
              this.publicationInput = publicationInput
            }}
          />
          <DateInput
            name="Year"
            label={translate['Year'] + ": "}
            value={research.year}
            ref={yearInput => {
              this.yearInput = yearInput
            }}
          />
          <IntInput
            name="PageCount"
            label={translate['Page Count'] + ": "}
            value={research.page_count}
            ref={pageCountInput => {
              this.pageCountInput = pageCountInput
            }}
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}

export class ResearchInfoEditForm extends Component<PropsResearchInfoEditForm, StateResearchInfoEditForm> {
  state = {confirm: false}

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    research: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof ResearchInfoForm>

  _save = (updateStateForView: Function, hideEdit: Function) => {
    const researchId:number = this.props.research.id
    if (this.form) {
      const formValues:{} = this.form._getValues()
      updateResearch(researchId, formValues, hideEdit, (res: {}) => {
        updateStateForView(res, researchId, false, false)})
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>): boolean | void => {
    e.preventDefault()
    const {updateStateForView, hideEdit} = this.props
    if (this.form && this.form._formValidate()) {
      this._save(updateStateForView, hideEdit)
    }
    return false
  }

  render() {
    const {research, translate} = this.props
    return (
      <ResearchInfoForm onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }} research={research} translate={translate}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </ResearchInfoForm>
    )
  }
}