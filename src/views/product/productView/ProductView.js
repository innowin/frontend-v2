import React, {PureComponent} from 'react'
import ProductPosts from './Posts'
import ProductBasicInformation from './BasicInformation'
import {NavLink, Switch, Redirect, Link} from 'react-router-dom'
import PropsRoute from 'src/consts/PropsRoute'
import {connect} from 'react-redux'
import SideBar from './ProductSidebar'
import ProductActions from 'src/redux/actions/commonActions/productActions'
import {bindActionCreators} from 'redux'
import makeProvinceSelectorById from 'src/redux/selectors/common/location/getProvinceById'
import makeCitySelectorById from 'src/redux/selectors/common/location/getCityById'
import {provinceSelector} from 'src/redux/selectors/common/location/getProvinceByCountry'
import makeCountrySelectorById from 'src/redux/selectors/common/location/getCountryById'
import {priceListSelector} from 'src/redux/selectors/common/product/getProductPrices'
import getAllCountries from 'src/redux/selectors/common/location/getCountry'
import makeProductSelectorById from 'src/redux/selectors/common/product/getProductById'
import {getMessages} from 'src/redux/selectors/translateSelector'
import Material from '../../common/components/Material'
import postActions from 'src/redux/actions/commonActions/postActions'
import {citySelector} from 'src/redux/selectors/common/location/getCityByProvince'
import {makeCategorySelector} from 'src/redux/selectors/common/category/getCategoriesByParentId'
import {NewRightArrow} from 'src/images/icons'
import {ProductWhite} from 'src/images/icons'
import productActions from '../../../redux/actions/commonActions/productActions'
import {getCategories} from '../../../redux/actions/commonActions/categoryActions'

class ProductView extends PureComponent {
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
    const {match, actions, isLogin} = this.props
    const {params} = match
    const productId = params.id
    actions.getProductInfo(productId, true)
    actions.getPrice(productId)
    actions.getCategories()
    actions.getPosts({postRelatedProductId: productId, token: !isLogin})
    document.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._onScroll)
  }

  _onScroll() {
    if (document.body.clientWidth <= 480) {
      if (window.scrollY > this.state.scrollY) this.setState({...this.state, hideTopBar: true, scrollY: window.scrollY})
      else this.setState({...this.state, hideTopBar: false, scrollY: window.scrollY})
    }
  }

  render() {
    const {hideTopBar} = this.state
    const {match, translate, product, country, province, city, product_owner, product_category, current_user_identity, countries, provinces, cities, categories, posts, product_price} = this.props
    const {path, url} = match
    return (
        <div className='all-products-parent'>
          <div className={hideTopBar ? 'product-header-top' : 'product-header'}>
            <Link to='/products/product_explorer'><Material backgroundColor='rgba(255,255,255,0.5)' className='back-button-material' content={<NewRightArrow className='back-button-product'/>}/></Link>
            <ProductWhite className='product-header-svg'/>
            <div className='product-header-title'>{product.name}</div>
          </div>
          <SideBar product={product}
                   country={country}
                   province={province}
                   city={city}
                   product_owner={product_owner}
                   product_category={product_category}
                   current_user_identity={current_user_identity}
                   countries={countries}
                   provinces={provinces}
                   cities={cities}
                   categories={categories}
                   product_price={product_price}
          />

          <main className='product-container'>
            <div className='header-container'>
              <NavLink to={`${url}/basicInformation`} className='header-container-item' activeClassName='header-container-item-active'>
                <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content='درباره محصول'/>
              </NavLink>

              <NavLink to={`${url}/Posts`} className='header-container-item' activeClassName='header-container-item-active'>
                <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first' content='تاریخچه عرضه'/>
              </NavLink>
            </div>

            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
              <PropsRoute path={`${path}/basicInformation`}
                          component={ProductBasicInformation}
                          product={product}
                          translator={translate}
                          current_user_identity={current_user_identity}
                          product_owner={product_owner}
              />
              <PropsRoute path={`${path}/Posts`}
                          posts={posts}
                          component={ProductPosts}
                          product={product}
                          translator={translate}
              />
            </Switch>
          </main>
        </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id
  const product = makeProductSelectorById()(state, productId)
  const {product_related_country, product_related_province, product_related_town} = product
  return {
    isLogin: state.auth.client.identity.content,
    product_price: priceListSelector(state, productId),
    product,
    country: makeCountrySelectorById()(state, product_related_country),
    province: makeProvinceSelectorById()(state, product_related_province),
    city: makeCitySelectorById()(state, product_related_town),
    countries: getAllCountries(state),
    provinces: provinceSelector(state),
    cities: citySelector(state),
    categories: makeCategorySelector()(state),
    product_owner: state.identities.list[product.product_owner],
    product_category: state.common.category.list[product.product_category],
    current_user_identity: state.auth.client.identity.content,
    posts: state.common.post.list,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getProductInfo: ProductActions.getProductInfo,
    getPrice: productActions.getProductPrice,
    getCategories,
    getPosts: postActions.filterPostsByPostRelatedProduct,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
