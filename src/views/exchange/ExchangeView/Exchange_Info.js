import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import postActions from "src/redux/actions/commonActions/postActions"
import exchangeActions from "../../../redux/actions/exchangeActions"
import StreamView from "./StreamView"
import InfoView from "./InfoView"


class Exchange_Info extends Component {

  componentDidMount() {
    const {actions, exchangeId} = this.props
    actions.getPosts({postParentId: this.props.exchangeId, limit: 5, offset: 0})
    actions.getExchangeById(exchangeId)
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
        const {exchange, exchangeId} = this.props
        const currentExchange = exchange.list[exchangeId]
          console.log(currentExchange)
        return (
            <InfoView currentExchange={currentExchange}/>
        )
      default:
        return (
            <div style={{textAlign: "center"}}>
              Undefined Data Type
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  posts: state.common.post,
  exchange: state.exchanges
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPosts: postActions.filterPostsByPostParentLimitOffset,
    getExchangeById: exchangeActions.getExchangeByExId
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Exchange_Info)