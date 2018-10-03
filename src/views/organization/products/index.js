/*global __*/
// @flow
import * as React from 'react'
import PropTypes from 'prop-types';
import {Product, ProductItemWrapper} from "./view";
import {ProductCreateForm, ProductEditForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper, ItemWrapper, ItemHeader} from "../../common/cards/Frames"
// import {createProduct, deleteProduct, updateProduct, addPicture, deletePicture} from '../../../crud/organization/products.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {IDENTITY_ID,TOKEN} from '../../../consts/data'
import client from '../../../consts/client'
import {postIcon} from "src/images/icons";
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
//TODO amir
type ProductContainerProps = {
	product:Object,
	categories:Array<Object>,
	organization:Object,
	products:Array<Object>,
	actions:Object,
}
export class ProductContainer extends React.Component<ProductContainerProps,{ edit:boolean}> {
	state={ edit:false}
	constructor(props:ProductContainerProps){
		super(props);
	}
	componentWillReceiveProps(props:ProductContainerProps){
		const {product} = props;
	}

	componentDidMount(){
		const {product,actions} = this.props;
		const {getProductPicture} = actions;
		// socket.emit(REST_REQUEST,
		// 	{
		// 		method: "get",
		// 		url: `${url}/products/pictures/?pictures_product=${product.id}`,
		// 		result: `Product-pictures-get`,
		// 		token: TOKEN,
		// 	}
		// );

		// socket.emit(REST_REQUEST,
		// 	{
		// 		method: "get",
		// 		url: `${url}/products/prices/?price_product=${product.id}`,
		// 		result: `Product-price-get`,
		// 		token: TOKEN,
		// 	}
		// );
		
		// socket.on('Product-price-get',(res)=>{
		// 	if(res.detail){

		// 	}else{
		// 		this.setState({...this.state, price:res})
		// 	}
		// })

		// socket.on('Product-pictures-get',(res)=>{
		// 	if(res.detail){

		// 	}else{
		// 		this.setState({...this.state, pictures:res})
		// 	}
		// })
	}

	showEdit(){
		this.setState({...this.state, edit:true});
	}
	hideEdit(){
		this.setState({...this.state, edit:false});
	}
	delete_ = (product:Object, hideEdit:Function) => {
		const { deleteProduct} = this.props.actions;
		return deleteProduct(product.id)
	};


	addPicture = (mediaId:number,productId:number) => {
		// addPicture({mediaId,productId})
	}

	update_ = (formValues:Object, productId:number,hideEdit:Function) => {//formValues, careerId, updateStateForView, hideEdit
		const {updateProduct} = this.props.actions
		return updateProduct(formValues,productId, hideEdit);
	};

	render() {
		const {categories, organization, products} = this.props;
		const {  edit} = this.state;
		let product = this.props.product
		let pictures = product.pictures || []
		let price =product.price || {}
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
		return createProduct(formValues,auth.client.identity.content, hideEdit);
	};

	render() {
		const {organizationId, createForm,  organization, deletePicture} = this.props;
		const {products, categories,actions} = this.props;
		return (<div>
				{createForm &&
						<ProductCreateForm 
							deletePicture={deletePicture}
							hideEdit={this.props.hideCreateForm} 
							pictures={[]}  
							actions={actions}
							categories={categories} 
							create={this.create} 
						/>
				}
				
				<div className="row">
					{
						products.map(product => <ProductContainer
							actions = {actions}
							organization={organization}
							products = {products}
							product={product}
							categories={categories}
							organizationId={organizationId}
							key={product.id}
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
		createProduct: OrganizationActions.createProduct,
		updateProduct : OrganizationActions.updateProduct,
		deleteProduct : OrganizationActions.deleteProduct,
		getProductPicture : OrganizationActions.getProductPicture
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Products)
