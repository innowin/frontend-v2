// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {CloseIconSvg} from '../../../../images/icons'
import ConfirmFormButton from '../ConfirmFormButtons'

type ContactProps = {
  organization: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
  updateOrganization: Function,
}

const ContactForm = (props: ContactProps) => {

  const _onSubmit = (e) => {
    const {toggleEdit, updateOrganization, organization} = props
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    const formValues = {
      address: form.address.value,
      phone: form.phone.value,
      email: form.email.value,
      web_site: form.web_site.value,
    }

    updateOrganization({formValues, organizationId: organization.id})
    toggleEdit()
  }

  const {organization, translate, toggleEdit} = props
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

        <form className='content' onSubmit={_onSubmit} method='POST'>
          <div className='detail-row'>
            <p className='title'>{translate['Address']}</p>
            <input name='address' defaultValue={organization.address} className='edit-text-fields'/>
          </div>
          <div className='detail-row'>
            <p className='title'>{translate['Phone']}</p>
            <input name='phone' defaultValue={organization.phone} className='edit-text-fields'/>
          </div>
          <div className='detail-row'>
            <p className='title'>{translate['Web site']}</p>
            <input name='web_site' defaultValue={organization.web_site} className='edit-text-fields ltr'/>
          </div>
          <div className='detail-row'>
            <p className='title'>{translate['Email']}</p>
            <input name='email' defaultValue={organization.email} className='edit-text-fields ltr'/>
          </div>
          <ConfirmFormButton translate={translate} toggleEdit={toggleEdit}/>
        </form>
      </React.Fragment>
  )
}

export default ContactForm