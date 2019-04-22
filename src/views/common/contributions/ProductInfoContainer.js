// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ProductActions from 'src/redux/actions/commonActions/productActions'
import ProductInfo from './ProductInfo'
import type {ProductGetType} from '../../../consts/flowTypes/product/productTypes'
import {ContributionIcon} from '../../../images/icons'
import {ItemHeader, ItemWrapper} from '../cards/Frames'
import {getProductsSelector} from '../../../redux/selectors/common/product/userGetProductSelector'
import constants from 'src/consts/constants'

type PropsProducts = {
  ownerId: number,
  identityId: number,
  identityType: string,
  translate: { [string]: string },
  products: (ProductGetType)[],
  actions: {
    getProductsByIdentity: Function,
    deleteProduct: Function,
    updateProduct: Function,
  },
  isLoading: boolean,
  error: {} | string | null,
}

class ProductInfoContainer extends React.Component<PropsProducts> {

  static propTypes = {
    ownerId: PropTypes.number.isRequired,
    identityType: PropTypes.string.isRequired,
    translate: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  componentDidMount() {
    const {actions, ownerId} = this.props
    const {getProductsByIdentity} = actions
    getProductsByIdentity({identityId: ownerId, productOwnerId: ownerId})
  }

  render() {
    const {translate, products, ownerId, actions} = this.props
    const {updateProduct, deleteProduct} = actions

    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <ItemWrapper icon={<ContributionIcon/>}>
          <ItemHeader title={translate['Products']}/>
          {
            products.map((product, index) => (
                <ProductInfo
                    ownerId={ownerId}
                    updateProduct={updateProduct}
                    deleteProduct={deleteProduct}
                    product={product}
                    key={index + 'ProductInfo'}
                    translate={translate}
                />
            ))
          }
        </ItemWrapper>
        //</VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {ownerId, identityType} = ownProps
  const stateOwner = (identityType === constants.USER_TYPES.USER && state.identities[ownerId]) || (
      identityType === constants.USER_TYPES.ORG && state.identities[ownerId]
  )
  const defaultObject = {content: [], isLoading: false, error: null}
  const productObject = (stateOwner && stateOwner.products) || defaultObject
  return {
    products: getProductsSelector(state, ownProps),
    isLoading: productObject.isLoading,
    error: productObject.error,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getProductsByIdentity: ProductActions.getProductsByIdentity,
    updateProduct: ProductActions.updateProduct,
    deleteProduct: ProductActions.deleteProduct,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoContainer)