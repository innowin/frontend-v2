// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'

import ConfirmFormButton from '../../../common/ConfirmFormButtons'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import Validations from 'src/helpers/validations/validations'
import {CloseIconSvg} from 'src/images/icons'
import numberCorrection from '../../../../helpers/numberCorrection'

type ContactProps = {
  organization: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
  updateOrganization: Function,
}

type ContactStates = {
  email: string,
  web_site: string,
  phone: string,
  errors: {
    email: boolean,
    web_site: boolean,
    phone: boolean,
  }
}

class ContactForm extends React.Component <ContactProps, ContactStates> {

  static propTypes = {
    organization: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateOrganization: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    web_site: '',
    phone: '',
    errors: {
      email: false,
      web_site: false,
      phone: false,
    }
  }

  _onChangeFields = (event: SyntheticEvent<HTMLInputElement>) => {
    const {translate} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : numberCorrection(target.value)
    const name = target.name
    let error = false
    if (name === 'phone') {
      error = Validations.validatePhone({value, translate})
    } else if (name === 'web_site') {
      error = Validations.validateWebSite({value, translate})
    } else if (name === 'email') {
      error = Validations.validateEmail({value, translate})
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
    const {web_site, phone, email} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    const formValues = {
      address: numberCorrection(form.address.value),
      phone: numberCorrection(form.phone.value),
      email: numberCorrection(form.email.value),
      web_site: numberCorrection(form.web_site.value),
    }

    if (Boolean(web_site || email || phone) === false) {
      updateOrganization({formValues, organizationId: organization.id})
      toggleEdit()
    }
  }

  render() {
    const {organization, translate, toggleEdit} = this.props
    const {errors} = this.state
    const {phone, web_site, email} = errors
    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['Call']}
            </div>
            <div className='editing'>
              {translate['Editing']}
              <CloseIconSvg className='close-button pulse' onClick={toggleEdit}/>
            </div>
          </div>

          <form className='content' onSubmit={this._onSubmit} method='POST'>
            <div className='detail-row'>
              <p className='title'>{translate['Address']}</p>
              <input name='address' defaultValue={organization.address} className='edit-text-fields'/>
            </div>
            <div className='detail-row'>
              <p className='title'>{translate['Phone']}</p>
              <input name='phone' onChange={this._onChangeFields} defaultValue={organization.phone} placeholder='02188776655'
                     className='edit-text-fields ltr'/>
            </div>
            {phone && <div className='text-field-error'>{phone}</div>}
            <div className='detail-row'>
              <p className='title'>{translate['Web site']}</p>
              <input name='web_site' onChange={this._onChangeFields} defaultValue={organization.web_site}
                     className='edit-text-fields ltr'/>
            </div>
            {web_site && <div className='text-field-error'>{web_site}</div>}
            <div className='detail-row'>
              <p className='title'>{translate['Email']}</p>
              <input name='email' onChange={this._onChangeFields} defaultValue={organization.email}
                     className='edit-text-fields ltr'/>
            </div>
            {email && <div className='text-field-error'>{email}</div>}
            <ConfirmFormButton translate={translate} toggleEdit={toggleEdit}/>
          </form>
        </React.Fragment>
    )
  }
}

export default ContactForm