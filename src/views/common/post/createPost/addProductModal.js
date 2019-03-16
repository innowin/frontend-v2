import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import ProductActions from 'src/redux/actions/commonActions/productActions/productActions'
import ProductInfoView from '../../contributions/ProductInfoView'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {Component} from 'react'
import {ContributionIcon} from 'src/images/icons'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getProductsSelector} from 'src/redux/selectors/common/product/userGetProductSelector'
import {TransitionGroup, CSSTransition} from 'react-transition-group'


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
      selectedProduct: undefined,
      productLink: '',
      getData: false,
    }
  }

  componentDidMount(): void {
    if (this.state.getData) {
      let {actions, identityId, ownerId} = this.props
      let {getProductsByIdentity} = actions
      getProductsByIdentity({identityId, productOwnerId: ownerId})
    }
  }

  _selectProduct = (product) => {
    this.setState({...this.state, selectedProduct: product})
  }

  componentWillMount(): void {
    let {actions, identityId, ownerId, identityType} = this.props
    let {getProductsByIdentity} = actions
    if (identityId && ownerId && identityType)
      getProductsByIdentity({identityId, productOwnerId: ownerId})
    else this.setState({...this.state, getData: true})
  }

  shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
    return nextProps.identityId !== this.props.identityId ||
        nextProps.ownerId !== this.props.ownerId ||
        nextProps.identityType !== this.props.identityType ||
        nextProps.addProductModal !== this.props.addProductModal ||
        nextState.selectedProduct !== this.state.selectedProduct ||
        nextState.productLink !== this.state.productLink
  }

  render() {
    const {addProductModal, cancelFunc, submitFunc, products, translate, ownerId, actions} = this.props
    const {getProductInfo} = actions
    const {selectedProduct, productLink} = this.state
    return (
        <div className={addProductModal ? 'post-component-footer-link-modal' : 'post-component-footer-link-modal-hide'}>
          <TransitionGroup>
            {
              addProductModal ?
                  <CSSTransition key={5} timeout={50} classNames='fade'>
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
                          {products.map((product, key) =>
                              <div className='product-wrapper' key={key}>
                                <ProductInfoView selected={product === selectedProduct}
                                                 onClick={() => this._selectProduct(product)} translate={translate}
                                                 product={product} ownerId={ownerId}/>
                              </div>
                          )}
                        </div>
                      </div>
                      <div className='post-component-footer-link-modal-container-buttons'>
                        <div className='post-component-footer-link-modal-cancel-btn'
                             onClick={() => {
                               this.setState({...this.state, selectedProduct: undefined})
                               cancelFunc()
                             }
                             }>لغو
                        </div>
                        <div className='post-component-footer-link-modal-submit-btn'
                             onClick={() => {
                               this.setState({...this.state, selectedProduct: undefined})
                               if (productLink) {
                                 let spliced = productLink.split('/')
                                 let productIndex = spliced.indexOf('product')
                                 getProductInfo(

                                 )
                                 submitFunc(selectedProduct, spliced[productIndex + 1])
                               } else {
                                 submitFunc(selectedProduct, undefined)
                               }
                             }}>ثبت
                        </div>
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
    getProductInfo: ProductActions.getProductInfo,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal)