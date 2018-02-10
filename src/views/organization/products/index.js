/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Product, ProductItemWrapper} from "./view";
import {ProductCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup} from "../../common/cards/Frames";
import {createProduct, deleteProduct, updateProduct} from '../../../crud/organization/products.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"

//TODO amir
export class ProductContainer extends Component {
		componentWillReceiveProps(props){
			const {product} = props;
			this.setState ({...this.state ,product:product});
	}
	delete_ = (productId) => {
		const {organizationId} = this.props;
		return deleteProduct({productId, organizationId});
	};
	update_ = (formValues, productId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
		return updateProduct(formValues,productId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res, error, isLoading) => {
		const {updateStateForView} = this.props;
		updateStateForView({error:error,isLoading:isLoading});
		this.setState({...this.state, product:res, error:error, isLoading:isLoading});
	};

	render() {
		const {product} = this.props;
		return <Product
			product={product}
			updateStateForView={this._updateStateForView}
			deleteProduct={this.delete_}
			updateProduct={this.update_}
		/>;
	}
}

export class ProductList extends Component {
	static propTypes = {
		hideCreateForm: PropTypes.func.isRequired,
		createForm: PropTypes.bool.isRequired,
	};
	create = (formValues,hideEdit) => {
		const {organizationId, productId} = this.props;
		return createProduct({formValues, organizationId, productId, hideEdit});
	};

	render() {
		const {  organizationId, createForm, updateStateForView} = this.props;
		const {products} = this.props;
		return <ListGroup>
			{createForm &&
			<ProductItemWrapper>
					<ProductCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</ProductItemWrapper>}
			{
				products.map(cert => <ProductContainer
					product={cert}
					updateStateForView = {updateStateForView}
					organizationId={organizationId}
					key={cert.id}
				/>)
			}
		</ListGroup>;
	}
}

export class Products extends Component {

	constructor(props){
		super(props);
		this.state = {createForm: false, edit:false, isLoading:false, error:null, products:[]};
	}
	static propTypes = {
		organizationId: PropTypes.string.isRequired
	};

	componentDidMount(){
		const {organizationId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/organizations/products/?product_organization=${organizationId}`,
					result: `Products-get/${organizationId}`,
					token: "",
				}
			);
		};

		emitting();

		socket.on(`Products-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, products: res, isLoading: false};
				this.setState(newState);
			}
		});
	}
	showCreateForm = () => {
		this.setState({createForm: true});
	};
	hideCreateForm = () => {
		this.setState({createForm: false});
	};
	updateStateForView = (error,isLoading) =>{
		this.setState({...this.state, error:error, isLoading:isLoading})
	}

	render() {
		const {organizationId} = this.props;
		const {createForm, products} = this.state;
		return (
			<div>
				<CategoryTitle
					title={__('Products')}
					showCreateForm={this.showCreateForm}
					createForm={createForm}
				/>
				<FrameCard>
					<ProductList
						updateStateForView={this.updateStateForView}
						products={products}
						organizationId={organizationId}
						createForm={createForm}
						hideCreateForm={this.hideCreateForm}
					/>
				</FrameCard>
			</div>
		)
	}
}
export default Products;