// @flow
import * as React from 'react'
import checkOwner from '../../common/CheckOwner'
import educationActions from 'src/redux/actions/user/educationActions'
import ExchangeInfo from './Exchange_Info'
import exchangeMembershipActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import getUserActions from 'src/redux/actions/user/getUserActions'
import Material from 'src/views/common/components/Material'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {Component} from 'react'
import {connect} from 'react-redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getAllOfExchanges} from '../../../redux/selectors/common/exchanges/GetAllExchanges'
import {getClientIdentity} from '../../../redux/selectors/common/client/getClient'

// import { Stream, Info, Statistic, Contacts, Medal, Ticket } from 'src/images/icons'
// import { NavLink } from 'react-router-dom'
// import educationActions from "src/redux/actions/user/educationActions"
// import {VerifyWrapper} from "../../common/cards/Frames"
// import postActions from "src/redux/actions/commonActions/postActions"
// import exchangeActions from "src/redux/actions/exchangeActions"

type states = {
  selectedTab: string,
  clickedSvgStyle: string,
  clickedSvgContainerStyle: string,
  normalSvgStyle: string,
  normalSvgContainerStyle: string,
  ownerId: ?number,
}
type props = {
  translate: { [string]: string },
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
      selectedTab: 'Stream',
      // selectedTab: "Info", // Develop
      clickedSvgStyle: 'svg-tabs-clicked',
      clickedSvgContainerStyle: 'svg-container-clicked',
      normalSvgStyle: 'svg-tabs',
      normalSvgContainerStyle: 'svg-container',
      ownerId: null,
    }
    const self: any = this
    self._setTab = self._setTab.bind(self)
  }

  componentDidMount() {
    let {actions, exchangeId, clientIdentityId, clientId, exchanges} = this.props

    if (exchangeId) {
      let {getExchangeMembers, getFollowingAction, getEducationsByUserId} = actions
      getFollowingAction({followOwnerIdentity: clientIdentityId, followOwnerId: clientId, notProfile: true})
      getExchangeMembers({exchangeId})
      getEducationsByUserId({
        userId: exchanges[exchangeId] && exchanges[exchangeId].owner ? exchanges[exchangeId].owner.id : null,
      })
    }
    this.setState({
      ...this.state, ownerId: // Exchange owner for management tab authentication
          exchanges[exchangeId] && exchanges[exchangeId].owner ?
              exchanges[exchangeId].owner.id : null,
    })

  }

  _setTab(data) {
    this.setState({...this.state, selectedTab: data})
  }

  render() {
    const {translate, exchangeId, exchanges} = this.props
    const {ownerId} = this.state
    const {
      selectedTab,
    } = this.state
    return (
        <div className='exchange-navbar-container'>

          <div className='header-container-exchange'>

            <div className={selectedTab === 'Stream' ? 'header-container-item-active' : 'header-container-item'}
                 onClick={() => this._setTab('Stream')}>
              <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-ex-first' content={translate['Stream']}/>
            </div>

            <div className={selectedTab === 'Info' ? 'header-container-item-active' : 'header-container-item'} onClick={() => this._setTab('Info')}>
              <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-ex' content={translate['Info']}/>
            </div>

            {/*<div className={selectedTab === "Statistic" ? "header-container-item-active" : "header-container-item"}*/}
            {/*onClick={() => this._setTab("Statistic")}>*/}
            {/*<Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-ex' content={translate["Statistic"]}/>*/}
            {/*</div>*/}

            <div className={selectedTab === 'Members' ? 'header-container-item-active' : 'header-container-item'}
                 onClick={() => this._setTab('Members')}>
              <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-ex' content={translate['Members']}/>
            </div>

            {/*<div className={selectedTab === 'Medals' ? 'header-container-item' : 'header-container-item-active'} onClick={() => this._setTab('Medals')}>*/}
            {/*<Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-ex' content={translate[selectedTab]}/>*/}
            {/*</div>*/}

            {
              checkOwner({
                id: ownerId, children:
                    <div className={selectedTab === 'Exchange Manager' ? 'header-container-item-active' : 'header-container-item'}
                         onClick={() => this._setTab('Exchange Manager')}>
                      <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-ex'
                                content={translate['Exchange Manager']}/>
                    </div>,
              })
            }

          </div>

          {/*<div className={`exchange-navbar-center`}>*/}
          {/*<Stream width="22px" height="22px"*/}
          {/*containerClass={selectedTab === 'Stream' ? clickedSvgContainerStyle : normalSvgContainerStyle}*/}
          {/*svgClass={selectedTab === 'Stream' ? clickedSvgStyle : normalSvgStyle}*/}
          {/*changeView={(data) => this._setTab(data)}/>*/}
          {/*<Info width="22px" height="22px"*/}
          {/*containerClass={selectedTab === 'Info' ? clickedSvgContainerStyle : normalSvgContainerStyle}*/}
          {/*svgClass={selectedTab === 'Info' ? clickedSvgStyle : normalSvgStyle}*/}
          {/*changeView={(data) => this._setTab(data)}/>*/}
          {/*<Statistic width="22px" height="22px"*/}
          {/*containerClass={selectedTab === 'Statistic' ? clickedSvgContainerStyle : normalSvgContainerStyle}*/}
          {/*svgClass={selectedTab === 'Statistic' ? clickedSvgStyle : normalSvgStyle}*/}
          {/*changeView={(data) => this._setTab(data)}/>*/}
          {/*<Contacts width="22px" height="22px"*/}
          {/*containerClass={selectedTab === 'Members' ? clickedSvgContainerStyle : normalSvgContainerStyle}*/}
          {/*svgClass={selectedTab === 'Members' ? clickedSvgStyle : normalSvgStyle}*/}
          {/*changeView={(data) => this._setTab(data)}/>*/}

          {/*<Medal width="22px" height="23px"
           containerClass={selectedTab === "Medals" ? clickedSvgContainerStyle : normalSvgContainerStyle}
           svgClass={selectedTab === "Medals" ? clickedSvgStyle : normalSvgStyle}
           changeView={(data) => this._setTab(data)}/>*/}

          {/*{*/}
          {/*checkOwner({*/}
          {/*id: ownerId, children:*/}
          {/*<Ticket width="22px" height="22px"*/}
          {/*containerClass={selectedTab === 'Exchange Manager' ? clickedSvgContainerStyle : normalSvgContainerStyle}*/}
          {/*svgClass={selectedTab === 'Exchange Manager' ? clickedSvgStyle : normalSvgStyle}*/}
          {/*changeView={(data) => this._setTab(data)}/>*/}
          {/*})*/}
          {/*}*/}
          {/*</div>*/}


          {/*<div className={`under-exchange-navbar-center`}>{translate[selectedTab]}</div>*/}
          {/*<div className={`line-under-exchange-navbar-center`}/>*/}

          <ExchangeInfo activeTab={selectedTab} currentExchange={exchanges[exchangeId]} exchangeId={exchangeId}/>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getMessages(state),
    exchanges: getAllOfExchanges(state),
    clientIdentityId: getClientIdentity(state),
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
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Exchange_Tabs)