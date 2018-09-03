import React, {Component} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import FontAwesome from "react-fontawesome"
import {userInfoIcon, workExperienceIcon, postIcon} from "src/images/icons"
import {default as ChatWrapper} from "./ChatBar/ChatParts"
import NavLink from "react-router-dom/es/NavLink";

class MainChatBar extends Component {

  static propTypes = {
    tab: PropTypes.string.isRequired,
  };

  render() {
    const {tab} = this.props;
    let content = '';

    if (tab === "chat") {
      content = <ChatWrapper/>
    }
    if (tab === "map") {
      content = (
        <div>
          <h2> i am map</h2>
        </div>
      )
    }
    if (tab === "dashboard") {
      content = (
        <div>
          <h2> i am dashboard</h2>
        </div>
      )
    }
    return content;
  }
}


class ChatBar extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {tab: "should be changed"}
  }

  _handleChat = () => {
    const newState = {...this.state, tab: "chat"};
    this.setState(newState)
  };

  _handleMap = () => {
    const newState = {...this.state, tab: "map"};
    this.setState(newState)
  };

  _handleDashboard = () => {
    const newState = {...this.state, tab: "dashboard"};
    this.setState(newState)
  };

  render() {
    const {tab} = this.state;
    const {className} = this.props
    return (
      <div className={`row ${className}`}>
        {/* ------------------- commented by ali orooji -----------------*/}
        {/*<div>*/}
          {/*<MainChatBar tab={tab}/>*/}
        {/*</div>*/}
        {/*<div className="col-1 d-flex flex-column align-items-end -my-icons1">*/}
          {/*{(tab === 'dashboard') ?*/}
            {/*<Link className="active" to="exchange/Exchange_Explorer"><FontAwesome className="dashboard-icon"*/}
                                                                                  {/*name="dashboard"/></Link> :*/}
            {/*<Link to="exchange/Exchange_Explorer"><FontAwesome className="dashboard-icon" name="dashboard"/></Link>}*/}
          {/*{(tab === 'map') ? <Link onClick={this._handleMap} className="active" to="#"><FontAwesome className="map-icon"*/}
                                                                                                    {/*name="map-o"/></Link> :*/}
            {/*<Link onClick={this._handleMap} to="#"><FontAwesome className="map-icon" name="map-o"/></Link>}*/}
          {/*{(tab === 'chat') ?*/}
            {/*<Link onClick={this._handleChat} className="active" to="#"><FontAwesome className="chat-icon"*/}
                                                                                    {/*name="comments"/></Link> :*/}
            {/*<Link onClick={this._handleChat} to="#"><FontAwesome className="chat-icon" name="comments"/></Link>}*/}
        {/*</div>*/}
        {/* ------------------- commented by ali orooji -----------------*/}
      </div>
    )
  }
}

export default ChatBar;
