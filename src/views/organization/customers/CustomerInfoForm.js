// flow type of CustomerInfoForm
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import {Field, reduxForm} from "redux-form"
import customerInfoValidation from "../../../helpers/validations/organizationCustomerInfo"
import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import type {CustomerType} from "../../../consts/flowTypes/organization/customer";

type PropsCustomerInfoForm = {
  onSubmit: Function,
  customer: CustomerType,
  translate: { [string]: string },
  children?: React.Node,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

class CustomerInfoForm extends Component<PropsCustomerInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    customer: PropTypes.object,
    translate: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
  }

  componentDidMount() {
    const {initialize, customer} = this.props
    if(customer){
      const defaultFormValue = {
        title: customer.title,

        //TODO: mohammad fix this hard code numbers
        relatedCustomer: 42,
        customerPicture: 1,
      }
      initialize(defaultFormValue)
    }
    else {
      const defaultFormValue = {
        relatedCustomer: 42,
        customerPicture: 1,
      }
      initialize(defaultFormValue)
    }
  }

  render() {
    const {onSubmit, translate, submitFailed, error, handleSubmit} = this.props
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
              {translate['Customer picture'] + ": "}
            </label>
            <Field
                name="customerPicture"
                type="text"
                component='input'
                label={translate['Title']}
                className='form-control'
                disabled={true}
            />
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

CustomerInfoForm = reduxForm({
  form: 'customerInfoForm',
  validate: customerInfoValidation,
})(CustomerInfoForm)

export default CustomerInfoForm