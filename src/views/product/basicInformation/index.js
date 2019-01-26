// @flow
import * as React from "react"
import {Component} from "react"

export class productBasicInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // componentDidMount() {
  //   const {productId, product, _getProductInfo, _getCategories} = this.props
  //   _getProductInfo(productId)
  //   _getCategories()
  //
  //   if (product) {
  //     const formFields = ['product_category', 'name', 'country', 'province', 'city', 'description']
  //
  //     const formData = formFields.reduce((acc, field) => ({...acc, [field]: product[field]}), {})
  //     if (product.product_category) {
  //       formData['product_category'] = {
  //         value: product.product_category.id,
  //         label: product.product_category.name
  //       }
  //     }
  //     this.setState({
  //       ...this.state,
  //       formData: formData
  //     })
  //   }
  // }
  // componentDidUpdate(prevProps: ProductBasicInformationProps) {
  //   const prevProduct = prevProps.product || {}
  //   const {product, getCountryById, getProvinceById} = this.props
  //   if (!prevProduct.product_related_country && product.product_related_country) {
  //     getCountryById(product.product_related_country)
  //   }
  //   if (!prevProduct.product_related_province && product.product_related_province) {
  //     getProvinceById(product.product_related_province)
  //   }
  // }
  //
  // _showEditHandler = (finalStatus: boolean) => {
  //   this.setState({...this.state, edit: finalStatus})
  // }
  //
  // _categoriesAsOptions = () => {
  //   const {categories} = this.props
  //   return Object.keys(categories).map(key => ({value: key, label: categories[key].name}))
  // }
  //
  // _productFormSubmitHandler = (values: ProductType) => {
  //   const {product, _updateProduct, productId} = this.props
  //   const product_category = (values.product_category && values.product_category.value) || product.product_category
  //   const formData = {...values, product_category}
  //   _updateProduct({productId, formValues: formData})
  // }


  render() {
    const {/*translator,*/ product, current_user_identity} = this.props
    const {product_owner} = product
    const attrs = [
      {title: 'نوع', value: 'مونوکریستال'},
      {title: 'ابعاد پنل', value: '35 * 1999 میلی متر'},
      {title: 'ابعاد سلول', value: '23 * 23 میلی متر'},
      {title: 'تعداد سلول', value: '180'},
      {title: 'وزن', value: '150000 گرم'}
    ]

    return (
        <div>
          <div className='product-description' style={(product.description && product.description.length > 0) || (product_owner === current_user_identity) ? {display: 'block'} : {display: 'none'}}>
            <div className='product-description-title'>
              <div>معرفی</div>
              <div className='product-description-title-edit'>ویرایش</div>
            </div>
            <div className='product-description-detail'>{product.description}</div>
          </div>

          <div className='product-description'>
            <div className='product-description-title'>
              <div>مشخصات</div>
              <div className='product-description-title-edit'>ویرایش</div>
            </div>
            <div>
              {attrs.map((attribute, i) =>
                  <div key={i} className='product-attributes-cont'>
                    <div className='product-attributes-title'>{attribute.title}</div>
                    <div className='product-attributes-value'>{attribute.value}</div>
                  </div>
              )}
            </div>
          </div>

        </div>
    )
  }
}

//
// <div className="product-basic-information">
//   <FrameCard>
//     <ListGroup>
//       <VerifyWrapper isLoading={isLoading} error={error}>
//         {edit ?
//             <ProductInformationForm
//                 categoriesOptions={this._categoriesAsOptions()}
//                 hideEdit={() => this._showEditHandler(false)}
//                 onSubmit={this._productFormSubmitHandler}
//                 translator={translator}
//                 initialValues={formData}
//                 newValues={formData}
//             />
//             :
//             <div>
//               <ProductDescriptionView translator={translator} description={product.description}
//                                       product_category={product_category} owner={owner}
//                                       showEdit={() => this._showEditHandler(true)}>
//               </ProductDescriptionView>
//               <ProductInfoView
//                   created_time={product.created_time}
//                   province={province.name}
//                   country={country.name}
//                   productId={product.id}
//                   category={category.name}
//                   translator={translator}
//                   product_category={product_category}
//                   owner={owner} showEdit={() => this._showEditHandler(true)}
//               />
//               <TechnicalInfoView
//                   attrs={product.attrs || {}}
//                   showEdit={() => this._showEditHandler(true)}
//               />
//               <HashTagsView
//                   showEdit={() => this._showEditHandler(true)}
//                   tags={hashTags}
//               />
//             </div>
//         }
//       </VerifyWrapper>
//     </ListGroup>
//   </FrameCard>
// </div>
//
// const mapStateToProps = (state, props) => {
//   const provinceSelectorById = makeProvinceSelectorById()
//   const countrySelectorById = makeCountrySelectorById()
//   const productSelectorById = makeProductSelectorById()
//   const categorySelector = makeCategorySelector()
//   const categorySelectorById = makeCategorySelectorById()
//   const hashTagSelectorByParentId = makeHashTagSelectorByParentId()
//   const {productId} = props
//   const product = productSelectorById(state, productId)
//   const {product_related_country, product_related_province, product_category} = product
//   return ({
//     product,
//     country: countrySelectorById(state, product_related_country),
//     hashTags: hashTagSelectorByParentId(state, productId),
//     province: provinceSelectorById(state, product_related_province),
//     category: categorySelectorById(state, product_category),
//     categories: categorySelector(state, productId)
//   })
// }
//
// const mapDispatchToProps = dispatch =>
//     bindActionCreators(
//         {
//           _getProductInfo: getProductInfo,
//           _updateProduct: ProductActions.updateProduct,
//           _getCategories: getCategories,
//           getCountryById,
//           getProvinceById
//         },
//         dispatch
//     )

export default productBasicInformation
