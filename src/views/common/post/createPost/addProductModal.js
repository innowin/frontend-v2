import React, {Component} from "react"
import PropTypes from "prop-types"
import {ContributionIcon} from 'src/images/icons'
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import ProductActions from "src/redux/actions/commonActions/productActions/productActions";
import constants from "src/consts/constants";
import {getProductsSelector} from "src/redux/selectors/common/product/userGetProductSelector";
import ProductInfoView from "../../contributions/ProductInfoView";
import {getMessages} from "../../../../redux/selectors/translateSelector";


class AddProductModal extends Component {
  static defaultProps = {
    addProductModal: false,
  }
  static propTypes = {
    addProductModal: PropTypes.bool,
    cancelFunc: PropTypes.func.isRequired,
    submitFunc: PropTypes.func.isRequired,
    getProductsByIdentity: PropTypes.func,
    productOwnerType: PropTypes.string,
    productOwnerId: PropTypes.number,
    identityId: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: undefined,
      productLink: ''
    }
  }

  componentDidMount(): void {
    const {actions, identityId, ownerId, identityType} = this.props
    const {getProductsByIdentity} = actions
    getProductsByIdentity({identityId, productOwnerId: ownerId, productOwnerType: identityType})
  }

  _selectProduct = (product) => {
    this.setState({...this.state, selectedProduct: product})
  }

  render() {
    const {addProductModal, cancelFunc, submitFunc, products, translate, ownerId, actions} = this.props
    const {getProductInfo} = actions
    const {selectedProduct, productLink} = this.state
    return (
        <div className={addProductModal ? "post-component-footer-link-modal" : "post-component-footer-link-modal-hide"}>
          <div ref={e => this.addProductModalRef = e} className='post-component-footer-add-product-modal-container'>
            <div className='post-component-footer-link-modal-container-title'>
              <ContributionIcon className='post-component-footer-logos'/>
              افزودن محصول
            </div>
            <div className='product-link-container'>
              <span className='product-title'>لینک محصول</span>
              <input onChange={(event) => this.setState({...this.state, productLink: event.target.value})} type='text'
                     className='add-product-input post-component-footer-link-modal-container-input'/>
            </div>
            <div className='my-products-container'>
              <span className='product-title'>محصولات من</span>
              <div className='products'>
                {products.map(product =>
                    <div className='product-wrapper'>
                      <ProductInfoView selected={product === selectedProduct}
                                       onClick={() => this._selectProduct(product)} translate={translate}
                                       product={product} ownerId={ownerId}/>
                    </div>
                )}
              </div>
            </div>
            <div className='post-component-footer-link-modal-container-buttons'>
              <button className='post-component-footer-link-modal-cancel-btn'
                      onClick={() => {
                        this.setState({...this.state, selectedProduct: undefined});
                        cancelFunc()}
                      }>لغو
              </button>
              <button className='post-component-footer-link-modal-submit-btn'
                      onClick={() => {
                        this.setState({...this.state, selectedProduct: undefined});
                        console.log(productLink, 'sssssssssssss')
                        if (productLink) {
                          let spliced = productLink.split('/')
                          let productIndex = spliced.indexOf('product')
                          getProductInfo(

                          )
                          submitFunc(selectedProduct, spliced[productIndex + 1])
                        }
                        else {
                          submitFunc(selectedProduct, undefined)
                        }
                      }}>ثبت
              </button>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const client = state.auth.client
  const isUser = client.organization === null
  const identityType = isUser ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
  const ownerId = isUser ? client.user.id : client.organization.id
  const identityId = client.identity.content
  const inputProp = {ownerId, identityType}

  return {
    products: getProductsSelector(state, inputProp),
    identityType,
    ownerId,
    identityId,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getProductsByIdentity: ProductActions.getProductsByIdentity,
    getProductInfo : ProductActions.getProductInfo,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal)