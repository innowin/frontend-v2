// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {ProductInfoItemWrapper, ProductInfoView, ProductDescriptionView, ProductDescriptionWrapper} from "./Views"
import type {ProductType, CategoryType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import ProductActions, {getProductInfo} from "src/redux/actions/commonActions/productActions/productActions"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ProductInformationForm} from "./Forms"
import {getCategories} from "src/redux/actions/commonActions/categoryActions"
import makeProductSelectorById from "src/redux/selectors/common/product/getProductById"
import {categorySelector} from "../../../redux/selectors/common/category";

type OwnerType = {
  name: string
}

type ProductCategoryType = {
  name: string
}

type ProductInfoState = {
  product: ProductType,
  product_category: ProductCategoryType,
  owner: OwnerType,
  error: string,
  edit: boolean,
  isLoading: boolean,
  formData: ProductType
}

type ProductInfoProps = {
  productId: number,
  translator: TranslatorType,
  _getProductInfo: Function,
  _updateProduct: Function,
  product: ProductType,
  _getCategories: Function,
  categories: { number: { name: string } }
}

export class productBasicInformation extends Component<ProductInfoProps, ProductInfoState> {

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

  render() {
    const {product_category, owner, edit, isLoading, error, formData} = this.state
    const {translator, product} = this.props
    return (

        <div className="product-basic-information">
          <CategoryTitle
              title={translator['Basic information']}
              createForm
              showEditBtn={!edit}
              showEditHandler={() => this._showEditHandler(true)}
          />
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
                        {console.log('product is: ', product)}
                      </ProductDescriptionView>
                      <ProductInfoView translator={translator} product_category={product_category}
                                       product={product}
                                       owner={owner} showEdit={() => this._showEditHandler(true)}/>
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
  const {productId} = props
  const productSelectorById = makeProductSelectorById()

  return ({
    product: productSelectorById(state, productId),
    categories: categorySelector(state),
  })
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          _getProductInfo: id => getProductInfo(id),
          _updateProduct: ({formValues, productId}) => ProductActions.updateProduct({formValues, productId}),
          _getCategories: () => getCategories()
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(productBasicInformation)
