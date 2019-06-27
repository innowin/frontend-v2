// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'
import {Field, reduxForm} from "redux-form"

import renderTextArea from "../inputs/reduxFormRenderTextArea"
import renderTextField from "../inputs/reduxFormRenderTextField"
import abilityInfoValidation from "../../../helpers/validations/organizationAbilityInfo"
import type {AbilityType, AbilityFormType} from "../../../consts/flowTypes/organization/ability"
import {Confirm} from "../cards/Confirm"

type PropsAbilityEditForm = {
  update: Function,
  deleteAbility: Function,
  hideEdit: Function,
  ability: AbilityType,
  translate: { [string]: string },
  organizationId: number,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

type StateAbilityEditForm = {
  confirm: boolean,
}

class AbilityInfoForm extends React.Component<PropsAbilityEditForm, StateAbilityEditForm> {
  static propTypes = {
    update: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    ability: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    deleteAbility: PropTypes.func.isRequired,
    organizationId: PropTypes.number.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func.isRequired,
  }

  constructor(props: PropsAbilityEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  componentDidMount() {
    const {initialize, ability} = this.props
    if (ability) {
      const defaultFormValue = {
        title: ability.title,
        text: ability.text,
      }
      initialize(defaultFormValue)
    }
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: AbilityFormType) => {
    const {organizationId, ability, update, hideEdit} = this.props
    const abilityId: number = ability.id

    const formFormat = {
      title: ability.title === values.title ? null : values.title,
      text: ability.text === values.text ? null : values.text,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      // formFormat[key] === null ? delete(formFormat[key]) : ''
      // return formFormat
      if (formFormat[key] === null) {
        delete (formFormat[key])
      }
      return formFormat
    })

    const formValues: {} = {...formFormat}
    update({formValues, abilityId, organizationId})
    hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {hideEdit, translate, deleteAbility, submitFailed, error, handleSubmit} = this.props

    return (
        confirm
            ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteAbility}/>
            : <form onSubmit={handleSubmit(this._onSubmit)}>
              <div className='form-group'>
                <label>
                  {translate['Title'] + ": "}
                </label>
                <Field
                    name="title"
                    type="text"
                    component={renderTextField}
                    label={translate['Title']}
                    textFieldClass='form-control'
                />
              </div>

              <div className='form-group'>
                <label>
                  {translate['Description'] + ": "}
                </label>
                <Field
                    name="text"
                    type="text"
                    component={renderTextArea}
                    label={translate['Description']}
                    textFieldClass='form-control'
                />
              </div>

              {submitFailed && <p className="error-message">{error}</p>}

              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>
            </form>
    )
  }
}

AbilityInfoForm = reduxForm({
  form: 'abilityInfoForm',
  validate: abilityInfoValidation,
})(AbilityInfoForm)

export default AbilityInfoForm