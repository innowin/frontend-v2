/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ProductEditForm} from './forms';
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
		const {product, showEdit, organization, picture, price} = this.props;
		return (
			<div className="col-6 organizationProduct">
				<div className=" productBox">
							<div className="float-left -item-edit-btnProduct" onClick={showEdit}>{editIcon}</div>
							<div className="d-block m-2">{product.name}</div>
							<img src={picture.picture_media || "/static/media/defaultImg.94a29bce.png"} />
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
		picture:PropTypes.object.isRequired
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
		const{picture, price, organization, categories, products} = this.props;
		if (this.state.edit) {
			return (
				<ProductEditForm
					picture = {picture}
					price ={picture}
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
		return <ProductView organization={organization} picture={picture} price={picture} product={product} showEdit={this.showEdit}/>;
	}
}
