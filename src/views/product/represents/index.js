/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getProductRepresents, createRepresent, deleteRepresent, updateRepresent} from 'src/crud/product/represents'
import {getProduct} from 'src/crud/product/product'
import {getUser} from 'src/crud/user/user'
import {getOrganization} from 'src/crud/organization/organization'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {RepresentItemWrapper, RepresentView} from "./Views"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import {ID} from "../../../consts/data"

export class Represent extends Component {

  static propTypes = {
    represent: PropTypes.array.isRequired,
    represent: PropTypes.object.isRequired,
    updateRepresent: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { error: false, isLoading: false, user:{}, organization:{}, product:{}, profile:{}, represent: this.props.represent||{} }
  }
  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _updateView = (res) => {
    this.setState({...this.state, Represent: res})
  }

  _update = (formValues, postId) => {
    this.setState({...this.state, isLoading: true})
    return updateRepresent(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading)
  }

  componentDidMount() {
    // TODO mohsen: handle get productId or organId from Represent
    const {productId,product} = this.props
    let self = this
    this.setState({isLoading:true,error:false})
    //getuser / organ
    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/users/identities/${product.product_owner}/`,
        result: `product-owner-get/${productId}`,
        token: TOKEN,
      }
    )

    socket.on(`product-owner-get/${productId}`, (res)=>{
      if(res.detail){
        this.setState({error:res.detail,isLoading:false})
      }else{
        if(res.identity_user != null){
          getUser(res.identity_user,(userRes)=>{
            if(res.detail){
              self.setState({error:res.detail,isLoading:false})
            }else{
              self.setState({user:userRes,isLoading:false,error:false})
            }
          })
        }else{
          getOrganization(res.identity_organization,(organRes)=>{
            if(res.detail){
              self.setState({error:res.detail,isLoading:false})
            }else{
              self.setState({organization:organRes,isLoading:false,error:false})
            }
          })
        }
      }
    })
  }

  componentWillUnmount() {
    const {productId} = this.props
    // TODO mohsen: complete by socket.off of update and delete requests
    socket.off(`product-owner-get/${productId}`)
    socket.off(`product-Represents-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false}
        this.setState(newState)
      } else {
        const newState = {...this.state, represent: res, isLoading: false}
        this.setState(newState)
      }
    })

    socket.off(`profileUser-Represents-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false}
        this.setState(newState)
      } else {
        const newState = {...this.state, profile: res[0], isLoading: false}
        this.setState(newState)
      }
    })

  }

  render() {
    const {represent, isLoading, error, profile, user, organization} = this.state
    const {product} = this.props
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <RepresentView represent={represent} product={product} productId={product.id} profile={profile} user={user} organization={organization} showEdit={this._showEdit}/>
      </VerifyWrapper>
    )
  }
}

class Represents extends Component {

  constructor(props) {
    super(props)
    this.state = {isLoading: false, error: null, represent: [], product: {}, profile: {}}
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _updateRepresents = (res, type, deletedIndex = null) => {
    let self = this
    const {productId} = this.props
    getProduct(productId, (product)=>{
      const {represent} = self.state
      self.setState({...self.state, product:product, represent: [...represent, ...res]})
    })
    
    return false
  }

  _getProductRepresents = (productId) => {
    this.setState({...this.state, isLoading: true})
    getProductRepresents(productId , this._updateRepresents, this._handleErrorLoading)
  }

  componentDidMount() {
    this._getProductRepresents(this.props.productId)
  }

  componentWillUnmount() {
    const {productId} = this.props
    // TODO mohsen: complete by socket.off of update and delete requests
    socket.off(`productRepresents-Represents-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false}
        this.setState(newState)
      } else {
        const newState = {...this.state, represent: res, isLoading: false}
        this.setState(newState)
      }
    })
  }

  render() {
    const { isLoading, error, product} = this.state
    const represent = [...new Set(this.state.represent)]
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Represent')}
        />
        <FrameCard className="-frameCardRepresents">
          <ListGroup>
            {
              represent.map((represent) => (
                <Represent
                  product = {product}
                  represents={represent}
                  represent={represent}
                  updateRepresent={this._updateRepresents}
                  key={represent.id}
                />
              ))
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Represents