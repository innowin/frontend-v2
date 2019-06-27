import type {ProductGetType} from "../../../consts/flowTypes/product/productTypes";
import {PureComponent} from 'react'
import * as PropTypes from 'prop-types';
import ProductInfoForm from "./ProductInfoForm";
import * as React from "react";
import {VerifyWrapper} from "../cards/Frames";
import ProductInfoView from "./ProductInfoView";

type PropsProductInfo = {
  updateProduct: Function,
  deleteProduct: Function,
  product: ProductGetType,
  ownerId: number,
  translate: { [string]: string },
}
type StateProductInfo = {
  edit: boolean,
}

class ProductInfo extends PureComponent<PropsProductInfo, StateProductInfo> {
  static propTypes = {
    product: PropTypes.object.isRequired,
    updateProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    ownerId: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {edit: false}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _delete = () => {
    const {deleteProduct, product} = this.props
    const productId = product.id
    const productIdentityUserId = product.product_owner.identity_user && product.product_owner.identity_user.id

    const productIdentityOrganId = product.product_owner.identity_organization && product.product_owner.identity_organization.id
    const productOwnerId = productIdentityUserId || productIdentityOrganId
    deleteProduct({productId, productOwnerId})
    this._hideEdit()
  }

  render() {
    const {translate, updateProduct, ownerId, product} = this.props
    const {edit} = this.state
    // FixMe: mohammad isLoading and error come from redux
    return (
        <VerifyWrapper isLoading={false} error={false}>
          {edit ? <ProductInfoForm
                  ownerId={ownerId}
                  product={product}
                  hideEdit={this._hideEdit}
                  update={updateProduct}
                  deleteProduct={this._delete}
                  translate={translate}
              />
              : <ProductInfoView product={product} showEdit={this._showEdit}/>
          }
        </VerifyWrapper>
    )
  }
}

export default ProductInfo