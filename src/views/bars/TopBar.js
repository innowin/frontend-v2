/*global __*/
import React,{Component} from 'react';
import {defaultImg} from "../../images/icons"

class TopBar extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isSignedOut:false,
    };
  }

  render(){
    const {handleSignOut} = this.props;
    return(
        <nav className="navbar flex-row justify-content-between -white-i" style={{backgroundColor:"#253545"}}>
          <div className="d-flex align-items-center">
            <button className="navbar-toggler my-auto" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </button>
            <i class="fa fa-home mr-3" aria-hidden="true"></i>
            <i class="fa fa-users mr-4" aria-hidden="true"></i>
            <i class="fa fa-bell mr-4" aria-hidden="true"></i>
          </div>
          <img className="-centerInDad-img" src={defaultImg} style={{maxHeight:"30px"}}/>
          <div className="dir-ltr d-flex flex-row">
            <img src={defaultImg} style={{maxHeight:"30px"}}/>
            <div className="ml-4 -searchInput d-flex align-items-center">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input
                type="text"
                name="search"
                ref = {searchInput => {this.searchInput = searchInput}}
                dir="auto"
              />
            </div>
          </div>


        </nav>


      // <div className="collapse" id="navbarToggleExternalContent">
      // <button onClick={handleSignOut} >Sign out</button>
      // </div>

    )

  }
}

export default TopBar;
