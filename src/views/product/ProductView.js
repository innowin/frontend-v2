import * as React from 'react'
import {Component} from 'react'
import ProductPosts from "../product/posts"
import ProductBasicInformation from "../product/basicInformation"
import {NavLink, Switch, Redirect} from "react-router-dom"
import PropsRoute from "src/consts/PropsRoute"
import {connect} from "react-redux"
import SideBar from '../bars/productBar/index'
import ProductActions from 'src/redux/actions/commonActions/productActions/productActions'
import {bindActionCreators} from 'redux'
import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import {getCountryById, getProvinceById} from 'src/redux/actions/commonActions/location'
import makeProvinceSelectorById from '../../redux/selectors/common/location/getProvinceById'
import makeCountrySelectorById from '../../redux/selectors/common/location/getCountryById'
import makeProductSelectorById from '../../redux/selectors/common/product/getProductById'
import {getMessages} from 'src/redux/selectors/translateSelector'
import GetUserActions from 'src/redux/actions/user/getUserActions'
import Material from '../common/components/Material'
import postActions from 'src/redux/actions/commonActions/postActions'

class ProductView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getData: true
    }
  }

  componentDidMount(): void {
    const {match, actions} = this.props
    const {params} = match
    const productId = params.id
    actions.getProductInfo(productId)
    actions.getFileByFileRelatedParentId({fileRelatedParentId: productId, fileParentType: constants.FILE_PARENT.PRODUCT})
    actions.getPosts({postRelatedProductId: productId})
  }

  componentWillReceiveProps(nextProps, nextContext): void {
    const {getData} = this.state
    const {product, actions} = nextProps

    if (product && getData) {
      this.setState({...this.state, getData: false}, () => {
        actions.getCountryById(product.product_related_country)
        actions.getProvinceById(product.product_related_province)
        actions.getUserByUserId(product.product_user)
      })
    }
  }

  render() {
    const {match, translate, product, country, province, product_owner, product_category, current_user_identity} = this.props
    const {path, url} = match

    return (
        <div className='all-exchanges-parent'>

          <SideBar product={product}
                   country={country}
                   province={province}
                   product_owner={product_owner}
                   product_category={product_category}
                   current_user_identity={current_user_identity}
          />

          <div className='product-container'>
            <div className='header-container'>
              <NavLink to={`${url}/basicInformation`} className='header-container-item' activeClassName='header-container-item-active'>
                <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content='درباره محصول'/>
              </NavLink>

              <NavLink to={`${url}/Posts`} className='header-container-item' activeClassName='header-container-item-active'>
                <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first' content='دیدگاه مشتریان'/>
              </NavLink>

              <NavLink to={`${url}/Certificates`} className='header-container-item' activeClassName='header-container-item-active'>
                <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content='تاریخچه عرضه'/>
              </NavLink>
            </div>

            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
              <PropsRoute path={`${path}/basicInformation`}
                          component={ProductBasicInformation}
                          product={product}
                          translator={translate}
                          current_user_identity={current_user_identity}
              />
              <PropsRoute path={`${path}/Posts`}
                          component={ProductPosts}
                          product={product}
                          translator={translate}
              />
              {/*<PropsRoute path={`${path}/Certificates`} component={ProductCertificates}*/}
              {/*productId={productId}/>*/}
              {/*<PropsRoute path={`${path}/Ratings`} component={ProductRating} productId={productId} translator={translate}/>*/}
              {/*<PropsRoute path={`${path}/Represents`} component={Represents} productId={productId} translator={translate}/>*/}
            </Switch>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const provinceSelectorById = makeProvinceSelectorById()
  const countrySelectorById = makeCountrySelectorById()
  const productSelectorById = makeProductSelectorById()
  const productId = props.match.params.id
  const product = productSelectorById(state, productId)
  const {product_related_country, product_related_province} = product
  return {
    product,
    country: countrySelectorById(state, product_related_country),
    province: provinceSelectorById(state, product_related_province),
    translate: getMessages(state),
    product_owner: state.users.list[product.product_user],
    product_category: state.common.category.list[product.product_category],
    current_user_identity: state.auth.client.identity.content
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserByUserId: GetUserActions.getUserByUserId,
    getProductInfo: ProductActions.getProductInfo,
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId,
    getCountryById,
    getProvinceById,
    getPosts: postActions.filterPostsByPostRelatedProduct
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)