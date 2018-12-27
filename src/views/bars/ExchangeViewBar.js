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
import {Link, Redirect} from "react-router-dom"


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
      editView: false,
      loadingEdit: false,
      unFollowed: false,
      notFound: false
    }
    this.follow = this.follow.bind(this)
    this.exchangeAdminMenu = React.createRef()
    this.editDescription = React.createRef()
    this.editName = React.createRef()
    this.handleAdminMenu = this.handleAdminMenu.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleEditView = this.handleEditView.bind(this)
    this.handleDeleteExchange = this.handleDeleteExchange.bind(this)
    this.handleEditButton = this.handleEditButton.bind(this)
    this.handleUnfollowExchange = this.handleUnfollowExchange.bind(this)
  }

  // _MockData = () => {
  //   this._test()
  //   const tags = [{title: "چادر مشکی"}, {title: "پوشاک مردانه"}]
  //   const badges = ["http://restful.daneshboom.ir/media/14ba7946fe394deca765cad2fc02c848.jpeg"]
  //   this.setState({...this.state, tags: tags, badgesImgUrl: badges})
  // }
  // _getExchange = (exchangeId) => {
  //   var self = this
  //   const handleResult = (res) => {
  //     this.setState({...this.state, exchange: res, loading: true})
  //     // TODO mohsen: socket.emit of badges
  //     // TODO mohsen: socket.emit of tags
  //     getExchangeMembers(exchangeId, (err) => {
  //     }, (identities) => {
  //       var members = []
  //       var j = 0
  //       //callback hell 201 requests just to get user names and profile Media TODO amir
  //       // TODO amir: tell backend to fix this mess
  //       for (var i = 0; i < identities.length; i++) {
  //         var member = identities[i].exchange_identity_related_identity
  //         members.push(member) //todo add profile media to identity_user
  //         j = j + 1
  //         if (j >= identities.length) {
  //           self.setState({...self.state, members: members, loading: false})
  //         }
  //       }
  //     })
  //   }
  //   getExchange(exchangeId, handleResult)
  // }
  // _getCounts = (exchangeId) => {
  //   const handleCountProduct = (res) => this.setState({...this.state, productCount: res.length, isLoading: false})
  //   const handleCountSupply = (res) => this.setState({...this.state, supplyCount: res.length},
  //       () => getExchangePostsHasProduct(exchangeId, handleCountProduct))
  //   const handleCountDemand = (res) => this.setState({...this.state, demandCount: res.length},
  //       () => getExchangePostsByPostType(exchangeId, "supply", handleCountSupply))
  //   getExchangePostsByPostType(exchangeId, "demand", handleCountDemand)
  // }
  // _handleMembersClick = (e) => {
  //   this.setState({...this.state, membersViewSide: !this.state.membersViewSide})
  // }

  follow() {
    this.setState({...this.state, followLoading: true, unFollowed: false})
    this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.exchangeId})
  }

  componentDidMount() {
    const {exchangeId, exchanges} = this.props

    // getExchangeMembersByExId (exchangeId)
    // this._getExchange(exchangeId)
    // this._getCounts(exchangeId)
    // this._getCounts(exchangeId)

    const currentExchange = exchanges.list[exchangeId]
    if (currentExchange && currentExchange.exchange_image && currentExchange.exchange_image.file) {
      let image = new Image()
      image.src = currentExchange.exchange_image.file.includes("innowin.ir") ? currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file
      image.onload = () => {
        this.setState({...this.state, imageLoaded: true})
      }
    } else if (currentExchange && currentExchange.exchange.content.exchange_image) {
      let image = new Image()
      image.src = currentExchange.exchange.content.exchange_image.file.includes("innowin.ir") ?
          currentExchange.exchange.content.exchange_image.file : REST_URL + currentExchange.exchange.content.exchange_image.file
      image.onload = () => {
        this.setState({...this.state, imageLoaded: true})
      }
    } else this.setState({...this.state, notFound: true})

    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillReceiveProps(prevProps, nextProps) {
    const {exchanges, exchangeId} = this.props
    const currentExchange = exchanges.list[exchangeId]

    if (currentExchange !== prevProps.exchanges.list[exchangeId]) {
      if (this.state.loadingEdit) {
        this.setState({...this.state, editView: false, loadingEdit: false})
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  handleClickOutside(event) {
    const {exchanges, exchangeId, currentUserId} = this.props
    if (exchanges.list[exchangeId]) {
      const currentExchange = exchanges.list[exchangeId].exchange.content
      if (currentExchange && currentExchange.owner && currentExchange.owner.identity_user === currentUserId) {
        if (this.exchangeAdminMenu && !this.exchangeAdminMenu.contains(event.target)) {
          this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
        }
      } else if (currentExchange && currentExchange.exchange) {
        if (this.exchangeAdminMenu && !this.exchangeAdminMenu.contains(event.target)) {
          this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
        }
      }
    }
  }

  renderFollowBtn(currentExchange) {
    if (currentExchange.exchange && !this.state.unFollowed) {
      return (
          <button
              type="button"
              className="sidebarFollowBottom">عضو شده
          </button>
      )
    } else if (this.state.followLoading) {
      return (
          <button type="button" className="sidebarFollowBottom">
            <BeatLoader size={7} color={"#4dab9f"} margin={2}/>
          </button>
      )
    } else {
      return (
          <button
              type="button"
              className="sidebarFollowBottom"
              style={{cursor: "pointer"}}
              onClick={this.follow}>درخواست عضویت
          </button>
      )
    }
  }

  handleAdminMenu() {
    this.exchangeAdminMenu.className = "exchange-admin-menu"
  }

  handleMenu() {
    this.exchangeAdminMenu.className = "exchange-admin-menu-member"
  }

  handleEditView() {
    this.setState({...this.state, editView: true})
    this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
  }

  handleDeleteExchange() {
    this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
    const {actions, exchangeId} = this.props
    const {deleteExchange} = actions
    deleteExchange(exchangeId)
  }

  handleEditButton() {
    // alert(this.editDescription.value.length)
    // alert(this.editName.value)
    if (this.editDescription && this.editDescription.value.length <= 100) {
      const {actions, exchangeId} = this.props
      const {editExchange, getExchangeByExId} = actions
      let formValues = {
        exchange_id: exchangeId,
        exchange_description: this.editDescription && this.editDescription.value,
        exchange_name: this.editName && this.editName.value,
        exchange_media: null
      }
      editExchange(formValues)
      // getExchangeByExId(exchangeId)
      this.setState({...this.state, loadingEdit: true})
    }
    else console.log("Description Length is too much")
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
      members, isLoading, error, followLoading, imageLoaded, editView, loadingEdit, notFound
    } = this.state
    const {translate, exchanges, exchangeId, currentUserId} = this.props
    if (exchanges.list[exchangeId]) {
      const currentExchange = exchanges.list[exchangeId].exchange && exchanges.list[exchangeId].exchange.content
      return (
          <div className="-sidebar-child-wrapper col">
            <div className="align-items-center flex-column">
              {currentUserId !== (currentExchange.owner && currentExchange.owner.identity_user) && !editView ?
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
                      <div className={"exchange-admin-menu-child"} onClick={this.handleEditView}>
                        {translate["Edit Exchange"]}
                      </div>
                      <Link to={`/`} className={"exchange-admin-menu-child-delete"}>
                        <div className={"exchange-admin-menu-child"} onClick={this.handleDeleteExchange}>
                          {translate["Delete Exchange"]}
                        </div>
                      </Link>
                    </div>
                  </div>
              }{/*<i className="fa fa-arrow-left menuBottom" onClick={this._handleMembersClick.bind(this)}> </i>*/}
              {
                !editView ?

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
                    !editView ?
                        <span>
                          {
                            currentExchange && currentExchange.name === "" ? "بدون نام" :
                                currentExchange.name ? currentExchange.name :
                                    currentExchange.exchange.content.name === "" ? "بدون نام" : currentExchange.exchange.content.name
                          }
                          </span>
                        :
                        <input ref={e => this.editName = e} className={"edit-exchange-name-input"}
                               defaultValue={
                                 currentExchange.name === "" ? "بدون نام" :
                                     currentExchange.name ? currentExchange.name :
                                         currentExchange.exchange.content.name === "" ? "بدون نام" : currentExchange.exchange.content.name}/>
                  }
                </div>
              </div>
              {
                !editView ?
                    <span className="-grey1 fontSize-13px description-right-bar">
                      {
                        currentExchange.description === "" ? "بدون توضیحات" :
                            currentExchange.description ? currentExchange.description :
                                currentExchange.exchange.content.description === "" ? "بدون توضیحات" : currentExchange.exchange.content.description
                      }
                        </span>
                    :
                    <textarea ref={e => this.editDescription = e} className={"edit-exchange-description-input"}
                              defaultValue={
                                currentExchange.description === "" ? "بدون توضیحات" :
                                    currentExchange.description ? currentExchange.description :
                                        currentExchange.exchange.content.description === "" ? "بدون توضیحات" : currentExchange.exchange.content.description
                              }/>
              }

            </div>


            {
              !editView ?
                  <div className="numbersSection flex-column">
                    <div>
                      <span>اعضا:</span>
                      <span>
                        {currentExchange.members_count === null ? 0 :
                            currentExchange.members_count ? currentExchange.members_count :
                                currentExchange.exchange.content.members_count === null ? 0 : currentExchange.exchange.content.members_count}
                      </span>
                    </div>
                    <div>
                      <span>عرضه:</span>
                      <span>{currentExchange.supply_count}</span>
                    </div>
                    <div>
                      <span>تقاضا:</span>
                      <span>{currentExchange.demand_count}</span>
                    </div>
                    <div>
                      <span>محصول عرضه شده:</span>
                      <span>؟</span>
                    </div>
                  </div>
                  :
                  null
            }
            {
              !editView ?
                  <div className={"exchange-view-bar-socials"}> {/* TODO: ABEL disable-logo class for non social exchange fields*/}
                    <i className={"fa fa-youtube-play youtube disable-logo"}/>
                    <i className={"fa fa-telegram disable-logo"}/>
                    <i className={"fa fa-instagram disable-logo"}/>
                    <i className={"fa fa-linkedin-square disable-logo"}/>
                  </div>
                  :
                  null
            }


            {
              !editView ?
                  <div className="sidebarBottomParent">
                    <button
                        type="button"
                        className="sidebarBottom">ارسال پیام به کارگزار
                    </button>
                    {
                      this.renderFollowBtn(currentExchange)
                    }
                  </div>
                  :
                  <div className="sidebarBottomParent">
                    {!loadingEdit ?
                        <button
                            type="button"
                            className="sidebarBottom"
                            onClick={this.handleEditButton}> تایید
                        </button>
                        :
                        <div
                            className="sidebarBottom">
                          <ClipLoader color="#35495c" size={17} loading={true}/>
                        </div>
                    }
                    <button
                        type="button"
                        className="sidebarFollowBottom"
                        style={{cursor: "pointer"}}
                        onClick={() => this.setState({...this.state, editView: false})}> لغو
                    </button>
                  </div>
            }
          </div>
      )
    } else {
      return (
          <div style={{textAlign: "center", margin: "35px 10px 45px 10px"}}>
            بورس مورد نظر یافت نشد!
          </div>
      )
    }
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
    deleteExchange: exchangeActions.deleteExchange,
    follow: ExchangeMembershipActions.createExchangeMembership,
    unFollow: ExchangeMembershipActions.deleteExchangeMembership,
    getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
    getAllExchanges: exchangeActions.getAllExchanges,
  }, dispatch)
})

export default connect(StateToProps, DispatchToProps)(ExchangeViewBar)
