import type {skillFormValuesType, skillType} from "../../../consts/flowTypes/user/others";
import {Component} from "react";
import PropTypes from "prop-types";
import * as React from "react";
import {Confirm} from "../../common/cards/Confirm";
import SkillInfoForm from './SkillInfoForm'

type PropsSkillEditForm = {
  update: Function,
  deleteSkillByUserId: Function,
  hideEdit: Function,
  skill: skillType,
  translate: { [string]: string },
  userId: number,
}

type StateSkillEditForm = {
  confirm: boolean
}

class SkillInfoEditForm extends Component<PropsSkillEditForm, StateSkillEditForm> {
  static propTypes = {
    update: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    skill: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    deleteSkillByUserId: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsSkillEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: skillFormValuesType) => {
    const {userId, skill, update, hideEdit} = this.props

    const skillId: number = skill.id

    // FixMe: mohammad tag input not work
    const formFormat = {
      title: skill.title === values.title ? null : values.title,
      tag: skill.tag === values.tag ? null : values.tag,
      description: skill.description === values.description ? null : values.description,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    update({formValues, skillId, userId})
    hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {hideEdit, translate, skill, deleteSkillByUserId} = this.props

    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteSkillByUserId}/>
            : <SkillInfoForm onSubmit={this._onSubmit} skill={skill} translate={translate}>
              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>
            </SkillInfoForm>
    )
  }
}

export default SkillInfoEditForm