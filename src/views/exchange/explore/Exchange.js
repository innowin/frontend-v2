// @flow
import * as React from "react"
import Demand from "src/images/common/demand_svg"
import Distribute from "src/images/common/supply_svg"
import exchangeActions from "src/redux/actions/commonActions/exchangeMembershipActions"
import Material from "../../common/components/Material"
import {bindActionCreators} from "redux"
import {ChannelIcon} from "../../../images/icons"
import {ClipLoader} from "react-spinners"
import {Component} from "react"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {Link} from "react-router-dom"
import {REST_URL} from "src/consts/URLS"

type appProps =
    {|
      actions: any,
      members: Array<number>,
      data: Object,
      currentUserIdentity: {},
      translate: { [string]: string }
    |}

type appState =
    {|
      followLoading: boolean,
      imageLoaded: boolean,
      followed: Array<number>
    |}

class Exchange extends Component <appProps, appState> {
  constructor(props) {
    super(props)
    this.state =
        {
          followLoading: false,
          imageLoaded: false,
          followed: []
        }
    const self: any = this
    self._follow = this._follow.bind(this)
  }

  componentDidMount() {
    if (this.props.clientExchangeMemberships.length > 0) {
      const {clientExchangeMemberships, exchangeMemberships} = this.props
      let followed = []
      clientExchangeMemberships.forEach((exId, idx) => {
        if (exchangeMemberships[exId]) {
          followed.push(exchangeMemberships[exId].exchange_identity_related_exchange.id)
        }
        if (idx === clientExchangeMemberships.length - 1) {
          this.setState({...this.state, followed: followed.slice()})
        }
      })
    }

    if (this.props.data.exchange_image) {
      let image = new Image()
      image.src = this.props.data.exchange_image.file.includes("innowin.ir") ? this.props.data.exchange_image.file : REST_URL + this.props.data.exchange_image.file
      image.onload = () => {
        this.setState({...this.state, imageLoaded: true})
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.id !== nextProps.data.id) {
      this.setState({...this.state, imageLoaded: false, followLoading: false}, () => {
        if (nextProps.data.exchange_image) {
          let image = new Image()
          image.src = nextProps.data.exchange_image.file.includes("innowin.ir") ? nextProps.data.exchange_image.file : REST_URL + nextProps.data.exchange_image.file
          image.onload = () => {
            this.setState({...this.state, imageLoaded: true})
          }
        }
      })
    }
  }

  _follow() {
    this.setState({...this.state, followLoading: true})
    this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.data.id})
  }

  // renderJoint() {
  //   const {data,currentUserIdentity} = this.props
  //   return data.joint_follows.map(user =>
  //       {
  //         if (user.follow_follower.id !== currentUserIdentity)
  //         {
  //           return <img src={'https://restful.daneshboom.ir/'} className='user-baj' alt='user'/>
  //         }
  //       }
  //   )
  // }

  _renderFollowButton() {
    if (this.state.followed.indexOf(this.props.data.id) < 0 && this.state.followLoading) {
      return <div className='exchange-model-following'><ClipLoader color='#008057' size={19}/></div>
    } else if (this.state.followed.indexOf(this.props.data.id) < 0) {
      return <Material className='exchange-followed' content={this.props.translate["Follow"]} onClick={this._follow}/>
    } else return <Material className='exchange-follow' content={this.props.translate["Followed"]}/>
  }


  render() {
    console.log("FOLLOWED:", this.state.followed)
    const {data, translate} = this.props
    // const images = data.followers.map(img =>
    //     <img src={img.image} key={data.followers.indexOf(img)} className='exchange-model-followers-avatar'/>
    // )
    return (
        <div className='exchange-model'>
          <div style={{position: "absolute", zIndex: "2", width: "90%"}}>
            <Link to={`/exchange/${data.id}`} style={{textDecoration: "none", color: "black"}}>
              <div className='exchange-model-avatar'>
                {
                  (data.exchange_image && this.state.imageLoaded) ?
                      <img src={data.exchange_image.file.includes("innowin.ir") ?
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

              {/*{images}*/}
              {/*<div className='exchange-model-followers-count'>{data.members_count}</div>*/}

              <div className='exchange-model-detail'>
                <Demand width='30px' height='30px' className='exchange-model-detail-demand-logo'/>
                <div className='exchange-model-detail-demand-title'>{translate["Type demand"]}</div>
                <span> </span>
                <div className='exchange-model-detail-demand-title'>{data.demand_count}</div>
              </div>
              <div className='exchange-model-detail'>
                <Distribute width='20px' height='20px' className='exchange-model-detail-dist-logo'/>
                <div className='exchange-model-detail-dist-title'>{translate["Type supply"]}</div>
                <span> </span>
                <div className='exchange-model-detail-dist-title'>{data.supply_count}</div>
              </div>

              {/*{*/}
              {/*this.renderJoint()*/}
              {/*}*/}

            </Link>
            <div className='exchange-follow-green-buttons'>
              <Link to={`/exchange/${data.id}`} style={{textDecoration: "none"}}>
                <Material className='exchange-follow' content='مشاهده'/>
              </Link>
              {
                this._renderFollowButton()
              }
            </div>
            {/*<div className={"exchange-model-detail-filter"}/>*/}
          </div>
          {/*{ // IMAGE BLUR ON BACK*/}
          {/*(data.exchange_image && this.state.imageLoaded) ?*/}
          {/*<img src={data.exchange_image.file.includes("innowin.ir") ?*/}
          {/*data.exchange_image.file : REST_URL + data.exchange_image.file} alt={data.name} className='exchange-model-avatar-back'/> : null*/}
          {/*}*/}
        </div>
    )
  }
}


const mapStateToProps = (state) => ({
  currentUserIdentity: state.auth.client.identity.content,
  translate: getMessages(state),
  clientExchangeMemberships: state.auth.client.exchangeMemberships,
  exchangeMemberships: state.common.exchangeMembership.list
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    follow: exchangeActions.createExchangeMembership
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
