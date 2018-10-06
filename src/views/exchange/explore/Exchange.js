// @flow
import * as React from 'react'
import {Component} from 'react'
import {DefaultUserIcon} from "src/images/icons"
import {bindActionCreators} from 'redux'
import exchangeActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import {connect} from 'react-redux'
import Demand from 'src/images/common/demand_svg'
import Distribute from 'src/images/common/supply_svg'
import {Link} from 'react-router-dom'

type appProps =
    {|
      actions: any,
      members: Array<number>,
      data: any
    |}

type appState =
    {||}

class Exchange extends Component <appProps, appState> {
  // componentDidMount() {
  // this.props.actions.getMembers({exchangeId: this.props.data.id})
  // console.log(this.props.members[this.props.data.id])
  // }

  render() {
    const {data} = this.props
    // const images = data.followers.map(img =>
    //     <img src={img.image} key={data.followers.indexOf(img)} className='exchange-model-followers-avatar'/>
    // )
    return (
        <div className='exchange-model'>
          {data.is_following ? <div className='exchange-model-following'>دنبال شده</div> :
              <button className='exchange-model-follow'>+</button>}
          <Link to={`/exchange/${data.id}`} style={{textDecoration: 'none', color: 'black'}}>
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
              <Demand width='30px' className='exchange-model-detail-demand-logo'/>
              <div className='exchange-model-detail-demand-title'>تقاضا</div>
            </div>
            <div className='exchange-model-detail'>
              <Distribute width='20px' className='exchange-model-detail-dist-logo'/>
              <div className='exchange-model-detail-dist-title'>عرضه</div>
            </div>
          </Link>
        </div>
    )
  }
}

export default Exchange

// const mapStateToProps = (state) => ({
//   members: state.common.exchangeMembership.list,
// })
//
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({
//     getMembers: exchangeActions.getExchangeMembershipByExchangeId
//   }, dispatch)
// })
// export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
