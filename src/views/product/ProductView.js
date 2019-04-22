import React, {Component} from 'react'
import ProductPosts from '../product/posts'
import ProductBasicInformation from '../product/basicInformation'
import {NavLink, Switch, Redirect} from 'react-router-dom'
import PropsRoute from 'src/consts/PropsRoute'
import {connect} from 'react-redux'
import SideBar from '../bars/ProductSidebar'
import ProductActions from 'src/redux/actions/commonActions/productActions'
import {bindActionCreators} from 'redux'
import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import {getCountries, getProvinces, getCities} from 'src/redux/actions/commonActions/location'
import makeProvinceSelectorById from '../../redux/selectors/common/location/getProvinceById'
import {provinceSelector} from '../../redux/selectors/common/location/getProvinceByCountry'
import makeCountrySelectorById from '../../redux/selectors/common/location/getCountryById'
import getAllCountries from '../../redux/selectors/common/location/getCountry'
import makeProductSelectorById from '../../redux/selectors/common/product/getProductById'
import {getMessages} from 'src/redux/selectors/translateSelector'
import GetUserActions from 'src/redux/actions/user/getUserActions'
import Material from '../common/components/Material'
import postActions from 'src/redux/actions/commonActions/postActions'
import {citySelector} from '../../redux/selectors/common/location/getCityByProvince'
import {getCategories} from 'src/redux/actions/commonActions/categoryActions'
import {makeCategorySelector} from '../../redux/selectors/common/category/getCategoriesByParentId'
import {NewRightArrow} from 'src/images/icons'
import {ProductWhite} from 'src/images/icons'
import productActions from '../../redux/actions/commonActions/productActions'


class ProductView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getData: true,
      hideTopBar: false,
    }
    this._onScroll = this._onScroll.bind(this)
  }

  componentDidMount() {
    window.scrollTo({top: 0, behavior: 'smooth'})
    const {match, actions} = this.props
    const {params} = match
    const productId = params.id
    actions.getProductInfo(productId)
    actions.getPrice(productId)
    actions.getFileByFileRelatedParentId({fileRelatedParentId: productId, fileParentType: constants.FILE_PARENT.PRODUCT})
    actions.getPosts({postRelatedProductId: productId})
    actions.getCountries()
    actions.getCategories()
    document.addEventListener('scroll', this._onScroll)
  }

  componentWillReceiveProps(nextProps, nextContext): void {
    const {getData} = this.state
    const {product, actions} = nextProps

    if (product && getData) {
      this.setState({...this.state, getData: false}, () => {
        const id = product.product_owner.id ? product.product_owner.id : product.product_owner
        actions.getUserByUserId(id)
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._onScroll)
  }

  _onScroll() {
    if (document.body.clientWidth <= 480) {
      if (window.scrollY > this.state.scrollY) {
        this.setState({...this.state, hideTopBar: true, scrollY: window.scrollY})
      }
      else {
        this.setState({...this.state, hideTopBar: false, scrollY: window.scrollY})
      }
    }
  }

  backHistory = () => {
    window.history.back()
  }

  render() {
    const {hideTopBar} = this.state
    const {match, translate, product, country, province, product_owner, product_category, current_user_identity, countries, provinces, cities, categories, actions} = this.props
    const {getProvinces, getCities} = actions
    const {path, url} = match
    return (
        <div className='all-products-parent'>

          <div className={hideTopBar ? 'product-header-top' : 'product-header'}>
            <Material backgroundColor='rgba(255,255,255,0.5)' className='back-button-material' content={<NewRightArrow className='back-button-product'/>} onClick={this.backHistory}/>
            <ProductWhite className='product-header-svg'/>
            <div className='product-header-title'>{product.name}</div>
          </div>

          <SideBar product={product}
                   country={country}
                   province={province}
                   product_owner={product_owner}
                   product_category={product_category}
                   current_user_identity={current_user_identity}
                   countries={countries}
                   provinces={provinces}
                   cities={cities}
                   getProvinces={getProvinces}
                   getCities={getCities}
                   categories={categories}
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
  const productId = props.match.params.id
  const product = makeProductSelectorById()(state, productId)
  const {product_related_country, product_related_province} = product
  return {
    product,
    country: makeCountrySelectorById()(state, product_related_country),
    province: makeProvinceSelectorById()(state, product_related_province),
    countries: getAllCountries(state),
    provinces: provinceSelector(state),
    cities: citySelector(state),
    categories: makeCategorySelector()(state),
    product_owner: state.identities.list[product.product_owner.id ? product.product_owner.id : product.product_owner],
    product_category: state.common.category.list[product.product_category],
    current_user_identity: state.auth.client.identity.content,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserByUserId: GetUserActions.getUserByUserId,
    getPrice: productActions.getProductPrice,
    getProductInfo: ProductActions.getProductInfo,
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId,
    getCountries,
    getCategories,
    getProvinces,
    getCities,
    getPosts: postActions.filterPostsByPostRelatedProduct,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)