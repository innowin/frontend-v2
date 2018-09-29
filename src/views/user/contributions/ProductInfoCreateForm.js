import PropTypes from "prop-types";
import * as React from "react";
import ProductInfoForm from './ProductInfoForm'
import type {ProductFormValuesType} from "../../../consts/flowTypes/product/ProductTypes";

type PropsProductCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string },
  userId: number,
}

const ProductInfoCreateForm = (props: PropsProductCreateForm) => {

  const _onSubmit = (values: ProductFormValuesType) => {
    const {hideCreateForm, create} = props

    const formFormat = {
      title : values.title,
      description: values.description,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    create({formValues})
    hideCreateForm()
  }

  const {translate, userId, hideEdit} = props
  return (
      <ProductInfoForm userId={userId}
                     translate={translate}
                     onSubmit={_onSubmit}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Create']}</button>
        </div>
      </ProductInfoForm>
  )
}

ProductInfoCreateForm.propTypes = {
  hideCreateForm: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
}

export default ProductInfoCreateForm