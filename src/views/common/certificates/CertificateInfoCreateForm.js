// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'
import CertificateForm from './CertificateForm'
import {certificateInputType} from 'src/consts/flowTypes/user/others'

// flow type of CertificateCreateForm
type PropsCertificateCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string },
}

const CertificateInfoCreateForm = (props: PropsCertificateCreateForm) => {

  const _onSubmit = (values: certificateInputType) => {
    const {hideCreateForm, create} = props

    const formFormat = {
      title: values.title ? values.title : null,
      certificate_picture: values.certificatePicture ? values.certificatePicture : null,
      certificate_logo: values.certificateLogo ? values.certificateLogo : null
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      if (formFormat[key] === null) delete (formFormat[key])
      return formFormat
    })

    const formValues: {} = {...formFormat}
    create({formValues})
    hideCreateForm()
  }

  const {hideCreateForm, translate} = props
  return (
      <CertificateForm translate={translate} onSubmit={_onSubmit}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Create']}</button>
        </div>
      </CertificateForm>
  )
}

CertificateInfoCreateForm.propTypes = {
  create: PropTypes.func.isRequired,
  hideCreateForm: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired
}

export default CertificateInfoCreateForm