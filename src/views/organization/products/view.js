/*global __*/
//@flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {ProductEditForm} from './forms';
import {ImageViewer} from '../../common/ImageViewer';
import {
	ItemHeader,
	ItemWrapper,
	Field,
	FieldLabel,
	FieldValue
} from "../../common/cards/Frames";
import {postIcon, EditIcon} from "src/images/icons";

type ProductItemWrapperProps = {
	children:React.Node
}
export function ProductItemWrapper (props:ProductItemWrapperProps){
	return <ItemWrapper icon={postIcon}>{props.children}</ItemWrapper>;
};

type ProductViewProps =  {
	showEdit: Function,
	product: Object,
	organization: Object,
	pictures: Array<Object>,
	price : Object
}
export class ProductView extends React.Component<ProductViewProps> {

	render() {
		const {product, showEdit, organization, pictures, price} = this.props;
		return (
			<div className="col-6 organizationProduct">
				<div className=" productBox">
							<div className="float-left -item-edit-btn pulse" onClick={showEdit}><EditIcon /></div>
							<div className="d-block m-2">{product.name}</div>
							
							{(pictures.length > 0) ? <ImageViewer
								label={__('Post pictures') + ": "}
							 	mediaId={pictures[0].picture_media} 
							 />: <span/>}
							
							
							<div className="d-block m-2">{organization.official_name}</div>
							<div>قیمت:</div><span className="d-block m-2">{price.value}</span>
							<span className="m-2 badge badge-secondary"> {product.product_category.name} </span>
				</div>
			</div>
			)
	}
}

type ProductProps = {
	product:Object,
	updateProduct: Function,
	deleteProduct: Function,
	categories:Array<Object>,
	pictures:Array<Object>,
	organization:Object,
	price:Object, 
	products:Array<Object>,
	addPicture:Function,
	deletePicture:Function
}
export class Product extends React.Component<ProductProps,{edit: boolean, product:Object}> {
	constructor(props:ProductProps){
		super(props);
		const {product} = props;
		this.state = {...this.state, edit: false, product:product};
	}
	componentWillReceiveProps(props:ProductProps){
		const {product} = props;
		this.setState({...this.state, product:product})
	} 
	showEdit = () => {
		this.setState({edit: true});
	};

	hideEdit = () => {
		this.setState({edit: false});
	};
	render() {
		const {product } = this.state;
		const{pictures, price, organization, categories, products, deletePicture, addPicture} = this.props;
		if (this.state.edit) {
			return (
				<ProductEditForm
					deletePicture={deletePicture}
					addPicture={addPicture}
					pictures = {pictures}
					price ={price}
					organization={organization}
					product = {product}
					products = {products}
					categories={categories}
					hideEdit = {this.hideEdit}
					remove = {this.props.deleteProduct}
					update = {this.props.updateProduct}
				/>)
		}
		return <ProductView organization={organization} pictures={pictures} price={price} product={product} showEdit={this.showEdit}/>;
	}
}
