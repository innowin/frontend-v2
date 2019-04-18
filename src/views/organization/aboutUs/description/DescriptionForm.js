// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import ConfirmFormButton from '../../../common/ConfirmFormButtons'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import Validations from 'src/helpers/validations/validations'
import {CloseIconSvg} from 'src/images/icons'

type Props = {
  organization: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
  updateOrganization: Function,
}

type States = {
  errors: {
    biography: boolean,
  },
  biography: string,
}

class DescriptionForm extends React.Component <Props, States> {

  static propTypes = {
    organization: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateOrganization: PropTypes.func.isRequired,
  }

  state = {
    errors: {
      biography: false,
    },
    biography: '',
  }

  _onChangeFields = (event: SyntheticEvent<HTMLInputElement>) => {
    const {translate} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    let error = false
    if (name === 'biography') {
      error = Validations.validateBiography({value, translate})
    }

    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: error
      }
    })
  }

  _onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const {toggleEdit, updateOrganization, organization} = this.props
    const {errors} = this.state
    const {biography} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    const formValues = {
      biography: form.biography.value
    }

    if (biography === false) {
      updateOrganization({formValues, organizationId: organization.id})
      toggleEdit()
    }
  }

  render() {
    const {organization, translate, toggleEdit} = this.props
    const {errors} = this.state
    const {biography} = errors

    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['Organization biography']}
            </div>
            <div className='editing'>
              {translate['Editing']}
              <CloseIconSvg className='close-button pulse' onClick={toggleEdit}/>
            </div>
          </div>

          <form className='content' onSubmit={this._onSubmit} method='POST'>
            <textarea onChange={this._onChangeFields} className='edit-text-fields' defaultValue={organization.biography}
                      name='biography'/>
            {biography && <div className='text-field-error'>{biography}</div>}
            <ConfirmFormButton translate={translate} toggleEdit={toggleEdit}/>
          </form>
        </React.Fragment>
    )
  }
}

export default DescriptionForm