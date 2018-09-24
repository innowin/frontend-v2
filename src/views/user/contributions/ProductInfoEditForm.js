import type {ProductFormValuesType, ProductGetType} from "../../../consts/flowTypes/product/productTypes";
import {Component} from "react";
import PropTypes from "prop-types";
import * as React from "react";
import {Confirm} from "../../common/cards/Confirm";
import ProductInfoForm from './ProductInfoForm'

type PropsProductEditForm = {
  update: Function,
  deleteProduct: Function,
  hideEdit: Function,
  product: ProductGetType,
  translate: { [string]: string },
  userId: number,
}

type StateProductEditForm = {
  confirm: boolean
}

class ProductInfoEditForm extends Component<PropsProductEditForm, StateProductEditForm> {
  static propTypes = {
    update: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsProductEditForm) {
    super(props)
    this.state = {confirm: false}
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
      title: product.title === values.title ? null : values.title,
      tag: product.tag === values.tag ? null : values.tag,
      description: product.description === values.description ? null : values.description,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    update({formValues, productId})
    // hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {hideEdit, translate, product, deleteProduct} = this.props

    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteProduct}/>
            : <ProductInfoForm onSubmit={this._onSubmit} product={product} translate={translate}>
              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>
            </ProductInfoForm>
    )
  }
}

export default ProductInfoEditForm