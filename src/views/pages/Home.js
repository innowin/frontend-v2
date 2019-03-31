// @flow
import * as React from 'react'
import BeePanel from '../common/components/BeePanel'
import ChatBar from '../bars/ChatBar'
import EventCard from 'src/views/common/components/EventCard'
import HomePosts from './home/HomePosts'
import HomeSideBar from './home/HomeSideBar'
import PropTypes from 'prop-types'
import setExchangeActions from 'src/redux/actions/user/setSelectedExchangeAction'
import {bindActionCreators} from 'redux'
import {Component} from 'react'
import {connect} from 'react-redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
// import {Helmet} from "react-helmet"

type HomeProps = {|
  identityId?: number,
  identityType?: string,
  translate: { [string]: string },
  actions: { setExchange: Function },
  selectedExchange: number
|}

class Home extends Component<HomeProps, {| activeExchangeId: ?number |}> {

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

  _setExchangeId = (exchangeId: number) => {
    const {activeExchangeId} = this.state
    if (exchangeId !== activeExchangeId) {
      this.setState({...this.state, activeExchangeId: exchangeId}, () => {
        this.props.actions.setExchange(exchangeId)
      })
    }
  }

  _unSetExchangeId = () => {
    this.setState({...this.state, activeExchangeId: undefined})
  }

  render() {
    const {identityId, identityType} = this.props
    const {activeExchangeId} = this.state
    // const title = `${translate["InnoWin"]} - ${translate["Home"]}`
    // const description = `${translate["Home"]}`
    return (
        <div className="home-wrapper global-wrapper">

          {/*TODO:Abel delete modal */}
          {/*<AddingContribution modalIsOpen={true}*/}
          {/*handleModalVisibility={null}/>*/}
          {/*<CreateExchange modalIsOpen={true}*/}
          {/*handleModalVisibility={null}/>*/}

          {/*<TopBar collapseClassName="col-2"/>*/}

          {/*<Helmet>*/}
          {/*<title>{title}</title>*/}
          {/*<meta name="description" content={description}/>*/}

          {/*<meta property="og:title" content={title}/>*/}
          {/*<meta property="og:description" content={description}/>*/}

          {/*<meta property="twitter:title" content={title}/>*/}
          {/*<meta property="twitter:description" content={description}/>*/}
          {/*</Helmet>*/}

          <main className="-main">
            <div className="page-content home-page-content">
              {
                (identityId && identityType) ? (
                    <HomeSideBar setExchangeId={this._setExchangeId}
                                 classNames={activeExchangeId ? 'right-sidebar active-exchange' : 'right-sidebar'}
                                 identityId={identityId}
                                 identityType={identityType}
                                 activeExchangeId={activeExchangeId}
                    />
                ) : null
              }
              <HomePosts unSetExchangeId={this._unSetExchangeId} exchangeId={activeExchangeId} className={activeExchangeId ? 'post-wrapper active-exchange' : 'post-wrapper'}/>
              <div className={activeExchangeId ? 'user-detail-wrapper active-exchange' : 'user-detail-wrapper'}>
                <BeePanel/>
                <EventCard/>
              </div>
            </div>
            <ChatBar className="-left-sidebar-wrapper"/>
          </main>
        </div>
    )
  }
}

const mapStateToProps = state => {
  const client = state.auth.client
  const selectedExchange = client.selectedExchange
  const allIdentities = state.identities.list
  const clientIdentityId = client.identity.content || null
  const clientIdentity = (clientIdentityId && allIdentities[clientIdentityId]) ? allIdentities[clientIdentityId] : {}
  const identityType = clientIdentity ? clientIdentity.identity_type : undefined

  return {
    identityId: clientIdentityId,
    identityType: identityType,
    translate: getMessages(state),
    selectedExchange,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setExchange: setExchangeActions.setSelectedExchange,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)