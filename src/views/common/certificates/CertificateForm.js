// @flow
import type {certificateType} from "../../../consts/flowTypes/user/others";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";
import {FileInput} from "../../common/inputs/FileInput";
import {Field, reduxForm} from "redux-form";
import certificateValidation from "../../../helpers/validations/commonCertificate";
import renderTextField from "../../common/inputs/reduxFormRenderTextField";

type PropsCertificateForm = {
  onSubmit: Function,
  certificate?: certificateType,
  translate: { [string]: string },
  children?: React.Node,
  submitFailed: Function,
  error: string,
  handleSubmit: Function,
  initialize: Function,
}

class CertificateForm extends Component<PropsCertificateForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    certificate: PropTypes.object,
    translate: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  }

  componentDidMount(){
    const {initialize, certificate} = this.props
    let defaultFormValue
    if(certificate){
      defaultFormValue = {
        title: certificate.title,
        certificateParent: certificate.certificate_parent,
        certificateIdentity: certificate.certificate_identity,
        // FixMe: mohammad remove this when picture and logo select done
        certificatePicture: 4149,
        certificateLogo: 4149,
      }
    }
    else{
      defaultFormValue = {
        certificatePicture: 4149,
        certificateLogo: 4149,
      }
    }
    initialize(defaultFormValue)

    //FixMe: mohammad profile and logo picture need to fix fot input and data send to server
    // const media = this.certPictureInput.getFile()
    // const mediaId = media ? media.id : null
  }

  render() {
    const {onSubmit, translate, submitFailed, error, handleSubmit} = this.props
    const certificate = this.props.certificate || {}
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {translate['Picture'] + ": "}
            </label>
            <Field
                name="certificatePicture"
                type="text"
                component='input'
                label={translate['Picture']}
                className='form-control'
                disabled={true}
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Logo'] + ": "}
            </label>
            <Field
                name="certificateLogo"
                type="text"
                component='input'
                label={translate['Logo']}
                className='form-control'
                disabled={true}
            />
          </div>

          <FileInput
              label={translate['Picture'] + ": "}
              mediaId={certificate.picture_media}
              ref={certPictureInput => {
                this.certPictureInput = certPictureInput
              }}
          />
          {submitFailed && <p className="error-message">{error}</p>}

          {this.props.children}

        </form>
    )
  }
}

CertificateForm = reduxForm({
  form: 'certificateForm',
  validate: certificateValidation,
})(CertificateForm)

export default CertificateForm