// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'

import ExchangeMembershipActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import NewExchanges from './NewExchanges'
import type {exchangeType} from 'src/consts/flowTypes/exchange/exchange'
import {bindActionCreators} from 'redux'
import {getExchangeMembershipsSelector} from 'src/redux/selectors/common/social/getExchangeMemberships'
import {getMessages} from 'src/redux/selectors/translateSelector'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import exchangeActions from '../../../../redux/actions/commonActions/exchangeMembershipActions'
import {clientMemberships} from '../../../../redux/selectors/common/exchanges/ClientMemberships'
import {exchangeMemberships} from '../../../../redux/selectors/common/exchanges/ExchangeMemberships'

type PropsSocials = {
  ownerId: number,
  actions: {
    getExchangeMembershipByMemberIdentity: Function,
    deleteExchangeMembership: Function,
  },
  translate: TranslatorType,
  exchanges: (exchangeType)[],
}

type StateSocials = {}

class Socials extends React.Component<PropsSocials, StateSocials> {
  static propTypes = {
    ownerId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    exchanges: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      followed: [],
    }
  }


  componentDidMount() {
    const {actions, ownerId, clientId} = this.props
    const {getExchangeMembershipByMemberIdentity} = actions
    getExchangeMembershipByMemberIdentity({identityId: ownerId, exchangeMembershipOwnerId: ownerId})
    getExchangeMembershipByMemberIdentity({identityId: clientId, exchangeMembershipOwnerId: clientId})
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {clientExchangeMemberships, exchangeMemberships} = nextProps
    if (clientExchangeMemberships.length > 0) {
      const followed = clientExchangeMemberships.reduce((sum, exId) =>
          exchangeMemberships[exId] && {...sum, [exchangeMemberships[exId].exchange_identity_related_exchange.id]: exchangeMemberships[exId].id}, {},
      )
      this.setState({...this.state, followed: {...followed}})
    }
    else this.setState({...this.state, followed: []})
  }

  render() {
    const {actions, exchanges, ownerId, translate, clientId} = this.props
    const {followed} = this.state
    const {deleteExchangeMembership, follow} = actions

    return <NewExchanges translate={translate}
                         followed={followed}
                         userId={ownerId}
                         deleteExchangeMembership={deleteExchangeMembership}
                         exchanges={exchanges}
                         clientId={clientId}
                         follow={follow}
    />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getMessages(state),
    exchanges: getExchangeMembershipsSelector(state, ownProps),
    clientExchangeMemberships: clientMemberships(state),
    exchangeMemberships: exchangeMemberships(state),
    clientId: state.auth.client.identity.content,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
    deleteExchangeMembership: ExchangeMembershipActions.deleteExchangeMembership,
    follow: exchangeActions.createExchangeMembership,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)