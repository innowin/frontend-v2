// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form"

import type {ProductFormValuesType, ProductGetType} from "../../../consts/flowTypes/product/productTypes"
import {Confirm} from "../cards/Confirm"
import renderTextField from "../inputs/reduxFormRenderTextField"
import renderTextArea from "../inputs/reduxFormRenderTextArea"
import productInfoValidation from "../../../helpers/validations/userProductInfo"

type PropsProductEditForm = {
  update: Function,
  deleteProduct: Function,
  hideEdit: Function,
  product: ProductGetType,
  translate: { [string]: string },
  ownerId: number,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

type StateProductEditForm = {
  confirm: boolean
}

class ProductInfoForm extends Component<PropsProductEditForm, StateProductEditForm> {
  static propTypes = {
    update: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    ownerId: PropTypes.number.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
  }

  constructor(props: PropsProductEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  componentDidMount() {
    const {initialize, product} = this.props
    if (product) {
      const defaultFormValue = {
        name: product.name,
        description: product.description,
      }
      initialize(defaultFormValue)
    }
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: ProductFormValuesType) => {
    const {product, update, hideEdit} = this.props

    const productId: number = product.id

    // FixMe: mohammad tag input not work
    const formFormat = {
      name: product.name === values.name ? null : values.name,
      tag: product.tag === values.tag ? null : values.tag,
      description: product.description === values.description ? null : values.description,
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
    update({formValues, productId})
    hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {hideEdit, translate, deleteProduct, submitFailed, error, handleSubmit,} = this.props

    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteProduct}/>
            : <form onSubmit={handleSubmit(this._onSubmit)}>
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

              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>

            </form>
    )
  }
}

ProductInfoForm = reduxForm({
  form: 'productInfoForm',
  validate: productInfoValidation,
})(ProductInfoForm)

export default ProductInfoForm