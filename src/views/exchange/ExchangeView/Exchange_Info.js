// @flow
import * as React from "react"
import InfoView from "./InfoView"
import StatisticView from "./StatisticView"
import ExchangeManager from "./ExchangeManager"
import MembersView from "./MembersView"
import HomePosts from "../../pages/home/HomePosts"
import {PureComponent} from 'react'

type props = {
  activeTab: string,
  exchangeId: number,
}
export default class Exchange_Info extends PureComponent<props> {
  backButton = () => {
    window.history.back()
  }

  render() {
    const {activeTab, exchangeId} = this.props
    switch (activeTab) {
      case "Stream":
        return (
            <HomePosts unSetExchangeId={this.backButton} exchangeId={exchangeId} className="post-wrapper active-exchange" exchangePage={true}/>
            // <StreamView exchangeId={exchangeId}/>
        )
      case "Info":
        return (
            <InfoView exchangeId={exchangeId}/>
        )
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
            {/*<div style={{textAlign: "center", marginTop: "10px"}}>
               Undefined Data Type: {activeTab}
               </div>*/
            }
        )
    }
  }
}

// const mapStateToProps = (state) => ({
//   exchanges: state.exchanges,
//   users: state.identities,
// })
//
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators({
//     getPosts: postActions.filterPostsByPostParentLimitOffset,
//     getExchangeById: exchangeActions.getExchangeByExId,
//     getUser: getUserAction.getProfileByUserId,
//   }, dispatch)
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Exchange_Info)