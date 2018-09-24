// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../../common/cards/Frames"
import {REST_REQUEST} from "../../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../../consts/URLS"
import {TOKEN, IDENTITY_ID} from "src/consts/data"
import {Product} from './view'
import type {ProductType, CategoryType, PriceType, PictureType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type ProductContainerProps = {
    productId: number,
    organization: {},
    translator: TranslatorType
}

type ProductContainerState = {
    pictures: Array<PictureType>,
    price: Array<PriceType>,
    edit: boolean,
    product: ProductType,
    categories: Array<CategoryType>
}

//TODO amir
export class ProductContainer extends Component<ProductContainerProps, ProductContainerState> {
    constructor() {
        super()
        this.state = {
            pictures: [{}], // for flow
            price: [{}], // for flow
            edit: false,
            product: [],
            categories: [{}]
        }
    }

    componentWillReceiveProps() {
        // const {product} = props
        // this.setState ({...this.state ,product:product})
    }

    componentDidMount() {
        const {productId} = this.props

        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: `${url}/products/category/`,
                result: `Products-category-get/`,
                token: TOKEN,
            }
        )
//---
        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: `${url}/products/pictures/?pictures_product=${productId}`,
                result: `Product-pictures-get`,
                token: TOKEN,
            }
        )

        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: `${url}/products/${productId}`,
                result: `Product-get/${productId}`,
                token: TOKEN,
            }
        )

        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: `${url}/products/prices/?price_product=${productId}`,
                result: `Product-price-get`,
                token: TOKEN,
            }
        )

        socket.on('Product-price-get', (res) => {
            if (res.detail) {

            } else {
                this.setState({...this.state, price: res})
            }
        })

        socket.on(`Product-get/${productId}`, res => {
            if (res.detail) {

            } else {
                this.setState({...this.state, product: res})
            }
        })

        socket.on(`Products-category-get/`, (res) => {
            if (res.detail) {
                const newState: ProductContainerState = {...this.state, error: res.detail, isLoading: false}
                this.setState(newState)
            } else {
                const newState: ProductContainerState = {...this.state, categories: res, isLoading: false}
                this.setState(newState)
            }
        })

        socket.on('Product-pictures-get', (res) => {
            if (res.detail) {

            } else {
                this.setState({...this.state, pictures: res})
            }
        })
    }

    render() {
        const {organization, translator} = this.props
        const {pictures, price, product, categories} = this.state

        return (<Product
            // deletePicture={this.deletePicture} // commented by ali. there is't such function in component
            // addPicture={this.addPicture}
            organization={organization}
            price={price}
            pictures={pictures}
            product={product}
            categories={categories}
            translator={translator}
        />)
    }
}

type ProductListProps = {
    hideCreateForm: Function,
    createForm: boolean,
    updateProductList: Function,
    organizationId: number,
    organization: {},
    products: Array<ProductType>,
    categories: Array<CategoryType>,
    translator: TranslatorType,
    productId: number
}

const ProductList = (props: ProductListProps) => {
    const {products, categories, organizationId, organization, translator, productId} = props
    return (
        <div>
            <div className="row">
                {
                    products.map(cert => <ProductContainer
                        organization={organization}
                        products={products}
                        product={cert}
                        categories={categories}
                        organizationId={organizationId}
                        key={cert.id}
                        translator={translator}
                        productId={productId}
                    />)
                }
            </div>
        </div>
    )
}

type ProductsProps = {
    organizationId: number,
    translator: TranslatorType,
    productId: number
}

type ProductsState = {
    organization: {},
    categories: Array<CategoryType>,
    createForm: boolean,
    edit: boolean,
    isLoading: boolean,
    error: ?string,
    products: Array<ProductType>
}

export class Products extends Component<ProductsProps,ProductsState> {

    constructor() {
        super()
        this.state = {
            organization: {},
            categories: [],
            createForm: false,
            edit: false,
            isLoading: false,
            error: null,
            products: []
        }
    }

    static propTypes = {
        organizationId: PropTypes.number.isRequired
    }

    componentDidMount() {
        const {organizationId} = this.props
        const emitting = () => {
            const newState = {...this.state, isLoading: true}
            this.setState(newState)

            socket.emit(REST_REQUEST,
                {
                    method: "get",
                    url: `${url}/products/?product_owner=${IDENTITY_ID}`,
                    result: `Products-get/${IDENTITY_ID}`,
                    token: TOKEN,
                }
            )

            socket.emit(REST_REQUEST,
                {
                    method: "get",
                    url: `${url}/products/category/`,
                    result: `Products-category-get/`,
                    token: TOKEN,
                }
            )

            socket.emit(REST_REQUEST,
                {
                    method: "get",
                    url: `${url}/organizations/${organizationId}/`,
                    result: `Products-organization-get`,
                    token: TOKEN,
                }
            )
        }

        emitting()
        socket.on('Products-organization-get', (res) => {
            if (res.detail) {
                const newState = {...this.state, error: res.detail, isLoading: false}
                this.setState(newState)
            } else {
                const newState = {...this.state, organization: res, isLoading: false}
                this.setState(newState, () => {
                })
            }
        })
        socket.on(`Products-get/${IDENTITY_ID}`, (res) => {
            if (res.detail) {
                const newState = {...this.state, error: res.detail, isLoading: false}
                this.setState(newState)
            } else {
                const newState = {...this.state, products: res, isLoading: false}
                this.setState(newState, () => {
                })
            }
        })

        socket.on(`Products-category-get/`, (res) => {
            if (res.detail) {
                const newState = {...this.state, error: res.detail, isLoading: false}
                this.setState(newState)
            } else {
                const newState = {...this.state, categories: res, isLoading: false}
                this.setState(newState)
            }
        })

    }

    render() {
        const {organizationId, translator, productId} = this.props
        const {createForm, products, categories, organization, isLoading, error} = this.state
        return (
            <VerifyWrapper isLoading={isLoading} error={error}>
                <CategoryTitle
                    title={translator['Products']}
                    showCreateForm={() => 1}
                    createForm={createForm}
                />
                <FrameCard>
                    <ProductList
                        updateProductList={() => 1}
                        updateStateForView={() => 1}
                        products={products}
                        categories={categories}
                        organization={organization}
                        organizationId={organizationId}
                        createForm={createForm}
                        hideCreateForm={() => 1}
                        translator={translator}
                        productId={productId}
                    />
                </FrameCard>
            </VerifyWrapper>
        )
    }
}
