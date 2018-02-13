import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ProductEditForm} from './forms';
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {postIcon} from "src/images/icons";

export const ProductItemWrapper = ({children}) => {
	return <ItemWrapper icon={postIcon}>{children}</ItemWrapper>;
};

export class ProductView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		product: PropTypes.object.isRequired,
	};

	render() {
		const {product, showEdit} = this.props;
		return <ProductItemWrapper>
			<ItemHeader title={product.name} showEdit={showEdit}/>
			
		</ProductItemWrapper>
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
		categories:PropTypes.array.isRequired
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
		const {product, categories} = this.state;
		if (this.state.edit) {
			return <ProductItemWrapper>
				<ProductEditForm
					product = {product}
					categories={categories}
					hideEdit = {this.hideEdit}
					updateStateForView = {this.updateStateForView}
					remove = {this.props.deleteProduct}
					update = {this.props.updateProduct}
				/>
			</ProductItemWrapper>;
		}
		return <ProductView product={product} showEdit={this.showEdit}/>;
	}
}
