import React,{Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
} from 'reactstrap';

class TopBar extends Component {
  constructor (props) {
    super (props);
    this.state = {

    }
  }
  render(){
    return(
      <h1>Top bar</h1>
    )

  }
}

export default TopBar;