// @flow
import * as React from 'react'
import {Component} from 'react'
import {InformationIcon, postIcon, CertificateIcon} from "../../images/icons"
import ProductPosts from "../product/posts"
import ProductBasicInformation from "../product/basicInformation"
import ProductCertificates from "../product/certificates"
import ProductRating from "../product/ratings"
import {Tabs} from "../common/cards/Frames"
import {NavLink, Switch, Redirect} from "react-router-dom"
import PropsRoute from "src/consts/PropsRoute"
import PropTypes from "prop-types"
import {PictureModal} from "./pictureModal"
import {connect} from "react-redux"
import {getMessages} from "../../redux/selectors/translateSelector"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import SideBar from '../bars/productBar/index'

type ParamsType = {
  id: string
}

type MatchType = {
  path: string,
  url: string,
  params: ParamsType
}
type ProductViewProps = {
  match: MatchType,
  translator: TranslatorType,
  token: string,
  identityId: number
}

type ProductViewState = {
  modal: boolean,
  modalFiles: [],
  selectedFileIndex: ?number,
  sideBarIsVisible: boolean
}

class ProductView extends Component<ProductViewProps, ProductViewState> {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      modal: false,
      modalFiles: [],
      selectedFileIndex: null,
      sideBarIsVisible: true
    }
  }

  _toggleModal = (files: [] = [], fileIndex: number = -1) => {
    this.setState({...this.state, modal: !this.state.modal, modalFiles: files, selectedFileIndex: fileIndex})
  }
  _sideBarVisibilityHandler = () => this.setState({...this.state, sideBarIsVisible: !this.state.sideBarIsVisible})

  render() {// TODO ICON for represents
    const {match, translator} = this.props
    const {path, url, params} = match
    const productId = params.id
    const {modal, modalFiles, selectedFileIndex, sideBarIsVisible} = this.state
    return (
        <div className='all-exchanges-parent'>
          <SideBar productId={productId} visible={sideBarIsVisible} visibilityHandler={this._sideBarVisibilityHandler}/>
          <div className='product-container'>
            <PictureModal className="pictureModal" isOpen={modal} files={modalFiles}
                          toggleModal={this._toggleModal}
                          selectedFileIndex={selectedFileIndex}/>
            <Tabs>
              <NavLink className="-tab" to={`${url}/basicInformation`}
                       activeClassName="-active"><InformationIcon/></NavLink>
              <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
              <NavLink className="-tab" to={`${url}/Certificates`}
                activeClassName="-active"><CertificateIcon/></NavLink>
              {/*<NavLink className="-tab" to={`${url}/Ratings`}*/}
                {/*activeClassName="-active"><RatingIcon/></NavLink>*/}
              {/*<NavLink className="-tab" to={`${url}/Represents`}*/}
                       {/*activeClassName="-active">{postIcon}</NavLink>*/}
            </Tabs>
            <div>
              <Switch>
                <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
                <PropsRoute path={`${path}/Posts`} component={ProductPosts} productId={productId} translator={translator}/>
                <PropsRoute path={`${path}/basicInformation`} component={ProductBasicInformation}
                            productId={productId} translator={translator}/>
                <PropsRoute path={`${path}/Certificates`} component={ProductCertificates}
                            productId={productId}/>
                <PropsRoute path={`${path}/Ratings`} component={ProductRating} productId={productId} translator={translator}/>
                {/*<PropsRoute path={`${path}/Represents`} component={Represents} productId={productId} translator={translator}/>*/}
              </Switch>
            </div>
            {/*</div>*/}
            {/*<div className="col-md-3 col-sm-1 -left-sidebar-wrapper">*/}
            {/*<ChatBar/>*/}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => (
    {
      translator: getMessages(state),
    }
)

export default connect(mapStateToProps)(ProductView)