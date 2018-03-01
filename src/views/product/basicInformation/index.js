/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {ProductInfoEditForm , ProductDescriptionEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN} from "src/consts/data"
import {ProductInfoItemWrapper, ProductInfoView, ProductDescriptionView, ProductDescriptionWrapper} from "./Views"
import {Product} from "../../Product";


export class ProductInfo extends Component {
	
	constructor(props) {
		super(props);
		this.state = {product: {}, product_category:{}, owner:{}, error: null, edit: false, isLoading: false}
	}
	
	static propTypes = {
		productId: PropTypes.string.isRequired,
	};
	
	_showEdit = () => {
		this.setState({...this.state, edit: true});
	};
	
	_hideEdit = () => {
		this.setState({...this.state, edit: false});
	};
	
	_updateStateForView = (res, error, isLoading) => {
		this.setState({...this.state, product: res, error: error, isLoading});
  };
  
  getProductDetail(categoryId, userId){
    const newState = {...this.state, isLoading: true};
    this.setState(newState);
    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/products/category/${categoryId}`,
        result: `Products-category-get/`,
        token: TOKEN,
      }
    );

    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/users/${userId}/`,
        result: `Products-owner-get`,
        token: TOKEN,
      }
    );
  }
	
	componentDidMount() {
		const {productId} = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
					{
						method: "get",
						url: `${url}/products/${productId}/`,
						result: `ProductInfo-get/${productId}`,
						token: TOKEN,
					}
      );
		};
		
		emitting();
		
		socket.on(`ProductInfo-get/${productId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}
      const newState = {...this.state, product: res, isLoading: false};
      this.getProductDetail(res.product_category,res.product_owner);
			this.setState(newState);
    });
    
    socket.on(`Products-category-get/`,(res)=>{
      if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}
      const newState = {...this.state, product_category: res, isLoading: false};
			this.setState(newState);
    })

    socket.on(`Products-owner-get`,(res)=>{
      if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}
      const newState = {...this.state, owner: res, isLoading: false};
			this.setState(newState);
    })
	}

	render() {
		const {product,product_category,owner, edit, isLoading, error} = this.state;
		return (
				<VerifyWrapper isLoading={isLoading} error={error}>
          {
            (edit) ? (
              <ProductDescriptionWrapper>
                <ProductDescriptionEditForm
                    owner={owner}
                    product={product}
                    product_category={product_category}
                    description={product.description}
                    hideEdit={this._hideEdit}
                    updateStateForView={this._updateStateForView}
                />
              </ProductDescriptionWrapper>
            ) : (
                <ProductDescriptionView description={product.description} product_category={product_category} owner={owner} showEdit={this._showEdit}/>
            )
					}
					{
						(edit) ? (
								<ProductInfoItemWrapper>
									<ProductInfoEditForm
                      owner={owner}
                      product_category={product_category}
											product={product}
											hideEdit={this._hideEdit}
											updateStateForView={this._updateStateForView}
									/>
								</ProductInfoItemWrapper>
						) : (
								<ProductInfoView product_category={product_category} product={product} owner={owner} showEdit={this._showEdit}/>
            )
          }
          
				</VerifyWrapper>
		)
	}
}


export default class productBasicInformation extends Component {
	static propTypes = {
		productId: PropTypes.string.isRequired,
	};
	
	render() {
		const {productId} = this.props;
		return (
				<div>
					<CategoryTitle
							title={__('Product Detail')}
							createForm={true}
					/>
					<FrameCard>
						<ListGroup>
              {/* {<ProductDescriptionInfo productId={productId}/>} */}
							<ProductInfo productId={productId}/>
						</ListGroup>
					</FrameCard>
				</div>
		)
	}
}

