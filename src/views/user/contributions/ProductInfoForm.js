import type {productType} from "../../../consts/flowTypes/user/others";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";
import {TextInput} from "../../common/inputs/TextInput";
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../common/inputs/reduxFormRenderTextField";
import renderTextArea from "../../common/inputs/reduxFormRenderTextArea";
import productInfoValidation from "../../../helpers/validations/userProductInfo";

type PropsProductForm = {
  onSubmit: Function,
  product?: productType,
  translate: { [string]: string },
  children?: React.Node,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

class ProductInfoForm extends Component<PropsProductForm> {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.object,
    translate: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
  }

  componentDidMount() {
    const {initialize, product} = this.props
    if(product){
      const defaultFormValue = {
        title: product.title,
        description: product.description,
      }
      initialize(defaultFormValue)
    }
  }

  // FixMe: mohammad tag input not work
  render() {
    const {onSubmit, translate, submitFailed, error, handleSubmit, product} = this.props
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
              {translate['Description'] + ": "}
            </label>
            <Field
                name="description"
                type="text"
                component={renderTextArea}
                label={translate['Description']}
                textFieldClass='form-control'
            />
          </div>

          {submitFailed && <p className="error-message">{error}</p>}

          {this.props.children}
        </form>
    )
  }
}

ProductInfoForm = reduxForm({
  form: 'productInfoForm',
  validate: productInfoValidation,
})(ProductInfoForm)

export default ProductInfoForm