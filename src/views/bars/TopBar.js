import React, {Component} from "react";
import PropTypes from "prop-types"
import {Collapse} from "reactstrap"
import {
  defaultImg,
  logoDaneshBoom,
  ExchangeExploreIcon,
  NotificationIcon
} from "src/images/icons"
import {ID} from "src/consts/data"
import {Link} from "react-router-dom"
import {getProfile} from "src/crud/user/profile";
import {getFile} from "../../crud/media/media";
import AgentForm from "../pages/modal/agentForm-modal"
class TopBar extends Component {

  static propTypes = {
    handleSignOut: PropTypes.func.isRequired,
    collapseWidthCol: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {isSignedOut: false, collapse: false, collapseProfile: false, agentForm:false, profileMedia: defaultImg}
  }

  _toggle = (e) => {
    e.preventDefault();
    this.setState({...this.state, collapse: !this.state.collapse})
  };

  _toggleProfile = (e) => {
    e.preventDefault();
    this.setState({...this.state, collapseProfile: !this.state.collapseProfile})
  };

  _getProfileMedia = (res) => {
    const mediaId = res.profile_media;
    if (mediaId) {
      const mediaResult = (res) => {
        this.setState({...this.state, profileMedia: res.file})
      };
      getFile(mediaId, mediaResult)
    }
  };

  _handleProductWizardModal = () => {
    // this.addProductWizard._toggle()
  }

  _handleExchangeUpgrade = (e) => {
    this.setState({...this.state,agentForm:true})
  }

  _handleHideAgent = (e)=>{
    this.setState({...this.state,agentForm:false})
  }

  componentDidMount() {
    getProfile(ID, this._getProfileMedia)
  }

  render() {
    const {handleSignOut, collapseWidthCol} = this.props;
    const {profileMedia, collapse, collapseProfile} = this.state;
    return (
      <div>
        <AgentForm
          active={this.state.agentForm}
          hide={this._handleHideAgent}
        />
        <nav className="navbar flex-row justify-content-between p-0 -white-i fixed-top topBar">
          <div className="d-flex align-items-center -whiteSvg">
            <button type="button"
                    className={`navbar-toggler my-auto mr-2 -outlineWhite ${collapse ? "active" : ""}`}
                    onClick={this._toggle}>
              {
                (!collapse)?(<i className="fa fa-bars cursor-pointer" aria-hidden="true"/>):(
                  <i className=" text-danger fa fa-close cursor-pointer" aria-hidden="true"/>
                )
              }
            </button>
            <Link to={"/"}><i className="fa fa-home mr-3" aria-hidden="true"/></Link>
            <Link className="mr-5" to={"/exchange/Exchange_Explorer"}><ExchangeExploreIcon className="-topBarIcons"/></Link>
            <Link className="mr-5" to={"/"}><NotificationIcon className="-topBarIcons"/></Link>
          </div>
          <img className="centerImgTopBar" src={logoDaneshBoom} alt="profile_img"/>
          <div className="dir-ltr d-flex flex-row">
            <img className="-ProfTopBarImg" src={profileMedia} alt="Person icon" onClick={this._toggleProfile}/>
            <div className="ml-4 -searchInput d-flex align-items-center">
              <i className="fa fa-search" aria-hidden="true"/>
              <input type="text" className="text-white" name="search" dir="auto"
                     ref={searchInput => {
                       this.searchInput = searchInput
                     }}/>
            </div>
          </div>
        </nav>
        <Collapse isOpen={collapse} className={`-topBar-right-collapse col-3 pr-0 pl-0 ${collapseWidthCol}`}>
          <ul>
            <li onClick={this._handleExchangeUpgrade}><i className="fa fa-home"/> درخواست ارتقاء به کارگزار</li>
            <li onClick={this._handleNewExchange}><i className="fa fa-home"/> بورس جدید</li>
            <li onClick={this._handleProductWizardModal}><i className="fa fa-home"/> آورده ی جدید</li>
          </ul>
        </Collapse>
        <Collapse isOpen={collapseProfile} className="-topBar-profile-collapse">
          <div className="text-center">
            <div className="card-block">
              <Link className="card-link" to="#" onClick={handleSignOut}>Sign out</Link>
              <Link className="card-link" to={`/user/${ID}`}>my_profile</Link>
            </div>
          </div>
        </Collapse>
        {/*<AddProductWizardModal*/}
          {/*ref={addProductWizard => {this.addProductWizard = addProductWizard}}*/}
          {/*className="addProductWizard"*/}
        {/*/>*/}
      </div>
    )
  }
}

export default TopBar;
