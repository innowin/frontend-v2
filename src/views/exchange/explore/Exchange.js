import React from 'react'
import Demand from 'src/images/common/demand_svg'
import Distribute from 'src/images/common/supply_svg'
import exchangeActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import Material from '../../common/components/Material'
import {bindActionCreators} from 'redux'
import {ChannelIcon} from '../../../images/icons'
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
    this._follow = this._follow.bind(this)
  }

  _follow() {
    this.setState({...this.state, followLoading: true})
    this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.data.id})
  }

  _renderFollowButton() {
    if (this.props.followed.indexOf(this.props.data.id) < 0 && this.state.followLoading) {
      return <div className='exchange-model-following'><ClipLoader color='#008057' size={19}/></div>
    }
    else if (this.props.followed.indexOf(this.props.data.id) < 0) {
      return <Material className='exchange-followed' content={this.props.translate['Follow']} onClick={this._follow}/>
    }
    else return <Material className='exchange-follow' content={this.props.translate['Followed']}/>
  }

  render() {
    const {data, translate} = this.props
    return (
        <div className='exchange-model'>
          <div style={{position: 'absolute', zIndex: '2', width: '90%'}}>
            <Link to={`/exchange/${data.id}`} style={{textDecoration: 'none', color: 'black'}}>
              <div className='exchange-model-avatar'>
                {
                  data.exchange_image ?
                      <img src={data.exchange_image.file.includes('innowin.ir') ?
                          data.exchange_image.file : REST_URL + data.exchange_image.file} alt={data.name}
                           className='exchange-model-avatar-img'/>
                      :
                      <ChannelIcon className='exchange-model-avatar-default'/>
                }
              </div>
              <div className='exchange-model-title'>
                {data.name}
              </div>
              <div className='exchange-model-description'>
                {data.description}
              </div>

              <div className='exchange-model-detail'>
                <Demand width='30px' height='28px' className='exchange-model-detail-demand-logo'/>
                <div className='exchange-model-detail-demand-title'>{translate['Type demand']}</div>
                <span> </span>
                <div className='exchange-model-detail-demand-title'>{data.demand_count}</div>
              </div>
              <div className='exchange-model-detail'>
                <Distribute width='20px' height='20px' className='exchange-model-detail-dist-logo'/>
                <div className='exchange-model-detail-dist-title'>{translate['Type supply']}</div>
                <span> </span>
                <div className='exchange-model-detail-dist-title'>{data.supply_count}</div>
              </div>

            </Link>
            <div className='exchange-follow-green-buttons'>
              <Link to={`/exchange/${data.id}`} style={{textDecoration: 'none'}}>
                <Material className='exchange-follow' content='مشاهده'/>
              </Link>
              {
                this._renderFollowButton()
              }
            </div>

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
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
