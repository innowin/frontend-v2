import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import postActions from "src/redux/actions/commonActions/postActions"
import exchangeActions from "src/redux/actions/exchangeActions"
import getUserAction from "src/redux/actions/user/getUserActions"
import StreamView from "./StreamView"
import InfoView from "./InfoView"


class Exchange_Info extends Component {

  componentDidMount() {
    const {actions, exchangeId, exchanges} = this.props
    actions.getPosts({postParentId: this.props.exchangeId, limit: 5, offset: 0})
    actions.getExchangeById(exchangeId)
    if (exchanges.list[exchangeId].owner) actions.getUser(exchanges.list[exchangeId].owner.identity_user)
  }

  render() {
    const {activeTab} = this.props
    switch (activeTab) {
      case "Stream":
        const {posts} = this.props
        const postsList = posts.list
        return (
            <StreamView postsList={postsList}/>
        )
      case "Info":
        const {exchanges, exchangeId, users} = this.props
        const currentExchange = exchanges.list[exchangeId]
        // const currentExchange = exchanges.list[exchangeId].exchange.content
        if (currentExchange.owner) {
          const owner = users.list[currentExchange.owner.identity_user]
          if (owner)
            return (
                <InfoView currentExchange={currentExchange} owner={owner}/>
            )
          else return null
        }
        else return null
      case "Members":
        return (
            <div style={{textAlign: "center", marginTop: "10px"}}>
              In Develop
            </div>
        )
      default:
        return (
            <div style={{textAlign: "center", marginTop: "10px"}}>
              Undefined Data Type
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  posts: state.common.post,
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