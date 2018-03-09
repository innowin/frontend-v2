/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Product, ProductItemWrapper} from "./view";
import {ProductCreateForm, ProductEditForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper, ItemWrapper, ItemHeader} from "../../common/cards/Frames";
import {createProduct, deleteProduct, updateProduct, addPicture, deletePicture} from '../../../crud/organization/products.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {IDENTITY_ID,TOKEN} from '../../../consts/data'
import {postIcon} from "src/images/icons";



//TODO amir
export class ProductContainer extends Component {
	constructor(props){
		super(props);
		this.state={pictures:[],price:{}, edit:false}
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
				url: `${url}/products/pictures/?pictures_product=${product.id}`,
				result: `Product-pictures-get`,
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

		socket.on('Product-pictures-get',(res)=>{
			if(res.detail){

			}else{
				this.setState({...this.state, pictures:res})
			}
		})
	}

	showEdit(){
		this.setState({...this.state, edit:true});
	}
	hideEdit(){
		this.setState({...this.state, edit:false});
	}
	delete_ = (product, products, hideEdit) => {
		const {organizationId, updateProductsList} = this.props;
		
		return deleteProduct(product, products, updateProductsList);
	};

	

	updatePicturesList = (res, type, deletedIndex = null)=>{
		const {pictures} = this.state;
		if (type === 'get') {
			this.setState({...this.state, pictures: [...pictures, ...res]});
			return false;
		}
		if (type === 'post') {
			this.setState({...this.state, pictures: [res, ...pictures]});
			return false;
		}
		if (type === 'del') {
			const remainPictures = pictures.slice(0, deletedIndex).concat(pictures.slice(deletedIndex + 1));
			this.setState({...this.state, pictures: remainPictures});
		}
	}

	deletePicture = (pictures, picture, updateStateForView) => {
		deletePicture(pictures, picture, this.updatePicturesList, updateStateForView );
	}

	addPicture = ({mediaId,productId}) => {
		addPicture({mediaId,productId})
	}

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
	update_ = (formValues, productId, picturesId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
		return updateProduct(formValues,productId, picturesId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res, error, isLoading) => {
		const {updateStateForView} = this.props;
		updateStateForView({error:error,isLoading:isLoading});
		this.setState({...this.state, product:res, error:error, isLoading:isLoading});
	};

	render() {
		const {categories, organization, products} = this.props;
		const {pictures, price, edit} = this.state;
		let product = this.props.product || this.state.product;

		return(<Product
				deletePicture={this.deletePicture}
				addPicture={this.addPicture}
				showEdit={this.showEdit}
				hideEdit={this.hideEdit}
				organization={organization}
				price={price}
				products ={products}
				pictures={pictures}
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
		updateProductsList: PropTypes.func.isRequired
	};
	create = (formValues,hideEdit) => {
		const {organizationId, productId, updateStateForView} = this.props;
		return createProduct(formValues,updateStateForView, hideEdit);
	};

	render() {
		const {updateProductsList,  organizationId, createForm, updateStateForView, organization, deletePicture, addPicture} = this.props;
		const {products, categories} = this.props;
		return (<div>
				{createForm &&
				
						<ProductCreateForm 
							updateProductsList={updateProductsList}
							deletePicture={deletePicture}
							addPicture={addPicture} 
							hideEdit={this.props.hideCreateForm} 
							pictures={[]}  
							categories={categories} 
							create={this.create} 
						/>
				}
				
				<div className="row">
					{
						
						products.map(cert => <ProductContainer
							updateProductsList={updateProductsList}
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

	updateProductsList = (res, type, deletedIndex = null)=>{
		const {products} = this.state;
		if (type === 'get') {
			this.setState({...this.state, products: [...products, ...res]});
			return false;
		}
		if (type === 'post') {
			this.setState({...this.state, products: [res, ...products]});
			return false;
		}
		if (type === 'del') {
			const remainProducts = products.slice(0, deletedIndex).concat(products.slice(deletedIndex + 1));
			this.setState({...this.state, products: remainProducts});
		}
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
							updateProductsList={this.updateProductsList}
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