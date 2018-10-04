// @flow
import * as React from 'react'
import {Component} from 'react'
import {DefaultUserIcon} from "src/images/icons"
import {bindActionCreators} from 'redux'
import exchangeActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import {connect} from 'react-redux'

class Exchange extends Component {
  componentDidMount() {
    this.props.actions.getMembers({exchangeId: this.props.data.id})
    console.log(this.props.members[this.props.data.id])
  }
  
  render() {
    const {data} = this.props
    // const images = data.followers.map(img =>
    //     <img src={img.image} key={data.followers.indexOf(img)} className='exchange-model-followers-avatar'/>
    // )
    return (
        <div className='exchange-model'>
          {data.is_following ? <div className='exchange-model-following'>دنبال شده</div> : <button className='exchange-model-follow'>+</button>}
          
          {data.exchange_image ?
              <img src={data.exchange_image.file} alt={data.name} className='exchange-model-avatar'/>
              :
              <DefaultUserIcon width='80px' height='80px'/>
          }
          <div className='exchange-model-title'>
            {data.name}
          </div>
          <div className='exchange-model-description'>
            {data.description}
          </div>
          <hr/>
          {/*{images}*/}
          <div className='exchange-model-followers-count'>{data.members_count}</div>
          <hr/>
          <div className='exchange-model-detail'>
            تقاضا {data.demand}
          </div>
          <div className='exchange-model-detail'>
            عرضه {data.contribute}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  members: state.common.exchangeMembership.list,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getMembers: exchangeActions.getExchangeMembershipByExchangeId
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
