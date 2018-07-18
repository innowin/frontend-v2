// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import {CustomImage} from '../../../common/CustomImage'
import {ItemWrapper,} from "../../../common/cards/Frames"
import {postIcon} from "src/images/icons"
import type {ProductType, CategoryType} from "src/consts/flowTypes/product/productTypes"

type ProductItemWrapperProps = {
    children: React.Node
}
const ProductItemWrapper = (props: ProductItemWrapperProps) => {
    const {children} = props
    return <ItemWrapper icon={postIcon}>{children}</ItemWrapper>
}
type PictureType = {
    picture_media: {}
}
type PriceType = {
    value: number
}
type ProductViewProps = {
    product: ProductType,
    pictures: [PictureType],
    price:[PriceType],
    categories: [CategoryType],
    translator: {[string]: string}
}
const ProductView = (props: ProductViewProps) => {
    const {product, pictures, price, categories, translator} = props
    if(Object.keys(product).length === 0 && product.constructor === Object)
        return <span/>

    const currentCategory = categories.find(c => (c.id == product.product_category)) || {title:""}


    return (
        <div className="organizationProduct">
            <div className=" productBox">
                <div className="d-block m-2">{product.name}</div>

                {(pictures.length > 0) ? <CustomImage
                    label={translator['Post pictures'] + ": "}
                    mediaId={pictures && pictures[0].picture_media}
                    customStyle={{maxWidth:"100%"}}/>: <span/>}


                {/* <div className="d-block m-2">{organization.official_name}</div> */}
                <div>قیمت:</div><span className="d-block m-2">{price[0].value}</span>
                <span className="m-2 badge badge-secondary"> {currentCategory.title} </span>
            </div>
        </div>
    )
}

type ProductProps = {
    product: ProductType,
    categories: [CategoryType],
    pictures: [PictureType],
    price: [PriceType],
    translator: {[string]: string}
}
type ProductState = {
    product: ProductType
}

export class Product extends Component<ProductProps, ProductState> {
    constructor(props: ProductProps){
        super()
        const {product} = props
        this.state = {edit: false, product:product}
    }
    componentWillReceiveProps(props: ProductProps){
        const {product} = props
        this.setState({...this.state, product:product})
    }

    static propTypes = {
        product: PropTypes.object.isRequired,
        categories:PropTypes.array.isRequired,
        pictures:PropTypes.array.isRequired
    }


    render() {
        // const {product } = this.state
        const{pictures, price, categories, product, translator} = this.props

        return <ProductView translator={translator} categories={categories} pictures={pictures} price={price} product={product}/>
    }
}
