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
  Contacts,
  LinkedInIcon
} from "src/images/icons"
import {Link} from "react-router-dom"
import AgentForm from "../pages/modal/agentForm-modal"
import AddingContribution from "../pages/adding-contribution/addingContribution"
import CreateExchange from "../pages/modal/createExchange/createExchange"
import CreateExchangeForm from "../pages/modal/prevCreateExchange/createExchange"
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
    const {collapse, collapseProfile, exploreCollapse, productWizardModalIsOpen, mouseIsOverMenu, selectedSetting, showSetting, createExchangeModalIsOpen} = this.state

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

              {/*<button type="button"*/}
              {/*className={`navbar-toggler my-auto mr-2 -outlineWhite ${collapse ? "active" : ""}`}*/}
              {/*onClick={this._toggle}>*/}
              {/*{!collapse ? <i className="fa fa-bars cursor-pointer" aria-hidden={true}/> :*/}
              {/*<i className=" text-danger fa fa-close cursor-pointer" aria-hidden={true}/>}*/}
              {/*</button>*/}

              <Link to={"/"}><i className="fa fa-home mr-3" aria-hidden={true}/></Link>
              <div className="mr-5 top-bar-explore" onClick={this._toggleExplore}>
                <ExchangeExploreIcon
                    className="-topBarIcons" ref={e => this.svg = e}/>
                <div className={exploreCollapse ? 'explore-menu-container' : 'explore-menu-container-hide'}>
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
                {!clientImgLink ? <DefaultUserIcon className='-ProfTopBarImg-svg' onClickFunc={this._toggleProfile}/> :
                    <img src={clientImgLink} className='-ProfTopBarImg-svg-img' alt="Person icon" onClick={this._toggleProfile}/>}

                <div className={collapseProfile ? 'profile-menu-container' : 'profile-menu-container-hide'}>
                  <div className='profile-menu-arrow'>
                    ▲
                    {/*<MainLbarArrow className='explore-menu-arrow-2'/>*/}
                  </div>
                  <div className='explore-menu'>
                    <div className='profile-menu-profile-section'>
                      <div className='profile-menu-profile-section-image'>
                        {!clientImgLink ? <DefaultUserIcon className='-ProfTopBarImg-svg-big' onClickFunc={this._toggleProfile}/> :
                            <img src={clientImgLink} className='-ProfTopBarImg-svg-img-big' alt="Person icon" onClick={this._toggleProfile}/>}
                      </div>
                      <div className='profile-menu-profile-section-next-image'>
                        <div className='profile-menu-profile-section-next-image-first'>{clientUser && clientUser.first_name + ' ' + clientUser.last_name}</div>
                        <div className='profile-menu-profile-section-next-image-middle'>@{clientUser && clientUser.username}</div>
                        <Link className='profile-menu-profile-section-next-image-last' to={clientUser && `/user/${clientUser.id}`}>{translate['Edit Profile']}</Link>
                      </div>
                    </div>

                    <div className='profile-menu-second-section'>
                      <div className='profile-menu-second-section-item' onClick={this._handleExchangeUpgrade}>درخواست ارتقاء به کارگزار</div>
                      <div className='profile-menu-second-section-item' onClick={this._createExchangeModalVisibilityHandler}>ایجاد بورس جدید</div>
                      <div className='profile-menu-second-section-item' onClick={this._handleProductWizardModal}>ایجاد آورده جدید</div>
                    </div>

                    <div className='profile-menu-second-section'>
                      <div className='profile-menu-second-section-item' onClick={this._handleShowSetting}>{translate['General Settings']}</div>
                      <div className='profile-menu-second-section-item'>{translate['About Innovin']}</div>
                      <div className='profile-menu-second-section-item'>{translate['Privacy']}</div>
                    </div>

                    <div className='profile-menu-second-section-item' onClick={this._handleSignOut}>{translate['Sign Out']}</div>


                  </div>
                </div>

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

          {/*Settings Modal*/}
          <div className={showSetting ? 'makeDark' : 'makeDark-out'} onClick={this._handleHideSetting}>
            {/*dark div*/}
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

    let {selectedSetting} = this.state

    if (selectedSetting === 'General Settings') {
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
    else if (selectedSetting === 'Manage Linked Accounts') {
      return (
          <div>
            <div className='settingModal-menu-manage-hint'>
              بارگزاری مخاطبین شما در شبکه های دیگر، به اینوین کمک می کند تا پیشنهاد های دقیق تری برای گسترش ارتباطتتان به شما ارائه کند. ما بدون اطلاع شما با هیچ یک از این افراد ارتباط (ایمیل، پیامک
              و ...) نخواهیم گرفت.
            </div>

            <div className='settingModal-menu-manage-container'>
              <div className='settingModal-menu-manage-title'>
                {this.props.translate['Google']}
              </div>
              <LinkedInIcon className='settingModal-menu-manage-logo'/>
              <div className='settingModal-menu-manage-address'>testtest78@bullshit.com</div>
              <button className='settingModal-menu-manage-remove'>{this.props.translate['Disconnect']}</button>
            </div>

            <div className='settingModal-menu-manage-container'>
              <div className='settingModal-menu-manage-title'>
                {this.props.translate['Linkedin']}
              </div>
              <LinkedInIcon className='settingModal-menu-manage-logo'/>
              <div className='settingModal-menu-manage-address'>testtest78@bullshit.com</div>
              <button className='settingModal-menu-manage-add'>{this.props.translate['Add']}</button>
            </div>

          </div>
      )
    }
    else if (selectedSetting === 'Privacy') {
      return (
          <div>
            <div className='settingModal-menu-privacy-who-follow-container'>
              <div className='settingModal-menu-privacy-header'>{this.props.translate['Manage Followers']}</div>
              <div className='settingModal-menu-privacy-who-follow'>{this.props.translate['Who Should Can Follow You?']}</div>

              <div className='settingModal-menu-privacy-check-container'>
                <form>
                  <label className='settingModal-menu-privacy-checkbox'>
                    <input type="radio" name="kind"/>
                    <span className='checkmark'></span>
                    {this.props.translate['All People']}
                  </label>

                  <label className='settingModal-menu-privacy-checkbox'>
                    <input type="radio" name="kind"/>
                    <span className='checkmark'></span>
                    {this.props.translate['Only Accepted Requests']}
                  </label>
                </form>
              </div>

              <button className='settingModal-menu-general-save'>{this.props.translate['Save Changes']}</button>
            </div>

            <div className='settingModal-menu-privacy-who-follow-container'>
              <div className='settingModal-menu-privacy-header'>{this.props.translate['Delete Account']}</div>
              <div className='settingModal-menu-privacy-hint'>
                با بسته شدن حساب کاربری شما در اینوین، شما در اینوین، تمام اطلاعات مربوط به آن، اعم از اطلاعات شناسه، پیام ها و نظر ها، در شبکه نمایش داده نخواهد شد. شما می توانید حساب خود را طی 30
                روز آینده بازیابی کنید. ممکن است این مهلت تا 40 روز ادامه داشته باشد.
              </div>
              <button className='settingModal-menu-privacy-delete-account'>{this.props.translate['Delete Account']}</button>
            </div>

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

