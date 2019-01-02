// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import {CertificateEditForm} from './forms'
import {ItemWrapper} from "../../common/cards/Frames"
import {CertificateIcon, StarIcon, EditIcon} from "src/images/icons"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import DefaultImage from "../../../images/defaults/defaultImage"

type CertificateItemWrapperProps = {
  children: React.Node
}
export const CertificateItemWrapper = (props: CertificateItemWrapperProps) => {
  const {children} = props
  return <ItemWrapper icon={<CertificateIcon/>}>{children}</ItemWrapper>
}
type CertificateType = {
  picture_media: string,
  title: string
}

type CertificateViewProps = {
  certificate: CertificateType,
  showEdit: Function
}

/*<div onClick={showEdit}><EditIcon/></div>*/

/*<a className="shareButton"><StarIcon/></a>*/


export const CertificateView = (props: CertificateViewProps) => {
  const {certificate, showEdit} = props
  return (
      <div className='product-certificates'>
        <div className='product-certificates-text'>
          {certificate.title}
          <br/>
          <span className='product-certificates-text-title'>معاونت علمی ریاست جمهوری</span>
        </div>
        {certificate.picture_media ?
            <img alt='' src={certificate.picture_media} className='product-certificates-img'/>
            :
            <DefaultImage className='product-certificates-img'/>
        }
      </div>
  )
}

type CertificateProps = {
  certificate: CertificateType,
  translator: TranslatorType,
  deleteCertificate: Function,
  updateCertificate: Function,
  updateStateForView: Function
}

type CertificateState = {
  edit: boolean,
  certificate: CertificateType
}

export class Certificate extends Component<CertificateProps, CertificateState> {
  constructor(props: CertificateProps) {
    super()
    const {certificate} = props
    this.state = {edit: false, certificate: certificate}
  }

  componentWillReceiveProps(props: CertificateProps) {
    const {certificate} = props
    this.setState({...this.state, certificate: certificate})
  }

  static propTypes = {
    updateCertificate: PropTypes.func.isRequired,
    deleteCertificate: PropTypes.func.isRequired,
    // certificate: PropTypes.object.isRequired,
    updateStateForView: PropTypes.func.isRequired
  }

  showEdit = () => {
    this.setState({edit: true})
  }

  hideEdit = () => {
    this.setState({edit: false})
  }

  updateStateForView = (res: CertificateType, error: string, isLoading: boolean) => {
    this.setState({...this.state, certificate: res})
  }

  render() {
    const {certificate} = this.state
    const {translator, deleteCertificate, updateCertificate} = this.props
    if (this.state.edit) {
      return <CertificateEditForm
          translator={translator}
          certificate={certificate}
          hideEdit={this.hideEdit}
          updateStateForView={this.updateStateForView}
          remove={deleteCertificate}
          update={updateCertificate}
      />
    }
    return <CertificateView certificate={certificate} showEdit={this.showEdit}/>
  }
}
