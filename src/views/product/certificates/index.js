// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from 'prop-types'
import {Certificate, CertificateItemWrapper} from "./view"
import {CertificateCreateForm} from "./forms"
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames"
import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/product/certificate.js'
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from "src/consts/data"
import {getMessages} from "../../../redux/selectors/translateSelector";
import {connect} from "react-redux";
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type CertificateType = {
    picture_media: string,
    title: string,
    id: number
}

type CertificateContainerProps = {
    certificate: CertificateType,
    productId: string,
    updateStateForView: Function,
    translator: TranslatorType
}

type CertificateContainerState = {
    certificate: CertificateType,
    error?: string,
    isLoading?: boolean
}

export class CertificateContainer extends Component<CertificateContainerProps, CertificateContainerState> {
	constructor(props: CertificateContainerProps){
		super()
		this.state = {
		    certificate:props.certificate || {}
		}
	}

	delete_ = (certificateId: number, hideEdit: Function) => {
		const {productId, updateStateForView} = this.props
		updateStateForView(null,null,true)
		return deleteCertificate(certificateId,()=>{
			updateStateForView(null,false)
		},hideEdit,productId)
	}
	update_ = (formValues: {}, certificateId: number, updateStateForView: Function, hideEdit: Function) => {//formValues, careerId, updateStateForView, hideEdit
		// updateStateForView(null,null,true)
		return updateCertificate(formValues,certificateId, updateStateForView, hideEdit)
	}
	_updateStateForView = (res: CertificateType, error: string, isLoading: boolean) => {
		const {updateStateForView} = this.props
		updateStateForView({error:error,isLoading:isLoading})
		this.setState({...this.state, certificate:res, error:error, isLoading:isLoading})
	}

	render() {
		const {certificate} = this.state
        const {translator} = this.props
		return (
		    <Certificate
                translator={translator}
                certificate={certificate}
                updateStateForView={this._updateStateForView}
                deleteCertificate={this.delete_}
                updateCertificate={this.update_}
		    />
        )
	}
}

type CertificateListType = {
    productId: string,
    createForm: boolean,
    updateStateForView: Function,
    certificates: Array<CertificateType>,
    translator: TranslatorType,
    hideCreateForm: Function
}

export class CertificateList extends Component<CertificateListType> {
  static propTypes = {
    hideCreateForm: PropTypes.func.isRequired,
    createForm: PropTypes.bool.isRequired,
  }

  create = (formValues: {}, hideEdit: Function) => {
    const {productId, updateStateForView} = this.props
    return createCertificate(formValues, updateStateForView, hideEdit, productId)
  }

  render() {
    const {productId, createForm, updateStateForView, translator} = this.props
    let {certificates} = this.props
    return <ListGroup>
      {createForm &&
      <CertificateItemWrapper>
        <CertificateCreateForm translator={translator} hideEdit={this.props.hideCreateForm} create={this.create}/>
      </CertificateItemWrapper>}
      {
        certificates.map(cert => <CertificateContainer
          translator={translator}
          certificate={cert}
          updateStateForView={updateStateForView}
          productId={productId}
          key={cert.id}
        />)
      }
    </ListGroup>
  }
}

type CertificatesProps = {
    productId: string,
    translator: TranslatorType
}

type CertificatesState = {
    createForm: boolean,
    certificates: Array<CertificateType>,
    edit: boolean,
    isLoading: boolean,
    error: ?string,
}

export class Certificates extends Component<CertificatesProps, CertificatesState> {

  constructor() {
    super()
    this.state = {createForm: false, certificates: [], edit: false, isLoading: false, error: null}
  }

  static propTypes = {
    productId: PropTypes.string.isRequired
  }

  componentDidMount() {
    const {productId} = this.props
    const emitting = () => {
      const newState = {...this.state, isLoading: true}
      this.setState(newState)
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/base/certificates/?certificate_parent=${productId}`,
          result: `ProductCertificates-get/${productId}`,
          token: TOKEN
        }
      )

      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/products/${productId}/`,
          result: `product-Posts-get/${productId}`,
          token: TOKEN
        }
			)

		}

		emitting()

		socket.on(`ProductCertificates-get/${productId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			}else{
				const newState = {...this.state, certificates:res, isLoading: false}
				console.log(newState)
				this.setState(newState)
			}

		})
		socket.on(`product-Posts-get/${productId}`, (res) => {
			if (res.detail) {
				const newState: CertificatesState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			} else {
				const newState: CertificatesState = {...this.state, product: res, isLoading: false}
				this.setState(newState)
			}
		})
	}
    showCreateForm = () => {
        this.setState({createForm: true})
    }
    hideCreateForm = () => {
        this.setState({createForm: false})
    }
    updateStateForView = (error,isLoading) =>{
      this.setState({...this.state, error:error, isLoading:isLoading})
    }

  showCreateForm = () => {
    this.setState({createForm: true})
  }
  hideCreateForm = () => {
    this.setState({createForm: false})
  }
  updateStateForView = (error: string, isLoading: boolean) => {
    this.setState({...this.state, error: error, isLoading: isLoading})
  }

  render() {
    const {productId, translator} = this.props
    const {createForm, certificates, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          <div>
            <CategoryTitle
              title={translator['Certificates']}
              showCreateForm={this.showCreateForm}
              createForm={createForm}
            />
            <FrameCard>
              <CertificateList
                translator={translator}
                updateStateForView={this.updateStateForView}
                certificates={certificates}
                productId={productId}
                createForm={createForm}
                hideCreateForm={this.hideCreateForm}
              />
            </FrameCard>
          </div>
        }
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state) => ({translator: getMessages(state)})

export default connect(mapStateToProps)(Certificates)