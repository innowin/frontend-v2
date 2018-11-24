import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import postActions from "src/redux/actions/commonActions/postActions"
import exchangeActions from "src/redux/actions/exchangeActions"
import getUserAction from "src/redux/actions/user/getUserActions"
import StreamView from "./StreamView"
import InfoView from "./InfoView"
import StatisticView from "./StatisticView"
import ExchangeManager from "./ExchangeManager"
import MembersView from "./MembersView"
import {ClipLoader} from "react-spinners"


class Exchange_Info extends Component {
  constructor(props) {
    super(props)
    this.state = {gotOwner: false}
  }

  componentDidMount() {
    const {
      actions,
      exchangeId,
      exchanges
    } = this.props
    // actions.getPosts({postParentId: exchangeId, limit: 5, offset: 0})
    if (exchanges.list[exchangeId]) {
      if (exchanges.list[exchangeId].owner) {
        actions.getUser(exchanges.list[exchangeId].owner.identity_user)
        this.state.gotOwner = true
      }
    }
    // actions.getExchangeById(exchangeId)
  }

  // componentDidUpdate() {
  //   if (!this.state.gotOwner) {
  //     let {
  //       actions,
  //       exchangeId,
  //       exchanges
  //     } = this.props
  //     if (exchanges.list[exchangeId]) {
  //       if (exchanges.list[exchangeId].owner) {
  //         actions.getUser(exchanges.list[exchangeId].owner.identity_user)
  //       }
  //     }
  //   }
  // }

  render() {
    const {activeTab, exchangeId, exchanges, users} = this.props
    let currentExchange = exchanges.list[exchangeId]
    switch (activeTab) {
      case "Stream":
        return (
            <StreamView exchangeId={exchangeId}/>
        )
      case "Info":
        if (currentExchange.owner) {
          let owner = users.list[currentExchange.owner.identity_user]
          if (owner)
            return (
                <InfoView currentExchange={currentExchange} owner={owner}/>
            )
          else return <div className={"info-loading"}><ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/></div>
        }
        else {
          return <div className={"info-loading"}><ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/></div>
        }
      case "Members":
        return (
            <MembersView exchangeId={exchangeId}/>
        )
      case "Statistic":
        return (
            <StatisticView exchangeId={exchangeId}/>
        )
      case "Exchange Manager":
        return (
            <ExchangeManager exchangeId={exchangeId}/>
        )
      default:
        return (
            <div style={{textAlign: "center", marginTop: "10px"}}>
              Undefined Data Type: {activeTab}
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  exchanges: state.exchanges,
  users: state.users,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPosts: postActions.filterPostsByPostParentLimitOffset,
    getExchangeById: exchangeActions.getExchangeByExId,
    getUser: getUserAction.getProfileByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Exchange_Info)