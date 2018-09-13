// @flow
import type {workExperienceType} from "../../../consts/flowTypes/user/others";
import {Component} from "react";
import PropTypes from "prop-types";
import * as React from "react";
import WorkExperienceForm from "./WorkExperienceForm";
import {Confirm} from "../../common/cards/Confirm";

// flow type of WorkExperienceEditForm
type PropsWorkExperienceEditForm = {
  update: Function,
  deleteWorkExperience: Function,
  hideEdit: Function,
  workExperience: workExperienceType,
  translate: { [string]: string },
  userId: number,
}
type StateWorkExperienceEditForm = {
  confirm: boolean
}

class WorkExperienceEditForm extends Component<PropsWorkExperienceEditForm, StateWorkExperienceEditForm> {

  static propTypes = {
    update: PropTypes.func.isRequired,
    deleteWorkExperience: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    workExperience: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
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

  form: ?React.ElementRef<typeof WorkExperienceForm>

  _save = () => {
    if (this.form && this.form._formValidate()) {
      const {workExperience, update, userId, hideEdit} = this.props
      const workExperienceId: number = workExperience.id
      const formValues = this.form._getValues()
      hideEdit()
      update({formValues, workExperienceId, userId})
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this._save()
    return null
  }

  render() {
    const {confirm} = this.state
    const {hideEdit, workExperience, translate, deleteWorkExperience} = this.props
    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteWorkExperience}/>
            : <WorkExperienceForm translate={translate} onSubmit={this._onSubmit} workExperience={workExperience}
                                  ref={form => {
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

export default WorkExperienceEditForm