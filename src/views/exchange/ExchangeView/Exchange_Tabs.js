// @flow
import React, {Component} from "react"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {Stream, Info, Statistic, Contacts, Medal, Ticket,} from "src/images/icons"
import Exchange_Info from "./Exchange_Info"
import {bindActionCreators} from "redux"
// import postActions from "src/redux/actions/commonActions/postActions"
// import exchangeActions from "src/redux/actions/exchangeActions"
import getUserActions from "src/redux/actions/user/getUserActions"
import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
// import educationActions from "src/redux/actions/user/educationActions"
// import {VerifyWrapper} from "../../common/cards/Frames"
import SocialActions from "../../../redux/actions/commonActions/socialActions"
import educationActions from "../../../redux/actions/user/educationActions"

type states={
  selectedTab: string,
  clickedSvgStyle: string,
  clickedSvgContainerStyle: string,
  normalSvgStyle: string,
  normalSvgContainerStyle: string
}
type props={
  translate: {[string]: string},
  exchangeId: number,
  actions: any,
  clientIdentityId: ?number,
  clientId: ?number,
  clientType: string,
  exchanges: Object,
}

class Exchange_Tabs extends Component<props, states> {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "Stream",
      clickedSvgStyle: "svg-tabs-clicked",
      clickedSvgContainerStyle: "svg-container-clicked",
      normalSvgStyle: "svg-tabs",
      normalSvgContainerStyle: "svg-container"

      // selectedTab: "Info", // DEVELOP
      // getUserFlag: false,
    }
    const self: any = this
    self.setTab = self.setTab.bind(self)
  }

  componentDidMount() {
    // this.setState({
    //   ...this.state,
    //   clickedSvgStyle: "svg-tabs-clicked",
    //   clickedSvgContainerStyle: "svg-container-clicked",
    //   normalSvgStyle: "svg-tabs",
    //   normalSvgContainerStyle: "svg-container"
    // })
    let {actions, exchangeId, clientIdentityId, clientId, clientType, exchanges} = this.props
    if (exchangeId) {
      let {getExchangeMembers, getFollowingAction, getUser} = actions
      getFollowingAction({followOwnerIdentity: clientIdentityId, followOwnerId: clientId, followOwnerType: clientType, notProfile: true})
      getExchangeMembers({exchangeId: exchangeId})
      getUser(exchanges[exchangeId].exchange.content.owner ?
          exchanges[exchangeId].exchange.content.owner.identity_user :
          exchanges[exchangeId].exchange.content.exchange ? exchanges[exchangeId].exchange.content.exchange.content.owner.identity_user : null)
      actions.getEducationsByUserId({
        userId: exchanges[exchangeId].exchange.content.owner ?
            exchanges[exchangeId].exchange.content.owner.identity_user :
            exchanges[exchangeId].exchange.content.exchange ? exchanges[exchangeId].exchange.content.exchange.content.owner.identity_user : null
      })
    }
  }

  setTab(data) {
    this.setState({...this.state, selectedTab: data})
  }

  render() {
    const {translate, exchangeId} = this.props
    const {selectedTab, clickedSvgContainerStyle, normalSvgContainerStyle, clickedSvgStyle, normalSvgStyle} = this.state
    return (
        <div className={"exchange-navbar-container"}>
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
    getUser: getUserActions.getProfileByUserId,
    getEducationsByUserId: educationActions.getEducationByUserId,
    getExchangeMembers: exchangeMembershipActions.getExchangeMembershipByExchangeId,
    getFollowingAction: SocialActions.getFollowees,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Exchange_Tabs)