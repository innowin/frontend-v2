// @flow
import * as React from 'react'
import AboutInnowin from './TopBarComponents/AboutInnowin'
import AboutUs from './TopBarComponents/AboutUs'
import AddingContribution from 'src/views/pages/adding-contribution/addingContribution'
import AgentForm from 'src/views/pages/modal/agentForm-modal'
import AuthActions from 'src/redux/actions/authActions'
import constants from 'src/consts/constants'
import CreateExchange from 'src/views/pages/modal/createExchange/createExchange'
import ExploreMenu from './TopBarComponents/ExploreMenu'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import GeneralSetting from './TopBarComponents/GeneralSetting'
import IntroduceBadges from './TopBarComponents/IntroduceBadges'
import LinkedAccounts from './TopBarComponents/LinkedAccounts'
import Material from '../common/components/Material'
import Privacy from './TopBarComponents/Privacy'
import PropTypes from 'prop-types'
import UserAgreement from './TopBarComponents/UserAgreement'
import {bindActionCreators} from 'redux'
import {Component} from 'react'
import {connect} from 'react-redux'
import {
  DefaultUserIcon,
  InnoWinLogo,
  ExchangeExploreIcon,
  HomeSvg,
  HomeSvgSelected,
  ExchangeExploreIconSelected,
} from 'src/images/icons'
import {Link} from 'react-router-dom'
import {routerActions} from 'react-router-redux'
import {SearchIcon} from 'src/images/icons'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import type {identityType} from 'src/consts/flowTypes/identityType'
import ModalActions from '../../redux/actions/modalActions'
// import makeFileSelectorByKeyValue from '../../redux/selectors/common/file/selectFilsByKeyValue'
// import client from 'src/consts/client'

type PropsTopBar = {|
  actions: {
    signOut: Function,
    push: Function,
    verifyToken: Function,
    getFileByFileRelatedParentId: Function,
    hideModal: Function,
    showModal: Function,
  },
  clientName: ?string,
  isLoggedIn: boolean,
  path: string,
  translate: { topBar: { [string]: string }, [string]: string },
  clientIdentity: identityType,
  imgLink: string,
  bannerLink: string,
  modal: {
    productModal: boolean,
  },
|}

type StatesTopBar = {|
  agentForm: boolean,
  collapse: boolean,
  collapseProfile: boolean,
  createExchangeModalIsOpen: boolean,
  currentPage: string,
  exploreCollapse: boolean,
  getMediaFile: boolean,
  isSignedOut: boolean,
  mouseIsOverMenu: boolean,
  selectedAbout: string,
  selectedSetting: string,
  showAbout: boolean,
  showHamburger: boolean,
  showSetting: boolean,
|}

class TopBar extends Component<PropsTopBar, StatesTopBar> {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
  }

  //types
  searchInput: ? HTMLInputElement
  hamburgerButtonRef: HTMLInputElement
  hamburgerRef: HTMLInputElement
  profileRef: HTMLInputElement
  exploreRef: HTMLInputElement

  constructor(props) {
    super(props)
    this.state = {
      agentForm: false,
      collapse: false,
      collapseProfile: false,
      createExchangeModalIsOpen: false,
      currentPage: constants.TOP_BAR_PAGES.HOME,
      exploreCollapse: false,
      getMediaFile: false,
      isSignedOut: false,
      mouseIsOverMenu: true,
      selectedAbout: 'FAQ',
      selectedSetting: 'General Settings',
      showAbout: false,
      showHamburger: false,
      showSetting: false,
      hideTopBar: false,
      scrollY: 0,
    }
    this._onScroll = this._onScroll.bind(this)
    this._handleCloseOutside = this._handleCloseOutside.bind(this)
  }

  componentWillMount(): void {
    const {path} = this.props

    if (path === constants.TOP_BAR_PAGES.HOME) {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.HOME})
    }
    else if (path === constants.TOP_BAR_PAGES.USER_EXPLORER) {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.USER_EXPLORER})
    }
    else if (path === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER) {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER})
    }
    else if (path.includes(constants.TOP_BAR_PAGES.PRODUCT)) {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.PRODUCT})
    }
    else {
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.OTHER})
    }
  }

  componentDidMount() {
    const {actions, clientIdentity} = this.props
    const {getFileByFileRelatedParentId} = actions
    if (clientIdentity) {
      getFileByFileRelatedParentId({
        fileRelatedParentId: clientIdentity.id,
        fileParentType: constants.FILE_PARENT.IDENTITY,
      })
    }
    document.addEventListener('scroll', this._onScroll)
    document.addEventListener('mousedown', this._handleCloseOutside)
    document.addEventListener('touchend', this._handleCloseOutside)
  }

  componentDidUpdate(prevProps) {
    const {isLoggedIn, actions, path} = this.props
    const {currentPage} = this.state
    if (prevProps.isLoggedIn && prevProps.isLoggedIn !== isLoggedIn) {
      actions.push('/login')
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
      else if (path.includes(constants.TOP_BAR_PAGES.PRODUCT)) {
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.PRODUCT})
      }
      else {
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.OTHER})
      }
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousedown', this._handleCloseOutside)
    document.removeEventListener('touchend', this._handleCloseOutside)
    document.removeEventListener('scroll', this._onScroll)
  }

  _onScroll() {
    if (
        document.body.clientWidth <= 480 &&
        (
            this.state.currentPage === constants.TOP_BAR_PAGES.PRODUCT ||
            (this.state.currentPage === constants.TOP_BAR_PAGES.HOME && this.props.selectedExchange && this.props.selectedExchange !== '')
        )
    ) {
      if (window.scrollY > this.state.scrollY) {
        this.setState({...this.state, hideTopBar: true, scrollY: window.scrollY})
      }
      else {
        this.setState({...this.state, hideTopBar: false, scrollY: window.scrollY})
      }
    }
    else {
      this.setState({...this.state, hideTopBar: false, scrollY: window.scrollY})
    }
  }

  _handleCloseOutside(e) {
    if (this.state.exploreCollapse && this.exploreRef && !this.exploreRef.contains(e.target)) {
      this.setState({...this.state, showHamburger: false, exploreCollapse: false, collapseProfile: false})
    }

    if (this.state.collapseProfile && this.profileRef && !this.profileRef.contains(e.target)) {
      this.setState({...this.state, showHamburger: false, exploreCollapse: false, collapseProfile: false})
    }

    if (this.state.showHamburger && this.hamburgerRef && !this.hamburgerRef.contains(e.target) && !this.hamburgerButtonRef.contains(e.target)) {
      this.setState({...this.state, showHamburger: false, exploreCollapse: false, collapseProfile: false})
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
        collapseProfile: false, showHamburger: false,
      })
    }
    else {
      this.setState({
        ...this.state,
        exploreCollapse: !this.state.exploreCollapse,
        collapseProfile: false, showHamburger: false,
      })
    }
  }

  _toggleProfile = () => {
    this.setState({...this.state, collapseProfile: !this.state.collapseProfile, exploreCollapse: false})
  }

  _handleExchangeUpgrade = () => {
    this.setState({...this.state, agentForm: true})
    setTimeout(() =>
            this.setState({...this.state, collapseProfile: false, showHamburger: false})
        , 350)
  }

  _handleHideAgent = () => {
    this.setState({...this.state, agentForm: false})
  }
  _createExchangeModalVisibilityHandler = () => {
    this.setState({...this.state, createExchangeModalIsOpen: !this.state.createExchangeModalIsOpen})
    setTimeout(() =>
            this.setState({...this.state, collapseProfile: false, showHamburger: false})
        , 350)
  }

  _handleProductWizardModal = () => {
    const {actions} = this.props
    const {showModal} = actions
    showModal({modalKey: 'productModal'})
    setTimeout(() =>
            this.setState({...this.state, collapseProfile: false, showHamburger: false})
        , 350)
  }

  _handleSignOut = () => {
    this.setState({
      ...this.state,
      showSetting: false,
      exploreCollapse: false,
      collapseProfile: false,
      showHamburger: false,
    })
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
      this.setState({...this.state, collapseProfile: false, showHamburger: false})
    }, 350)
    this.setState({...this.state, showSetting: true, exploreCollapse: false, showAbout: false})
  }

  _handleHideSetting = () => {
    const {actions} = this.props
    const {hideModal} = actions
    this.setState({
      ...this.state,
      showSetting: false,
      showAbout: false,
      createExchangeModalIsOpen: false,
    })
    setTimeout(() => {
      this.setState({...this.state, selectedSetting: 'Privacy', selectedAbout: 'FAQ'})
      setTimeout(() => {
        this.setState({...this.state, selectedSetting: 'General Settings'})
      }, 10)
    }, 500)

    hideModal({modalKey: 'productModal'})
  }

  _homeClick = () => {
    this.setState({...this.state})
  }

  _handleShowAbout = () => {
    setTimeout(() => {
      this.setState({...this.state, collapseProfile: false, showHamburger: false})
    }, 350)
    this.setState({...this.state, showSetting: false, exploreCollapse: false, showAbout: true})
  }

  _handleCloseProfile = () => {
    setTimeout(() =>
            this.setState({...this.state, collapseProfile: false, showHamburger: false})
        , 350)
  }

  _handleSettingSelected = (target) => {
    this.setState({...this.state, selectedSetting: target})
  }

  _handleAboutSelected = (target) => {
    this.setState({...this.state, selectedAbout: target})
  }

  _toggleHamburger = () => {
    const {showHamburger} = this.state
    this.setState({...this.state, showHamburger: !showHamburger})
  }

  _hamburgerOff = () => {
    setTimeout(() =>
            this.setState({...this.state, showHamburger: false})
        , 350)
  }

  render() {
    const {translate, clientName, clientIdentity, imgLink, bannerLink, modal} = this.props
    const {productModal} = modal
    const topBarTranslate = translate.topBar
    const {hideTopBar, showHamburger, currentPage, collapseProfile, exploreCollapse, selectedSetting, selectedAbout, showSetting, showAbout, createExchangeModalIsOpen, agentForm} = this.state
    const linkEditProfile = clientIdentity ?
        clientIdentity.identity_type === constants.USER_TYPES.USER
            ? `/user/${clientIdentity.id}`
            : `/organization/${clientIdentity.id}`
        : ''

    return (
        <div onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}>
          <AgentForm active={agentForm} hide={this._handleHideAgent}/>

          <CreateExchange handleModalVisibility={this._createExchangeModalVisibilityHandler} modalIsOpen={createExchangeModalIsOpen}/>

          <TransitionGroup>
            {
              showHamburger &&
              <CSSTransition key={1} timeout={250} classNames='fade'>
                <div className='hamburger-overlay open'/>
              </CSSTransition>
            }
          </TransitionGroup>

          <nav className={hideTopBar ? 'page-content topBar topBar-hide' : 'page-content topBar'}>
            <div className="d-flex align-items-end" ref={e => this.exploreRef = e}>
              <Link to={'/'} onClick={this._homeClick}>
                <Material backgroundColor='rgba(238, 238, 238,0.8)'
                          className={currentPage === constants.TOP_BAR_PAGES.HOME ? 'selected-bar top-bar-home' : 'top-bar-home'}
                          content={
                            <div className='home-top-bar-container'>
                              {currentPage === constants.TOP_BAR_PAGES.HOME
                                  ? <HomeSvgSelected className='home-icon'/>
                                  : <HomeSvg className='home-icon'/>
                              }
                              <p className='top-bar-title'>{topBarTranslate['Home page']}</p>
                            </div>
                          }/>
              </Link>

              <Material backgroundColor='rgba(238, 238, 238,0.8)'
                        className={(currentPage === constants.TOP_BAR_PAGES.USER_EXPLORER) || (currentPage === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER) ? 'selected-bar top-bar-home' : 'top-bar-home'}
                        onClick={this._toggleExplore} content={
                <div className='home-top-bar-container'>
                  {(currentPage === constants.TOP_BAR_PAGES.USER_EXPLORER) || (currentPage === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER)
                      ? <ExchangeExploreIconSelected className='-topBarIcons'/>
                      : <ExchangeExploreIcon className='-topBarIcons'/>
                  }
                  <p className='top-bar-title'>{topBarTranslate['Explore']}</p>
                </div>
              }/>

              <div className='explore-menu-wrapper'>
                <ExploreMenu _toggleExplore={this._toggleExplore} exploreCollapse={exploreCollapse}/>
              </div>


              {/*<Link className="mr-5" to={"/"}><NotificationIcon className="-topBarIcons"/></Link>*/}
              {/*<Link className="mr-5" to={"/"}><NotificationIcon className="notif-icon"/></Link>*/}
              <button ref={e => this.hamburgerButtonRef = e} onClick={this._toggleHamburger}
                      className={showHamburger ? 'hamburger hamburger--elastic is-active' : 'hamburger hamburger--elastic'}
                      type="button">
              <span className="hamburger-box">
                <span className="hamburger-inner"/>
              </span>
              </button>
              <div ref={e => this.hamburgerRef = e}
                   className={showHamburger ? 'hamburger-view open' : 'hamburger-view close'}>
                <div className='image-container'>
                  {bannerLink
                      ? <img className='user-banner' src={bannerLink} alt='user banner'/>
                      : <div className='user-banner'/>
                  }

                  <div className='profile-image-container'>
                    {imgLink
                        ? <img className='user-profile' src={imgLink} alt='user profile'/>
                        : <DefaultUserIcon className='user-profile'/>
                    }
                    <p className='name'>{clientName}</p>
                  </div>
                </div>
                <Material className='display-block' content={<Link className='hamburger-items-container' onClick={this._hamburgerOff} to='/'>صفحه اصلی</Link>}/>
                <Material className='display-block' content={<Link className='hamburger-items-container' onClick={this._hamburgerOff} to={linkEditProfile}>تکمیل پروفایل</Link>}/>
                <div className='hamburger-items-container'>
                  <h4 className='item-title'>{topBarTranslate['Explore']}</h4>
                  <Material className='display-block' content={
                    <Link onClick={this._hamburgerOff} to='/exchange/exchange_explorer'
                          className='item-text'>{translate['Windows']}</Link>
                  }/>
                  <Material className='display-block' content={
                    <Link onClick={this._hamburgerOff} to={'/product/product_explorer'}
                          className='item-text'>{translate['Products']}</Link>
                  }/>
                  <Material className='display-block' content={
                    <Link onClick={this._hamburgerOff} to='/users/users_explorer'
                          className='item-text'>{topBarTranslate['Persons']}</Link>
                  }/>
                </div>
                <div className='hamburger-items-container'>
                  <h4 className='item-title'>{translate['Create']}</h4>
                  <p onClick={this._createExchangeModalVisibilityHandler}
                     className='item-text'>{topBarTranslate['New Window']}</p>
                  <p onClick={this._handleProductWizardModal}
                     className='item-text'>{topBarTranslate['Add product']}</p>
                  <p onClick={this._handleExchangeUpgrade}
                     className='item-text'>{topBarTranslate['Update exchange']}</p>
                </div>
                <p className='hamburger-in-text first'>فیدبک</p>
                <p className='hamburger-in-text'
                   onClick={this._handleShowAbout}>{topBarTranslate['Darbare Innowin']}</p>
                <p className='hamburger-in-text' onClick={this._handleSignOut}>{topBarTranslate['Sign Out']}</p>
              </div>
            </div>

            <Link to={'/'}><InnoWinLogo svgClass={'centerImgTopBar'}/></Link>

            <div className="top-bar-left-side">
              <div ref={e => this.profileRef = e} className="-ProfTopBarImg">

                {imgLink ?
                    <Material backgroundColor='rgba(238, 238, 238,0.8)' onClick={this._toggleProfile}
                              className={collapseProfile ? 'topbar-profile-img-open' : 'topbar-profile-img'}
                              content={<img src={imgLink} className='-ProfTopBarImg-svg-img'
                                            alt="Person icon"/>}/>
                    :
                    <Material backgroundColor='rgba(238, 238, 238,0.8)'
                              className={collapseProfile ? 'topbar-profile-img-open' : 'topbar-profile-img'}
                              content={<DefaultUserIcon className='-ProfTopBarImg-svg-img'
                                                        onClickFunc={this._toggleProfile}/>}/>
                }

                <div className={collapseProfile ? 'profile-menu-container' : 'profile-menu-container-hide'}>
                  <div className='profile-menu-arrow'>
                    ▲
                  </div>
                  <div className='explore-menu'>

                    <Link to={linkEditProfile} onClick={this._handleCloseProfile}>
                      <Material className='profile-menu-profile-section' content={
                        <div className='profile-menu-top-section-container'>
                          <div className='profile-menu-profile-section-image'>
                            {imgLink ?
                                <img src={imgLink} className='-ProfTopBarImg-svg-img-big' alt="Person icon"/>
                                :
                                <DefaultUserIcon className='-ProfTopBarImg-svg-big'/>
                            }
                          </div>
                          <div className='profile-menu-profile-section-next-image'>
                            <div
                                className='profile-menu-profile-section-next-image-first'>{clientName}</div>
                            <div
                                className='profile-menu-profile-section-next-image-middle'>@{clientIdentity && clientIdentity.username}</div>
                            <div
                                className='profile-menu-profile-section-next-image-last'>{topBarTranslate['Edit Profile']}</div>
                          </div>
                        </div>
                      }/>
                    </Link>

                    <div className='profile-menu-second-section'>
                      <Material className='profile-menu-second-section-item'
                                onClick={this._createExchangeModalVisibilityHandler} content='ایجاد پنجره جدید'/>
                      <Material className='profile-menu-second-section-item' onClick={this._handleProductWizardModal}
                                content='ایجاد محصول جدید'/>
                      <Material className='profile-menu-second-section-item' onClick={this._handleExchangeUpgrade}
                                content='درخواست ارتقاء به کارگزار'/>
                    </div>

                    <div className='profile-menu-second-section'>
                      <Material className='profile-menu-second-section-item' onClick={this._handleShowSetting}
                                content={topBarTranslate['General Settings']}/>
                      <Material className='profile-menu-second-section-item' onClick={this._handleShowAbout}
                                content={topBarTranslate['Darbare Innowin']}/>
                      {/*<Material className='profile-menu-second-section-item' content={topBarTranslate['Privacy']}/>*/}
                    </div>

                    <Material className='profile-menu-second-section-item' onClick={this._handleSignOut}
                              content={topBarTranslate['Sign Out']}/>

                  </div>
                </div>

              </div>

              <div className="-searchInput">
                <input type="text" name="search" dir="auto" placeholder={topBarTranslate['Search in Danesh boom']} ref={e => this.searchInput = e}/>
                <SearchIcon className='search-icon'/>
              </div>

            </div>
          </nav>

          <AddingContribution modalIsOpen={productModal} handleModalVisibility={this._handleProductWizardModal}/>


          <div className={showSetting || showAbout || agentForm || productModal || createExchangeModalIsOpen ? 'makeDark' : 'makeDark-out'} onClick={this._handleHideSetting}>
            {/*dark div*/}
          </div>
          {/*Settings Modal*/}
          <div className={showSetting ? 'settingModal-sidebar' : 'settingModal-sidebar-out'}>
            <Material onClick={() => this._handleSettingSelected('General Settings')}
                      className={selectedSetting === 'General Settings' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}
                      content={topBarTranslate['General Settings']}/>
            <Material onClick={() => this._handleSettingSelected('Manage Linked Accounts')}
                      className={selectedSetting === 'Manage Linked Accounts' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}
                      content={topBarTranslate['Manage Linked Accounts']}/>
            <Material onClick={() => this._handleSettingSelected('Privacy')}
                      className={selectedSetting === 'Privacy' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}
                      content={topBarTranslate['Privacy']}/>
          </div>

          <div className={showSetting ? 'settingModal-menu' : 'settingModal-menu-out'}>
            <div className='settingModal-menu-header'>{topBarTranslate[selectedSetting]}</div>
            {this.renderSetting()}
          </div>
          {/*End Settings Modal*/}

          {/*About Modal*/}
          <div className={showAbout ? 'settingModal-sidebar' : 'settingModal-sidebar-out'}>
            <Material onClick={() => this._handleAboutSelected('FAQ')}
                      className={selectedAbout === 'FAQ' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}
                      content={topBarTranslate['FAQ']}/>
            <Material onClick={() => this._handleAboutSelected('Introduce Badges')}
                      className={selectedAbout === 'Introduce Badges' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}
                      content={topBarTranslate['Introduce Badges']}/>
            <Material onClick={() => this._handleAboutSelected('Terms & Conditions')}
                      className={selectedAbout === 'Terms & Conditions' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}
                      content={topBarTranslate['Terms & Conditions']}/>
            <Material onClick={() => this._handleAboutSelected('About Innowin')}
                      className={selectedAbout === 'About Innowin' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}
                      content={topBarTranslate['About Innowin']}/>
            <Material onClick={() => this._handleAboutSelected('About Us')}
                      className={selectedAbout === 'About Us' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}
                      content={topBarTranslate['About Us']}/>
          </div>
          <div className={showAbout ? 'settingModal-menu' : 'settingModal-menu-out'}>
            <div className='settingModal-menu-header'>{topBarTranslate[selectedAbout]}</div>
            {this.renderAbout()}
          </div>
          {/*End About Modal*/}
        </div>
    )
  }

  renderSetting() {
    let {selectedSetting} = this.state

    if (selectedSetting === 'General Settings') {
      return <GeneralSetting hideSetting={this._handleHideSetting}/>
    }
    else if (selectedSetting === 'Manage Linked Accounts') {
      return <LinkedAccounts/>
    }
    else if (selectedSetting === 'Privacy') {
      return <Privacy/>
    }
  }

  renderAbout() {
    let {selectedAbout} = this.state

    if (selectedAbout === 'Introduce Badges') {
      return <IntroduceBadges/>
    }
    else if (selectedAbout === 'Terms & Conditions') {
      return <UserAgreement/>
    }
    else if (selectedAbout === 'About Innowin') {
      return <AboutInnowin/>
    }
    else if (selectedAbout === 'About Us') {
      return <AboutUs/>
    }
    else if (selectedAbout === 'FAQ') {
      return null
    }

  }
}

const mapStateToProps = (state) => {
  const clientIdentityId = state.auth.client.identity.content
  const clientIdentity = state.identities.list[clientIdentityId]

  const clientName = clientIdentity
      ? (clientIdentity.identity_type === constants.USER_TYPES.USER
              ? clientIdentity.first_name + ' ' + clientIdentity.last_name
              : clientIdentity.nike_name
      )
      : ''

  const profileImg = clientIdentity && (clientIdentity.profile_media || clientIdentity.profileImg)
  const bannerImg = clientIdentity && (clientIdentity.profile_banner || clientIdentity.bannerImg)

  return {
    selectedExchange: state.auth.client.selectedExchange,
    isLoggedIn: state.auth.client.isLoggedIn,
    clientName,
    clientIdentity,
    imgLink: profileImg ? (state.common.file.list[profileImg] && state.common.file.list[profileImg].file) : '',
    bannerLink: bannerImg ? (state.common.file.list[bannerImg] && state.common.file.list[bannerImg].file) : '',
    translate: state.intl.messages || {},
    modal: state.modal,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signOut: AuthActions.signOut,
    verifyToken: AuthActions.verifyToken,
    push: routerActions.push,
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId,
    showModal: ModalActions.showModal,
    hideModal: ModalActions.hideModal,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(TopBar)