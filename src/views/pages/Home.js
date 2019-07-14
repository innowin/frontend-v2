import React from 'react'
import constants from 'src/consts/constants'
import HomePosts from './home/HomePosts'
import HomeSideBar from './home/HomeSideBar'
import OrganizationBee from '../common/components/OrganizationBee'
import OrganizationLeadershipCard from '../common/components/OrganizationLeadershipCard'
import * as PropTypes from 'prop-types'
import setExchangeActions from 'src/redux/actions/user/setSelectedExchangeAction'
import SuggestExchanges from '../common/components/SuggestExchanges'
import UserBee from '../common/components/UserBee'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {PureComponent} from 'react'
import FahadEventCard from 'src/views/common/components/Fahad/FahadEventCard'

class Home extends PureComponent {
  static propTypes = {
    identityId: PropTypes.number,
    identityType: PropTypes.string,
    actions: PropTypes.object,
    selectedExchange: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {activeExchangeId: this.props.selectedExchange}
  }

  _setExchangeId = (exchangeId) => {
    const {activeExchangeId} = this.state
    if (exchangeId !== activeExchangeId) {
      this.setState({...this.state, activeExchangeId: exchangeId}, () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
        this.props.actions.setExchange(exchangeId)
      })
    }
  }

  _unSetExchangeId = () => {
    this.setState({...this.state, activeExchangeId: undefined})
    this.props.actions.setExchange(null)
  }

  render() {
    const {identityId, identityType, isBeeDone} = this.props
    const {activeExchangeId} = this.state
    return (
        <div className="home-wrapper global-wrapper">
          <main className="-main">
            <div className="page-content home-page-content">
              <HomeSideBar setExchangeId={this._setExchangeId}
                           classNames={activeExchangeId ? 'right-sidebar active-exchange' : 'right-sidebar'}
                           identityId={identityId}
                           identityType={identityType}
                           activeExchangeId={activeExchangeId}
              />
              <HomePosts unSetExchangeId={this._unSetExchangeId} exchangeId={activeExchangeId} className={activeExchangeId ? 'post-wrapper active-exchange' : 'post-wrapper'}/>
              <div className={activeExchangeId ? 'user-detail-wrapper active-exchange' : 'user-detail-wrapper'}>
                <FahadEventCard/>
                <OrganizationLeadershipCard/>
                {isBeeDone ? null : identityType === constants.USER_TYPES.ORG ? <OrganizationBee/> : <UserBee/>}
                <SuggestExchanges/>
              </div>
            </div>
            {/*<ChatBar className="-left-sidebar-wrapper"/>*/}
          </main>
        </div>
    )
  }
}

const mapStateToProps = state => {
  const client = state.auth.client
  const selectedExchange = client.selectedExchange
  const allIdentities = state.identities.list
  const clientIdentityId = client.identity.content
  const clientIdentity = allIdentities[clientIdentityId]
  const identityType = clientIdentity ? clientIdentity.identity_type : undefined

  return {
    identityId: clientIdentityId,
    identityType: identityType,
    translate: getMessages(state),
    isBeeDone: state.auth.client.isBeeDone,
    selectedExchange,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setExchange: setExchangeActions.setSelectedExchange,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)