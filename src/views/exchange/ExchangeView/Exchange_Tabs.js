import React, {Component} from "react"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {Stream, Info, Statistic, Contacts, Medal, Ticket,} from "src/images/icons"
import Exchange_Info from "./Exchange_Info"
import "src/styles/components/exchange/posts.scss"
import "src/styles/components/exchange/info.scss"
import "src/styles/components/exchange/members.scss"
import "src/styles/components/exchange/manager.scss"
import {bindActionCreators} from "redux"
import postActions from "src/redux/actions/commonActions/postActions"
import exchangeActions from "src/redux/actions/exchangeActions"
import getUserActions from "src/redux/actions/user/getUserActions"
import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
import educationActions from "src/redux/actions/user/educationActions"
import {VerifyWrapper} from "../../common/cards/Frames"
import SocialActions from "../../../redux/actions/commonActions/socialActions"

class Exchange_Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "Stream",
      // selectedTab: "Info", // DEVELOP
      getUserFlag: false,
    }
    this.setTab = this.setTab.bind(this)
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      clickedSvgStyle: "svg-tabs-clicked",
      clickedSvgContainerStyle: "svg-container-clicked",
      normalSvgStyle: "svg-tabs",
      normalSvgContainerStyle: "svg-container"
    })
    let {actions, exchangeId, clientIdentityId, clientId, clientType} = this.props
    if (exchangeId) {
      let {getPostsByExIdLimitOffset, getExchangeById, getExchangeMembers, getFollowingAction} = actions
      getFollowingAction({followOwnerIdentity: clientIdentityId, followOwnerId: clientId, followOwnerType: clientType})
      getPostsByExIdLimitOffset({postParentId: exchangeId, limit: 20, offset: 0})
      // getExchangeById(exchangeId)
      getExchangeMembers({exchangeId: exchangeId})
    }
  }

  componentDidUpdate() {
    if (!this.state.getUserFlag) {
      let {actions, exchangeId, exchanges} = this.props
      if (exchangeId) {
        let {getUser, getEducationsByUserId} = actions
        if (exchanges[exchangeId].owner !== undefined && exchanges[exchangeId].owner.identity_user !== null) {
          getUser(exchanges[exchangeId].owner.identity_user)
          getEducationsByUserId({userId: exchanges[exchangeId].owner.identity_user})
          this.setState({...this.state, getUserFlag: true})
        }
      }
    }
  }

  setTab(data) {
    this.setState({...this.state, selectedTab: data})
  }

  render() {
    const {translate, exchangeId} = this.props
    const {selectedTab, clickedSvgContainerStyle, normalSvgContainerStyle, clickedSvgStyle, normalSvgStyle} = this.state
    if (exchangeId)
      return (
          <div style={{display: 'inline-block', width: '49.1%', verticalAlign: 'top', margin: '0 0.6%'}}>
            {/*<div className={"exchange-center-background"}/>*/}
            <div className={`exchange-navbar-center`}>
              <Stream width="22px" height="22px"
                      containerClass={selectedTab === "Stream" ? clickedSvgContainerStyle : normalSvgContainerStyle}
                      svgClass={selectedTab === "Stream" ? clickedSvgStyle : normalSvgStyle}
                      changeView={(data) => this.setTab(data)}/>
              <Info width="22px" height="22px"
                    containerClass={selectedTab === "Info" ? clickedSvgContainerStyle : normalSvgContainerStyle}
                    svgClass={selectedTab === "Info" ? clickedSvgStyle : normalSvgStyle}
                    changeView={(data) => this.setTab(data)}/>
              <Statistic width="22px" height="22px"
                         containerClass={selectedTab === "Statistic" ? clickedSvgContainerStyle : normalSvgContainerStyle}
                         svgClass={selectedTab === "Statistic" ? clickedSvgStyle : normalSvgStyle}
                         changeView={(data) => this.setTab(data)}/>
              <Contacts width="22px" height="22px"
                        containerClass={selectedTab === "Members" ? clickedSvgContainerStyle : normalSvgContainerStyle}
                        svgClass={selectedTab === "Members" ? clickedSvgStyle : normalSvgStyle}
                        changeView={(data) => this.setTab(data)}/>
              <Medal width="22px" height="23px"
                     containerClass={selectedTab === "Medals" ? clickedSvgContainerStyle : normalSvgContainerStyle}
                     svgClass={selectedTab === "Medals" ? clickedSvgStyle : normalSvgStyle}
                     changeView={(data) => this.setTab(data)}/>
              <Ticket width="22px" height="22px"
                      containerClass={selectedTab === "Exchange Manager" ? clickedSvgContainerStyle : normalSvgContainerStyle}
                      svgClass={selectedTab === "Exchange Manager" ? clickedSvgStyle : normalSvgStyle}
                      changeView={(data) => this.setTab(data)}/>
            </div>
            <div className={`under-exchange-navbar-center`}>{translate[selectedTab]}</div>
            <div className={`line-under-exchange-navbar-center`}/>
            <div className={`exchange-content-view-frame`}>
              <Exchange_Info activeTab={selectedTab} exchangeId={exchangeId}/>
            </div>
          </div>
      )
    else return <VerifyWrapper isLoading={true} error={false}/>
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getMessages(state),
    exchanges: state.exchanges.list,
    clientIdentityId: state.auth.client.identity.content,
    clientType: state.auth.client.user_type,
    clientId: state.auth.client.user.id,
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPostsByExIdLimitOffset: postActions.filterPostsByPostParentLimitOffset,
    getExchangeById: exchangeActions.getExchangeByExId,
    getUser: getUserActions.getProfileByUserId,
    getEducationsByUserId: educationActions.getEducationByUserId,
    getExchangeMembers: exchangeMembershipActions.getExchangeMembershipByExchangeId,
    getFollowingAction: SocialActions.getFollowees,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Exchange_Tabs)