import React, {Component} from "react"
import {bindActionCreators} from "redux"
import getUserAction from "src/redux/actions/user/getUserActions"
import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
import organizationActions from "src/redux/actions/organization/organizationActions"
import connect from "react-redux/es/connect/connect"
import Contacts from "../../../images/common/contacts_svg"
import Stream from "src/images/common/stream_svg"
import QuestionMark from "src/images/common/questionMark_svg"
import {VerifyWrapper} from "../../common/cards/Frames"
import {ClipLoader} from "react-spinners"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import {Link} from "react-router-dom"

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
    let {profiles, organs, files} = this.props
    if (memberType === "USER") {
      // if (profiles[memberId].profile.content.profile_user) {
      if (!profiles[memberId].profile.isLoading) {
        return <div key={index}
                    className={this.state.viewType}>
          <div className={"member-follow"}><span className={"member-follow-plus"}> + </span></div>
          <Link to={`/user/${memberId}`}>
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
          </Link>
        </div>
      }
      else return <div className={"member-loading"}>
        <ClipLoader color={"#cbcbcb"} size={90}/></div>
    }
    if (memberType === "ORGANIZATION") {
      if (!organs[memberId].organization.isLoading) {
        // console.log(organs[memberId].organization.content)
        return <div key={index}
                    className={this.state.viewType}>
          <div className={"member-follow"}><span className={"member-follow-plus"}> + </span></div>
          <Link to={`/organization/${memberId}`}>
            <div className={"member-picture-container"}>
              {organs[memberId].organization.content.organization_logo !== null ? <img alt={"تصویر پروفایل"}
                                                                                       src={files[organs[memberId].organization.content.organization_logo] ?
                                                                                           files[organs[memberId].organization.content.organization_logo].file :
                                                                                           null}
                                                                                       width={"55px"} height={"55px"}
                                                                                       className={"member-picture"}/>
                  : <DefaultUserIcon
                      height={"55px"} width={"55px"} className={"member-picture"}/>}
            </div>

            <div className={"member-info-container"}>
              <div className={"member-name"}>{
                organs[memberId].organization.content.official_name !== "" ?
                    organs[memberId].organization.content.official_name :
                    organs[memberId].organization.content.username
              }</div>
              <div className={"member-description"}>{
                organs[memberId].organization.content.biography
              }</div>
            </div>
          </Link>
        </div>
      } else return <div className={"member-loading"}>
        <ClipLoader color={"#cbcbcb"} size={90}/></div>
    }
  }

  setAllMembers() {
    let {exchangeUsers, exchangeId, actions} = this.props
    let {getUser, getOrganization} = actions
    let temp = []
    if (exchangeUsers) {
      if (exchangeUsers[exchangeId]) {
        for (let i = 0; i < exchangeUsers[exchangeId].length; i++) {
          if (exchangeUsers[exchangeId][i]) {
            if (exchangeUsers[exchangeId][i].type === "USER") {
              getUser(parseInt(exchangeUsers[exchangeId][i].id, 10))
            } else {
              getOrganization(parseInt(exchangeUsers[exchangeId][i].id, 10))
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
    let {getUser, getOrganization} = actions
    if (exchangeUsers) {
      if (exchangeUsers[exchangeId]) {
        for (let i = 0; i < 6; i++) {
          let temp = this.state.initialMembers
          if (exchangeUsers[exchangeId][i]) {
            if (exchangeUsers[exchangeId][i].type === "USER") {
              getUser(parseInt(exchangeUsers[exchangeId][i].id, 10))
            } else {
              getOrganization(parseInt(exchangeUsers[exchangeId][i].id, 10))
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
      let {getUser, getOrganization} = actions
      if (exchangeUsers) {
        if (exchangeUsers[exchangeId]) {
          for (let i = 0; i < 6; i++) {
            let temp = this.state.initialMembers
            if (exchangeUsers[exchangeId][i]) {
              if (exchangeUsers[exchangeId][i].type === "USER") {
                getUser(parseInt(exchangeUsers[exchangeId][i].id, 10))
              } else {
                getOrganization(parseInt(exchangeUsers[exchangeId][i].id, 10))
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
    let {initialMembers, moreMembers, viewType} = this.state
    return (
        <div className={"members-frame"}>
          <div className={"members-header-right"}>
            <Contacts width="22px" height="22px" containerClass={"svg-container-info-view"} svgClass={"svg-info-view"}/>
            <span>اعضا</span>
          </div>
          <div className={"members-header-left"} onClick={this.changeViewType}>
            {viewType === "member-square" ?
                <Stream width="16px" height="16px" svgClass={"svg-info-view"}/> :
                <QuestionMark width="20px" height="20px" svgClass={"svg-info-view"}/>}
          </div>
          <div className={"members-body"}>
            {initialMembers.length > 0 ? initialMembers.map((p, index) => {
              return this.getMembers(p.id, p.type, index)
            }) : <VerifyWrapper isLoading={true} error={false}/>}
            {(!moreMembers) && initialMembers.length >= 6 ?
                <div className={"members-more"} onClick={this.setAllMembers}>
                  بارگذاری بیشتر
                </div> : null}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exchangeUsers: state.common.exchangeMembership.members,
    organs: state.organs.list,
    profiles: state.users.list,
    files: state.common.file.list,
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getExchangeMembers: exchangeMembershipActions.getExchangeMembershipByExchangeId,
    getUser: getUserAction.getProfileByUserId,
    getOrganization: organizationActions.getOrganizationByOrganId
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(MembersView)