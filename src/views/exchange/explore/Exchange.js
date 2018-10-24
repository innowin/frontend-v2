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
import exchangeMembership from 'src/redux/actions/commonActions/exchangeMembershipActions'
import {ClipLoader} from "react-spinners"

type appProps =
    {|
      actions: any,
      members: Array<number>,
      data: any
    |}

type appState =
    {|
      followLoading: boolean
    |}

class Exchange extends Component <appProps, appState> {
  constructor(props) {
    super(props)
    this.state =
        {
          followLoading: false,
          // imageLoaded: false
        }
  }

  // componentDidMount()
  // {
  //     if (this.props.data.exchange_image)
  //     {
  //         let profileImg = new Image()
  //         profileImg.src = 'http://restful.daneshboom.ir/' + this.props.data.exchange_image.file
  //         profileImg.onload = () =>
  //         {
  //             this.setState({...this.state, imageLoaded: true})
  //         }
  //     }
  // this.props.actions.getMembers({exchangeId: this.props.data.id})
  // console.log(this.props.members[this.props.data.id])
  // }

  renderFollowButton() {

    if (this.props.data.exchange === undefined && this.state.followLoading) {
      return <div className='exchange-model-following'><ClipLoader color='#008057' size={19}/></div>
    }
    else if (this.props.data.exchange === undefined) {
      return <button className='exchange-followed' onClick={this.follow}>دنبال کردن</button>
    }
    else return <button className='exchange-follow'>دنبال شده</button>

  }

  follow = () => {
    this.setState({...this.state, followLoading: true})
    this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.data.id})
  }

  render() {
    const {data} = this.props
    // const images = data.followers.map(img =>
    //     <img src={img.image} key={data.followers.indexOf(img)} className='exchange-model-followers-avatar'/>
    // )
    return (
        <div className='exchange-model'>
          <Link to={`/exchange/${data.id}`} style={{textDecoration: 'none', color: 'black'}}>
            {(data.exchange_image) ?
                  <img src={data.exchange_image.file.includes('restful.daneshboom.ir/') ? data.exchange_image.file : 'http://restful.daneshboom.ir/' + data.exchange_image.file} alt={data.name}
                       className='exchange-model-avatar'/>
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
            {/*<div className='exchange-model-followers-count'>{data.members_count}</div>*/}

            <div className='exchange-model-detail'>
              <Demand width='30px' className='exchange-model-detail-demand-logo'/>
              <div className='exchange-model-detail-demand-title'>تقاضا</div>
              <span> </span>
              <div className='exchange-model-detail-demand-title'>{data.demand}</div>
            </div>
            <div className='exchange-model-detail'>
              <Distribute width='20px' className='exchange-model-detail-dist-logo'/>
              <div className='exchange-model-detail-dist-title'>عرضه</div>
              <span> </span>
              <div className='exchange-model-detail-dist-title'>{data.supply}</div>
            </div>
            <hr/>

            <div className='exchange-baj-container'>
              <DefaultUserIcon className='exchange-baj'/>
              <DefaultUserIcon className='exchange-baj'/>
              <DefaultUserIcon className='exchange-baj'/>
            </div>

          </Link>

          {
            this.renderFollowButton()
          }


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
    // exchangeMembership: exchangeMembership.getExchangeMembershipByMemberIdentity
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
