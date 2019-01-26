// @flow
import * as React from 'react'
import {Component} from 'react'
// import {InformationIcon, postIcon, CertificateIcon} from "src/images/icons"
import ProductPosts from "../product/posts"
import ProductBasicInformation from "../product/basicInformation"
// import ProductCertificates from "../product/certificates"
// import ProductRating from "../product/ratings"
// import {Tabs} from "../common/cards/Frames"
import {NavLink, Switch, Redirect} from "react-router-dom"
import PropsRoute from "src/consts/PropsRoute"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import SideBar from '../bars/productBar/index'
import ProductActions from 'src/redux/actions/commonActions/productActions/productActions'
import {bindActionCreators} from 'redux'
import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import {getCountryById, getProvinceById} from 'src/redux/actions/commonActions/location'
import makeProvinceSelectorById from '../../redux/selectors/common/location/getProvinceById'
import makeCountrySelectorById from '../../redux/selectors/common/location/getCountryById'
import makeProductSelectorById from '../../redux/selectors/common/product/getProductById'
import {getMessages} from '../../redux/selectors/translateSelector'
import GetUserActions from '../../redux/actions/user/getUserActions'
import Material from '../common/components/Material'

type ParamsType = {
  id: string
}

type MatchType = {
  path: string,
  url: string,
  params: ParamsType
}
type ProductViewProps = {
  match: MatchType,
  translator: TranslatorType,
  token: string,
  identityId: number
}

type ProductViewState = {
  modal: boolean,
  modalFiles: [],
  selectedFileIndex: ?number,
  sideBarIsVisible: boolean
}

class ProductView extends Component<ProductViewProps, ProductViewState> {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

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
    const {match, translate, product, country, province, product_owner, product_category} = this.props
    const {path, url, params} = match
    const productId = params.id

    return (
        <div className='all-exchanges-parent'>

          <SideBar product={product} country={country} province={province} product_owner={product_owner} product_category={product_category}/>

          <div className='product-container'>

            {/*<Tabs>*/}
              {/*<NavLink className="-tab" to={`${url}/basicInformation`}*/}
                       {/*activeClassName="-active"><InformationIcon/></NavLink>*/}
              {/*<NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>*/}
              {/*<NavLink className="-tab" to={`${url}/Certificates`}*/}
                       {/*activeClassName="-active"><CertificateIcon/></NavLink>*/}
              {/*<NavLink className="-tab" to={`${url}/Ratings`}*/}
              {/*activeClassName="-active"><RatingIcon/></NavLink>*/}
              {/*<NavLink className="-tab" to={`${url}/Represents`}*/}
              {/*activeClassName="-active">{postIcon}</NavLink>*/}
            {/*</Tabs>*/}


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


            <div>
              <Switch>
                <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
                <PropsRoute path={`${path}/Posts`} component={ProductPosts} productId={productId} translator={translate}/>
                <PropsRoute path={`${path}/basicInformation`} component={ProductBasicInformation} productId={productId} translator={translate}/>
                {/*<PropsRoute path={`${path}/Certificates`} component={ProductCertificates}*/}
                {/*productId={productId}/>*/}
                {/*<PropsRoute path={`${path}/Ratings`} component={ProductRating} productId={productId} translator={translate}/>*/}
                {/*<PropsRoute path={`${path}/Represents`} component={Represents} productId={productId} translator={translate}/>*/}
              </Switch>
            </div>
            {/*</div>*/}
            {/*<div className="col-md-3 col-sm-1 -left-sidebar-wrapper">*/}
            {/*<ChatBar/>*/}
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
    product_category: state.common.category.list[product.product_category]
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserByUserId: GetUserActions.getUserByUserId,
    getProductInfo: ProductActions.getProductInfo,
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId,
    getCountryById,
    getProvinceById
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)