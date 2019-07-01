// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ExchangeMembershipActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import type {exchangeType} from 'src/consts/flowTypes/exchange/exchange'
import {bindActionCreators} from 'redux'
import {Exchanges} from './Exchanges'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {getExchangeMembershipsSelector} from 'src/redux/selectors/common/social/getExchangeMemberships'
import type {paramType} from 'src/consts/flowTypes/paramType'
import {PureComponent} from 'react'

type PropsSocials = {
  ownerId: number,
  actions: {
    deleteExchangeMembership: Function,
    getExchangeMembershipByMemberIdentity: Function,
  },
  translate: { [string]: string },
  exchanges: (exchangeType)[],
  isLoading: boolean,
  identityType: string,
  param: paramType,
}
type StateSocials = {
  editExchanges: boolean,
  editFollowings: boolean,
}

class Socials extends PureComponent<PropsSocials, StateSocials> {
  static propTypes = {
    ownerId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    followees: PropTypes.array,
    followers: PropTypes.array,
    exchanges: PropTypes.array.isRequired,
    identityType: PropTypes.string.isRequired,
    param: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      editExchanges: false,
    }
  }

  _showExchangesEdit = () => {
    const {editExchanges} = this.state
    this.setState({...this.state, editExchanges: !editExchanges})
  }

  componentDidMount() {
    const {actions, ownerId} = this.props
    const {getExchangeMembershipByMemberIdentity} = actions
    getExchangeMembershipByMemberIdentity({identityId: ownerId, exchangeMembershipOwnerId: ownerId})
  }

  render() {
    const {translate, actions, exchanges} = this.props
    const {deleteExchangeMembership} = actions
    const {editExchanges} = this.state

    return (
        <div>
          <div className="frameCardSocial">
            <Exchanges removeMembership={deleteExchangeMembership}
                       exchanges={exchanges}
                       showEdit={this._showExchangesEdit}
                       edit={editExchanges}
                       translate={translate}
            />
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {ownerId} = ownProps
  const stateOwner = state.identities.list[ownerId]
  const defaultObject = {content: [], isLoading: false, error: null}
  const followObject = (stateOwner && stateOwner.social && stateOwner.social.follows) || defaultObject
  return {
    translate: getMessages(state),
    param: state.param,
    exchanges: getExchangeMembershipsSelector(state, ownProps),
    isLoading: followObject.isLoading,
    error: followObject.error,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
    deleteExchangeMembership: ExchangeMembershipActions.deleteExchangeMembership,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Socials)