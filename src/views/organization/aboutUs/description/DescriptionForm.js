// @flow
import * as React from 'react'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {CloseIconSvg} from 'src/images/icons'
import ConfirmFormButton from '../ConfirmFormButtons'

type Props = {
  organization: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
  updateOrganization: Function,
}

const DescriptionForm = (props: Props) => {

  const _onSubmit = (e) => {
    const {toggleEdit, updateOrganization, organization} = props
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    const formValues = {
      biography: form.biography.value
    }

    updateOrganization({formValues, organizationId: organization.id})
    toggleEdit()
  }
  const {organization, translate, toggleEdit} = props
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

        <form className='content' onSubmit={_onSubmit} method='POST'>
          <textarea className='edit-text-fields' defaultValue={organization.biography} name='biography'/>
          <ConfirmFormButton translate={translate} toggleEdit={toggleEdit}/>
        </form>
      </React.Fragment>
  )
}

export default DescriptionForm