// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {Collapse} from "reactstrap"
import AuthActions from "src/redux/actions/authActions"
import {routerActions} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {userProfileType, userType} from "src/consts/flowTypes/user/basicInformation"
import {fileType} from "src/consts/flowTypes/common/fileType"
import {shortOrganizationType} from "src/consts/flowTypes/organization/organization"
import {
    DefaultUserIcon,
    logoDaneshBoom,
    ExchangeExploreIcon,
    NotificationIcon
} from "src/images/icons"
import {Link} from "react-router-dom"
import {getFile} from "src/crud/media/media"
import AgentForm from "../pages/modal/agentForm-modal"
import AddingContribution from "../pages/adding-contribution/addingContribution"
import CreateExchangeForm from "../pages/modal/createExchange-modal";
import client from "src/consts/client"

type PropsTopBar = {|
    collapseClassName: string,
    isLoggedIn: boolean,
    clientUser: userType,
    clientProfile: userProfileType,
    clientOrganization: ?shortOrganizationType,
    actions: {
        signOut: Function,
        push: Function,
        verifyToken: Function
    },
    translate: {[string]: string},
|}

type StatesTopBar = {|
    isSignedOut: boolean,
    collapse: boolean,
    collapseProfile: boolean,
    agentForm: boolean,
    profileMedia: ? string,
    productWizardModalIsOpen: boolean,
    createExchangeForm: boolean,
|}

class TopBar extends Component<PropsTopBar, StatesTopBar> {

    static propTypes = {
        collapseClassName: PropTypes.string.isRequired,
        translate: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    }

    //types
    searchInput: ? HTMLInputElement

    constructor(props) {
        super(props)
        this.state = {
            isSignedOut: false,
            collapse: false,
            collapseProfile: false,
            agentForm: false,
            createExchangeForm: false,
            profileMedia: null,
            productWizardModalIsOpen: false
        }
    }

    componentDidUpdate(nextProps: { isLoggedIn: boolean }) {
        if (nextProps.isLoggedIn && nextProps.isLoggedIn !== this.props.isLoggedIn) {
            this.props.actions.push('/login')
        }
    }

    componentDidMount() {
        const {actions} = this.props
        const {verifyToken} = actions
        const mediaId: ?number = this.props.clientProfile.profile_media
        if (mediaId) {
            const mediaResult = (res: fileType): void => {
                this.setState({...this.state, profileMedia: res.file})
            }
            getFile(mediaId, mediaResult)
        }
        setTimeout(() =>
            verifyToken(client.getToken())
        , 1000)
    }

    _toggle = (e: SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        this.setState({...this.state, collapse: !this.state.collapse})
    }

    _toggleProfile = (e: SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        this.setState({...this.state, collapseProfile: !this.state.collapseProfile})
    }

    _handleExchangeUpgrade = (e) => {
        this.setState({...this.state, agentForm: true})
    }

    _handleHideAgent = (e) => {
        this.setState({...this.state, agentForm: false})
    }

    _handleNewExchange = () => {
        //TODO: new exchange should be handled
        this.setState({...this.state, createExchangeForm: true})
    }

    _handleHideNewExchange = ()=>{
        this.setState({...this.state, createExchangeForm: false})
    }

    _handleProductWizardModal = () => {
        this.setState({...this.state, productWizardModalIsOpen: !this.state.productWizardModalIsOpen})
    }

    _handleSignOut = () => {
        this.props.actions.signOut()
    }

    render() {
        const {collapseClassName, clientUser, clientOrganization, translate} = this.props
        const {profileMedia, collapse, collapseProfile, productWizardModalIsOpen} = this.state
        return (
            <div>
                <AgentForm
                    active={this.state.agentForm}
                    hide={this._handleHideAgent}
                />
                <CreateExchangeForm
                    active = {this.state.createExchangeForm}
                    hide={this._handleHideNewExchange}
                />
                <nav className="navbar flex-row justify-content-between p-0 -white-i fixed-top topBar">
                    <div className="d-flex align-items-center -whiteSvg">
                        <button type="button"
                                className={`navbar-toggler my-auto mr-2 -outlineWhite ${collapse ? "active" : ""}`}
                                onClick={this._toggle}>
                            {!collapse ? <i className="fa fa-bars cursor-pointer" aria-hidden={true}/> :
                                <i className=" text-danger fa fa-close cursor-pointer" aria-hidden={true}/>}
                        </button>
                        <Link to={"/"}><i className="fa fa-home mr-3" aria-hidden={true}/></Link>
                        <Link className="mr-5" to={"/exchange/Exchange_Explorer"}><ExchangeExploreIcon
                            className="-topBarIcons"/></Link>
                        <Link className="mr-5" to={"/"}><NotificationIcon className="-topBarIcons"/></Link>
                    </div>
                    <img className="centerImgTopBar" src={logoDaneshBoom} alt="profile_img"/>
                    <div className="dir-ltr d-flex flex-row">
                        <div className="-ProfTopBarImg">
                            {!profileMedia ? <DefaultUserIcon onClickFunc={this._toggleProfile}/> :
                                <img src={profileMedia} alt="Person icon" onClick={this._toggleProfile}/>}
                        </div>
                        <div className="ml-4 -searchInput d-flex align-items-center">
                            <i className="fa fa-search" aria-hidden="true"/>
                            <input type="text" className="text-white" name="search" dir="auto"
                                   ref={searchInput => {
                                       this.searchInput = searchInput
                                   }}/>
                        </div>
                    </div>
                </nav>
                <Collapse isOpen={collapse} className={`-topBar-right-collapse pr-0 pl-0 ${collapseClassName}`}>
                    <ul>
                        <li onClick={this._handleExchangeUpgrade}><i className="fa fa-home"/> درخواست ارتقاء به کارگزار</li>
                        <li onClick={this._handleNewExchange}><i className="fa fa-home"/> بورس جدید</li>
                        <li onClick={this._handleProductWizardModal}><i className="fa fa-home"/> آورده ی جدید</li>
                    </ul>
                </Collapse>
                <Collapse isOpen={collapseProfile} className="-topBar-profile-collapse">
                    <div className="text-center">
                        <div className="card-block">
                            <Link to="#" onClick={this._handleSignOut}>{translate['Sign Out']}</Link>
                            {
                                (!clientOrganization) ? (
                                    <Link to={`/user/${clientUser.id}`}>{translate['My Profile']}</Link>) : (
                                    <Link to={`/organization/${clientOrganization.id}`}>{translate['My Organization']}</Link>
                                )
                            }
                        </div>
                    </div>
                </Collapse>
                {/*<AddProductWizardModal*/}
                {/*ref={addProductWizard => {this.addProductWizard = addProductWizard}}*/}
                {/*className="addProductWizard"*/}
                {/*/>*/}
                <AddingContribution modalIsOpen={productWizardModalIsOpen}
                                    handleModalVisibility={this._handleProductWizardModal}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.client.isLoggedIn,
    clientUser: state.auth.client.user,
    clientProfile: state.auth.client.profile,
    clientOrganization: state.auth.client.organization,
    translate: state.intl.messages.topBar || {},
})
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        signOut: AuthActions.signOut,
        verifyToken: AuthActions.verifyToken,
        push: routerActions.push,
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TopBar)

