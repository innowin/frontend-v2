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
import type {ProductType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {getProductInfo} from "src/redux/actions/commonActions"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


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
    isLoading: boolean
}

type ProductInfoProps = {
    productId: number,
    translator: TranslatorType,
    _getProductInfo: Function,
    productInfo: ProductType
}

export class ProductInfo extends Component<ProductInfoProps, ProductInfoState> {

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
            isLoading: false
        }
    }

    static propTypes = {
        productId: PropTypes.string.isRequired,
    }

    _showEditHandler = (finalStatus: boolean) => {
        console.log('prev state is: ', this.state)
        this.setState({ ...this.state, edit: finalStatus}, () => console.log('this.state is: ', this.state))
    }

    _updateStateForView = (res: ProductType, error: string, isLoading: boolean) => {
        this.setState({...this.state, product: res, error: error, isLoading})
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

    componentDidMount() {
        console.log('productInfo props is: ', this.props.productInfo)
        const {productId, _getProductInfo} = this.props
        _getProductInfo(productId)
        const emitting = () => {
            const newState = {...this.state, isLoading: true}
            this.setState(newState)
            socket.emit(REST_REQUEST,
                {
                    method: "get",
                    url: `${url}/products/${productId}/`,
                    result: `ProductInfo-get/${productId}`,
                    token: client.getToken(),
                }
            )


        }

        emitting()


        socket.on(`ProductInfo-get/${productId}`, (res) => {
            console.log('hi ali res is : ', res)
            if (res.detail) {
                const newState = {...this.state, error: res.detail, isLoading: false}
                this.setState(newState)
            }
            const newState = {...this.state, product: res, isLoading: false}
            this.getProductDetail(res.product_category, res.product_owner, productId)
            this.setState(newState)
        })

        socket.on(`Products-category-get/`, (res) => {
            if (res.detail) {
                const newState = {...this.state, error: res.detail, isLoading: false}
                this.setState(newState)
            }
            const newState = {...this.state, product_category: res, isLoading: false}
            this.setState(newState)
        })

        socket.on(`Products-owner-get`, (res) => {
            if (res.detail) {
                const newState = {...this.state, error: res.detail, isLoading: false}
                this.setState(newState)
            }
            const newState = {...this.state, owner: res, isLoading: false}
            this.setState(newState)
        })
    }

    render() {
        const {product, product_category, owner, edit, isLoading, error} = this.state
        const {translator, productInfo} = this.props
        return (
            <VerifyWrapper isLoading={isLoading} error={error}>
                {
                    (edit) ? (
                        <ProductDescriptionWrapper translator={translator}>
                            <ProductDescriptionEditForm
                                translator={translator}
                                owner={owner}
                                product={product}
                                product_category={product_category}
                                description={product.description}
                                hideEdit={() => this._showEditHandler(false)}
                                updateStateForView={this._updateStateForView}
                            />
                        </ProductDescriptionWrapper>
                    ) : (
                        <ProductDescriptionView translator={translator} description={productInfo.description}
                                                product_category={product_category} owner={owner}
                                                showEdit={() => this._showEditHandler(true)}>{console.log(productInfo)}</ProductDescriptionView>
                    )
                }
                {
                    (edit) ? (
                        <ProductInfoItemWrapper translator={translator}>
                            <ProductInfoEditForm
                                translator={translator}
                                owner={owner}
                                product_category={product_category}
                                product={product}
                                hideEdit={() => this._showEditHandler(false)}
                                updateStateForView={this._updateStateForView}
                            />
                        </ProductInfoItemWrapper>
                    ) : (
                        <ProductInfoView translator={translator} product_category={product_category} product={product}
                                         owner={owner} showEdit={() => this._showEditHandler(true)}/>
                    )
                }

            </VerifyWrapper>
        )
    }
}

type BasicInfoProps = {
    productId: number,
    translator: TranslatorType,
    _getProductInfo: Function,
    productInfo: ProductType
}

const productBasicInformation = (props: BasicInfoProps) => {
    const {productId, translator, _getProductInfo, productInfo} = props
    return (
        <div>
            <CategoryTitle
                title={translator['Product Detail']}
                createForm={true}
            />
            <FrameCard>
                <ListGroup>
                    <ProductInfo productInfo={productInfo} _getProductInfo={_getProductInfo} translator={translator} productId={productId}/>
                </ListGroup>
            </FrameCard>
        </div>
    )
}

const mapStateToProps = state => ({
    productInfo: state.common.viewingProduct.content
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            _getProductInfo: id => getProductInfo(id)
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(productBasicInformation)
