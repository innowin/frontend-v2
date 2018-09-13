// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import WorkExperienceForm from './WorkExperienceForm'

// flow type of WorkExperienceCreateForm
type PropsWorkExperienceCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string }
}

class WorkExperienceCreateForm extends Component<PropsWorkExperienceCreateForm> {

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

export default WorkExperienceCreateForm