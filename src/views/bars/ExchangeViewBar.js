import React, {Component} from "react"
import PropTypes from "prop-types"
import {DefaultExchangeIcon} from "../../images/icons"
import {VerifyWrapper} from "../common/cards/Frames"
import {BadgesCard, TagsBox} from "./SideBar"
import exchangeActions from "src/redux/actions/exchangeActions"
import {getExchange, getExchangeMembers,} from "../../crud/exchange/exchange"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {ExchangeIcon} from "src/images/icons"
import {getExchangePostsByPostType, getExchangePostsHasProduct} from "../../crud/post/exchangePost"
import ExchangeMembershipActions from "../../redux/actions/commonActions/exchangeMembershipActions"
import {DefaultUserIcon} from "src/images/icons"
import {BeatLoader, ClipLoader} from "react-spinners"
import {REST_URL} from "src/consts/URLS"
import {getExchangeMembershipsSelector} from "../../redux/selectors/common/social/getExchangeMemberships"


class ExchangeViewBar extends Component {
  static propTypes = {
    exchangeId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      exchange: {},
      demandCount: 0,
      supplyCount: 0,
      productCount: 0,
      badgesImgUrl: [],
      tags: [],
      members: [],
      membersViewSide: false,
      isLoading: true,
      error: null,
      followLoading: false,
      imageLoaded: false,
      adminView: false,
      loadingEdit: false,
      unFollowed: false
    }
    this.follow = this.follow.bind(this)
    this.exchangeAdminMenu = React.createRef()
    this.editDescription = React.createRef()
    this.editName = React.createRef()
    this.handleAdminMenu = this.handleAdminMenu.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleAdminView = this.handleAdminView.bind(this)
    this.handleDeleteExchange = this.handleDeleteExchange.bind(this)
    this.handleEditButton = this.handleEditButton.bind(this)
    this.handleUnfollowExchange = this.handleUnfollowExchange.bind(this)
  }

  _MockData = () => {
    this._test()
    const tags = [{title: "چادر مشکی"}, {title: "پوشاک مردانه"}]
    const badges = ["http://restful.daneshboom.ir/media/14ba7946fe394deca765cad2fc02c848.jpeg"]
    this.setState({...this.state, tags: tags, badgesImgUrl: badges})
  }

  _getExchange = (exchangeId) => {
    var self = this
    const handleResult = (res) => {
      this.setState({...this.state, exchange: res, loading: true})
      // TODO mohsen: socket.emit of badges
      // TODO mohsen: socket.emit of tags
      getExchangeMembers(exchangeId, (err) => {
      }, (identities) => {
        var members = []
        var j = 0
        //callback hell 201 requests just to get user names and profile Media TODO amir
        // TODO amir: tell backend to fix this mess
        for (var i = 0; i < identities.length; i++) {
          var member = identities[i].exchange_identity_related_identity
          members.push(member) //todo add profile media to identity_user
          j = j + 1
          if (j >= identities.length) {
            self.setState({...self.state, members: members, loading: false})
          }
        }
      })
    }
    getExchange(exchangeId, handleResult)
  }

  _getCounts = (exchangeId) => {
    const handleCountProduct = (res) => this.setState({...this.state, productCount: res.length, isLoading: false})
    const handleCountSupply = (res) => this.setState({...this.state, supplyCount: res.length},
        () => getExchangePostsHasProduct(exchangeId, handleCountProduct))
    const handleCountDemand = (res) => this.setState({...this.state, demandCount: res.length},
        () => getExchangePostsByPostType(exchangeId, "supply", handleCountSupply))
    getExchangePostsByPostType(exchangeId, "demand", handleCountDemand)
  }

  _handleMembersClick = (e) => {
    this.setState({...this.state, membersViewSide: !this.state.membersViewSide})
  }

  follow() {
    this.setState({...this.state, followLoading: true, unFollowed: false})
    this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.exchangeId})
  }

  componentDidMount() {
    const {actions, exchangeId, exchanges} = this.props
    const {getExchangeByExId} = actions
    // if(!this.props.exchanges.list[exchangeId] && !this.props.exchanges.list[exchangeId].id){
    getExchangeByExId(exchangeId)
    // }
    // getExchangeMembersByExId (exchangeId)
    // getExchangeMembershipByExchangeId ({exchangeId})
    // this._getExchange(exchangeId)
    // this._getCounts(exchangeId)

    // this._getCounts(exchangeId)

    const currentExchange = exchanges.list[exchangeId]
    if (currentExchange.exchange_image) {
      let image = new Image()
      image.src = currentExchange.exchange_image.file.includes("innowin.ir") ? currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file
      image.onload = () => {
        this.setState({...this.state, imageLoaded: true})
      }
    }

    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillReceiveProps(prevProps, nextProps) {
    const {exchanges, exchangeId} = this.props
    const currentExchange = exchanges.list[exchangeId]

    if (currentExchange !== prevProps.exchanges.list[exchangeId]) {
      if (this.state.loadingEdit) {
        this.setState({...this.state, adminView: false, loadingEdit: false})
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  handleClickOutside(event) {
    const {exchanges, exchangeId, currentUserId} = this.props
    const currentExchange = exchanges.list[exchangeId]
    if (currentExchange && currentExchange.owner && currentExchange.owner.identity_user === currentUserId) {
      if (this.exchangeAdminMenu && !this.exchangeAdminMenu.contains(event.target)) {
        this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
      }
    } else if (currentExchange.exchange)
      if (this.exchangeAdminMenu && !this.exchangeAdminMenu.contains(event.target)) {
        this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
      }
  }

  renderFollowBtn(currentExchange) {
    if (currentExchange.exchange && !this.state.unFollowed) {
      return (
          <div className="pb-2">
            <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarFollowBottom"
                style={{width: "122.5px"}}>عضو شده
            </button>
          </div>
      )
    }
    else if (this.state.followLoading) {
      return <div className="pb-2">
        <button
            type="button"
            className="btn btn-outline-secondary btn-block sidebarFollowBottom"
            style={{width: "122.5px"}}>
          <BeatLoader size={7} color={"#4dab9f"} margin={2}/>
        </button>
      </div>
    }
    else {
      return (
          <div className="pb-2">
            <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarFollowBottom"
                style={{width: "122.5px", cursor: "pointer"}}
                onClick={this.follow}>درخواست عضویت
            </button>
          </div>
      )
    }
  }

  handleAdminMenu() {
    this.exchangeAdminMenu.className = "exchange-admin-menu"
  }

  handleMenu() {
    this.exchangeAdminMenu.className = "exchange-admin-menu-member"
  }

  handleAdminView() {
    this.setState({...this.state, adminView: true})
    this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
  }

  handleDeleteExchange() {
    this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
    console.log("DELETE_EXCHANGE")
  }

  handleEditButton() {
    // alert(this.editDescription.value)
    const {actions, exchangeId} = this.props
    const {editExchange} = actions
    let formValues = {
      exchange_id: exchangeId,
      exchange_description: this.editDescription && this.editDescription.value,
      exchange_name: this.editName && this.editName.value,
      exchange_media: null
    }
    editExchange(formValues)
    this.setState({...this.state, loadingEdit: true})
    // alert(this.editName.value)
  }

  handleUnfollowExchange() {
    const {exchanges, exchangeId, currentUserId, currentUserIdentity, currentUserType, exchangesIdentities, actions} = this.props
    const currentExchange = exchanges.list[exchangeId]
    if (currentExchange.exchange) {
      const {unFollow, getExchangeMembershipByMemberIdentity} = actions
      getExchangeMembershipByMemberIdentity({
        identityId: currentUserIdentity,
        exchangeMembershipOwnerId: currentUserId,
        exchangeMembershipOwnerType: currentUserType,
      })
      // console.log(exchangesIdentities)
      let exchangeMembershipIdTemp = null
      exchangeMembershipIdTemp = Object.values(exchangesIdentities).filter(memberships => {
        if (memberships.exchange_identity_related_exchange)
          return memberships.exchange_identity_related_exchange.id === exchangeId
        else return null
      })
      if (exchangeMembershipIdTemp !== null && exchangeMembershipIdTemp[0] !== undefined)
        unFollow({
          exchangeMembershipId: exchangeMembershipIdTemp[0].id,
          exchangeMembershipOwnerId: currentUserId,
          exchangeMembershipOwnerType: currentUserType
        })
      else console.log("exchangeMembershipIdTemp: ", exchangeMembershipIdTemp)

      // console.log(exchangeMembershipIdTemp[0])

      this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
      this.setState({...this.state, unFollowed: true, followLoading: false})
    }
  }

  render() {
    const {
      exchange, badgesImgUrl, demandCount, supplyCount, productCount, tags, unFollowed,
      members, isLoading, error, followLoading, imageLoaded, adminView, loadingEdit
    } = this.state
    const {translate, exchanges, exchangeId, currentUserId} = this.props
    const currentExchange = exchanges.list[exchangeId]
    // console.log(currentExchange.owner.identity_user)

    // const currentExchange = exchanges.list[exchangeId].exchange.content
    // let membersView = members.map((val, idx) => (
    //     <div className="" key={idx}>
    //       <span>{val.username || val.name}</span>
    //       <img alt={"."} src={val.profile_media || "#"}> </img>
    //     </div>)
    // )
    if (currentExchange)
      return (
          <div className="-sidebar-child-wrapper col">
            <div className="align-items-center flex-column">
              {currentUserId !== (currentExchange.owner && currentExchange.owner.identity_user) && !adminView ?
                  currentExchange.exchange && !unFollowed ?
                      <div>
                        <div className="fa fa-ellipsis-v menuBottom bubble-more" onClick={this.handleMenu}/>
                        <div className={"exchange-admin-menu-disable"} ref={e => this.exchangeAdminMenu = e}>
                          <div className={"exchange-admin-menu-child"} onClick={this.handleUnfollowExchange}>
                            {translate["Unfollow Exchange"]}
                          </div>
                        </div>
                      </div> : null
                  :
                  <div>
                    <div className="fa fa-ellipsis-v menuBottom bubble-more" onClick={this.handleAdminMenu}/>
                    <div className={"exchange-admin-menu-disable"} ref={e => this.exchangeAdminMenu = e}>
                      <div className={"exchange-admin-menu-child"} onClick={this.handleAdminView}>
                        {translate["Edit Exchange"]}
                      </div>
                      <div className={"exchange-admin-menu-child"} onClick={this.handleDeleteExchange}>
                        {translate["Delete Exchange"]}
                      </div>
                    </div>
                  </div>
              }{/*<i className="fa fa-arrow-left menuBottom" onClick={this._handleMembersClick.bind(this)}> </i>*/}
              {
                !adminView ?

                    currentExchange.exchange_image && imageLoaded ?
                        <img className="exchangeViewBarImg" alt={translate["Exchange Picture"]}
                             src={currentExchange.exchange_image.file.includes("innowin.ir") ?
                                 currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file}/>
                        :
                        currentExchange.exchange && currentExchange.exchange.content.exchange_image ?
                            <img className="exchangeViewBarImg" alt={translate["Exchange Picture"]}
                                 src={currentExchange.exchange.content.exchange_image.file.includes("innowin.ir") ?
                                     currentExchange.exchange.content.exchange_image.file :
                                     REST_URL + currentExchange.exchange.content.exchange_image.file}/>
                            :
                            <DefaultUserIcon className="exchangeViewBarImg"/>

                    :

                    currentExchange.exchange_image && imageLoaded ?
                        <div className={"edit-exchange-profile-picture-container"}>
                          <div className={"edit-exchange-profile-picture"}>
                            تصویر جدید
                          </div>
                          <img className="exchangeViewBarImg" alt={translate["Exchange Picture"]}
                               src={currentExchange.exchange_image.file.includes("innowin.ir") ?
                                   currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file}/>
                        </div>
                        :
                        currentExchange.exchange && currentExchange.exchange.content.exchange_image ?
                            <div className={"edit-exchange-profile-picture-container"}>
                              <div className={"edit-exchange-profile-picture"}>
                                تصویر جدید
                              </div>
                              <img className="exchangeViewBarImg" alt={translate["Exchange Picture"]}
                                   src={currentExchange.exchange.content.exchange_image.file.includes("innowin.ir") ?
                                       currentExchange.exchange.content.exchange_image.file :
                                       REST_URL + currentExchange.exchange.content.exchange_image.file}/>
                            </div>
                            :
                            <div className={"edit-exchange-profile-picture-container"}>
                              <div className={"edit-exchange-profile-picture"}>
                                تصویر جدید
                              </div>
                              <DefaultUserIcon className="exchangeViewBarImg"/>
                            </div>
              }

              <div className="exchangeName">
                <ExchangeIcon/>
                <div>
                  {/*<span className="fontSize-15px">{translate["Exchange"]}: </span>*/}
                  {
                    !adminView ?
                        <span>{currentExchange.name === "" ? "بدون نام" : currentExchange.name}</span>
                        :
                        <input ref={e => this.editName = e} className={"edit-exchange-name-input"}
                               defaultValue={currentExchange.name === "" ? "بدون نام" : currentExchange.name}/>
                  }
                </div>
              </div>
              {
                !adminView ?
                    <span className="-grey1 fontSize-13px description-right-bar">{currentExchange.description === "" ? "بدون توضیحات" :
                        currentExchange.description}</span>
                    :
                    <textarea ref={e => this.editDescription = e} className={"edit-exchange-description-input"}
                              defaultValue={currentExchange.description === "" ? "بدون نام" : currentExchange.description}/>
              }

            </div>


            {
              !adminView ?
                  <div className="numbersSection flex-column">
                    <div>
                      <span>اعضا:</span>
                      <span>{currentExchange.members_count}</span>
                    </div>
                    <div>
                      <span>عرضه:</span>
                      <span>؟</span>
                    </div>
                    <div>
                      <span>تقاضا:</span>
                      <span>؟</span>
                    </div>
                    <div>
                      <span>محصول عرضه شده:</span>
                      <span>؟</span>
                    </div>
                  </div>
                  :
                  null
            }


            {/*
             {
             (badgesImgUrl.length > 0) ? (
             <div className="flex-wrap pb-3">
             <BadgesCard badgesImgUrl={badgesImgUrl}/>
             </div>
             ) : ("")
             }
             {
             (tags.length > 0) ? (
             <div className="flex-wrap pb-3">
             <TagsBox tags={tags}/>
             </div>) : ("")
             }
             <div className="flex-wrap pb-3">
             <TagsBox tags={tags}/>
             </div>
             */}

            {
              !adminView ?
                  <div className={"exchange-view-bar-socials"}>
                    <i className={"fa fa-telegram"}/> {/* disable-logo class for non social exchange fields*/}
                    <i className={"fa fa-instagram"}/>
                    <i className={"fa fa-linkedin"}/>
                    <i className={"fa fa-youtube-play youtube"}/>
                  </div>
                  :
                  null
            }


            {
              !adminView ?
                  <div className="row mr-0 ml-0 pb-3 flex-wrap justify-content-around">
                    <div className="pb-2">
                      <button
                          type="button"
                          className="btn btn-outline-secondary btn-block sidebarBottom">ارسال پیام به کارگزار
                      </button>
                    </div>
                    {
                      this.renderFollowBtn(currentExchange)
                    }
                  </div>
                  :
                  <div className="row mr-0 ml-0 pb-3 flex-wrap justify-content-around">
                    <div className="pb-2">
                      {!loadingEdit ?
                          <button
                              type="button"
                              className="btn btn-outline-secondary btn-block sidebarBottom"
                              onClick={this.handleEditButton}> تایید
                          </button>
                          :
                          <div
                              className="btn btn-outline-secondary btn-block sidebarBottom">
                            <ClipLoader color="#dcdcdc" size={15} loading={true}/>
                          </div>
                      }

                    </div>
                    <div className="pb-2">
                      <button
                          type="button"
                          className="btn btn-outline-secondary btn-block sidebarFollowBottom"
                          style={{width: "122.5px", cursor: "pointer"}}
                          onClick={() => this.setState({...this.state, adminView: false})}> لغو
                      </button>
                    </div>
                  </div>
            }


          </div>
      )
    else return (
        <VerifyWrapper isLoading={true} error={false}/>
    )
  }
}

const StateToProps = (state, ownProps) => {
  const client = state.auth.client
  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)

  return ({
    translate: state.intl.messages,
    router: state.router,
    exchanges: state.exchanges,
    currentUserIdentity: state.auth.client.identity.content,
    currentUserId: userId,
    currentUserType: client.user_type,
    exchangesIdentities: state.common.exchangeMembership.list,
  })
}
const DispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeMembershipByExchangeId: ExchangeMembershipActions.getExchangeMembershipByExchangeId,
    getExchangeByExId: exchangeActions.getExchangeByExId,
    editExchange: exchangeActions.editExchange,
    follow: ExchangeMembershipActions.createExchangeMembership,
    unFollow: ExchangeMembershipActions.deleteExchangeMembership,
    getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
    getAllExchanges: exchangeActions.getAllExchanges,
  }, dispatch)
})

export default connect(StateToProps, DispatchToProps)(ExchangeViewBar)
