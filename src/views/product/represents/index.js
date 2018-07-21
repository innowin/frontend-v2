// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from 'prop-types'
import {getProductRepresents} from 'src/crud/product/represents'
import {getProduct} from 'src/crud/product/product'
import {getUser} from 'src/crud/user/user'
import {getOrganization} from 'src/crud/organization/organization'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {RepresentView} from "./Views"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import type {RepresentType, ProductType, UserType, ProfileType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type RepresentProps = {
    represent: RepresentType,
    updateRepresent: Function,
    productId: number,
    product: ProductType,
    translator: TranslatorType
}

type RepresentState = {
    represent: RepresentType,
    error: string | boolean,
    isLoading: boolean,
    user: UserType,
    organization: {},
    profile: ProfileType
}

export class Represent extends Component<RepresentProps, RepresentState> {

    static propTypes = {
        represent: PropTypes.object.isRequired,
        updateRepresent: PropTypes.func.isRequired
    }

    constructor(props: RepresentProps) {
        super()
        this.state = {
            error: false,
            isLoading: false,
            user: {},
            organization: {},
            product: {},
            profile: {},
            represent: props.represent || {}
        }
    }

    // TODO > all of this functions should move to saga. (ali)
    // commented by Ali.
    // _handleErrorLoading = (error: string | boolean = false) => this.setState({...this.state, isLoading: false, error: error})
    //
    // _updateView = (res: RepresentType) => this.setState({...this.state, represent: res})
    //
    // _update = (formValues: {}, postId: number) => { // ! note used anywhere.
    //     this.setState({...this.state, isLoading: true})
    //     return updateRepresent(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading)
    // }

    componentDidMount() {
        // TODO mohsen: handle get productId or organId from Represent
        const {productId, product} = this.props
        let self = this
        this.setState({isLoading: true, error: false})
        //getuser / organ
        socket.emit(REST_REQUEST,
            {
                method: "get",
                url: `${url}/users/identities/${product.product_owner}/`,
                result: `product-owner-get/${productId}`,
                token: TOKEN,
            }
        )

        socket.on(`product-owner-get/${productId}`, (res) => {
            if (res.detail) {
                this.setState({error: res.detail, isLoading: false})
            } else {
                if (res.identity_user != null) {
                    getUser(res.identity_user, (userRes: UserType) => {
                        if (res.detail) {
                            self.setState({error: res.detail, isLoading: false})
                        } else {
                            self.setState({user: userRes, isLoading: false, error: false})
                        }
                    })
                } else {
                    getOrganization(res.identity_organization, (organRes) => {
                        if (res.detail) {
                            self.setState({error: res.detail, isLoading: false})
                        } else {
                            self.setState({organization: organRes, isLoading: false, error: false})
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
                const newState: RepresentState = {...this.state, error: res.detail, isLoading: false}
                this.setState(newState)
            } else {
                const newState: RepresentState = {...this.state, profile: res[0], isLoading: false}
                this.setState(newState)
            }
        })

    }

    render() {
        const {represent, isLoading, error, profile, user, organization} = this.state
        const {product, translator} = this.props
        return (
            <VerifyWrapper isLoading={isLoading} error={error}>
                <RepresentView
                    error={error}
                    isLoading={isLoading}
                    represent={represent}
                    product={product}
                    productId={product.id}
                    profile={profile}
                    user={user}
                    organization={organization}
                    // showEdit={this._showEdit} commented by Ali. _showEdit not exists.
                    showEdit={() => 1}
                    translator={translator}
                />
            </VerifyWrapper>
        )
    }
}
type RepresentsProps = {
    translator: TranslatorType,
    productId: number
}

type RepresentsState = {
    isLoading: boolean, error: ?boolean | string, represent: [], product: {}, profile: {}
}

class Represents extends Component<RepresentsProps, RepresentsState> {

    constructor() {
        super()
        this.state = {isLoading: false, error: null, represent: [], product: {}, profile: {}}
    }

    _handleErrorLoading = (error: boolean|string = false) => {
        this.setState({...this.state, isLoading: false, error: error})
    }

    _updateRepresents = (res: RepresentType, type: string, deletedIndex: ?string = null) => {
        let self = this
        const {productId} = this.props
        getProduct(productId, (product) => {
            const {represent} = self.state
            self.setState({...self.state, product: product, represent: [...represent, ...res]})
        })

        return false
    }

    _getProductRepresents = (productId: number) => {
        this.setState({...this.state, isLoading: true})
        getProductRepresents(productId, this._updateRepresents, this._handleErrorLoading)
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
        const {isLoading, error, product} = this.state
        const {translator, productId} = this.props
        const represent = [...new Set(this.state.represent)]
        return (
            <VerifyWrapper isLoading={isLoading} error={error}>
                <CategoryTitle
                    title={translator['Represent']}
                />
                <FrameCard className="-frameCardRepresents">
                    <ListGroup>
                        {
                            represent.map((represent) => (
                                <Represent
                                    productId={productId}
                                    translator={translator}
                                    product={product}
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