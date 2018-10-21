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
import {shortOrganizationType} from "src/consts/flowTypes/organization/organization"
import {
  DefaultUserIcon,
  logoDaneshBoom,
  ExchangeExploreIcon,
  ExchangeIcon,
  NotificationIcon,
  LogoWhiteSvg,
  ContributionIcon,
  Contacts
} from "src/images/icons"
import {Link} from "react-router-dom"
import AgentForm from "../pages/modal/agentForm-modal"
import AddingContribution from "../pages/adding-contribution/addingContribution"
import CreateExchange from "../pages/modal/createExchange/createExchange"
import client from "src/consts/client"
import FileActions from "../../redux/actions/commonActions/fileActions"
import {SearchIcon} from "../../images/icons"

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
  showSetting?: boolean
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
      mouseIsOverMenu: false,
      selectedSetting: 'General Settings',
    }
  }

  componentDidUpdate(prevProps) {
    const {isLoggedIn, actions} = this.props
    if (prevProps.isLoggedIn && prevProps.isLoggedIn !== isLoggedIn) {
      actions.push('/login')
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

  _toggle = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    this.setState({...this.state, collapse: !this.state.collapse, exploreCollapse: false})
  }

  _toggleExplore = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    this.setState({...this.state, exploreCollapse: !this.state.exploreCollapse, collapse: false})
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
  _createExchangeModalVisibilityHandler = () => {
    this.setState({...this.state, createExchangeModalIsOpen: !this.state.createExchangeModalIsOpen})
  }

  _handleProductWizardModal = () => {
    this.setState({...this.state, productWizardModalIsOpen: !this.state.productWizardModalIsOpen})
  }

  _handleSignOut = () => {
    this.props.actions.signOut()
  }

  _handleMouseEnter = () => {
    this.setState({...this.state, mouseIsOverMenu: true})
  }

  _handleMouseLeave = () => {
    this.setState({...this.state, mouseIsOverMenu: false})
  }

  _handleShowSetting = () => {
    this.setState({...this.state, showSetting: true, collapse: false, exploreCollapse: false, collapseProfile: false})
  }

  _handleHideSetting = () => {
    this.setState({...this.state, showSetting: false})
  }

  _handleSettingSelected = (e) => {
    this.setState({...this.state, selectedSetting: e.target.id})
  }

  render() {
    const {collapseClassName, clientUser, clientOrganization, translate, clientImgLink} = this.props
    const {
      collapse,
      collapseProfile,
      exploreCollapse,
      productWizardModalIsOpen,
      mouseIsOverMenu,
      selectedSetting,
      showSetting,
      createExchangeModalIsOpen
    } = this.state

    // added to close all collapse menus when click outside
    window.onclick = () => {
      if (!mouseIsOverMenu && (collapse || exploreCollapse || collapseProfile)) {
        this.setState({...this.state, collapse: false, exploreCollapse: false, collapseProfile: false})
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
              <button type="button"
                      className={`navbar-toggler my-auto mr-2 -outlineWhite ${collapse ? "active" : ""}`}
                      onClick={this._toggle}>
                {!collapse ? <i className="fa fa-bars cursor-pointer" aria-hidden={true}/> :
                    <i className=" text-danger fa fa-close cursor-pointer" aria-hidden={true}/>}
              </button>
              <Link to={"/"}><i className="fa fa-home mr-3" aria-hidden={true}/></Link>
              <div className="mr-5 top-bar-explore" onClick={this._toggleExplore}>
                <ExchangeExploreIcon
                    className="-topBarIcons" ref={e => this.svg = e}/>
                <div className={this.state.exploreCollapse ? 'explore-menu-container' : 'explore-menu-container-hide'}>
                  <div className='explore-menu-arrow'>
                    ▲
                    {/*<MainLbarArrow className='explore-menu-arrow-2'/>*/}
                  </div>
                  <div className='explore-menu'>
                    <Link to={'/exchange/Exchange_Explorer'} className='explore-menu-items'><ExchangeIcon
                        className='explore-logos'/> بورس ها</Link>
                    <Link to={'/users/Users_Explorer'} className='explore-menu-items'><Contacts
                        svgClass='explore-logos member-logo' containerClass='explore-logos-container'/> شناسه ها (افراد
                      و مجموعه
                      ها)</Link>
                    <Link to={'#'} className='explore-menu-items'><ContributionIcon className='explore-logos'/> آورده ها
                      (محصولات، توانمدی و ...)</Link>
                  </div>
                </div>
              </div>
              <Link className="mr-5" to={"/"}><NotificationIcon className="-topBarIcons"/></Link>
            </div>
            <LogoWhiteSvg className="centerImgTopBar"/>
            <div className="dir-ltr d-flex flex-row">
              <div className="-ProfTopBarImg">
                {!clientImgLink ? <DefaultUserIcon onClickFunc={this._toggleProfile}/> :
                    <img src={clientImgLink} alt="Person icon" onClick={this._toggleProfile}/>}
              </div>
              <div className="-searchInput d-flex align-items-center">
                <input type="text" className="text-white search-top-bar" name="search" dir="auto"
                       placeholder={translate['Search in Danesh boom']}
                       ref={searchInput => {
                         this.searchInput = searchInput
                       }}/>
                <SearchIcon className='search-icon'/>
              </div>
            </div>
          </nav>
          <Collapse isOpen={collapse} className={`-topBar-right-collapse pr-0 pl-0 ${collapseClassName}`}>
            <ul>
              <li onClick={this._handleExchangeUpgrade}><i className="fa fa-home"/> درخواست ارتقاء به کارگزار</li>
              <li onClick={this._createExchangeModalVisibilityHandler}><i className="fa fa-home"/> بورس جدید</li>
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
                <Link to="#" onClick={this._handleShowSetting}>{translate['General Settings']}</Link>
              </div>
            </div>
          </Collapse>
          {/*<AddProductWizardModal*/}
          {/*ref={addProductWizard => {this.addProductWizard = addProductWizard}}*/}
          {/*className="addProductWizard"*/}
          {/*/>*/}
          <AddingContribution modalIsOpen={productWizardModalIsOpen}
                              handleModalVisibility={this._handleProductWizardModal}/>

          {/*Settings Modal*/}

          <div className={showSetting ? 'makeDark' : 'makeDark-out'} onClick={this._handleHideSetting}>

          </div>

          <div className={showSetting ? 'settingModal-sidebar' : 'settingModal-sidebar-out'}>
            <div id='General Settings' onClick={this._handleSettingSelected}
                 className={selectedSetting === 'General Settings' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}>
              {translate['General Settings']}
            </div>
            <div id='Manage Linked Accounts' onClick={this._handleSettingSelected}
                 className={selectedSetting === 'Manage Linked Accounts' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}>
              {translate['Manage Linked Accounts']}
            </div>
            <div id='Privacy' onClick={this._handleSettingSelected}
                 className={selectedSetting === 'Privacy' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}>
              {translate['Privacy']}
            </div>
            <div id='Sign Out' onClick={this._handleSettingSelected}
                 className={selectedSetting === 'Sign Out' ? 'settingModal-sidebar-item-selected' : 'settingModal-sidebar-item'}>
              {translate['Sign Out']}
            </div>
          </div>
          <div className={showSetting ? 'settingModal-menu' : 'settingModal-menu-out'}>
            <div className='settingModal-menu-header'>{translate[selectedSetting]}</div>
            {this.renderSetting()}
          </div>
          {/*End Settings Modal*/}

        </div>
    )
  }

  renderSetting() {
    if (this.state.selectedSetting === 'General Settings') {
      return (
          <div style={{textAlign: 'right', position: 'relative', paddingBottom: '50px'}}>
            <div className='settingModal-menu-general-title'>
              {this.props.translate['Username']}
            </div>
            <input type='text' className='settingModal-menu-general-input'/>
            <div className='settingModal-menu-general-hint'>حداقل 5 و حداکثر 32 کاراکتر dot و underline ، 9-0 ، Z-A شامل
              حروف.
            </div>

            <div className='settingModal-menu-general-title'>
              {this.props.translate['Password']}
            </div>
            <input type='password' className='settingModal-menu-general-input-password'/>
            <div className='settingModal-menu-general-hint'>رمز عبوری انتخاب کنید که برای دیگران به سختی قابل حدس زدن
              باشد.
            </div>

            <div className='settingModal-menu-general-title'>
              {this.props.translate['Contact Email']}
            </div>
            <input type='email' className='settingModal-menu-general-input'/>
            <div className='settingModal-menu-general-hint'>این ایمیل برای ارتباط اینوین (مثلا بازیابی رمز عبور) با شما
              است و برای سایر کاربران قابل مشاهده نخواهد بود.
            </div>

            <button className='settingModal-menu-general-save'>{this.props.translate['Save Changes']}</button>
          </div>
      )
    }
  }

}

const mapStateToProps = state => {
  const {profile, organization, user_type} = state.auth.client
  const clientImgId = (user_type === 'person') ? (profile.profile_media) : (
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

