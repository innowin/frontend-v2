import React, {Component} from "react"
import {bindActionCreators} from "redux"
import getUserAction from "src/redux/actions/user/getUserActions"
import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
import connect from "react-redux/es/connect/connect"
import Contacts from "../../../images/common/contacts_svg"
import {VerifyWrapper} from "../../common/cards/Frames"
import {ClipLoader} from "react-spinners"

class MembersView extends Component {
  constructor(props) {
    super(props)
    this.changeViewType = this.changeViewType.bind(this)
    this.getMembers = this.getMembers.bind(this)
    this.state = {initialMembers: [], viewType: "member-square"}
  }

  changeViewType() {
    if (this.state.viewType === "member-square") {
      this.setState({...this.state, viewType: "member-row"})
    } else this.setState({...this.state, viewType: "member-square"})
  }

  getMembers(memberId, memberType) {
    let {profiles} = this.props
    if (memberType === "USER")
      if (profiles[memberId].profile.content.profile_user)
        return <div className={this.state.viewType}>{profiles[memberId].profile.content.profile_user.username}</div>
      else return <div className={"member-loading"}>
        <ClipLoader color={"#cbcbcb"} size={90}/></div>
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
    let {initialMembers} = this.state
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
            {initialMembers.length > 0 ? initialMembers.map((p) => {
              return this.getMembers(p.id, p.type)
            }) : <VerifyWrapper isLoading={true} error={false}/>}
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