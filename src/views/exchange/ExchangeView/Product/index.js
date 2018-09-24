/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper, ListGroup} from "../../../common/cards/Frames"

import {REST_REQUEST} from "../../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../../consts/URLS"
import {TOKEN, IDENTITY_ID} from "src/consts/data"
import ImageViewer from '../../../common/ImageViewer'

import {Product} from './view'


//TODO amir
export class ProductContainer extends Component {
	constructor(props){
		super(props)
		this.state={pictures:[],price:{}, edit:false, product:{}, categories:[]}
	}
	componentWillReceiveProps(props){
		// const {product} = props
		// this.setState ({...this.state ,product:product})
	}

	componentDidMount(){
		const {productId} = this.props

		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/category/`,
				result: `Products-category-get/`,
				token: TOKEN,
			}
		)
//---
		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/pictures/?pictures_product=${productId}`,
				result: `Product-pictures-get`,
				token: TOKEN,
			}
		)

		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/${productId}`,
				result: `Product-get/${productId}`,
				token: TOKEN,
			}
		)

		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/prices/?price_product=${productId}`,
				result: `Product-price-get`,
				token: TOKEN,
			}
		)
		
		socket.on('Product-price-get',(res)=>{
			if(res.detail){

			}else{
				this.setState({...this.state, price:res})
			}
		})

		socket.on(`Product-get/${productId}`,res=>{
			if(res.detail){
				
			}else{
				this.setState({...this.state, product:res})
			}
		})

		socket.on(`Products-category-get/`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			}else{
				const newState = {...this.state, categories: res, isLoading: false}
				this.setState(newState)
			}
		})

		socket.on('Product-pictures-get',(res)=>{
			if(res.detail){

			}else{
				this.setState({...this.state, pictures:res})
			}
		})
	}
	render() {
		const {organization, productId} = this.props
		const {pictures, price, edit, product, categories} = this.state

		return(<Product
				deletePicture={this.deletePicture}
				addPicture={this.addPicture}
				organization={organization}
				price={price}
				pictures={pictures}
				product={product}
				categories={categories}
			/>)	
	}
}

export class ProductList extends Component {
	static propTypes = {
		hideCreateForm: PropTypes.func.isRequired,
		createForm: PropTypes.bool.isRequired,
		updateProductList: PropTypes.func.isRequired
	}

	render() {
		const {  organizationId, organization} = this.props
		const {products, categories} = this.props
		return (<div>				
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

export class Products extends Component {

	constructor(props){
		super(props)
		this.state = {organization:{}, categories:[], createForm: false, edit:false, isLoading:false, error:null, products:[]}
	}
	static propTypes = {
		organizationId: PropTypes.string.isRequired
	}

	componentDidMount(){
		const {organizationId } = this.props
		const emitting = () => {
			const newState = {...this.state, isLoading: true}
			this.setState(newState)
			
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/products/?product_owner=${IDENTITY_ID}`,
					result: `Products-get/${IDENTITY_ID}`,
					token: TOKEN,
				}
			)

			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/products/category/`,
					result: `Products-category-get/`,
					token: TOKEN,
				}
			)

			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/organizations/${organizationId}/`,
					result: `Products-organization-get`,
					token: TOKEN,
				}
			)
		}

		emitting()
		socket.on('Products-organization-get',(res)=>{
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			}else{
				const newState = {...this.state, organization: res, isLoading: false}
				this.setState(newState, ()=>{
				})
			}
		})
		socket.on(`Products-get/${IDENTITY_ID}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			}else{
				const newState = {...this.state, products: res, isLoading: false}
				this.setState(newState, ()=>{
				})
			}
		})

		socket.on(`Products-category-get/`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			}else{
				const newState = {...this.state, categories: res, isLoading: false}
				this.setState(newState)
			}
		})

	}

	render() {
		const {organizationId} = this.props
		const {createForm, products, categories, organization, edit, isLoading, error} = this.state
		return (
			<VerifyWrapper isLoading={isLoading} error={error}>
				<CategoryTitle
					title={__('Products')}
					showCreateForm={this.showCreateForm}
					createForm={createForm}
				/>
				<FrameCard>
					<ProductList
						updateProductList={this.updateProductList}
						updateStateForView={this.updateStateForView}
						products={products}
						categories={categories}
						organization={organization}
						organizationId={organizationId}
						createForm={createForm}
						hideCreateForm={this.hideCreateForm}
					/>
				</FrameCard>
				</VerifyWrapper>
		)
	}
}
