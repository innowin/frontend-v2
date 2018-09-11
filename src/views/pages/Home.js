// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import TopBar from "../bars/TopBar"
import ChatBar from "../bars/ChatBar"
import HomeSideBar from "./home/HomeSideBar"
import HomePosts from "./home/HomePosts"
import {connect} from "react-redux"
import constants from "../../consts/constants";

type HomeProps = {|
  identityId: number,
  identityType: string,
|}

class Home extends Component<HomeProps, {| activeExchangeId: ?number |}> {

  static propTypes = {
    identityId: PropTypes.number.isRequired,
    identityType: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {activeExchangeId: null}
  }

  _setExchangeId = (exchangeId: number) => {
    const {activeExchangeId} = this.state
    if (exchangeId !== activeExchangeId) {
      this.setState({...this.state, activeExchangeId: exchangeId})
    }
  }

  render() {
    const {identityId, identityType} = this.props
    const {activeExchangeId} = this.state
    return (
      <div className="home-wrapper">
        <TopBar collapseClassName="col-2"/>
        <main className="-main">
          <div className="row content">
            <HomeSideBar setExchangeId={this._setExchangeId}
                         classNames="col-3 pr-0 pl-0 right-sidebar"
                         identityId={identityId}
                         identityType={identityType}
                         activeExchangeId={activeExchangeId}
            />
            <HomePosts exchangeId={activeExchangeId} className="col-6"/>
            <div className="col-3 pl-0"/>
          </div>
          <ChatBar className="pr-0 pl-0 -left-sidebar-wrapper"/>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const identityType = state.auth.client.identity.identity_user ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
  return {
    identityId: state.auth.client.identity.id,
    identityType: identityType
  }
}
export default connect(mapStateToProps)(Home)