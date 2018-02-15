/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
// import {createSocial, deleteSocial, updateSocial} from 'src/crud/user/Socials'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {SocialCreateForm} from "./forms"
import {SocialEditForm} from './forms'
import {ExchangeItemWrapper, ExchangesView, FollowersView, FollowingsView} from "./view"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"

// class Exchange extends Component {
//   constructor(props){
//     super(props);
//     this.state = { }
//   }

//   render(){
//     const {exchange} = this.props;
//     return(
//       <ExchangeView
//         exchange = {exchange}
//       />
//     );
//   }
// }

class Socials extends Component {

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null,followers:[], followings:[], exchanges:[], followers: [], user: {}};
  }

  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {userId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);

      //Socials
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/exchanges/?owner=${userId}`,
          result: `userExchnages-Socials-get/${userId}`,
          token: TOKEN
        }
      );

      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `user-Socials-get/${userId}`,
          token: TOKEN
        }
      );
    };

    emitting();
    socket.on(`userExchnages-Socials-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, exchanges: res, isLoading: false};
        this.setState(newState);
      }
    })
    socket.on(`user-Socials-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    })

  }

  componentWillUnmount() {
    const {userId} = this.props;

    socket.off(`userExchnages-Socials-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, exchanges: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.off(`user-Socials-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

  }



  render() {
    const {createForm, exchanges, user, profile, isLoading, error} = this.state;
    let followings =[
      {
        id:1,
        name:'احمد رضایی',
        status:'آماده'
      },
      {
        id:2,
        name:'امیر کاشی',
        status:'بریم تا برسیم'
      }
    ]

    let followers =[
      {
        id:1,
        name:'احمد رضایی',
        status:'آماده'
      },
      {
        id:2,
        name:'امیر کاشی',
        status:'بریم تا برسیم'
      }
    ]
    
    return (
      <VerifyWrapper isLoading={false} error={false}>
        <CategoryTitle
          title={__('Socials')}
        />
        <FrameCard className="-frameCardSocial">
          <ExchangesView exchanges = {exchanges} user={user}/>
        </FrameCard>
        <FrameCard className="-frameCardSocial">
          <FollowersView followers = {followers} user={user}/>
        </FrameCard>
        <FrameCard className="-frameCardSocial">
          <FollowingsView followings = {followings} user={user}/>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Socials;