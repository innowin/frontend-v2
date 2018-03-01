/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Product, ProductItemWrapper} from "./view";
import {ProductCreateForm, ProductEditForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper, ItemWrapper, ItemHeader} from "../../common/cards/Frames";
import {createProduct, deleteProduct, updateProduct} from '../../../crud/organization/products.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {IDENTITY_ID,TOKEN} from '../../../consts/data'
import {postIcon} from "src/images/icons";



//TODO amir
export class ProductContainer extends Component {
	constructor(props){
		super(props);
		this.state={picture:{},edit:false}
	}
	componentWillReceiveProps(props){
		const {product} = props;
		this.setState ({...this.state ,product:product});
	}

	componentDidMount(){
		const {product} = this.props;
		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/pictures/?picture_product=${product.id}`,
				result: `Product-picture-get`,
				token: TOKEN,
			}
		);

		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/prices/?price_product=${product.id}`,
				result: `Product-price-get`,
				token: TOKEN,
			}
		);
		
		socket.on('Product-price-get',(res)=>{
			if(res.detail){

			}else{
				this.setState({...this.state, price:res})
			}
		})

		socket.on('Product-picture-get',(res)=>{
			if(res.detail){

			}else{
				this.setState({...this.state, picture:res})
			}
		})
	}

	showEdit(){
		this.setState({...this.state, edit:true});
	}
	// hideEdit(){
	// 	this.setState({...this.state, edit:false});
	// }
	delete_ = (product, products, hideEdit) => {
		const {organizationId} = this.props;
		
		return deleteProduct(product, products, hideEdit);
	};

	updateProducts =(res, method, index)=>{
		let {products} = this.state;
		if(method == "del"){
			products.splice(index,1);
		}else if ( method == "update"){
			products[index]= res;
		}else if( method == "insert"){
			products.push(res);
		}
		this.setState({...this.state, products:products});
	}
	update_ = (formValues, productId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
		return updateProduct(formValues,productId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res, error, isLoading) => {
		const {updateStateForView} = this.props;
		updateStateForView({error:error,isLoading:isLoading});
		this.setState({...this.state, product:res, error:error, isLoading:isLoading});
	};

	render() {
		const {categories, organization, products} = this.props;
		const {picture, price, edit} = this.state;
		let product = this.props.product || this.state.product;

		return(<Product
				showEdit={this.showEdit}
				hideEdit={this.hideEdit}
				organization={organization}
				price={price}
				products ={products}
				picture={picture}
				product={product}
				categories={categories}
				updateStateForView={this._updateStateForView}
				deleteProduct={this.delete_}
				updateProduct={this.update_}
			/>)	
	}
}

export class ProductList extends Component {
	static propTypes = {
		hideCreateForm: PropTypes.func.isRequired,
		createForm: PropTypes.bool.isRequired,
	};
	create = (formValues,hideEdit) => {
		const {organizationId, productId, updateStateForView} = this.props;
		return createProduct(formValues,updateStateForView, hideEdit);
	};

	render() {
		const {  organizationId, createForm, updateStateForView, organization} = this.props;
		const {products, categories} = this.props;
		return (<div>
				{createForm &&
				
						<ProductCreateForm hideEdit={this.props.hideCreateForm}  categories={categories} create={this.create} />
				}
				
				<div className="row">
					{
						
						products.map(cert => <ProductContainer
							organization={organization}
							products = {products}
							product={cert}
							categories={categories}
							updateStateForView = {updateStateForView}
							organizationId={organizationId}
							key={cert.id}
						/>)
					}
				</div>
			</div>
		)
	}
}

export class Products extends Component {

	constructor(props){
		super(props);
		this.state = {organization:{}, categories:[], createForm: false, edit:false, isLoading:false, error:null, products:[]};
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
					url: `${url}/products/?product_owner=${IDENTITY_ID}`,
					result: `Products-get/${IDENTITY_ID}`,
					token: TOKEN,
				}
			);

			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/products/category/`,
					result: `Products-category-get/`,
					token: TOKEN,
				}
			);

			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/organizations/${organizationId}/`,
					result: `Products-organization-get`,
					token: TOKEN,
				}
			);
		};

		emitting();
		socket.on('Products-organization-get',(res)=>{
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, organization: res, isLoading: false};
				this.setState(newState, ()=>{
				});
			}
		})
		socket.on(`Products-get/${IDENTITY_ID}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, products: res, isLoading: false};
				this.setState(newState, ()=>{
				});
			}
		});

		socket.on(`Products-category-get/`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, categories: res, isLoading: false};
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
		const {createForm, products, categories, organization, edit, isLoading, error} = this.state;
		return (
			<VerifyWrapper isLoading={isLoading} error={error}>
				<CategoryTitle
					title={__('Products')}
					showCreateForm={this.showCreateForm}
					createForm={createForm}
				/>
				<FrameCard>
					<ProductItemWrapper>		
						<ProductList
							updateStateForView={this.updateStateForView}
							products={products}
							categories={categories}
							organization={organization}
							organizationId={organizationId}
							createForm={createForm}
							hideCreateForm={this.hideCreateForm}
						/>
					</ProductItemWrapper>
				</FrameCard>
				</VerifyWrapper>
		)
	}
}
export default Products;