import React, {Component} from 'react'
import {REST_URL} from 'src/consts/URLS'
import {ChannelIcon} from 'src/images/icons'
import Material from './Material'
import {ClipLoader} from 'react-spinners'
import exchangeActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class ExchangeSuggestView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followLoading: false,
    }
    this.follow = this.follow.bind(this)
    this.unFollow = this.unFollow.bind(this)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.data.id !== nextProps.data.id) {
      this.setState({...this.state, followLoading: false})
    }
  }

  follow() {
    this.setState({...this.state, followLoading: true}, () =>
        this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.data.id}),
    )
  }

  unFollow() {
    this.setState({...this.state, followLoading: true}, () =>
        this.props.actions.unFollow({
          exchangeMembershipId: this.props.followed[this.props.data.id],
          exchangeMembershipOwnerId: this.props.currentUserIdentity,
        }),
    )
  }

  _renderFollowButton() {
    if (this.state.followLoading) {
      return <div className='exchange-model-suggest-following'><ClipLoader color='#008057' size={18}/></div>
    }
    else {
      return <Material className='exchange-suggest-followed' content='دنبال‌کردن' onClick={this.follow}/>
    }
  }

  render() {
    const {data} = this.props
    return (
        <div className='exchange-suggest-cont'>
          <div className='exchange-model-avatar-suggest'>
            {
              data.exchange_image ?
                  <img src={data.exchange_image.file.includes('innowin.ir') ? data.exchange_image.file : REST_URL + data.exchange_image.file} alt={data.name} className='exchange-model-avatar-img'/>
                  :
                  <ChannelIcon className='exchange-model-avatar-default'/>
            }
          </div>
          <div className='exchange-model-suggest'>
            {data.name}
          </div>
          <div>{this._renderFollowButton()}</div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUserIdentity: state.auth.client.identity.content,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    follow: exchangeActions.createExchangeMembership,
    unFollow: exchangeActions.deleteExchangeMembership,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(ExchangeSuggestView)