import React from 'react'
import {PureComponent} from 'react'
import AboutInnowin from './TopBarComponents/AboutInnowin'
import AboutUs from './TopBarComponents/AboutUs'
import AddingContribution from 'src/views/pages/adding-contribution/addingContribution'
import AgentForm from 'src/views/pages/modal/agentForm-modal'
import AuthActions from 'src/redux/actions/authActions'
import constants from 'src/consts/constants'
import CreateExchange from 'src/views/pages/modal/createExchange/createExchange'
import ExploreMenu from './TopBarComponents/ExploreMenu'
import GeneralSetting from './TopBarComponents/GeneralSetting'
import IntroduceBadges from './TopBarComponents/IntroduceBadges'
import LinkedAccounts from './TopBarComponents/LinkedAccounts'
import Material from '../common/components/Material'
import Privacy from './TopBarComponents/Privacy'
import * as PropTypes from 'prop-types'
import UserAgreement from './TopBarComponents/UserAgreement'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  DefaultUserIcon,
  InnoWinLogo,
  ExchangeExploreIcon,
  HomeSvg,
  HomeSvgSelected,
  ExchangeExploreIconSelected,
  NotificationIcon,
} from 'src/images/icons'
import {Link} from 'react-router-dom'
import {SearchIcon} from 'src/images/icons'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ModalActions from '../../redux/actions/modalActions'
import {getClientIdentity, getClientObject} from '../../redux/selectors/common/client/getClient'

class TopBar extends PureComponent {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      displayAgentForm: false,
      agentForm: false,
      collapseProfile: false,
      displayCreateExchange: false,
      createExchangeModalIsOpen: false,
      currentPage: constants.TOP_BAR_PAGES.HOME,
      exploreCollapse: false,
      selectedAbout: 'FAQ',
      selectedSetting: 'General Settings',
      showHamburger: false,
      hideTopBar: false,
      scrollY: 0,
      showAbout: false,
      showSetting: false,
      displayAbout: false,
      displaySetting: false,
    }
    this._onScroll = this._onScroll.bind(this)
    this._handleCloseOutside = this._handleCloseOutside.bind(this)
  }

  componentDidMount() {
    const {path} = this.props
    if (path === constants.TOP_BAR_PAGES.HOME)
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.HOME})
    else if (path === constants.TOP_BAR_PAGES.USER_EXPLORER)
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.USER_EXPLORER})
    else if (path === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER)
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER})
    else if (path.includes(constants.TOP_BAR_PAGES.PRODUCT))
      this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.PRODUCT})
    else this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.OTHER})

    document.addEventListener('scroll', this._onScroll)
    document.addEventListener('mousedown', this._handleCloseOutside)
    document.addEventListener('touchend', this._handleCloseOutside)
  }

  componentDidUpdate(prevProps) {
    const {path, modal} = this.props
    const {productModal} = modal

    if (productModal !== prevProps.productModal && productModal === true) {
      this.setState({...this.state, displayProductModal: true})
    }

    if (prevProps.path !== path) {
      if (path === constants.TOP_BAR_PAGES.HOME)
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.HOME})
      else if (path === constants.TOP_BAR_PAGES.USER_EXPLORER)
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.USER_EXPLORER})
      else if (path === constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER)
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.EXCHANGE_EXPLORER})
      else if (path.includes(constants.TOP_BAR_PAGES.PRODUCT))
        this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.PRODUCT})
      else this.setState({...this.state, currentPage: constants.TOP_BAR_PAGES.OTHER})
    }
  }

  componentWillUnmount() {
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
      if (window.scrollY > this.state.scrollY)
        this.setState({...this.state, hideTopBar: true, scrollY: window.scrollY})
      else this.setState({...this.state, hideTopBar: false, scrollY: window.scrollY})
    }
    else this.setState({...this.state, hideTopBar: false, scrollY: window.scrollY})
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

  _toggleExplore = () => {
    this.setState({
      ...this.state,
      exploreCollapse: !this.state.exploreCollapse,
      collapseProfile: false,
      showHamburger: false,
    })
  }

  _toggleProfile = () => this.props.clientIdentityId && this.setState({...this.state, collapseProfile: !this.state.collapseProfile, exploreCollapse: false})

  _handleExchangeUpgrade = () => {
    this.setState({...this.state, collapseProfile: false, showHamburger: false, displayAgentForm: true})
    setTimeout(() => this.setState({...this.state, agentForm: true}), 100)
  }

  _handleHideAgent = () => {
    this.setState({...this.state, agentForm: false})
    setTimeout(() => this.setState({...this.state, displayAgentForm: false}), 100)
  }

  _createExchangeModalVisibilityHandler = () => {
    if (!this.state.createExchangeModalIsOpen) {
      this.setState({...this.state, collapseProfile: false, showHamburger: false, displayCreateExchange: !this.state.createExchangeModalIsOpen})
      setTimeout(() => this.setState({...this.state, createExchangeModalIsOpen: !this.state.createExchangeModalIsOpen}), 100)
    }
    else {
      this.setState({...this.state, collapseProfile: false, showHamburger: false, createExchangeModalIsOpen: !this.state.createExchangeModalIsOpen})
      setTimeout(() => this.setState({...this.state, displayCreateExchange: !this.state.createExchangeModalIsOpen}), 100)
    }
  }

  _handleProductWizardModal = () => {
    const {modal} = this.props
    const {productModal} = modal
    if (!productModal) {
      this.setState({...this.state, displayProductModal: true, collapseProfile: false, showHamburger: false})
      setTimeout(() => {
        const {actions} = this.props
        const {showModal} = actions
        showModal({modalKey: 'productModal'})
      }, 100)
    }
    else {
      const {actions} = this.props
      const {hideModal} = actions
      hideModal({modalKey: 'productModal'})
      setTimeout(() => this.setState({...this.state, displayProductModal: false, collapseProfile: false, showHamburger: false}), 100)
    }
  }

  _handleSignOut = () => {
    this.setState({
      ...this.state,
      collapseProfile: false,
      showHamburger: false,
    })
    this.props.actions.signOut()
    setTimeout(() => window.location.reload(), 500)
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
    hideModal({modalKey: 'productModal'})
    setTimeout(() => {
      this.setState({
        ...this.state,
        selectedSetting: 'General Settings',
        selectedAbout: 'FAQ',
        displaySetting: false,
        displayAbout: false,
        displayCreateExchange: false,
        displayProductModal: false,
      })
    }, 150)
  }

  _handleShowSetting = () => {
    this.setState({
      ...this.state,
      collapseProfile: false,
      showHamburger: false,
      displaySetting: true,
    })
    setTimeout(() => this.setState({...this.state, showSetting: true}), 100)
  }

  _handleShowAbout = () => {
    this.setState({
      ...this.state,
      collapseProfile: false,
      showHamburger: false,
      displayAbout: true,
    })
    setTimeout(() => this.setState({...this.state, showAbout: true}), 100)
  }

  _handleCloseProfile = () => this.setState({...this.state, collapseProfile: false, showHamburger: false})

  _handleSettingSelected = (target) => this.setState({...this.state, selectedSetting: target})

  _handleAboutSelected = (target) => this.setState({...this.state, selectedAbout: target})

  _toggleHamburger = () => this.setState({...this.state, showHamburger: !this.state.showHamburger})

  _hamburgerOff = () => this.setState({...this.state, showHamburger: false})

  render() {
    const {translate, clientName, clientIdentity, imgLink, bannerLink, modal} = this.props
    const {productModal} = modal
    const topBarTranslate = translate.topBar
    const {
      hideTopBar, showHamburger, currentPage, collapseProfile, exploreCollapse, displaySetting, displayAbout, displayAgentForm,
      selectedSetting, selectedAbout, showSetting, showAbout, createExchangeModalIsOpen, displayCreateExchange, agentForm, displayProductModal,
    } = this.state
    const linkEditProfile = clientIdentity ?
        clientIdentity.identity_type === constants.USER_TYPES.USER
            ? `/user/${clientIdentity.id}`
            : `/organization/${clientIdentity.id}`
        : ''

    return (
        <React.Fragment>

          <nav className={hideTopBar ? 'page-content topBar topBar-hide' : 'page-content topBar'}>
            <div className="d-flex align-items-end" ref={e => this.exploreRef = e}>
              <Link to='/'>
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
                    <Link onClick={this._hamburgerOff} to='/exchanges/exchange_explorer'
                          className='item-text'>{translate['Windows']}</Link>
                  }/>
                  <Material className='display-block' content={
                    <Link onClick={this._hamburgerOff} to='/users/user_explorer'
                          className='item-text'>{topBarTranslate['Persons']}</Link>
                  }/>
                  <Material className='display-block' content={
                    <Link onClick={this._hamburgerOff} to={'/products/product_explorer'}
                          className='item-text'>محصولات و نمونه‌کار ها</Link>
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

            <Link to='/'><InnoWinLogo svgClass={'centerImgTopBar'}/></Link>

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
                            <div className='profile-menu-profile-section-next-image-first'>{clientName}</div>
                            <div className='profile-menu-profile-section-next-image-middle'>@{clientIdentity && (clientIdentity.nike_name || clientIdentity.username)}</div>
                            <div className='profile-menu-profile-section-next-image-last'>{topBarTranslate['Edit Profile']}</div>
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

              <div className='notification-logo-cont'><Link to='/notifications'><NotificationIcon className='notification-logo'/></Link></div>

              <div className="-searchInput">
                <input type="text" name="search" dir="auto" placeholder={topBarTranslate['Search in Danesh boom']} ref={e => this.searchInput = e}/>
                <SearchIcon className='search-icon'/>
              </div>

            </div>
          </nav>

          {displayAgentForm && <AgentForm active={agentForm} hide={this._handleHideAgent}/>}

          {displayCreateExchange && <CreateExchange handleModalVisibility={this._createExchangeModalVisibilityHandler} modalIsOpen={createExchangeModalIsOpen}/>}

          <TransitionGroup>
            {
              showHamburger &&
              <CSSTransition key={1} timeout={250} classNames='fade'>
                <div className='hamburger-overlay open'/>
              </CSSTransition>
            }
          </TransitionGroup>

          {displayProductModal && <AddingContribution modalIsOpen={productModal} handleModalVisibility={this._handleProductWizardModal}/>}

          <div className={showSetting || showAbout || agentForm || productModal || createExchangeModalIsOpen ? 'makeDark' : 'makeDark-out'} onClick={this._handleHideSetting}/>

          {/*Settings Modal*/}
          {
            displaySetting &&
            <div>
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
            </div>
          }
          {/*End Settings Modal*/}

          {/*About Modal*/}
          {
            displayAbout &&
            <div>
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
            </div>
          }
          {/*End About Modal*/}

        </React.Fragment>
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
  const clientIdentity = getClientObject(state)

  const clientName = clientIdentity
      ? (clientIdentity.identity_type === constants.USER_TYPES.USER
              ? clientIdentity.first_name + ' ' + clientIdentity.last_name
              : clientIdentity.nike_name
      )
      : ''

  const profileImg = clientIdentity && clientIdentity.profile_media && clientIdentity.profile_media.file
  const bannerImg = clientIdentity && clientIdentity.profile_banner && clientIdentity.profile_banner.file

  return {
    selectedExchange: state.auth.client.selectedExchange,
    clientName,
    clientIdentityId: getClientIdentity(state),
    clientIdentity,
    imgLink: profileImg,
    bannerLink: bannerImg,
    translate: state.intl.messages || {},
    modal: state.modal,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signOut: AuthActions.signOut,
    showModal: ModalActions.showModal,
    hideModal: ModalActions.hideModal,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
