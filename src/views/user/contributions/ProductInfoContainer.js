import type {ProductGetType} from "../../../consts/flowTypes/product/productTypes";
import {Component} from "react";
import PropTypes from "prop-types";
import {ItemWrapper} from "../../common/cards/Frames";
import ProductInfoCreateForm from "./ProductInfoCreateForm";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as React from "react";
import ProductInfo from './ProductInfo'
import {ContributionIcon} from "../../../images/icons";
import {makeGetProducts} from "../../../redux/selectors/common/product/userGetProductSelector";

import ProductActions from "src/redux/actions/commonActions/productActions"

type PropsProducts = {
  userId: number,
  identityId: number,
  identityType: string,
  translate: { [string]: string },
  products: (ProductGetType)[],
  actions: {
    getProductsByIdentity: Function,
    deleteProduct: Function,
  },
  isLoading: boolean,
  error: {} | string | null,
}

type StateProducts = {
  createForm: boolean,
}

class ProductInfoContainer extends Component<PropsProducts, StateProducts> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    identityId: PropTypes.number.isRequired,
    identityType: PropTypes.string.isRequired,
    translate: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
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

  _create = ({formValues}) => {
    // const {actions, userId} = this.props
    // const {createProductByIdentity} = actions
    // createProductByIdentity({userId, formValues})
  }

  componentDidMount() {
    const {actions, identityType, userId, identityId} = this.props
    const {getProductsByIdentity} = actions
    getProductsByIdentity({identityId, productOwnerId: userId, productOwnerType: identityType})
  }

  render() {
    const {translate, products, userId, actions} = this.props
    const {updateProduct, deleteProduct} = actions

    const {createForm} = this.state
    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          {
            createForm &&
            <ItemWrapper icon={ContributionIcon}>
              <ProductInfoCreateForm hideCreateForm={this._hideCreateForm}
                                     create={this._create} translate={translate}
                                     userId={userId}/>
            </ItemWrapper>
          }
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
        </div>
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