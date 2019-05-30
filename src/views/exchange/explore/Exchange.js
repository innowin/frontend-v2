import React from 'react'
import Demand from 'src/images/common/demand_svg'
import Distribute from 'src/images/common/supply_svg'
import exchangeActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import Material from '../../common/components/Material'
import {bindActionCreators} from 'redux'
import {ChannelIcon} from 'src/images/icons'
import {ClipLoader} from 'react-spinners'
import {Component} from 'react'
import {connect} from 'react-redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Link} from 'react-router-dom'
import {REST_URL} from 'src/consts/URLS'


class Exchange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followLoading: false,
    }
    this.follow = this.follow.bind(this)
    this.unFollow = this.unFollow.bind(this)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.followed[this.props.data.id] !== nextProps.followed[nextProps.data.id]) {
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
    if (this.props.followed[this.props.data.id])
      return <div className='exchange-followed-small'><Material className='exchange-follow' content=' ' onClick={this.unFollow}/></div>
    else if (this.state.followLoading) {
      return <div className='exchange-model-following'><ClipLoader color='#008057' size={19}/></div>
    }
    else {
      return <Material className='exchange-followed' content={this.props.translate['Follow']} onClick={this.follow}/>
    }
  }

  render() {
    const {data, translate} = this.props

    return (
        <div className='exchange-model'>

          <Link to={`/exchange/${data.id}`} className='link-post-decoration'>
            <div className='exchange-model-avatar'>
              {
                data.exchange_image ?
                    <img src={data.exchange_image.file.includes('innowin.ir') ? data.exchange_image.file : REST_URL + data.exchange_image.file} alt={data.name} className='exchange-model-avatar-img'/>
                    :
                    <ChannelIcon className='exchange-model-avatar-default'/>
              }
            </div>
            <div className='exchange-model-title'>
              {data.name}
            </div>
            <div className={data.description ? 'exchange-model-description' : 'exchange-model-description-nullable'}>
              {data.description}
            </div>

            <div className='exchange-model-detail'>
              <Demand width='30px' height='28px' className='exchange-model-detail-demand-logo'/>
              <div className='exchange-model-detail-demand-title'>{translate['Type demand']}</div>
              <span> </span>
              <div className='exchange-model-detail-demand-title'>{data.demand_count}</div>
            </div>
            <div className='exchange-model-detail'>
              <Distribute width='24px' height='24px' className='exchange-model-detail-dist-logo'/>
              <div className='exchange-model-detail-dist-title'>{translate['Type supply']}</div>
              <span> </span>
              <div className='exchange-model-detail-dist-title'>{data.supply_count}</div>
            </div>
          </Link>

          <div className='exchange-follow-green-buttons'>
            <Link to={`/exchange/${data.id}`} className='link-post-decoration-delete-on-small'>
              <Material className='exchange-link' content='مشاهده'/>
            </Link>
            {
              this._renderFollowButton()
            }
          </div>

        </div>
    )
  }
}


const mapStateToProps = (state) => ({
  currentUserIdentity: state.auth.client.identity.content,
  translate: getMessages(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    follow: exchangeActions.createExchangeMembership,
    unFollow: exchangeActions.deleteExchangeMembership,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
