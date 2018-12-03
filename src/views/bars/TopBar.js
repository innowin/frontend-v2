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
import {DefaultUserIcon, NotificationIcon, InnoWinLogo} from "src/images/icons"
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
import UserAgreement from "./TopBarComponents/UserAgreement"
import AboutUs from "./TopBarComponents/AbouUs"
import Material from "../common/components/Material"
import {REST_URL} from "../../consts/URLS"

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
      selectedAbout: "FAQ",
      profilePhotoLoaded: false,
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

    // Added for check profile photo url
    if (this.props.clientImgLink) {
      let profile = new Image()
      profile.src = this.props.clientImgLink
      profile.onload = () => {
        this.setState({...this.state, profilePhotoLoaded: true})
      }
    }
    //
  }

  componentDidUpdate(prevProps) {
    const {isLoggedIn, actions} = this.props
    if (prevProps.isLoggedIn && prevProps.isLoggedIn !== isLoggedIn) {
      actions.push("/login")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.clientImgLink !== nextProps.clientImgLink) {
      this.setState({...this.state, profilePhotoLoaded: false}, () => {
        if (nextProps.clientImgLink) {
          let profile = new Image()
          profile.src = nextProps.clientImgLink
          profile.onload = () => {
            this.setState({...this.state, profilePhotoLoaded: true})
          }
        }
      })
    }
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
    setTimeout(() => {
      this.setState({...this.state, collapseProfile: false})
    }, 350)
    this.setState({...this.state, showSetting: true, exploreCollapse: false, showAbout: false})
  }

  _handleHideSetting = () => {
    this.setState({...this.state, showSetting: false, showAbout: false})
    setTimeout(() => {
      this.setState({...this.state, selectedSetting: "Privacy", selectedAbout: "FAQ"})
      setTimeout(() => {
        this.setState({...this.state, selectedSetting: "General Settings"})
      }, 10)
    }, 500)
  }

  _handleShowAbout = () => {
    setTimeout(() => {
      this.setState({...this.state, collapseProfile: false})
    }, 350)
    this.setState({...this.state, showSetting: false, exploreCollapse: false, showAbout: true})
  }

  _handleCloseProfile = () => {
    setTimeout(() =>
            this.setState({...this.state, collapseProfile: false})
        , 350)
  }

  _handleSettingSelected = (target) => {
    this.setState({...this.state, selectedSetting: target})
  }

  _handleAboutSelected = (target) => {
    this.setState({...this.state, selectedAbout: target})
  }

  render() {
    const {collapseClassName, clientUser, clientOrganization, translate, clientImgLink} = this.props
    const {collapse, collapseProfile, exploreCollapse, productWizardModalIsOpen, mouseIsOverMenu, selectedSetting, selectedAbout, showSetting, showAbout, createExchangeModalIsOpen, profilePhotoLoaded} = this.state
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

              <Material backgroundColor='#eee' className='top-bar-home' content={
                <Link to={"/"}><i className="fa fa-home top-bar-home-logo" aria-hidden={true}/></Link>
              }/>

              <div className="mr-5 top-bar-explore" onClick={this._toggleExplore}>
                <ExploreMenu exploreCollapse={exploreCollapse}/>
              </div>

              {/*<Link className="mr-5" to={"/"}><NotificationIcon className="-topBarIcons"/></Link>*/}
              {/*<Link className="mr-5" to={"/"}><NotificationIcon className="notif-icon"/></Link>*/}

            </div>

            <InnoWinLogo svgClass={"centerImgTopBar"}/>

            <div className="dir-ltr d-flex flex-row">
              <div className="-ProfTopBarImg">

                {clientImgLink && profilePhotoLoaded ? <Material backgroundColor='#eee' onClick={this._toggleProfile}
                                                                 className={collapseProfile ? "topbar-profile-img-open" : "topbar-profile-img"}
                                                                 content={<img src={clientImgLink} className='-ProfTopBarImg-svg-img' alt="Person icon"/>}/>
                    :
                    <Material backgroundColor='#eee' className={collapseProfile ? "topbar-profile-img-open" : "topbar-profile-img"}
                              content={<DefaultUserIcon className='-ProfTopBarImg-svg-img' onClickFunc={this._toggleProfile}/>}/>
                }

                <div className={collapseProfile ? "profile-menu-container" : "profile-menu-container-hide"}>
                  <div className='profile-menu-arrow'>
                    ▲
                  </div>
                  <div className='explore-menu'>

                    <Link to={linkEditProfile} onClick={this._handleCloseProfile}>
                      <Material className='profile-menu-profile-section' content={<div>
                        <div className='profile-menu-profile-section-image'>
                          {clientImgLink && profilePhotoLoaded ? <img src={clientImgLink} className='-ProfTopBarImg-svg-img-big' alt="Person icon"/>
                              :
                              <DefaultUserIcon className='-ProfTopBarImg-svg-big'/>
                          }
                        </div>
                        <div className='profile-menu-profile-section-next-image'>
                          <div
                              className='profile-menu-profile-section-next-image-first'>{clientUser && clientUser.first_name + " " + clientUser.last_name}</div>
                          <div
                              className='profile-menu-profile-section-next-image-middle'>@{clientUser && clientUser.username}</div>
                          <div className='profile-menu-profile-section-next-image-last'>{translate["Edit Profile"]}</div>
                        </div>
                      </div>
                      }/>
                    </Link>

                    <div className='profile-menu-second-section'>
                      {/*<Material className='profile-menu-second-section-item' onClick={this._handleExchangeUpgrade} content='درخواست ارتقاء به کارگزار'/>*/}
                      <Material className='profile-menu-second-section-item' onClick={this._createExchangeModalVisibilityHandler} content='ایجاد بورس جدید'/>
                      <Material className='profile-menu-second-section-item' onClick={this._handleProductWizardModal} content='ایجاد آورده جدید'/>
                    </div>

                    <div className='profile-menu-second-section'>
                      <Material className='profile-menu-second-section-item' onClick={this._handleShowSetting} content={translate["General Settings"]}/>
                      <Material className='profile-menu-second-section-item' onClick={this._handleShowAbout} content={translate["About Innowin"]}/>
                      <Material className='profile-menu-second-section-item' content={translate["Privacy"]}/>
                    </div>

                    <Material className='profile-menu-second-section-item' onClick={this._handleSignOut} content={translate["Sign Out"]}/>

                  </div>
                </div>

              </div>

              <div className="-searchInput d-flex align-items-center">
                <input type="text" className="text-white" name="search" dir="auto"
                       placeholder={translate["Search in Danesh boom"]}
                       ref={searchInput => {
                         this.searchInput = searchInput
                       }}/>
                <SearchIcon className='search-icon'/>
              </div>

            </div>
          </nav>

          <AddingContribution modalIsOpen={productWizardModalIsOpen}
                              handleModalVisibility={this._handleProductWizardModal}/>


          <div className={showSetting || showAbout ? "makeDark" : "makeDark-out"} onClick={this._handleHideSetting}>
            {/*dark div*/}
          </div>
          {/*Settings Modal*/}
          <div className={showSetting ? "settingModal-sidebar" : "settingModal-sidebar-out"}>
            <Material onClick={() => this._handleSettingSelected('General Settings')}
                      className={selectedSetting === "General Settings" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={translate["General Settings"]}/>
            <Material onClick={() => this._handleSettingSelected('Manage Linked Accounts')}
                      className={selectedSetting === "Manage Linked Accounts" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={translate["Manage Linked Accounts"]}/>
            <Material onClick={() => this._handleSettingSelected('Privacy')}
                      className={selectedSetting === "Privacy" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={translate["Privacy"]}/>
            <Material onClick={this._handleSignOut}
                      className={selectedSetting === "Sign Out" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={translate["Sign Out"]}/>
          </div>

          <div className={showSetting ? "settingModal-menu" : "settingModal-menu-out"}>
            <div className='settingModal-menu-header'>{translate[selectedSetting]}</div>
            {this.renderSetting()}
          </div>
          {/*End Settings Modal*/}

          {/*About Modal*/}
          <div className={showAbout ? "settingModal-sidebar" : "settingModal-sidebar-out"}>
            <Material onClick={() => this._handleAboutSelected('FAQ')}
                      className={selectedAbout === "FAQ" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={translate["FAQ"]}/>
            <Material onClick={() => this._handleAboutSelected('Introduce Badges')}
                      className={selectedAbout === "Introduce Badges" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={translate["Introduce Badges"]}/>
            <Material onClick={() => this._handleAboutSelected('Terms & Conditions')}
                      className={selectedAbout === "Terms & Conditions" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={translate["Terms & Conditions"]}/>
            <Material onClick={() => this._handleAboutSelected('About Us')}
                      className={selectedAbout === "About Us" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={translate["About Us"]}/>
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
      return <GeneralSetting hideSetting={this._handleHideSetting}/>
    }
    else if (selectedSetting === "Manage Linked Accounts") {
      return <LinkedAccounts/>
    }
    else if (selectedSetting === "Privacy") {
      return <Privacy/>
    }
  }

  renderAbout() {
    let {selectedAbout} = this.state

    if (selectedAbout === "FAQ") {
      return null
    }
    else if (selectedAbout === "Introduce Badges") {
      return <IntroduceBadges/>
    }
    else if (selectedAbout === "Terms & Conditions") {
      return <UserAgreement/>
    }
    else if (selectedAbout === "About Us") {
      return <AboutUs/>
    }
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

