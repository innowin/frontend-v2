// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import TopBar from "../bars/TopBar"
import ChatBar from "../bars/ChatBar"
import HomeSideBar from "./home/HomeSideBar"
import HomePosts from "./home/HomePosts"
import {clientData} from "src/consts/log"
import {connect} from "react-redux"
import type {exchangeIdentityType} from "src/consts/flowTypes/exchange/exchange.js"

class Home extends Component<{ handleSignOut: Function, exchangeIdentities: (exchangeIdentityType)[] }, { activeExchangeId: ?number }> {

  static propTypes = {
    handleSignOut: PropTypes.func.isRequired,
    exchangeIdentities: PropTypes.arrayOf(PropTypes.object.isRequired)
  }

  constructor(props) {
    super(props)
    this.state = {activeExchangeId: null}
  }

  componentDidMount() {
    const {exchangeIdentities} = this.props
    const DaneshBoomExchangeId = exchangeIdentities[0].exchange_identity_related_exchange.id
    setTimeout(() => console.log(clientData()), 2000)
    this.setState({...this.state, activeExchangeId: DaneshBoomExchangeId})
  }

  _setExchangeId = (exchangeId: number) => {
    const {activeExchangeId} = this.state
    if (exchangeId !== activeExchangeId) {
      this.setState({...this.state, activeExchangeId: exchangeId})
    }
  }

  render() {
    const {handleSignOut, exchangeIdentities} = this.props
    let {activeExchangeId} = this.state
    const widthOfRightBar = "col-md-3 col-sm-2"
    return (
      <div className="home-wrapper">
        <TopBar handleSignOut={handleSignOut} collapseWidthCol={widthOfRightBar}/>
        <main>
          <HomeSideBar setExchangeId={this._setExchangeId}
                       classNames={`${widthOfRightBar} pr-0 pl-0 -right-sidebar-wrapper`}
                       exchangeIdentities={exchangeIdentities}
          />
          <div className="col-md-7 col-sm-9 pr-5-percent -content-wrapper -home-content-wrapper">
            <HomePosts exchangeId={activeExchangeId}/>
          </div>
          <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
            <ChatBar/>
          </div>
        </main>

      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    exchangeIdentities: state.auth.client.exchange_identities
  }
)
export default connect(mapStateToProps)(Home)