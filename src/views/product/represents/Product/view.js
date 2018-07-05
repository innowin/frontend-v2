/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {CustomImage} from '../../../common/CustomImage'
import {
    ItemHeader,
    ItemWrapper,
    Field,
    FieldLabel,
    FieldValue
} from "../../../common/cards/Frames"
import {postIcon} from "src/images/icons"

export const ProductItemWrapper = ({children}) => {
    return <ItemWrapper icon={postIcon}>{children}</ItemWrapper>
}

export class ProductView extends Component {
    static propTypes = {
        showEdit: PropTypes.func.isRequired,
        product: PropTypes.object.isRequired,
    }

    render() {
        const {product,  organization, pictures, price, categories} = this.props
        if(Object.keys(product).length === 0 && product.constructor === Object)
            return <span/>

        var currentCategory = {title:""}
        const options = categories.map((cat,index)=>{
            if(cat.id == product.product_category){
                currentCategory = cat
            }
            return {value:cat.id, label:cat.title}
        })


        return (
            <div className="organizationProduct">
                <div className=" productBox">
                    <div className="d-block m-2">{product.name}</div>

                    {(pictures.length > 0) ? <CustomImage
                        label={__('Post pictures') + ": "}
                        mediaId={pictures[0].picture_media}
                        customStyle={{maxWidth:"100%"}}/>: <span/>}


                    {/* <div className="d-block m-2">{organization.official_name}</div> */}
                    <div>قیمت:</div><span className="d-block m-2">{price[0].value}</span>
                    <span className="m-2 badge badge-secondary"> {currentCategory.title} </span>
                </div>
            </div>
        )
    }
}
export class Product extends Component {
    constructor(props){
        super(props)
        const {product} = props
        this.state = {edit: false, product:product}
    }
    componentWillReceiveProps(props){
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
        const{pictures, price, organization, updateStateForView, categories, product} = this.props

        return <ProductView categories={categories} organization={organization} pictures={pictures} price={price} product={product}/>
    }
}
