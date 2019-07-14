import React from 'react'
import {PureComponent} from 'react'
import * as PropTypes from 'prop-types'
import ExchangeMembershipActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getExchangeMembershipsSelector} from 'src/redux/selectors/common/social/getExchangeMemberships'
import UserDetailPanel from '../../common/components/UserDetailPanel'
import {ClipLoader} from 'react-spinners'
import SideBarItem from './HomeSideBarItem'

class HomeSideBar extends PureComponent {
  static propTypes = {
    identityId: PropTypes.number.isRequired,
    activeExchangeId: PropTypes.number,
    setExchangeId: PropTypes.func.isRequired,
    classNames: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {activeId: null}
  }

  componentDidMount() {
    const {identityId} = this.props
    const {getExchangeMembershipByMemberIdentity} = this.props.actions
    if (identityId)
      getExchangeMembershipByMemberIdentity({identityId, exchangeMembershipOwnerId: identityId})
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.activeExchangeId && document.body.clientWidth > 480 && nextProps.clientExchanges.length > 0) {
      const {setExchangeId, clientExchanges} = nextProps
      setExchangeId(clientExchanges[0].id)
    }
  }

  _handleClick = (id) => this.props.setExchangeId(id)

  render() {
    const {clientExchanges, classNames, activeExchangeId, loading} = this.props
    return (
        <div className={classNames}>
          <UserDetailPanel/>
          <div className='home-sidebar-cont-title'>
            <div className='home-sidebar-cont-item'>پنجره ها</div>
            <Link to='/exchanges/exchange_Explorer' className='home-sidebar-cont-item-more'>بیشتر</Link>
          </div>
          <div className='home-sidebar-cont'>
            {
              clientExchanges && clientExchanges.length > 0 ?
                  clientExchanges.map((exchange, i) =>
                      <SideBarItem key={i}
                                   exchange={exchange}
                                   handleClick={this._handleClick}
                                   active={exchange.id === activeExchangeId}/>,
                  )
                  :
                  loading !== undefined && loading === true ?
                      <div className='text-center'><ClipLoader/></div>
                      :
                      <p className="mt-3 pr-3"><b>شما عضو هیچ پنجره ای نیستید!</b></p>
            }
          </div>
          <div className='exchanges-last'/>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  clientExchanges: getExchangeMembershipsSelector(state, ownProps),
  loading: ownProps.identityId && state.identities.list[ownProps.identityId] && state.identities.list[ownProps.identityId].exchangeMemberships && state.identities.list[ownProps.identityId].exchangeMemberships.isLoading,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeSideBar)