import React from 'react'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import ProductActions from 'src/redux/actions/commonActions/productActions'
import ProductInfoView from '../../contributions/ProductInfoView'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {ContributionIcon} from 'src/images/icons'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getProductsSelector} from 'src/redux/selectors/common/product/userGetProductSelector'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {Component} from 'react'

class AddProductModal extends Component {
  static defaultProps = {
    addProductModal: false,
  }
  static propTypes = {
    addProductModal: PropTypes.bool,
    cancelFunc: PropTypes.func.isRequired,
    submitFunc: PropTypes.func.isRequired,
    getProductsByIdentity: PropTypes.func,
    productOwnerId: PropTypes.number,
    identityId: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: null,
      selectedId: null,
      loading: false,
    }
  }

  componentDidMount() {
    let {actions, ownerId} = this.props
    let {getProductsByIdentity} = actions
    if (ownerId) getProductsByIdentity({productOwnerId: ownerId})
  }

  componentWillReceiveProps(nextProps) {
    const {allProducts} = nextProps
    const {selectedId, loading} = this.state

    if (loading && allProducts[selectedId]) {
      this.setState({...this.state, loading: false, selectedId: null, selectedProduct: allProducts[selectedId]})
    }
  }

  _selectProduct = (product) => this.setState({...this.state, selectedProduct: product})

  handleLink = (event) => {
    const {getProductInfo} = this.props
    const spliced = event.target.value.split('/')
    const productIndex = spliced.indexOf('product')
    if (spliced.length > 0 && !isNaN(productIndex) && productIndex > 0) {
      const selectedProduct = spliced[productIndex + 1]
      getProductInfo(selectedProduct)
      this.setState({...this.state, selectedId: selectedProduct, loading: true})
    }
    else this.setState({...this.state, selectedId: null, loading: false})
  }

  handleCancel = () => {
    const {cancelFunc} = this.props
    this.setState({...this.state, selectedProduct: null}, () => cancelFunc())
  }

  submit = () => {
    if (!this.state.loading) {
      const {submitFunc} = this.props
      const {selectedProduct} = this.state
      this.setState({
        ...this.state,
        selectedProduct: null,
        selectedId: null,
        loading: false,
      }, () => {
        submitFunc(selectedProduct)
      })
    }
  }

  render() {
    const {addProductModal, products} = this.props
    const {selectedProduct, loading} = this.state
    return (
        <div className={addProductModal ? 'post-component-footer-link-modal' : 'post-component-footer-link-modal-hide'}>
          <TransitionGroup>
            {
              addProductModal ?
                  <CSSTransition key={5} timeout={50} classNames='fade'>
                    <div className='post-component-footer-add-product-modal-container'>
                      <div className='post-component-footer-link-modal-container-title'>
                        <ContributionIcon className='post-component-footer-logos'/>
                        افزودن محصول
                      </div>
                      <div className='product-link-container'>
                        <span className='product-title'>لینک محصول</span>
                        <input onChange={this.handleLink} type='text' className='add-product-input post-component-footer-link-modal-container-input'/>
                      </div>
                      <div className='my-products-container'>
                        <span className='product-title'>محصولات من</span>
                        <div className='products'>
                          {
                            products.map((product, key) =>
                                <div className='product-wrapper' key={key}>
                                  <ProductInfoView selected={product === selectedProduct} onClick={() => this._selectProduct(product)} product={product}/>
                                </div>,
                            )
                          }
                        </div>
                      </div>
                      <div className='post-component-footer-link-modal-container-buttons'>
                        <div className='post-component-footer-link-modal-cancel-btn' onClick={this.handleCancel}>لغو</div>
                        <div style={{opacity: loading ? 0.5 : 1}} className='post-component-footer-link-modal-submit-btn' onClick={this.submit}>ثبت</div>
                      </div>
                    </div>
                  </CSSTransition> : null
            }
          </TransitionGroup>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const client = state.auth.client
  const isUser = client.organization === null
  const identityType = isUser ? constants.USER_TYPES.USER : constants.USER_TYPES.ORG
  const ownerId = client.identity.content
  const identityId = client.identity.content
  const inputProp = {ownerId}

  return {
    products: getProductsSelector(state, inputProp),
    allProducts: state.common.product.products.list,
    identityType,
    ownerId,
    identityId,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getProductsByIdentity: ProductActions.getProductsByIdentity,
    getProductInfo: ProductActions.getProductInfo,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal)