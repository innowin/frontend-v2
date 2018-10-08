// @flow
import * as React from 'react'
import {Component} from 'react'
import Users from './Users'
import Sidebar from './SideBar'
import TopBar from '../../bars/TopBar'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import exchangeActions from 'src/redux/actions/exchangeActions'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import {getExchanges} from 'src/redux/selectors/common/exchanges/GetAllExchanges.js'
import {ClipLoader} from "react-spinners"


const data = {
  1: {
    "username": "Hamed",
    "first_name": "حامد",
    "last_name": "رومی",
    "profile_photo": "http://restful.daneshboom.ir/media/2fe29b711caf405cbc2344cad5661bd3.jpeg",
    "banner": "https://marketplace.canva.com/MACq6BvCni8/1/0/thumbnail_large/canva-red-basic-stationery-etsy-banner-MACq6BvCni8.jpg",
    "description": "طاقت فرسودگی ام هیچ نیست در پی ویران شدنی آنی ام/ دانشجوی دکترای آینده پژوهی، دانشکده مدیریت معروف! زیر پل فلان",
    "is_following": true,
  },
  2: {
    "username": "Saber",
    "first_name": "صابر",
    "last_name": "منادی",
    "profile_photo": null,
    "banner": "https://marketplace.canva.com/MACq6BvCni8/1/0/thumbnail_large/canva-red-basic-stationery-etsy-banner-MACq6BvCni8.jpg",
    "description": "طاقت فرسودگی ام هیچ نیست در پی ویران شدنی آنی ام/ دانشجوی دکترای آینده پژوهی، دانشکده مدیریت معروف! زیر پل فلان",
    "is_following": false,
  }
}


type appProps =
    {|
      actions: any,
      currentUserIdentity: number,
      currentUserType: string,
      currentUserId: number,
      allExchanges: Array<any>
    |}

type appState =
    {|
      offset: number,
      activeScrollHeight: number,
      scrollLoading: boolean
    |}

class Explore extends Component <appProps, appState> {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      activeScrollHeight: 0,
      scrollLoading: false
    }
  }

  componentDidMount() {
    // this.props.actions.getAllExchanges(24, this.state.offset)
    this.props.actions.getFollowees({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId
    })
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    let {activeScrollHeight} = this.state
    let scrollHeight = document.body.scrollHeight
    if (((window.innerHeight + window.scrollY) >= (scrollHeight - 500)) && (scrollHeight > activeScrollHeight)) {
      // this.setState({
      //       ...this.state,
      //       activeScrollHeight: scrollHeight,
      //       scrollLoading: true,
      //       offset: this.state.offset + 24
      //     },
      // () => this.props.actions.getAllExchanges(24, this.state.offset))
    }
  }

  render() {
    return (
        <div>
          <TopBar collapseClassName="col user-sidebar-width"/>
          <div style={{paddingTop: '55px'}}>
            <Sidebar/>
            {/*TODO Hoseyn change the data*/}
            <Users users={data}/>
            {/*{this.state.scrollLoading && <ClipLoader/>}*/}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  //TODO Hoseyn change to get all users
  // allExchanges: getExchanges(state),
  currentUserType: state.auth.client.user_type,
  currentUserIdentity: state.auth.client.identity.content,
  currentUserId: state.auth.client.user.id,
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getAllExchanges: exchangeActions.getAllExchanges,
    getFollowees: socialActions.getFollowees
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)
