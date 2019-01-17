// @flow
import * as React from "react"
import ChatBar from "../bars/ChatBar"
import constants from "src/consts/constants"
import HomePosts from "./home/HomePosts"
import HomeSideBar from "./home/HomeSideBar"
import PropTypes from "prop-types"
import {Component} from "react"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import BeePanel from "../common/components/BeePanel"
import {bindActionCreators} from 'redux'
import setExchangeActions from 'src/redux/actions/user/setSelectedExchangeAction'
// import {Helmet} from "react-helmet"

type HomeProps = {|
  identityId: number,
  identityType?: string,
  id?: number,
  translate: { [string]: string }
|}

class Home extends Component<HomeProps, {| activeExchangeId: ?number |}> {

  static propTypes = {
    identityId: PropTypes.number.isRequired,
    identityType: PropTypes.string,
    id: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {activeExchangeId: this.props.selectedExchange}
  }

  componentDidMount(): void {
    const {selectedExchange} = this.props
    if (selectedExchange) {
      this.setState({...this.state, activeExchangeId: selectedExchange})
    }
  }

  _setExchangeId = (exchangeId: number) => {
    const {activeExchangeId} = this.state
    if (exchangeId !== activeExchangeId) {
      this.setState({...this.state, activeExchangeId: exchangeId},()=>{
        this.props.actions.setExchange(exchangeId)
      })
    }
  }

  render() {
    // alert('s')
    const {identityId, identityType, id} = this.props
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
            <div className="page-content">
              {
                (id && identityId && identityType) ? (
                    <HomeSideBar setExchangeId={this._setExchangeId}
                                 classNames="col-3 pr-0 pl-0 right-sidebar"
                                 identityId={identityId}
                                 identityType={identityType}
                                 activeExchangeId={activeExchangeId}
                                 id={id}
                    />
                ) : ""
              }
              <HomePosts exchangeId={activeExchangeId} className="col-6 post-wrapper"/>
              <div className="col-3 pl-0 pr-0 user-detail-wrapper">
                <BeePanel/>
              </div>
            </div>
            <ChatBar className="pr-0 pl-0 -left-sidebar-wrapper"/>
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
  const id = clientIdentity.identity_user ? client.user.id : (client.organization ? client.organization.id : undefined)
  const identityType = clientIdentity.identity_user ? constants.USER_TYPES.PERSON :
      (clientIdentity.identity_organization ? constants.USER_TYPES.ORG : undefined)
  return {
    id: id,
    identityId: clientIdentityId,
    identityType: identityType,
    translate: getMessages(state),
    selectedExchange
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setExchange: setExchangeActions.setSelectedExchange
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)