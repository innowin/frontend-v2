/*global __*/
import React, {Component} from 'react';
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
import {postIcon, editIcon} from "src/images/icons";

export const ProductItemWrapper = ({children}) => {
	return <ItemWrapper icon={postIcon}>{children}</ItemWrapper>;
};

export class ProductView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		product: PropTypes.object.isRequired,
	};

	render() {
		const {product, showEdit, organization, pictures, price} = this.props;
		return (
			<div className="col-6 organizationProduct">
				<div className=" productBox">
							<div className="float-left -item-edit-btnProduct" onClick={showEdit}>{editIcon}</div>
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


export class Product extends Component {
	constructor(props){
		super(props);
		const {product} = props;
		this.state = {edit: false, product:product};
	}
	componentWillReceiveProps(props){
		const {product} = props;
		this.setState({...this.state, product:product})
	} 

	static propTypes = {
		updateProduct: PropTypes.func.isRequired,
		deleteProduct: PropTypes.func.isRequired,
		product: PropTypes.object.isRequired,
		updateStateForView:PropTypes.func.isRequired,
		categories:PropTypes.array.isRequired,
		pictures:PropTypes.array.isRequired
	};

	showEdit = () => {
		this.setState({edit: true});
	};

	hideEdit = () => {
		this.setState({edit: false});
	};

	updateStateForView = (res, error,isLoading) =>{
		const {updateStateForView} = this.props;
		this.setState({...this.state,product:res })
	}

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
					updateStateForView = {this.updateStateForView}
					remove = {this.props.deleteProduct}
					update = {this.props.updateProduct}
				/>)
		}
		return <ProductView organization={organization} pictures={pictures} price={price} product={product} showEdit={this.showEdit}/>;
	}
}
