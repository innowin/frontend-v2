// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import AuthActions from "src/redux/actions/authActions"
import {routerActions} from "react-router-redux"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {userProfileType, userType} from "src/consts/flowTypes/user/basicInformation"
import {shortOrganizationType} from "src/consts/flowTypes/organization/organization"
import {
  DefaultUserIcon,
  logoDaneshBoom,
  NotificationIcon,
  InnoWinLogo,
} from "src/images/icons"
import {Link} from "react-router-dom"
import AgentForm from "../pages/modal/agentForm-modal"
import AddingContribution from "../pages/adding-contribution/addingContribution"
import CreateExchange from "../pages/modal/createExchange/createExchange"
import client from "src/consts/client"
import FileActions from "../../redux/actions/commonActions/fileActions"
import {SearchIcon} from "../../images/icons"
import GeneralSetting from "./TopBarComponents/GeneralSetting"
import LinkedAccounts from "./TopBarComponents/LinkedAccounts"
import Privacy from "./TopBarComponents/Privacy"
import ExploreMenu from "./TopBarComponents/ExploreMenu"
import IntroduceBadges from "./TopBarComponents/IntroduceBadges"

type PropsTopBar = {|
  collapseClassName: string,
  isLoggedIn: boolean,
  clientUser: userType,
  clientProfile: userProfileType,
  clientImgLink: ? string,
  clientOrganization: ?shortOrganizationType,
  actions: {
    signOut: Function,
    push: Function,
    verifyToken: Function,
    getFile: Function
  },
  translate: { [string]: string },
|}

type StatesTopBar = {|
  isSignedOut: boolean,
  collapse: boolean,
  exploreCollapse: boolean,
  collapseProfile: boolean,
  agentForm: boolean,
  productWizardModalIsOpen: boolean,
  createExchangeModalIsOpen: boolean,
  mouseIsOverMenu: boolean,
  selectedSetting: string,
  showSetting: boolean,
  selectedAbout: string,
  showAbout: boolean
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
      exploreCollapse: false,
      collapseProfile: false,
      agentForm: false,
      createExchangeModalIsOpen: false,
      productWizardModalIsOpen: false,
      mouseIsOverMenu: true,
      showSetting: false,
      selectedSetting: "General Settings",
      showAbout: false,
      selectedAbout: 'FAQ',
    }
  }

  componentDidUpdate(prevProps) {
    const {isLoggedIn, actions} = this.props
    if (prevProps.isLoggedIn && prevProps.isLoggedIn !== isLoggedIn) {
      actions.push("/login")
    }
  }

  componentDidMount() {
    const {actions, clientProfile} = this.props
    const {verifyToken, getFile} = actions
    const mediaId = clientProfile.profile_media
    if (mediaId) {
      getFile(mediaId)
    }
    setTimeout(() => verifyToken(client.getToken()), 1000)
  }

  //
  // _toggle = (e: SyntheticEvent<HTMLButtonElement>): void => {
  //   e.preventDefault()
  //   this.setState({...this.state, collapse: !this.state.collapse, exploreCollapse: false})
  // }

  _toggleExplore = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    this.setState({...this.state, exploreCollapse: !this.state.exploreCollapse, collapseProfile: false})
  }

  _toggleProfile = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    this.setState({...this.state, collapseProfile: !this.state.collapseProfile, exploreCollapse: false})
  }

  _handleExchangeUpgrade = (e) => {
    this.setState({...this.state, agentForm: true})
  }

  _handleHideAgent = (e) => {
    this.setState({...this.state, agentForm: false})
  }
  _createExchangeModalVisibilityHandler = () => {
    this.setState({...this.state, createExchangeModalIsOpen: !this.state.createExchangeModalIsOpen})
  }

  _handleProductWizardModal = () => {
    this.setState({...this.state, productWizardModalIsOpen: !this.state.productWizardModalIsOpen})
  }

  _handleSignOut = () => {
    this.setState({...this.state, showSetting: false, exploreCollapse: false, collapseProfile: false})
    this.props.actions.signOut()
    window.location.reload()
  }

  _handleMouseEnter = () => {
    this.setState({...this.state, mouseIsOverMenu: true})
  }

  _handleMouseLeave = () => {
    this.setState({...this.state, mouseIsOverMenu: false})
  }

  _handleShowSetting = () => {
    this.setState({...this.state, showSetting: true, exploreCollapse: false, collapseProfile: false, showAbout: false})
  }

  _handleHideSetting = () => {
    this.setState({...this.state, showSetting: false, showAbout: false})
    setTimeout(() => {
      this.setState({...this.state, selectedSetting: "Privacy", selectedAbout: 'FAQ'})
      setTimeout(() => {
        this.setState({...this.state, selectedSetting: "General Settings"})
      }, 10)
    }, 500)
  }

  _handleShowAbout = () => {
    this.setState({...this.state, showAbout: true, exploreCollapse: false, collapseProfile: false, showSetting: false})
  }

  _handleSettingSelected = (e) => {
    this.setState({...this.state, selectedSetting: e.target.id})
  }

  _handleAboutSelected = (e) => {
    this.setState({...this.state, selectedAbout: e.target.id})
  }

  render() {
    const {collapseClassName, clientUser, clientOrganization, translate, clientImgLink} = this.props
    const {collapse, collapseProfile, exploreCollapse, productWizardModalIsOpen, mouseIsOverMenu, selectedSetting, selectedAbout, showSetting, showAbout, createExchangeModalIsOpen} = this.state
    const linkEditProfile = !clientOrganization
        ? `/user/${clientUser.id}`
        : `/organization/${clientOrganization.id}`

    // added to close all collapse menus when click outside
    window.onclick = () => {
      if (!mouseIsOverMenu && (exploreCollapse || collapseProfile)) {
        this.setState({...this.state, exploreCollapse: false, collapseProfile: false})
      }
    }
    //
    return (
        <div onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}>
          <AgentForm
              active={this.state.agentForm}
              hide={this._handleHideAgent}
          />
          <CreateExchange
              handleModalVisibility={this._createExchangeModalVisibilityHandler}
              modalIsOpen={createExchangeModalIsOpen}
          />
          <nav className="navbar flex-row justify-content-between p-0 -white-i fixed-top topBar">
            <div className="d-flex align-items-center">

              {/*<button type="button"*/}
              {/*className={`navbar-toggler my-auto mr-2 -outlineWhite ${collapse ? "active" : ""}`}*/}
              {/*onClick={this._toggle}>*/}
              {/*{!collapse ? <i className="fa fa-bars cursor-pointer" aria-hidden={true}/> :*/}
              {/*<i className=" text-danger fa fa-close cursor-pointer" aria-hidden={true}/>}*/}
              {/*</button>*/}

              <Link to={"/"}><i className="fa fa-home mr-3" aria-hidden={true}/></Link>
              <div className="mr-5 top-bar-explore" onClick={this._toggleExplore}>
                <ExploreMenu exploreCollapse={exploreCollapse}/>
              </div>
              <Link className="mr-5" to={"/"}><NotificationIcon className="-topBarIcons"/></Link>
            </div>
            <InnoWinLogo svgClass={"centerImgTopBar"}/>
            <div className="dir-ltr d-flex flex-row">

              <div className="-ProfTopBarImg">
                {!clientImgLink ? <DefaultUserIcon className='-ProfTopBarImg-svg' onClickFunc={this._toggleProfile}/> :
                    <img src={clientImgLink} className='-ProfTopBarImg-svg-img' alt="Person icon"
                         onClick={this._toggleProfile}/>}

                <div className={collapseProfile ? "profile-menu-container" : "profile-menu-container-hide"}>
                  <div className='profile-menu-arrow'>
                    ▲
                    {/*<MainLbarArrow className='explore-menu-arrow-2'/>*/}
                  </div>
                  <div className='explore-menu'>
                    <Link className='profile-menu-profile-section' to={linkEditProfile}>
                      <div className='profile-menu-profile-section-image'>
                        {!clientImgLink ? <DefaultUserIcon className='-ProfTopBarImg-svg-big'/> :
                            <img src={clientImgLink} className='-ProfTopBarImg-svg-img-big' alt="Person icon"/>}
                      </div>
                      <div className='profile-menu-profile-section-next-image'>
                        <div
                            className='profile-menu-profile-section-next-image-first'>{clientUser && clientUser.first_name + " " + clientUser.last_name}</div>
                        <div
                            className='profile-menu-profile-section-next-image-middle'>@{clientUser && clientUser.username}</div>
                        <div className='profile-menu-profile-section-next-image-last'>{translate["Edit Profile"]}</div>
                      </div>
                    </Link>

                    <div className='profile-menu-second-section'>
                      <div className='profile-menu-second-section-item' onClick={this._handleExchangeUpgrade}>درخواست
                        ارتقاء به کارگزار
                      </div>
                      <div className='profile-menu-second-section-item'
                           onClick={this._createExchangeModalVisibilityHandler}>ایجاد بورس جدید
                      </div>
                      <div className='profile-menu-second-section-item' onClick={this._handleProductWizardModal}>ایجاد
                        آورده جدید
                      </div>
                    </div>

                    <div className='profile-menu-second-section'>
                      <div className='profile-menu-second-section-item' onClick={this._handleShowSetting}>{translate["General Settings"]}</div>
                      <div className='profile-menu-second-section-item' onClick={this._handleShowAbout}>{translate["About Innowin"]}</div>
                      <div className='profile-menu-second-section-item'>{translate["Privacy"]}</div>
                    </div>

                    <div className='profile-menu-second-section-item'
                         onClick={this._handleSignOut}>{translate["Sign Out"]}</div>

                  </div>
                </div>

              </div>

              <div className="-searchInput d-flex align-items-center">
                <input type="text" className="text-white search-top-bar" name="search" dir="auto"
                       placeholder={translate["Search in Danesh boom"]}
                       ref={searchInput => {
                         this.searchInput = searchInput
                       }}/>
                <SearchIcon className='search-icon'/>
              </div>
            </div>
          </nav>

          {/*<Collapse isOpen={collapse} className={`-topBar-right-collapse pr-0 pl-0 ${collapseClassName}`}>*/}
          {/*<ul>*/}
          {/*<li onClick={this._handleExchangeUpgrade}><i className="fa fa-home"/> درخواست ارتقاء به کارگزار</li>*/}
          {/*<li onClick={this._createExchangeModalVisibilityHandler}><i className="fa fa-home"/> بورس جدید</li>*/}
          {/*<li onClick={this._handleProductWizardModal}><i className="fa fa-home"/> آورده ی جدید</li>*/}
          {/*</ul>*/}
          {/*</Collapse>*/}
          {/*<Collapse isOpen={collapseProfile} className="-topBar-profile-collapse">*/}
          {/*<div className="text-center">*/}
          {/*<div className="card-block">*/}
          {/*<Link to="#" onClick={this._handleSignOut}>{translate['Sign Out']}</Link>*/}
          {/*{*/}
          {/*(!clientOrganization) ? (*/}
          {/*<Link to={`/user/${clientUser.id}`}>{translate['My Profile']}</Link>) : (*/}
          {/*<Link to={`/organization/${clientOrganization.id}`}>{translate['My Organization']}</Link>*/}
          {/*)*/}
          {/*}*/}
          {/*<Link to="#" onClick={this._handleShowSetting}>{translate['General Settings']}</Link>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</Collapse>*/}

          {/*<AddProductWizardModal*/}
          {/*ref={addProductWizard => {this.addProductWizard = addProductWizard}}*/}
          {/*className="addProductWizard"*/}
          {/*/>*/}

          <AddingContribution modalIsOpen={productWizardModalIsOpen}
                              handleModalVisibility={this._handleProductWizardModal}/>


          <div className={showSetting || showAbout ? "makeDark" : "makeDark-out"} onClick={this._handleHideSetting}>
            {/*dark div*/}
          </div>

          {/*Settings Modal*/}
          <div className={showSetting ? "settingModal-sidebar" : "settingModal-sidebar-out"}>
            <div id='General Settings' onClick={this._handleSettingSelected}
                 className={selectedSetting === "General Settings" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}>
              {translate["General Settings"]}
            </div>
            <div id='Manage Linked Accounts' onClick={this._handleSettingSelected}
                 className={selectedSetting === "Manage Linked Accounts" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}>
              {translate["Manage Linked Accounts"]}
            </div>
            <div id='Privacy' onClick={this._handleSettingSelected}
                 className={selectedSetting === "Privacy" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}>
              {translate["Privacy"]}
            </div>
            <div onClick={this._handleSignOut}
                 className={selectedSetting === "Sign Out" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}>
              {translate["Sign Out"]}
            </div>
          </div>
          <div className={showSetting ? "settingModal-menu" : "settingModal-menu-out"}>
            <div className='settingModal-menu-header'>{translate[selectedSetting]}</div>
            {this.renderSetting()}
          </div>
          {/*End Settings Modal*/}

          {/*About Modal*/}
          <div className={showAbout ? "settingModal-sidebar" : "settingModal-sidebar-out"}>
            <div id='FAQ' onClick={this._handleAboutSelected}
                 className={selectedAbout === "FAQ" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}>
              {translate["FAQ"]}
            </div>
            <div id='Introduce Badges' onClick={this._handleAboutSelected}
                 className={selectedAbout === "Introduce Badges" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}>
              {translate["Introduce Badges"]}
            </div>
            <div id='Terms & Conditions' onClick={this._handleAboutSelected}
                 className={selectedAbout === "Terms & Conditions" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}>
              {translate["Terms & Conditions"]}
            </div>
            <div id='About Us' onClick={this._handleAboutSelected}
                 className={selectedAbout === "About Us" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}>
              {translate["About Us"]}
            </div>
          </div>
          <div className={showAbout ? "settingModal-menu" : "settingModal-menu-out"}>
            <div className='settingModal-menu-header'>{translate[selectedAbout]}</div>
            {this.renderAbout()}
          </div>
          {/*End About Modal*/}

        </div>
    )
  }

  renderSetting() {
    let {selectedSetting} = this.state

    if (selectedSetting === "General Settings") {
      return (
          <GeneralSetting hideSetting={this._handleHideSetting}/>
      )
    }
    else if (selectedSetting === "Manage Linked Accounts") {
      return (
          <LinkedAccounts/>
      )
    }
    else if (selectedSetting === "Privacy") {
      return (
          <Privacy/>
      )
    }
  }

  renderAbout() {
    let {selectedAbout} = this.state

    // if (selectedAbout === "FAQ") {
    //   return (
    //       <GeneralSetting/>
    //   )
    // }
    // else
    if (selectedAbout === "Introduce Badges") {
      return (
          <IntroduceBadges/>
      )
    }
    // else if (selectedAbout === "Terms & Conditions") {
    //   return (
    //       <Privacy/>
    //   )
    // }
    // else if (selectedAbout === "About Us") {
    //   return (
    //       <Privacy/>
    //   )
    // }
  }

}

const mapStateToProps = state => {
  const {profile, organization, user_type} = state.auth.client
  const clientImgId = (user_type === "person") ? (profile.profile_media) : (
      (organization && organization.organization_logo) || null
  )
  const clientImgLink = (clientImgId &&
      state.common.file.list[clientImgId] &&
      state.common.file.list[clientImgId].file) || null
  return {
    isLoggedIn: state.auth.client.isLoggedIn,
    clientUser: state.auth.client.user,
    clientProfile: state.auth.client.profile,
    clientImgLink,
    clientOrganization: state.auth.client.organization,
    translate: state.intl.messages.topBar || {},
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signOut: AuthActions.signOut,
    verifyToken: AuthActions.verifyToken,
    push: routerActions.push,
    getFile: FileActions.getFile,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TopBar)

