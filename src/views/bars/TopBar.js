import React,{Component} from 'react';
import cookies from 'browser-cookies';
import {deleteTOKEN} from "../../consts/data";

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
      <div>
        <button onClick={handleSignOut} >Sign out</button>
        <h1>Top bar</h1>
      </div>
    )
    
  }
}

export default TopBar;