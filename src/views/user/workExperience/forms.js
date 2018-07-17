// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {Confirm} from "../../common/cards/Confirm"
import {DateInput} from "../../common/inputs/DateInput"
import {TextInput} from "../../common/inputs/TextInput"
import type {workExperienceType} from "src/consts/flowTypes/user/others"

// flow type of WorkExperienceForm
type PropsWorkExperienceForm = {
  onSubmit: Function,
  workExperience?: workExperienceType,
  translate: { [string]: string },
  children?: React.Node
}
type StateWorkExperienceForm = {
  edit: boolean
}

export class WorkExperienceForm extends Component<PropsWorkExperienceForm, StateWorkExperienceForm> {
  constructor(props: PropsWorkExperienceForm) {
    super(props)
    this.state = {edit: false}
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    workExperience: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  nameInput: React.ElementRef<typeof TextInput>
  positionInput: React.ElementRef<typeof TextInput>
  toDateInput: React.ElementRef<typeof DateInput>
  fromDateInput: React.ElementRef<typeof DateInput>
  fromDateInput: React.ElementRef<typeof DateInput>

  _getValues = () => {
    return {
      name: this.nameInput.getValue(),
      position: this.positionInput.getValue(),
      to_date: this.toDateInput.getValue(),
      from_date: this.fromDateInput.getValue(),
      //TODO mohsen: handle work_experience_organization
      work_experience_organization: 22
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates = [
      this.nameInput.validate(),
      this.positionInput.validate(),
      this.fromDateInput.validate(),
      this.toDateInput.validate()
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
    const {onSubmit, translate} = this.props
    const workExperience = this.props.workExperience || {}
    return (
      <form onSubmit={onSubmit}>
        <div className="row">
          <TextInput
            label={translate['Name']}
            value={workExperience.name}
            name="name"
            ref={nameInput => {
              this.nameInput = nameInput
            }}
          />
          <TextInput
            label={translate['Position']}
            value={workExperience.position}
            name="position"
            ref={positionInput => {
              this.positionInput = positionInput
            }}
          />
          <DateInput
            name="from_date"
            label={translate['From date']}
            value={workExperience.fromDate}
            ref={fromDateInput => {
              this.fromDateInput = fromDateInput
            }}
            showDay={true}
          />
          <DateInput
            label={translate['To date']}
            value={workExperience.toDate}
            name="to_date"
            ref={toDateInput => {
              this.toDateInput = toDateInput
            }}
            showDay={true}
          />
        </div>
        {this.props.children}
      </form>
    )
  }
}


// flow type of WorkExperienceCreateForm
type PropsWorkExperienceCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string }
}

export class WorkExperienceCreateForm extends Component<PropsWorkExperienceCreateForm> {

  static propTypes = {
    create: PropTypes.func.isRequired,
    hideCreateForm: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof WorkExperienceForm>

  _save = () => {
    const {create} = this.props
    if (this.form) {
      const formValues = this.form._getValues()
      create(formValues)
    }
    return null
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (this.form && this.form._formValidate()) {
      this._save()
    }
    return null
  }

  render() {
    const {hideCreateForm, translate} = this.props
    return (
      <WorkExperienceForm translate={translate} onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Create']}</button>
        </div>
      </WorkExperienceForm>
    )
  }
}


// flow type of WorkExperienceEditForm
type PropsWorkExperienceEditForm = {
  update: Function,
  delete: Function,
  hideEdit: Function,
  workExperience: workExperienceType,
  translate: { [string]: string }
}
type StateWorkExperienceEditForm = {
  confirm: boolean
}

export class WorkExperienceEditForm extends Component<PropsWorkExperienceEditForm, StateWorkExperienceEditForm> {

  static propTypes = {
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    workExperience: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  constructor(props: PropsWorkExperienceEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _remove = () => {
    const workExperienceId = this.props.workExperience.id
    return this.props.delete(workExperienceId)
  }

  form: ?React.ElementRef<typeof WorkExperienceForm>

  _save = () => {
    const {workExperience, update} = this.props
    const workExperienceId: number = workExperience.id
    if (this.form) {
      const formValues = this.form._getValues()
      update(formValues, workExperienceId)
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (this.form && this.form._formValidate()) {
      this._save()
    }
    return null
  }

  render() {
    const {confirm} = this.state
    const {hideEdit, workExperience, translate} = this.props
    if (confirm) {
      return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>
    }
    return (
      <WorkExperienceForm translate={translate} onSubmit={this._onSubmit} workExperience={workExperience} ref={form => {
        this.form = form
      }}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
            {translate['Delete']}
          </button>
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </WorkExperienceForm>
    )
  }
}

