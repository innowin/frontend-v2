// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {ProductInfoView, ProductDescriptionView, TechnicalInfoView, HashTagsView} from "./Views"
import type {ProductType, CategoryType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import type {ProvinceType, CountryType} from "./Views"
import ProductActions, {getProductInfo} from "src/redux/actions/commonActions/productActions/productActions"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ProductInformationForm} from "./Forms"
import {getCategories} from "src/redux/actions/commonActions/categoryActions"
import makeProductSelectorById from "src/redux/selectors/common/product/getProductById"
import makeCategorySelectorById from "../../../redux/selectors/common/category/getCategoryById";
import {makeCategorySelector} from "../../../redux/selectors/common/category/getCategoriesByParentId";
import makeCountrySelectorById from "../../../redux/selectors/common/location/getCountryById"
import makeProvinceSelectorById from "../../../redux/selectors/common/location/getProvinceById"
import {getCountryById, getProvinceById} from "../../../redux/actions/commonActions/location"
import makeHashTagSelectorByParentId from "../../../redux/selectors/common/hashTags/getObjHashTags";
import type {TagType} from "../../common/tags/tag";


type OwnerType = {
  name: string
}

type ProductCategoryType = {
  name: string
}

type ProductBasicInformationState = {
  product: ProductType,
  product_category: ProductCategoryType,
  owner: OwnerType,
  error: string,
  edit: boolean,
  isLoading: boolean,
  formData: ProductType
}

type ProductBasicInformationProps = {
  productId: number,
  translator: TranslatorType,
  _getProductInfo: Function,
  _updateProduct: Function,
  product: ProductType,
  _getCategories: Function,
  categories: { number: { name: string } },
  province: ProvinceType,
  hashTags: Array<TagType>,
  country: CountryType,
  getCountryById: Function,
  getProvinceById: Function,
  getCityById: Function,
  category: CategoryType
}

export class productBasicInformation extends Component<ProductBasicInformationProps, ProductBasicInformationState> {

  constructor() {
    super()
    this.state = {
      product: {
        description: '',
        id: 0,
        name: '',
        province: '',
        country: '',
        city: '',
        product_category: 0
      },
      product_category: {
        name: ''
      },
      owner: {
        name: ''
      },
      error: '',
      edit: false,
      isLoading: false,
      formData: {},
    }
  }

  static propTypes = {
    productId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const {productId, product, _getProductInfo, _getCategories} = this.props
    _getProductInfo(productId)
    _getCategories()

    if (product) {
      const formFields = ['product_category', 'name', 'country', 'province', 'city', 'description']

      const formData = formFields.reduce((acc, field) => ({...acc, [field]: product[field]}), {})
      if (product.product_category) {
        formData['product_category'] = {
          value: product.product_category.id,
          label: product.product_category.name
        }
      }
      this.setState({
        ...this.state,
        formData: formData
      })
    }
  }

  componentDidUpdate(prevProps: ProductBasicInformationProps) {
    const prevProduct = prevProps.product || {}
    const {product, getCountryById, getProvinceById} = this.props
    if (!prevProduct.product_related_country && product.product_related_country) {
      getCountryById(product.product_related_country)
    }
    if (!prevProduct.product_related_province && product.product_related_province) {
      getProvinceById(product.product_related_province)
    }
  }
  _showEditHandler = (finalStatus: boolean) => {
    this.setState({...this.state, edit: finalStatus})
  }

  _categoriesAsOptions = () => {
    const {categories} = this.props
    return Object.keys(categories).map(key => ({value: key, label: categories[key].name}))
  }

  _productFormSubmitHandler = (values: ProductType) => {
    const {product, _updateProduct, productId} = this.props
    const product_category = (values.product_category && values.product_category.value) || product.product_category
    const formData = {...values, product_category}
    _updateProduct({productId, formValues: formData})

  }


  render() {
    const {product_category, owner, edit, isLoading, error, formData} = this.state
    const {translator, product, province, country, category, hashTags} = this.props
    return (

        <div className="product-basic-information">
          <FrameCard>
            <ListGroup>
              <VerifyWrapper isLoading={isLoading} error={error}>
                {edit ?
                    <ProductInformationForm
                        categoriesOptions={this._categoriesAsOptions()}
                        hideEdit={() => this._showEditHandler(false)}
                        onSubmit={this._productFormSubmitHandler}
                        translator={translator}
                        initialValues={formData}
                        newValues={formData}
                    />
                    :
                    <div>
                      <ProductDescriptionView translator={translator} description={product.description}
                                              product_category={product_category} owner={owner}
                                              showEdit={() => this._showEditHandler(true)}>
                      </ProductDescriptionView>
                      <ProductInfoView
                          created_time={product.created_time}
                          province={province.name}
                          country={country.name}
                          productId={product.id}
                          category={category.name}
                          translator={translator}
                          product_category={product_category}
                          owner={owner} showEdit={() => this._showEditHandler(true)}
                      />
                      <TechnicalInfoView
                          attrs={product.attrs || {}}
                          showEdit={() => this._showEditHandler(true)}
                      />
                      <HashTagsView
                          showEdit={() => this._showEditHandler(true)}
                          tags={hashTags}
                      />
                    </div>
                }
              </VerifyWrapper>
            </ListGroup>
          </FrameCard>
        </div>

    )
  }
}

const mapStateToProps = (state, props) => {
  const provinceSelectorById = makeProvinceSelectorById()
  const countrySelectorById = makeCountrySelectorById()
  const productSelectorById = makeProductSelectorById()
  const categorySelector = makeCategorySelector()
  const categorySelectorById = makeCategorySelectorById()
  const hashTagSelectorByParentId = makeHashTagSelectorByParentId()
  const {productId} = props
  const product = productSelectorById(state, productId)
  const {product_related_country, product_related_province, product_category} = product
  return ({
    product,
    country: countrySelectorById(state, product_related_country),
    hashTags: hashTagSelectorByParentId(state, productId),
    province: provinceSelectorById(state, product_related_province),
    category: categorySelectorById(state, product_category),
    categories: categorySelector(state, productId),
  })
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          _getProductInfo:  getProductInfo,
          _updateProduct: ProductActions.updateProduct,
          _getCategories: getCategories,
          getCountryById,
          getProvinceById
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(productBasicInformation)
