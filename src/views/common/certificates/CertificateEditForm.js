// @flow
import type {certificateType, certificateInputType} from "../../../consts/flowTypes/user/others"
import {Component} from "react"
import PropTypes from "prop-types"
import * as React from "react"
import {Confirm} from "../../common/cards/Confirm"
import CertificateForm from "./CertificateForm"

type PropsCertificateEditForm = {
  update: Function,
  deleteCertificate: Function,
  hideEdit: Function,
  certificate: certificateType,
  translate: { [string]: string },
}

type StateCertificateEditForm = {
  confirm: boolean
}

export class CertificateEditForm extends Component<PropsCertificateEditForm, StateCertificateEditForm> {

  static propTypes = {
    update: PropTypes.func.isRequired,
    deleteCertificate: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    certificate: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
  }

  constructor(props: PropsCertificateEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: certificateInputType) => {
    const {certificate, update, hideEdit} = this.props

    const certificateId: number = certificate.id

    //FixMe: certificate logo or certificate picture and parent and identity need to set
    const formFormat = {
      title: certificate.title === values.title ? null : values.title,
      certificate_picture: certificate.certificate_picture === values.certificatePicture ? null : values.certificatePicture,
      certificate_logo: certificate.certificate_logo === values.certificateLogo ? null : values.certificateLogo,
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
    update({formValues, certificateId})
    hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {certificate, hideEdit, translate, deleteCertificate} = this.props
    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteCertificate}/>
            : <CertificateForm
                onSubmit={this._onSubmit}
                certificate={certificate}
                translate={translate}
                error={null}
                handleSubmit={null}
                initialize={null}
                submitFailed={null}>
              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate["Delete"]}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate["Cancel"]}
                </button>
                <button type="submit" className="btn btn-success">{translate["Save"]}</button>
              </div>
            </CertificateForm>
    )
  }
}