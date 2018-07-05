// @flow
import React, {Component} from 'react'
import {InformationIcon, postIcon, CertificateIcon, RatingIcon} from "../../images/icons"
import ProductPosts from "../product/posts"
import ProductBasicInformation from "../product/basicInformation"
import ProductCertificates from "../product/certificates"
import ProductRating from "../product/ratings"
import Represents from '../product/represents'
import ChatBar from "../bars/ChatBar"
import Sidebar from "../bars/SideBar"
import {Tabs} from "../common/cards/Frames"
import {NavLink, Switch, Redirect} from "react-router-dom"
import PropsRoute from "src/consts/PropsRoute"
import PropTypes from "prop-types"
import ProductSideView from "../bars/ProductBar"
import {PictureModal} from "./pictureModal"

export default class ProductView extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        widthOfRightBar: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {modal: false, modalFiles: [], selectedFileIndex: null}
    }

    _toggleModal = (files = [], fileIndex = -1) => {
        this.setState({modal: !this.state.modal, modalFiles: files, selectedFileIndex: fileIndex})
    }

    render() {// TODO ICON for represents
        const {match, widthOfRightBar} = this.props
        const {path, url, params} = match
        const productId = +(params.id)
        const {modal, modalFiles, selectedFileIndex} = this.state
        return (
            <div className="row">
                <div className={`${widthOfRightBar} -right-sidebar-wrapper`}>
                    <Sidebar>
                        <ProductSideView productId={productId} toggleModal={this._toggleModal}/>
                    </Sidebar>
                </div>
                <div className="col-md-6 col-sm-9 -content-wrapper">
                    <PictureModal className="pictureModal" isOpen={modal} files={modalFiles} toggleModal={this._toggleModal}
                                  selectedFileIndex={selectedFileIndex}/>
                    <Tabs>
                        <NavLink className="-tab" to={`${url}/basicInformation`}
                                 activeClassName="-active"><InformationIcon/></NavLink>
                        <NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active"><CertificateIcon/></NavLink>
                        <NavLink className="-tab" to={`${url}/Ratings`} activeClassName="-active"><RatingIcon/></NavLink>
                        <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">{postIcon}</NavLink>
                        <NavLink className="-tab" to={`${url}/Represents`} activeClassName="-active">{postIcon}</NavLink>
                    </Tabs>
                    <div>
                        <Switch>
                            <Redirect exact from={`${url}/`} to={`${url}/basicInformation`}/>
                            <PropsRoute path={`${path}/basicInformation`} component={ProductBasicInformation}
                                        productId={productId}/>
                            <PropsRoute path={`${path}/Certificates`} component={ProductCertificates} productId={productId}/>
                            <PropsRoute path={`${path}/Ratings`} component={ProductRating} productId={productId}/>
                            <PropsRoute path={`${path}/Posts`} component={ProductPosts} productId={productId}/>
                            <PropsRoute path={`${path}/Represents`} component={Represents} productId={productId}/>
                        </Switch>
                    </div>
                </div>
                <div className="col-md-3 col-sm-1 -left-sidebar-wrapper">
                    <ChatBar/>
                </div>
            </div>
        )
    }
}
