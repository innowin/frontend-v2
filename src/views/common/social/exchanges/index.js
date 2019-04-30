// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import ExchangeMembershipActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import NewExchanges from './NewExchanges'
import type {exchangeType} from 'src/consts/flowTypes/exchange/exchange'
import {bindActionCreators} from 'redux'
import {getExchangeMembershipsSelector} from 'src/redux/selectors/common/social/getExchangeMemberships'
import {getMessages} from 'src/redux/selectors/translateSelector'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

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

  componentDidMount() {
    const {actions, ownerId} = this.props
    const {getExchangeMembershipByMemberIdentity} = actions
    getExchangeMembershipByMemberIdentity({identityId: ownerId, exchangeMembershipOwnerId: ownerId})
  }

  render() {
    const {actions, exchanges, ownerId, translate} = this.props
    const {deleteExchangeMembership} = actions

    return (
        <NewExchanges translate={translate} userId={ownerId} deleteExchangeMembership={deleteExchangeMembership}
                      exchanges={exchanges}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getMessages(state),
    exchanges: getExchangeMembershipsSelector(state, ownProps),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
    deleteExchangeMembership: ExchangeMembershipActions.deleteExchangeMembership,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)