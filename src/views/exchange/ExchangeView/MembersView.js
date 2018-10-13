import React, {Component} from "react"
import {bindActionCreators} from "redux"
import getUserAction from "src/redux/actions/user/getUserActions"
import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
import connect from "react-redux/es/connect/connect"
import Contacts from "../../../images/common/contacts_svg"
import {VerifyWrapper} from "../../common/cards/Frames"
import {ClipLoader} from "react-spinners"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"

class MembersView extends Component {
  constructor(props) {
    super(props)
    this.changeViewType = this.changeViewType.bind(this)
    this.getMembers = this.getMembers.bind(this)
    this.setAllMembers = this.setAllMembers.bind(this)
    this.state = {initialMembers: [], viewType: "member-square", moreMembers: false}
  }

  changeViewType() {
    if (this.state.viewType === "member-square") {
      this.setState({...this.state, viewType: "member-row"})
    } else this.setState({...this.state, viewType: "member-square"})
  }

  getMembers(memberId, memberType, index) {
    let {profiles} = this.props
    if (memberType === "USER")
      if (profiles[memberId].profile.content.profile_user) {
        console.log(profiles[memberId].profile.content)
        return <div key={index}
                    className={this.state.viewType}>
          <div className={"member-follow"}><span className={"member-follow-plus"}> + </span></div>
          <div className={"member-picture-container"}>
            {profiles[memberId].profile.content.profile_media !== null ? <img alt={"تصویر پروفایل"}
                                                                              src={profiles[memberId].profile.content.profile_media.file}
                                                                              width={"55px"} height={"55px"}
                                                                              className={"member-picture"}/>
                : <DefaultUserIcon
                    height={"55px"} width={"55px"} className={"member-picture"}/>}
          </div>
          <div className={"member-info-container"}>
            <div className={"member-name"}>{
              profiles[memberId].profile.content.profile_user.first_name ||
              profiles[memberId].profile.content.profile_user.last_name ?
                  profiles[memberId].profile.content.profile_user.first_name + " " + profiles[memberId].profile.content.profile_user.last_name :
                  profiles[memberId].profile.content.profile_user.username
            }</div>
            <div className={"member-description"}>{
              profiles[memberId].profile.content.description
            }</div>
          </div>
        </div>
      }
      else return <div className={"member-loading"}>
        <ClipLoader color={"#cbcbcb"} size={90}/></div>
  }

  setAllMembers() {
    let {exchangeUsers, exchangeId, actions} = this.props
    let {getUser} = actions
    let temp = []
    if (exchangeUsers) {
      if (exchangeUsers[exchangeId]) {
        for (let i = 0; i < exchangeUsers[exchangeId].length; i++) {
          if (exchangeUsers[exchangeId][i]) {
            if (exchangeUsers[exchangeId][i].type === "USER") {
              getUser(parseInt(exchangeUsers[exchangeId][i].id, 10))
            } else {
              // Get organization profile
            }
            temp.push(exchangeUsers[exchangeId][i])
          }
        }
        this.setState({...this.state, initialMembers: temp.slice(), moreMembers: true})
      }
    }
  }

  componentDidMount() {
    let {exchangeUsers, exchangeId, actions} = this.props
    let {getUser} = actions
    if (exchangeUsers) {
      if (exchangeUsers[exchangeId]) {
        for (let i = 0; i < 6; i++) {
          let temp = this.state.initialMembers
          if (exchangeUsers[exchangeId][i]) {
            if (exchangeUsers[exchangeId][i].type === "USER") {
              getUser(parseInt(exchangeUsers[exchangeId][i].id, 10))
            } else {
              // Get organization profile
            }
            temp.push(exchangeUsers[exchangeId][i])
            this.setState({...this.state, initialMembers: temp})
          }
        }
      }
    }
  }

  componentDidUpdate() {
    if (this.state.initialMembers.length < 1) {
      let {exchangeUsers, exchangeId, actions} = this.props
      let {getUser} = actions
      if (exchangeUsers) {
        if (exchangeUsers[exchangeId]) {
          for (let i = 0; i < 6; i++) {
            let temp = this.state.initialMembers
            if (exchangeUsers[exchangeId][i]) {
              if (exchangeUsers[exchangeId][i].type === "USER") {
                getUser(parseInt(exchangeUsers[exchangeId][i].id, 10))
              } else {
                // Get organization profile
              }
              temp.push(exchangeUsers[exchangeId][i])
              this.setState({...this.state, initialMembers: temp})
            }
          }
        }
      }
    }
  }

  render() {
    let {initialMembers, moreMembers} = this.state
    return (
        <div className={"members-frame"}>
          <div className={"members-header-right"}>
            <Contacts width="22px" height="22px" containerClass={"svg-container-info-view"} svgClass={"svg-info-view"}/>
            <span>اعضا</span>
          </div>
          <div className={"members-header-left"} onClick={this.changeViewType}>
            SWITCH
          </div>
          <div className={"members-body"}>
            {initialMembers.length > 0 ? initialMembers.map((p, index) => {
              return this.getMembers(p.id, p.type, index)
            }) : <VerifyWrapper isLoading={true} error={false}/>}
            {!moreMembers ? <div className={"members-more"} onClick={this.setAllMembers}>
              بارگذاری بیشتر
            </div> : <div></div>}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exchangeUsers: state.common.exchangeMembership.members,
    profiles: state.users.list,
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getExchangeMembers: exchangeMembershipActions.getExchangeMembershipByExchangeId,
    getUser: getUserAction.getProfileByUserId,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(MembersView)