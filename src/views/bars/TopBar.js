import React, {Component} from "react";
import {Collapse} from "reactstrap"
import {defaultImg, logoDaneshBoom, ExchangeIcon, SocialIcon, ContributionIcon, NotificationIcon} from "src/images/icons"
import {ID} from "src/consts/data"
import {Link} from "react-router-dom"
import {getProfile} from "src/crud/user/profile";
import {getFile} from "../../crud/media/media";

class TopBar extends Component {

  constructor(props) {
    super(props);
    this.state = {isSignedOut: false, collapse: false, profileMedia:defaultImg}
  }

  _toggle = (e) => {
    e.preventDefault();
    this.setState({...this.state, collapse: !this.state.collapse})
  };

  _getProfileMedia = (res) => {
    const mediaId = res.profile_media;
    if(mediaId){
      const mediaResult = (res) => {
        this.setState({...this.state, profileMedia:res.file})
      };
      getFile(mediaId, mediaResult)
    }
  };

  componentDidMount() {
    getProfile(ID, this._getProfileMedia)
  }

  componentWillUnmount() {
  // TODO mohsen: socket.off
  }

  render() {
    const {handleSignOut} = this.props;
    const {profileMedia} = this.state;
    return (
      <div>
        <nav className="navbar flex-row justify-content-between p-0 -white-i fixed-top -topBarHeight"
             style={{backgroundColor: "#253545"}}>
          <div className="d-flex align-items-center -whiteSvg">
            <button type="button" className="navbar-toggler my-auto mr-2 -outlineWhite" onClick={this._toggle}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            <Link to={"/"}><i className="fa fa-home mr-3" aria-hidden="true"></i></Link>
            <Link to={"/exchange/Exchange_Explorer"}><ExchangeIcon className="-topBarIcons mr-4"/></Link>
            <Link to={"/"}><SocialIcon className="-topBarIcons mr-4" /></Link>
            <Link to={"/"}><ContributionIcon className="-topBarIcons mr-4"/></Link>
            <Link to={"/"}><NotificationIcon className="-topBarIcons mr-4"/></Link>
          </div>
          <img className="-centerInDad-img" src={logoDaneshBoom} alt="profile_img" style={{maxHeight: "40px"}}/>
          <div className="dir-ltr d-flex flex-row">
            <img className="-ProfTopBarImg" src={profileMedia} alt="Person icon"/>
            <div className="ml-4 -searchInput d-flex align-items-center">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input type="text" name="search" dir="auto" style={{color:"white"}}
                ref={searchInput => {this.searchInput = searchInput}}/>
            </div>
          </div>
        </nav>
        <Collapse isOpen={this.state.collapse} className="-profile-collapse">
          <div className="card text-center">
            <img className="card-img-top" src={defaultImg} alt="Person icon"/>
            <div className="card-block">
              <Link className="card-link" to="#" onClick={handleSignOut}>Sign out</Link>
              <Link className="card-link" to={`/user/${ID}`}>my_profile</Link>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default TopBar;
