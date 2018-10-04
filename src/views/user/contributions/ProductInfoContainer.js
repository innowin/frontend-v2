// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import ProductActions from "src/redux/actions/commonActions/productActions/productActions"
import ProductInfo from './ProductInfo'
import type {ProductGetType} from "../../../consts/flowTypes/product/productTypes"
import {ContributionIcon} from "../../../images/icons"
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames"
import {makeGetProducts} from "../../../redux/selectors/common/product/userGetProductSelector"

type PropsProducts = {
  userId: number,
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

type StateProducts = {
  createForm: boolean,
}

class ProductInfoContainer extends React.Component<PropsProducts, StateProducts> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    identityId: PropTypes.number.isRequired,
    identityType: PropTypes.string.isRequired,
    translate: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      createForm: false,
    }
  }

  _showCreateForm = () => {
    this.setState({createForm: true})
  }

  _hideCreateForm = () => {
    this.setState({createForm: false})
  }

  componentDidMount() {
    const {actions, identityType, userId, identityId} = this.props
    const {getProductsByIdentity} = actions
    getProductsByIdentity({identityId, productOwnerId: userId, productOwnerType: identityType})
  }

  render() {
    const {translate, products, userId, actions} = this.props
    const {updateProduct, deleteProduct} = actions

    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <ItemWrapper icon={<ContributionIcon/>}>
          <ItemHeader title={translate['Products']}/>
          {
            products.map((product, index) => (
                <ProductInfo
                    userId={userId}
                    updateProduct={updateProduct}
                    deleteProduct={deleteProduct}
                    product={product}
                    key={index + "ProductInfo"}
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
  const getProducts = makeGetProducts(state, ownProps)

  return (state, props) => {
    const {userId} = props
    const stateUser = state.users[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const productObject = (stateUser && stateUser.products) || defaultObject

    return {
      products: getProducts(state, props),
      isLoading: productObject.isLoading,
      error: productObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getProductsByIdentity: ProductActions.getProductsByIdentity,
    updateProduct: ProductActions.updateProduct,
    deleteProduct: ProductActions.deleteProduct,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoContainer)