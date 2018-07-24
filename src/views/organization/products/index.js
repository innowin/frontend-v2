/*global __*/
// @flow
import * as React from 'react'
import PropTypes from 'prop-types';
import {Product, ProductItemWrapper} from "./view";
import {ProductCreateForm, ProductEditForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper, ItemWrapper, ItemHeader} from "../../common/cards/Frames";
// import {createProduct, deleteProduct, updateProduct, addPicture, deletePicture} from '../../../crud/organization/products.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {IDENTITY_ID,TOKEN} from '../../../consts/data'
import client from '../../../consts/client'
import {postIcon} from "src/images/icons";
import OrganizationActions from '../../../redux/actions/organizationActions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
//TODO amir
type ProductContainerProps = {
	product:Object,
	categories:Array<Object>,
	organization:Object,
	products:Array<Object>
}
export class ProductContainer extends React.Component<ProductContainerProps,{error:boolean , isLoading:boolean , products:Array<Object>,product:Object, pictures:Array<Object>,price:Object, edit:boolean}> {
	state={pictures:[],price:{}, edit:false,product:{},products:[],error:false,isLoading:false}
	constructor(props:ProductContainerProps){
		super(props);
	}
	componentWillReceiveProps(props:ProductContainerProps){
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
	delete_ = (product:Object, products:Array<Object>, hideEdit:Function) => {
		// const { deleteProduct} = this.props.actions;
		// return deleteProduct(product, products, updateProductsList);
	};

	updatePicturesList = (res:Object, type:string, deletedIndex:number = -1)=>{
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

	deletePicture = (pictures:Array<Object>, picture:Object, updateStateForView:Function) => {
		// deletePicture(pictures, picture, this.updatePicturesList, updateStateForView );
	}

	addPicture = (mediaId:number,productId:number) => {
		// addPicture({mediaId,productId})
	}

	updateProducts =(res:Object, method:string, index:number)=>{
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
	update_ = (formValues:Object, productId:number, picturesId:number, updateStateForView:Function, hideEdit:Function) => {//formValues, careerId, updateStateForView, hideEdit
		// return updateProduct(formValues,productId, picturesId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res:Object, error:boolean, isLoading:boolean) => {
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
type ProductListProps = {
	hideCreateForm: Function,
	createForm: boolean,
	organizationId: number,
	products: Array<Object>,
	categories : Array<Object>,
	organization: Object,
	deletePicture: Function,
	actions: Object,
	auth : Object,
	organization : Object
}
export class ProductList extends React.Component<ProductListProps> {
	
	create = (formValues:Object,hideEdit:Function) => {
		const {organizationId, auth} = this.props;
		const {createProduct} = this.props.actions
		console.log(this.props)
		return createProduct(formValues,auth.client.identity.id, hideEdit);
	};

	render() {
		const {organizationId, createForm,  organization, deletePicture} = this.props;
		const {products, categories} = this.props;
		return (<div>
				{createForm &&
						<ProductCreateForm 
							deletePicture={deletePicture}
							hideEdit={this.props.hideCreateForm} 
							pictures={[]}  
							categories={categories} 
							create={this.create} 
						/>
				}
				
				<div className="row">
					{
						products.map(cert => <ProductContainer
							organization={organization}
							products = {products}
							product={cert}
							categories={categories}
							organizationId={organizationId}
							key={cert.id}
						/>)
					}
				</div>
			</div>
		)
	}
}

type ProductsProps = {
	organizationId: number,
	actions:Object,
	organization:Object,
	auth: Object,
}
export class Products extends React.Component<ProductsProps,
{createForm: boolean, edit:boolean}> {
	state = {createForm: false, edit:false};
	constructor(props:ProductsProps){
		super(props);
	}


	componentDidMount(){
		const {organizationId } = this.props;
		const {getProducts} = this.props.actions;
		getProducts(organizationId);
	}

	deletePicture = (pictures:Array<Object>, picture:Object, updateStateForView:Function) => {

	}


	showCreateForm = () => {
		this.setState({createForm: true});
	};
	hideCreateForm = () => {
		this.setState({createForm: false});
	};
	updateStateForView = (error:boolean,isLoading:boolean) =>{

	}

	render() {
		console.log("")
		const {organizationId, actions, auth, organization} = this.props;
		const {products} = organization
		const {isLoading, error, categories} = products
		const {createForm, edit} = this.state;
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
							deletePicture = {this.deletePicture}
							products={products.content}
							categories={products.categories}
							organization={organization}
							organizationId={organizationId}
							createForm={createForm}
							hideCreateForm={this.hideCreateForm}
							actions = {actions}
							auth = {auth}
						/>
					</ProductItemWrapper>
				</FrameCard>
				</VerifyWrapper>
		)
	}
}
const mapStateToProps = (state) => ({
	organization:state.organization,
	auth:state.auth
})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		getProducts: OrganizationActions.getProducts ,
		createProduct: OrganizationActions.createProduct
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Products)
