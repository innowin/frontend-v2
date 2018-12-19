// flow type of CustomerInfoForm
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import {Field, reduxForm} from "redux-form"
import customerInfoValidation from "src/helpers/validations/organizationCustomerInfo"
import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import type {CustomerFormType, CustomerType} from "src/consts/flowTypes/organization/customer"
import constants from "src/consts/constants"
import types from "src/redux/actions/types";
import {createFileFunc} from "../../common/Functions";
import AttachFile from "../../common/inputs/AttachFile";
import {connect} from "react-redux";


type PropsCustomerInfoForm = {
  customer: CustomerType,
  translate: { [string]: string },
  children?: React.Node,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
  tempCustomerPictureId: ? number,
  customerPictureLink: ?string,
  getFile?: Function,
  createFile: Function,
  updateOrgCustomer?: Function,
  createOrgCustomer?: Function,
  hideEdit: Function
}

class CustomerInfoForm extends Component<PropsCustomerInfoForm> {
  static propTypes = {
    customer: PropTypes.object,
    translate: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    tempCustomerPictureId: PropTypes.number,
    getFile: PropTypes.func,
    createFile: PropTypes.func.isRequired,
    updateOrgCustomer: PropTypes.func,
    createOrgCustomer: PropTypes.func,
    hideEdit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {pictureString: '', savingCustomer: false, formValues: null, myTempLastKey: null}
  }

  _handleBase64 = (fileString) => {
    this.setState({...this.state, pictureString: fileString})
  }

  _preSave = () => {
    const myTempLastKey = +new Date()
    this.setState({...this.state, savingCustomer: true, myTempLastKey})
    const {pictureString} = this.state
    const {createFile} = this.props
    const nextActionTypesForCustomerPicture = types.COMMON.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionDataForCustomerPicture = {tempFileKeyName: myTempLastKey}
    const fileIdKey = 'fileId'
    const postPicturesCreateArguments = {
      fileIdKey,
      nextActionType: nextActionTypesForCustomerPicture,
      nextActionData: nextActionDataForCustomerPicture,
    }
    pictureString && createFileFunc(createFile, pictureString, postPicturesCreateArguments)
  }

  _save = (values) => {
    const {organizationId, customer, tempCustomerPictureId, updateOrgCustomer, createOrgCustomer, hideEdit} = this.props
    // TODO handle:customer picture is required is true
    const customer_picture = tempCustomerPictureId || (customer && (customer.customer_picture.id || customer.customer_picture))
    const title = values.title
    const related_customer = 2411
    const formValues = {
      customer_organization: organizationId,
      title,
      related_customer,
      customer_picture,
    }
    if (title && customer_picture && related_customer) {
      if (customer) {
        const customerId: number = customer.id
        updateOrgCustomer({formValues, customerId})
      } else {
        createOrgCustomer({formValues, organizationId})
      }
      hideEdit()
    }
    this.setState({...this.state, savingCustomer: false})
  }


  componentDidUpdate(prevProps, prevState) {
    const {tempCustomerPictureId, tempLastKey, customer} = this.props
    const {savingCustomer, myTempLastKey, formValues} = this.state
    const customerPictureId = customer && (customer.customer_picture.id || customer.customer_picture)
    const existPicture = ((tempLastKey && myTempLastKey && myTempLastKey === tempLastKey) ? tempCustomerPictureId : null)
      || customerPictureId
    if (savingCustomer && formValues && existPicture) {
      this._save(formValues)
    }
  }

  componentDidMount() {
    const {initialize, customer, getFile} = this.props
    if (customer) {
      const customerPictureId = customer.customer_picture.id || customer.customer_picture
      const defaultFormValue = {
        title: customer.title,
        relatedCustomer: customer.related_customer,
        customerPictureIdInputName: customerPictureId,
      }
      initialize(defaultFormValue)
      getFile && !customer.customer_picture.id && getFile(customer.customer_picture)
    }
  }

  _onSubmit = (values: CustomerFormType | CustomerType) => {
    this.setState({...this.state, formValues: values},
      () => this._preSave())
  }


  render() {
    const {customerPictureLink, translate, submitFailed, error, handleSubmit} = this.props
    const {pictureString} = this.state
    return (
      <form onSubmit={handleSubmit(this._onSubmit)}>
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
            required={true}
          />
        </div>

        <div className='form-group'>
          <label>
            {translate['Customer picture'] + ": "}
          </label>
          <AttachFile
            inputId="customerPictureInputId"
            AttachButton={() => (<span>عکس </span>)}
            handleBase64={this._handleBase64}
            handleError={(error) => alert(error)}
            translate={translate}
            allowableFormat={constants.FILE_TYPE.PHOTO}
            className="form-control cursor-pointer"
          />
          {
            (pictureString || customerPictureLink) &&
            <img src={pictureString || customerPictureLink} className="media-preview covered-img" alt=""/>
          }
        </div>

        <div className='form-group'>
          <label>
            {translate['Related customer'] + ": "}
          </label>
          <Field
            name="relatedCustomer"
            type="text"
            component='input'
            label={translate['Title']}
            className='form-control'
            disabled={true}
          />
        </div>

        {submitFailed && <p className="error-message">{error}</p>}

        {this.props.children}

      </form>
    )
  }
}

const mapStateToProps = state => {
  const tempLastKey = Math.max(...state.temp.lastKey)
  const tempCustomerPictureId = state.temp.file[tempLastKey] || null
  return {
    tempCustomerPictureId,
    tempLastKey,
  }
}


CustomerInfoForm = connect(mapStateToProps)(CustomerInfoForm)

export default reduxForm({
  form: 'customerInfoForm',
  validate: customerInfoValidation,
})(CustomerInfoForm)