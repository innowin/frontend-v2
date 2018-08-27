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


// flow type of EducationInfoForm
type PropsEducationInfoForm = {
  onSubmit: Function,
  education: ?userEducationType,
  children?: React.Node,
  translate: { [string]: string }
}
// flow type of EducationInfoEditForm
type PropsEducationInfoEditForm = {
  hideEdit: Function,
  updateStateForView: Function,
  education: userEducationType,
  translate: { [string]: string }
}
type StateEducationInfoEditForm = {
  confirm: boolean
}

export class EducationInfoForm extends Component<PropsEducationInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    education: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  universityInput: React.ElementRef<typeof TextInput>
  gradeInput: React.ElementRef<typeof TextInput>
  fieldInput: React.ElementRef<typeof TextInput>
  fromDateInput: React.ElementRef<typeof DateInput>
  toDateInput: React.ElementRef<typeof DateInput>

  _getValues = (): {} => {
    return {
      university: this.universityInput.getValue(),
      grade: this.gradeInput.getValue(),
      field_of_study: this.fieldInput.getValue(),
      from_date: this.fromDateInput.getValue(),
      to_date: this.toDateInput.getValue()
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates: (string | boolean)[] = [
      this.universityInput.validate(),
      this.gradeInput.validate(),
      this.fieldInput.validate(),
      this.fromDateInput.validate(),
      this.toDateInput.validate(),
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
    const education = this.props.education || {}
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <TextInput
            name="university"
            label={translate['University'] + ": "}
            value={education.university}
            ref={universityInput => {
              this.universityInput = universityInput
            }}
          />
          <TextInput
            name="grade"
            label={translate['Grade']}
            value={education.grade}
            ref={gradeInput => {
              this.gradeInput = gradeInput
            }}
          />
          <TextInput
            name="fieldOfStudy"
            label={translate['Field Of Study'] + ": "}
            value={education.field_of_study}
            ref={fieldInput => {
              this.fieldInput = fieldInput
            }}
          />
          {/*TODO EMAIL INPUT*/}
          <DateInput
            name="FromDateEducationInfoForm"
            label={translate['FromDate'] + ": "}
            value={education.from_date}
            ref={fromDateInput => {
              this.fromDateInput = fromDateInput
            }}
          />
          <DateInput
            name="ToDateEducationInfoForm"
            label={translate['ToDate'] + ": "}
            value={education.to_date}
            ref={toDateInput => {
              this.toDateInput = toDateInput
            }}
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}

export class EducationInfoEditForm extends Component<PropsEducationInfoEditForm, StateEducationInfoEditForm> {
  state = {confirm: false}

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    education: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof EducationInfoForm>

  _save = (updateStateForView: Function, hideEdit: Function) => {
    const educationId:number = this.props.education.id
    if (this.form) {
      const formValues:{} = this.form._getValues()
      updateEducation(educationId, formValues, hideEdit, (res) => {updateStateForView(res, educationId, false, false)})
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
    const {education, translate} = this.props
    return (
      <EducationInfoForm onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }} education={education} translate={translate}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </EducationInfoForm>
    )
  }
}


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