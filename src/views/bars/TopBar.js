// @flow
import * as React from "react"
import AboutInnowin from "./TopBarComponents/AboutInnowin"
import AboutUs from "./TopBarComponents/AboutUs"
import AddingContribution from "../pages/adding-contribution/addingContribution"
import AgentForm from "../pages/modal/agentForm-modal"
import AuthActions from "src/redux/actions/authActions"
// import client from 'src/consts/client'
import CreateExchange from "../pages/modal/createExchange/createExchange"
import ExploreMenu from "./TopBarComponents/ExploreMenu"
import FileActions from "../../redux/actions/commonActions/fileActions"
import GeneralSetting from "./TopBarComponents/GeneralSetting"
import IntroduceBadges from "./TopBarComponents/IntroduceBadges"
import LinkedAccounts from "./TopBarComponents/LinkedAccounts"
import Material from "../common/components/Material"
import Privacy from "./TopBarComponents/Privacy"
import PropTypes from "prop-types"
import UserAgreement from "./TopBarComponents/UserAgreement"
import {bindActionCreators} from "redux"
import {Component} from "react"
import {connect} from "react-redux"
import {
  DefaultUserIcon,
  // NotificationIcon,
  InnoWinLogo,
  ExchangeExploreIcon,
  HomeSvg,
  HomeSvgSelected,
  ExchangeExploreIconSelected
} from "src/images/icons"
import {Link} from "react-router-dom"
import {routerActions} from "react-router-redux"
import {SearchIcon} from "../../images/icons"
import {shortOrganizationType} from "src/consts/flowTypes/organization/organization"
import {userProfileType, userType} from "src/consts/flowTypes/user/basicInformation"
import constants from "../../consts/constants"
// import makeFileSelectorByKeyValue from '../../redux/selectors/common/file/selectFilsByKeyValue'

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
  translate: { topBar: { [string]: string }, [string]: string },
  path: string,
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
  showSetting: boolean,
  selectedSetting: string,
  showAbout: boolean,
  selectedAbout: string,
  profilePhotoLoaded: boolean,
  currentPage: string,
|}

class TopBar extends Component<PropsTopBar, StatesTopBar> {

  static propTypes = {
    collapseClassName: PropTypes.string.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
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
      currentPage: constants.TOP_BAR_PAGES.HOME
    }

    this._handleCloseOutside = this._handleCloseOutside.bind(this)
  }

  componentDidMount() {
    const {actions, clientProfile, clientImgLink, path} = this.props
    const {
      // verifyToken,
      getFile
    } = actions
    const mediaId = clientProfile.profile_media
    if (mediaId) {
      getFile(mediaId)
    }
    // setTimeout(() => verifyToken(client.getToken()), 1000)

    // Added for check profile photo url
    if (clientImgLink) {
      let profile = new Image()
      profile.src = clientImgLink
      profile.onload = () => {
        this.setState({...this.state, profilePhotoLoaded: true})
      }
    }
    //

    if (path === constants.TOP_BAR_PAGES.HOME) {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.HOME})
    }
    else if (path === constants.TOP_BAR_PAGES.USER_EXPLORER) {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.USER_EXPLORER})
    }
    else if (path === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER) {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER})
    }
    else {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.OTHER})
    }

    document.addEventListener("mousedown", this._handleCloseOutside)

  }

  componentDidUpdate(prevProps) {
    const {isLoggedIn, actions, path} = this.props
    const {currentPage} = this.state
    if (prevProps.isLoggedIn && prevProps.isLoggedIn !== isLoggedIn) {
      actions.push("/login")
    }

    if (currentPage !== path && prevProps.path !== path) {
      if (path === constants.TOP_BAR_PAGES.HOME) {
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.HOME})
      }
      else if (path === constants.TOP_BAR_PAGES.USER_EXPLORER) {
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.USER_EXPLORER})
      }
      else if (path === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER) {
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER})
      }
      else {
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.OTHER})
      }
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

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this._handleCloseOutside)
  }

  _handleCloseOutside(e) {
    if (this.state.exploreCollapse && this.exploreRef && !this.exploreRef.contains(e.target)) {
      this.setState({...this.state, exploreCollapse: false, collapseProfile: false})
    }

    if (this.state.collapseProfile && this.profileRef && !this.profileRef.contains(e.target)) {
      this.setState({...this.state, exploreCollapse: false, collapseProfile: false})
    }
  }

  //
  // _toggle = (e: SyntheticEvent<HTMLButtonElement>): void => {
  //   e.preventDefault()
  //   this.setState({...this.state, collapse: !this.state.collapse, exploreCollapse: false})
  // }

  _toggleExplore = (changePage) => {
    if (changePage === true) {
      this.setState({
        ...this.state,
        exploreCollapse: !this.state.exploreCollapse,
        collapseProfile: false
      })
    }
    else {
      this.setState({
        ...this.state,
        exploreCollapse: !this.state.exploreCollapse,
        collapseProfile: false
      })
    }
  }

  _toggleProfile = () => {
    this.setState({...this.state, collapseProfile: !this.state.collapseProfile, exploreCollapse: false})
  }

  _handleExchangeUpgrade = () => {
    this.setState({...this.state, agentForm: true})
    setTimeout(() =>
            this.setState({...this.state, collapseProfile: false})
        , 350)
  }

  _handleHideAgent = () => {
    this.setState({...this.state, agentForm: false})
  }
  _createExchangeModalVisibilityHandler = () => {
    this.setState({...this.state, createExchangeModalIsOpen: !this.state.createExchangeModalIsOpen})
    setTimeout(() =>
            this.setState({...this.state, collapseProfile: false})
        , 350)
  }

  _handleProductWizardModal = () => {
    this.setState({...this.state, productWizardModalIsOpen: !this.state.productWizardModalIsOpen})
    setTimeout(() =>
            this.setState({...this.state, collapseProfile: false})
        , 350)
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
    this.setState({
      ...this.state,
      showSetting: false,
      showAbout: false,
      productWizardModalIsOpen: false,
      createExchangeModalIsOpen: false
    })
    setTimeout(() => {
      this.setState({...this.state, selectedSetting: "Privacy", selectedAbout: "FAQ"})
      setTimeout(() => {
        this.setState({...this.state, selectedSetting: "General Settings"})
      }, 10)
    }, 500)
  }

  _homeClick = () => {
    this.setState({...this.state})
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
    const {clientUser, clientOrganization, translate, clientImgLink} = this.props
    const topBarTranslate = translate.topBar
    const {currentPage} = this.state
    const {collapseProfile, exploreCollapse, productWizardModalIsOpen, selectedSetting, selectedAbout, showSetting, showAbout, createExchangeModalIsOpen, profilePhotoLoaded, agentForm} = this.state
    const linkEditProfile = !clientOrganization
        ? `/user/${clientUser.id}`
        : `/organization/${clientOrganization.id}`

    return (
        <div onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}>
          <AgentForm
              active={agentForm}
              hide={this._handleHideAgent}
          />

          <CreateExchange
              handleModalVisibility={this._createExchangeModalVisibilityHandler}
              modalIsOpen={createExchangeModalIsOpen}
          />

          <nav className="page-content topBar">
            <div className="d-flex align-items-end" ref={e => this.exploreRef = e}>
              <Link to={"/"} onClick={this._homeClick}>
                <Material backgroundColor='rgba(238, 238, 238,0.8)'
                          className={currentPage === constants.TOP_BAR_PAGES.HOME ? "selected-bar top-bar-home" : "top-bar-home"}
                          content={
                            <div className='home-top-bar-container'>
                              {currentPage === constants.TOP_BAR_PAGES.HOME
                                  ? <HomeSvgSelected className='home-icon'/>
                                  : <HomeSvg className='home-icon'/>
                              }
                              <p className='top-bar-title'>{topBarTranslate["Home page"]}</p>
                            </div>
                          }/>
              </Link>

              <Material backgroundColor='rgba(238, 238, 238,0.8)'
                        className={(currentPage === constants.TOP_BAR_PAGES.USER_EXPLORER) || (currentPage === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER) ? "selected-bar top-bar-home" : "top-bar-home"}
                        onClick={this._toggleExplore} content={
                <div className='home-top-bar-container'>
                  {(currentPage === constants.TOP_BAR_PAGES.USER_EXPLORER) || (currentPage === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER)
                      ? <ExchangeExploreIconSelected className='-topBarIcons'/>
                      : <ExchangeExploreIcon className='-topBarIcons'/>
                  }
                  <p className='top-bar-title'>{topBarTranslate["Explore"]}</p>
                </div>
              }/>

              <div className='explore-menu-wrapper'>
                <ExploreMenu _toggleExplore={this._toggleExplore} exploreCollapse={exploreCollapse}/>
              </div>


              {/*<Link className="mr-5" to={"/"}><NotificationIcon className="-topBarIcons"/></Link>*/}
              {/*<Link className="mr-5" to={"/"}><NotificationIcon className="notif-icon"/></Link>*/}

            </div>

            <InnoWinLogo svgClass={"centerImgTopBar"}/>

            <div className="dir-ltr d-flex flex-row">
              <div ref={e => this.profileRef = e} className="-ProfTopBarImg">

                {clientImgLink && profilePhotoLoaded ?
                    <Material backgroundColor='rgba(238, 238, 238,0.8)' onClick={this._toggleProfile}
                              className={collapseProfile ? "topbar-profile-img-open" : "topbar-profile-img"}
                              content={<img src={clientImgLink} className='-ProfTopBarImg-svg-img'
                                            alt="Person icon"/>}/>
                    :
                    <Material backgroundColor='rgba(238, 238, 238,0.8)'
                              className={collapseProfile ? "topbar-profile-img-open" : "topbar-profile-img"}
                              content={<DefaultUserIcon className='-ProfTopBarImg-svg-img'
                                                        onClickFunc={this._toggleProfile}/>}/>
                }

                <div className={collapseProfile ? "profile-menu-container" : "profile-menu-container-hide"}>
                  <div className='profile-menu-arrow'>
                    ▲
                  </div>
                  <div className='explore-menu'>

                    <Link to={linkEditProfile} onClick={this._handleCloseProfile}>
                      <Material className='profile-menu-profile-section' content={
                        <div className='profile-menu-top-section-container'>
                          <div className='profile-menu-profile-section-image'>
                            {clientImgLink && profilePhotoLoaded ?
                                <img src={clientImgLink} className='-ProfTopBarImg-svg-img-big' alt="Person icon"/>
                                :
                                <DefaultUserIcon className='-ProfTopBarImg-svg-big'/>
                            }
                          </div>
                          <div className='profile-menu-profile-section-next-image'>
                            <div
                                className='profile-menu-profile-section-next-image-first'>{this.props.clientName}</div>
                            <div
                                className='profile-menu-profile-section-next-image-middle'>@{clientUser && clientUser.username}</div>
                            <div
                                className='profile-menu-profile-section-next-image-last'>{topBarTranslate["Edit Profile"]}</div>
                          </div>
                        </div>
                      }/>
                    </Link>

                    <div className='profile-menu-second-section'>
                      <Material className='profile-menu-second-section-item' onClick={this._handleExchangeUpgrade}
                                content='درخواست ارتقاء به کارگزار'/>
                      <Material className='profile-menu-second-section-item'
                                onClick={this._createExchangeModalVisibilityHandler} content='ایجاد پنجره جدید'/>
                      <Material className='profile-menu-second-section-item' onClick={this._handleProductWizardModal}
                                content='ایجاد آورده جدید'/>
                    </div>

                    <div className='profile-menu-second-section'>
                      <Material className='profile-menu-second-section-item' onClick={this._handleShowSetting}
                                content={topBarTranslate["General Settings"]}/>
                      <Material className='profile-menu-second-section-item' onClick={this._handleShowAbout}
                                content={topBarTranslate["Darbare Innowin"]}/>
                      {/*<Material className='profile-menu-second-section-item' content={topBarTranslate['Privacy']}/>*/}
                    </div>

                    <Material className='profile-menu-second-section-item' onClick={this._handleSignOut}
                              content={topBarTranslate["Sign Out"]}/>

                  </div>
                </div>

              </div>

              <div className="-searchInput">
                <input type="text" name="search" dir="auto"
                       placeholder={topBarTranslate["Search in Danesh boom"]}
                       ref={searchInput => {
                         this.searchInput = searchInput
                       }}/>
                <SearchIcon className='search-icon'/>
              </div>

            </div>
          </nav>

          <AddingContribution modalIsOpen={productWizardModalIsOpen}
                              handleModalVisibility={this._handleProductWizardModal}/>


          <div
              className={showSetting || showAbout || agentForm || productWizardModalIsOpen || createExchangeModalIsOpen ? "makeDark" : "makeDark-out"}
              onClick={this._handleHideSetting}>
            {/*dark div*/}
          </div>
          {/*Settings Modal*/}
          <div className={showSetting ? "settingModal-sidebar" : "settingModal-sidebar-out"}>
            <Material onClick={() => this._handleSettingSelected("General Settings")}
                      className={selectedSetting === "General Settings" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={topBarTranslate["General Settings"]}/>
            <Material onClick={() => this._handleSettingSelected("Manage Linked Accounts")}
                      className={selectedSetting === "Manage Linked Accounts" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={topBarTranslate["Manage Linked Accounts"]}/>
            <Material onClick={() => this._handleSettingSelected("Privacy")}
                      className={selectedSetting === "Privacy" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={topBarTranslate["Privacy"]}/>
            {/*<Material onClick={this._handleSignOut}*/}
            {/*className={selectedSetting === 'Sign Out' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}*/}
            {/*content={topBarTranslate['Sign Out']}/>*/}
          </div>

          <div className={showSetting ? "settingModal-menu" : "settingModal-menu-out"}>
            <div className='settingModal-menu-header'>{topBarTranslate[selectedSetting]}</div>
            {this.renderSetting()}
          </div>
          {/*End Settings Modal*/}

          {/*About Modal*/}
          <div className={showAbout ? "settingModal-sidebar" : "settingModal-sidebar-out"}>
            <Material onClick={() => this._handleAboutSelected("FAQ")}
                      className={selectedAbout === "FAQ" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={topBarTranslate["FAQ"]}/>
            <Material onClick={() => this._handleAboutSelected("Introduce Badges")}
                      className={selectedAbout === "Introduce Badges" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={topBarTranslate["Introduce Badges"]}/>
            <Material onClick={() => this._handleAboutSelected("Terms & Conditions")}
                      className={selectedAbout === "Terms & Conditions" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={topBarTranslate["Terms & Conditions"]}/>
            <Material onClick={() => this._handleAboutSelected("About Innowin")}
                      className={selectedAbout === "About Innowin" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={topBarTranslate["About Innowin"]}/>
            <Material onClick={() => this._handleAboutSelected("About Us")}
                      className={selectedAbout === "About Us" ? "settingModal-sidebar-item-selected" : "settingModal-sidebar-item"}
                      content={topBarTranslate["About Us"]}/>
          </div>
          <div className={showAbout ? "settingModal-menu" : "settingModal-menu-out"}>
            <div className='settingModal-menu-header'>{topBarTranslate[selectedAbout]}</div>
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
    else if (selectedAbout === "About Innowin") {
      return <AboutInnowin/>
    }
    else if (selectedAbout === "About Us") {
      return <AboutUs/>
    }
  }

}

const mapStateToProps = (state, ownProps) => {
  const client = state.auth.client
  const {profile, organization, user_type} = state.auth.client
  const clientImgId = (user_type === "person") ? (profile.profile_media) : (
      (organization && organization.organization_logo) || null
  )
  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)
  const stateOrgan = state.organs.list[userId]

  const name = user_type === "person" ?
      client.user.first_name + " " + client.user.last_name
      :
      stateOrgan && stateOrgan.organization.content.nike_name

  const clientImgLink = (clientImgId &&
      state.common.file.list[clientImgId] &&
      state.common.file.list[clientImgId].file) || null
  return {
    isLoggedIn: state.auth.client.isLoggedIn,
    clientUser: state.auth.client.user,
    clientName: name,
    clientProfile: state.auth.client.profile,
    clientImgLink,
    clientOrganization: state.auth.client.organization,
    translate: state.intl.messages || {}
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signOut: AuthActions.signOut,
    verifyToken: AuthActions.verifyToken,
    push: routerActions.push,
    getFile: FileActions.getFile
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TopBar)

