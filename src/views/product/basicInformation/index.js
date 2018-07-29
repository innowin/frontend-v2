// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {ProductInfoEditForm, ProductDescriptionEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import client from "src/consts/client"
import {ProductInfoItemWrapper, ProductInfoView, ProductDescriptionView, ProductDescriptionWrapper} from "./Views"
import type {ProductType, CategoryType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {getProductInfo, updateProduct} from "src/redux/actions/commonActions/productActions"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ProductInformationForm} from "./Forms"
import {getCategories} from "src/redux/actions/commonActions/categoryActions"


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
        console.log('prev state is: ', this.state)
        this.setState({...this.state, edit: finalStatus}, () => console.log('this.state is: ', this.state))
    }

    _updateStateForView = (res: ProductType, error: string, isLoading: boolean) => {
        this.setState({...this.state, product: res, error: error, isLoading})
    }

    _categoriesAsOptions = () => {
        const {categories} = this.props
        return Object.keys(categories).map(key => ( {value: key, label: categories[key].name } ))
        // react-select need some thing like [ {value: , label: }, ... ] by default.
    }

    getProductDetail(categoryId: number, userId: number, productId: number) {
        const newState = {...this.state, isLoading: true}
        this.setState(newState)
        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: `${url}/products/category/${categoryId}`,
                result: `Products-category-get/`,
                token: client.getToken(),
            }
        )

        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: `${url}/users/identities/${client.getIdentityId()}/`,
                result: `Products-owner-get`,
                token: client.getToken(),
            }
        )

        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: `${url}/products/pictures/?picture_product=${productId}`,
                result: `product-pictures-get/${productId}`,
                token: client.getToken()
            }
        )
    }

    _productFormSubmitHandler = (values: ProductType) => {
        const {product, _updateProduct, productId} = this.props
        const product_category = (values.product_category && values.product_category.value) || product.product_category
        const formData = {...values, product_category}
        console.log('from the basicInformation component. values is: ', values)
        _updateProduct(productId, formData)

    }

    componentDidMount() {
        const {productId, product, _getProductInfo, _getCategories} = this.props
        _getProductInfo(productId)
        _getCategories()
        // let formData = {}

        if (product) {
            const formFields = ['product_category', 'name', 'country', 'province', 'city', 'description']

            const formData = formFields.reduce((acc, field) => ({...acc, [field]: product[field]}), {})
            formData['product_category'] = {value: product.product_category.id, label: product.product_category.name}
            this.setState({
                ...this.state,
                formData: formData
            }, () => console.log('this .state.formData is: ', this.state.formData))
        }
        console.log(' ------------------ this.props.categories is: ', this.props.categories)

        // socket.on(`Products-category-get/`, (res) => {
        //     if (res.detail) {
        //         const newState = {...this.state, error: res.detail, isLoading: false}
        //         this.setState(newState)
        //     }
        //     const newState = {...this.state, product_category: res, isLoading: false}
        //     this.setState(newState)
        // })

        // socket.on(`Products-owner-get`, (res) => {
        //     if (res.detail) {
        //         const newState = {...this.state, error: res.detail, isLoading: false}
        //         this.setState(newState)
        //     }
        //     const newState = {...this.state, owner: res, isLoading: false}
        //     this.setState(newState)
        // })
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
                            {/*{*/}
                            {/*(edit) ? (*/}
                            {/*<ProductDescriptionWrapper translator={translator}>*/}
                            {/*<ProductDescriptionEditForm*/}
                            {/*translator={translator}*/}
                            {/*owner={owner}*/}
                            {/*product={product}*/}
                            {/*product_category={product_category}*/}
                            {/*description={product.description}*/}
                            {/*hideEdit={() => this._showEditHandler(false)}*/}
                            {/*updateStateForView={this._updateStateForView}*/}
                            {/*/>*/}
                            {/*</ProductDescriptionWrapper>*/}
                            {/*) : (*/}
                            {/*<ProductDescriptionView translator={translator} description={product.description}*/}
                            {/*product_category={product_category} owner={owner}*/}
                            {/*showEdit={() => this._showEditHandler(true)}>*/}
                            {/*{console.log('product is: ', product)}*/}
                            {/*</ProductDescriptionView>*/}
                            {/*)*/}
                            {/*}*/}
                            {/*{*/}
                            {/*(edit) ? (*/}
                            {/*<ProductInfoItemWrapper translator={translator}>*/}
                            {/*<ProductInformationReduxForm hideEdit={() => this._showEditHandler(false)}*/}
                            {/*onSubmit={this._productFormSubmitHandler}*/}
                            {/*translator={translator}/>*/}
                            {/*</ProductInfoItemWrapper>*/}
                            {/*) : (*/}
                            {/*<ProductInfoView translator={translator} product_category={product_category}*/}
                            {/*product={product}*/}
                            {/*owner={owner} showEdit={() => this._showEditHandler(true)}/>*/}
                            {/*)*/}
                            {/*}*/}

                        </VerifyWrapper>
                    </ListGroup>
                </FrameCard>
            </div>

        )
    }
}

type BasicInfoProps = {
    productId: number,
    translator: TranslatorType,
    _getProductInfo: Function,
    product: ProductType
}

// const productBasicInformation = (props: BasicInfoProps) => {
//     const {productId, translator, _getProductInfo, product} = props
//     return (
//         <div>
//             <CategoryTitle
//                 title={translator['Basic information']}
//                 createForm
//                 showEditBtn
//             />
//             <FrameCard>
//                 <ListGroup>
//                     <ProductInfo product={product} _getProductInfo={_getProductInfo} translator={translator}
//                                  productId={productId}/>
//                 </ListGroup>
//             </FrameCard>
//         </div>
//     )
// }

const mapStateToProps = state => ({
    product: state.common.viewingProduct.content,
    categories: state.common.categories.content
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            _getProductInfo: id => getProductInfo(id),
            _updateProduct: (id, values) => updateProduct(id, values),
            _getCategories: () => getCategories()
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(productBasicInformation)
