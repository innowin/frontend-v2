// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {ProductInfoEditForm , ProductDescriptionEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN, IDENTITY_ID} from "src/consts/data"
import {ProductInfoItemWrapper, ProductInfoView, ProductDescriptionView, ProductDescriptionWrapper} from "./Views"
import {getMessages} from "../../../redux/selectors/translateSelector";
import {connect} from "react-redux"
import type {ProductType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type OwnerType = {
	name: string
}
type ProductCategoryType = {
	name: string
}
type ProductInfoState = {
	product: ProductType,
	product_category: ProductCategoryType,
	owner: OwnerType,
	error: string,
	edit: boolean,
	isLoading: boolean
}
type ProductInfoProps = {
	productId: number,
    translator: TranslatorType
}

export class ProductInfo extends Component<ProductInfoProps, ProductInfoState> {
	
	constructor() {
		super()
		this.state = {
			product: {
                description: '',
                id: 0,
                name: '',
                province: '',
                country: '',
                city: '',
                product_category: 0
			},
			product_category:{
				name: ''
			},
			owner:{
				name: ''
			},
			error: '',
			edit: false,
			isLoading: false
		}
	}
	
	static propTypes = {
		productId: PropTypes.string.isRequired,
	}
	
	_showEdit = () => {
		this.setState({...this.state, edit: true})
	}
	
	_hideEdit = () => {
		this.setState({...this.state, edit: false})
	}
	
	_updateStateForView = (res: ProductType, error: string, isLoading: boolean) => {
		this.setState({...this.state, product: res, error: error, isLoading})
  }
  
  getProductDetail(categoryId: number, userId: number, productId: number){
    const newState = {...this.state, isLoading: true}
    this.setState(newState)
    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/products/category/${categoryId}`,
        result: `Products-category-get/`,
        token: TOKEN,
      }
    )

    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/users/identities/${IDENTITY_ID}/`,
        result: `Products-owner-get`,
        token: TOKEN,
      }
		)
		
		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/products/pictures/?picture_product=${productId}`,
				result: `product-pictures-get/${productId}`,
				token: TOKEN
			}
		)
  }
	
	componentDidMount() {
		const {productId} = this.props
		const emitting = () => {
			const newState = {...this.state, isLoading: true}
			this.setState(newState)
			socket.emit(REST_REQUEST,
					{
						method: "get",
						url: `${url}/products/${productId}/`,
						result: `ProductInfo-get/${productId}`,
						token: TOKEN,
					}
			)
			
			
		}
		
		emitting()
		
		
		socket.on(`ProductInfo-get/${productId}`, (res) => {
			console.log('hi ali res is : ', res)
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			}
      const newState = {...this.state, product: res, isLoading: false}
      this.getProductDetail(res.product_category,res.product_owner, productId)
			this.setState(newState)
    })
    
    socket.on(`Products-category-get/`,(res)=>{
      if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			}
      const newState = {...this.state, product_category: res, isLoading: false}
			this.setState(newState)
    })

    socket.on(`Products-owner-get`,(res)=>{
      if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			}
      const newState = {...this.state, owner: res, isLoading: false}
			this.setState(newState)
    })
	}

	render() {
		const {product,product_category,owner, edit, isLoading, error} = this.state
		const {translator} = this.props
		return (
				<VerifyWrapper isLoading={isLoading} error={error}>
          {
            (edit) ? (
              <ProductDescriptionWrapper translator={translator}>
                <ProductDescriptionEditForm
                    translator={translator}
                    owner={owner}
                    product={product}
                    product_category={product_category}
                    description={product.description}
                    hideEdit={this._hideEdit}
                    updateStateForView={this._updateStateForView}
                />
              </ProductDescriptionWrapper>
            ) : (
                <ProductDescriptionView translator={translator} description={product.description} product_category={product_category} owner={owner} showEdit={this._showEdit}/>
            )
					}
					{
						(edit) ? (
								<ProductInfoItemWrapper translator={translator}>
									<ProductInfoEditForm
                                        	translator={translator}
                      						owner={owner}
                      						product_category={product_category}
											product={product}
											hideEdit={this._hideEdit}
											updateStateForView={this._updateStateForView}
									/>
								</ProductInfoItemWrapper>
						) : (
								<ProductInfoView translator={translator} product_category={product_category} product={product} owner={owner} showEdit={this._showEdit}/>
            )
          }
          
				</VerifyWrapper>
		)
	}
}

type BasicInfoProps = {
	productId: number,
	translator: TranslatorType
}

const productBasicInformation = (props: BasicInfoProps) => {
	const {productId, translator} = props
	return (
        <div>
            <CategoryTitle
                title={translator['Product Detail']}
                createForm={true}
            />
            <FrameCard>
                <ListGroup>
                    <ProductInfo translator={translator} productId={productId}/>
                </ListGroup>
            </FrameCard>
        </div>
    )
}

const mapStateToProps = (state) => ({translator: getMessages(state)})

export default connect(mapStateToProps)(productBasicInformation)