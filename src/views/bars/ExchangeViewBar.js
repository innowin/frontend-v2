import React, {Component} from "react"
import PropTypes from "prop-types"
import exchangeActions from "src/redux/actions/exchangeActions"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {ExchangeIcon} from "src/images/icons"
import ExchangeMembershipActions from "../../redux/actions/commonActions/exchangeMembershipActions"
import {DefaultUserIcon} from "src/images/icons"
import {BeatLoader, ClipLoader} from "react-spinners"
import {REST_URL} from "src/consts/URLS"
import {Link} from "react-router-dom"
import type {ImageType} from "../pages/modal/createExchange/basicInfo"
import makeFileSelectorByKeyValue from "src/redux/selectors/common/file/selectFilsByKeyValue"
import {createFile} from "src/redux/actions/commonActions/fileActions"


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
      selectedImageTemp: null,
      selectedImage: null,
      processing: false
    }
    this._handleFollow = this._handleFollow.bind(this)
    this.exchangeAdminMenu = React.createRef()
    this.editDescription = React.createRef()
    this.editName = React.createRef()
    this._handleAdminMenu = this._handleAdminMenu.bind(this)
    this._handleMenu = this._handleMenu.bind(this)
    this._handleClickOutside = this._handleClickOutside.bind(this)
    this._handleEditView = this._handleEditView.bind(this)
    this._handleDeleteExchange = this._handleDeleteExchange.bind(this)
    this._handleEditButton = this._handleEditButton.bind(this)
    this._handleUnfollowExchange = this._handleUnfollowExchange.bind(this)
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

  _handleFollow(e) {
    e.stopPropagation()
    this.setState({...this.state, followLoading: true, unFollowed: false})
    this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.exchangeId})
  }

  componentDidMount() {
    const {exchangeId, exchanges} = this.props
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
    }
    document.addEventListener("mousedown", this._handleClickOutside)
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    const {exchanges, exchangeId} = nextProps
    const currentExchange = exchanges.list[exchangeId]
    if (currentExchange !== this.props.exchanges.list[exchangeId]) {

      this.setState({...this.state, imageLoaded: false}, () => {
        if (this.state.loadingEdit) {
          this.setState({...this.state, editView: false, loadingEdit: false})
        }

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
        }

      })

    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    let {clientFiles} = this.props
    const lastFile = clientFiles[clientFiles.length - 1] || {}
    const prevLastFile = prevProps.clientFiles[prevProps.clientFiles.length - 1] || {}

    if (lastFile.id && prevLastFile.id) {
      if (lastFile.id !== prevLastFile.id) {
        this._imageHandler(lastFile)
      }
    }

  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this._handleClickOutside)
  }

  _handleClickOutside(event) {
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
      if (this.props.currentUserId === (currentExchange.owner && currentExchange.owner.identity_user)) {
        return (
            <button
                type="button"
                className="sidebarFollowBottom"
                style={{cursor: "pointer"}}
                onClick={(e) => this._handleEditView(e)}>
              {this.props.translate["Edit Exchange"]}
            </button>
        )
      } else return (
          <button
              type="button"
              className="sidebarFollowBottom">عضو شده
          </button>
      )
    } else if (this.state.followLoading) {
      return (
          <button type="button" className="sidebarFollowBottom">
            <BeatLoader size={7} color={"#67e6d1"} margin={2}/>
          </button>
      )
    } else {
      return (
          <button
              type="button"
              className="sidebarFollowBottom"
              style={{cursor: "pointer"}}
              onClick={(e) => this._handleFollow(e)}>درخواست عضویت
          </button>
      )
    }
  }

  _handleAdminMenu(e) {
    e.stopPropagation()
    this.exchangeAdminMenu.className = "exchange-admin-menu"
  }

  _handleMenu(e) {
    e.stopPropagation()
    this.exchangeAdminMenu.className = "exchange-admin-menu-member"
  }

  _handleEditView(e) {
    e.stopPropagation()
    this.setState({...this.state, editView: true})
    this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
  }

  _handleDeleteExchange(e) {
    e.stopPropagation()
    this.exchangeAdminMenu.className = "exchange-admin-menu-disable"
    const {actions, exchangeId} = this.props
    const {deleteExchange} = actions
    deleteExchange(exchangeId)
  }

  _uploadHandler = (fileString: any) => {
    const reader = new FileReader()
    if (fileString) {
      reader.readAsDataURL(fileString)
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedImageTemp: reader.result
        }, this._createFile)
      }
    }
  }
  _createFile = () => {
    const {createFile} = this.props.actions
    this.setState({...this.state, processing: true})
    createFile({file_string: this.state.selectedImageTemp})
  }
  _imageHandler = (img: ImageType) => {
    this.setState({
      ...this.state,
      selectedImage: img,
      processing: false
    })
  }

  _handleEditButton() {
    // alert(this.editDescription.value.length)
    // alert(this.editName.value)
    if (this.editDescription && this.editDescription.value.length <= 100) {
      const {selectedImage} = this.state
      const {actions, exchangeId} = this.props
      const {editExchange} = actions
      let formValues = {
        exchange_id: exchangeId,
        exchange_description: this.editDescription && this.editDescription.value,
        exchange_name: this.editName && this.editName.value,
        exchange_media: selectedImage.id
      }
      editExchange(formValues)
      // getExchangeByExId(exchangeId)
      this.setState({...this.state, loadingEdit: true})
    } else console.log("Description Length is too much")
  }

  _handleUnfollowExchange() {
    const {exchanges, exchangeId, currentUserId, currentUserIdentity, currentUserType, exchangesIdentities, actions} = this.props
    const currentExchange = exchanges.list[exchangeId]
    if (currentExchange.exchange) {
      const {unFollow, getExchangeMembershipByMemberIdentity} = actions
      getExchangeMembershipByMemberIdentity({
        identityId: currentUserIdentity,
        exchangeMembershipOwnerId: currentUserId,
        exchangeMembershipOwnerType: currentUserType
      })
      // // console.log(exchangesIdentities)
      // let exchangeMembershipIdTemp = null
      let exchangeMembershipIdTemp = Object.values(exchangesIdentities).filter(memberships => {
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
      unFollowed, imageLoaded, editView, loadingEdit, processing, selectedImage
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
                        <div className="fa fa-ellipsis-v menuBottom bubble-more" onClick={(e) => this._handleMenu(e)}/>
                        <div className={"exchange-admin-menu-disable"} ref={e => this.exchangeAdminMenu = e}>
                          <div className={"exchange-admin-menu-child"} onClick={this._handleUnfollowExchange}>
                            {translate["Unfollow Exchange"]}
                          </div>
                        </div>
                      </div> : null
                  :
                  <div>
                    <div className="fa fa-ellipsis-v menuBottom bubble-more" onClick={(e) => this._handleAdminMenu(e)}/>
                    <div className={"exchange-admin-menu-disable"} ref={e => this.exchangeAdminMenu = e}>
                      <div className={"exchange-admin-menu-child"} onClick={(e) => this._handleEditView(e)}>
                        {translate["Edit Exchange"]}
                      </div>
                      <Link to={`/`} className={"exchange-admin-menu-child-delete"}>
                        <div className={"exchange-admin-menu-child"} onClick={(e) => this._handleDeleteExchange(e)}>
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
                             src={selectedImage ? selectedImage.file :
                                 currentExchange.exchange_image.file.includes("innowin.ir") ?
                                     currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file}/>
                        :
                        currentExchange.exchange && currentExchange.exchange.content.exchange_image ?
                            <img className="exchangeViewBarImg" alt={translate["Exchange Picture"]}
                                 src={selectedImage ? selectedImage.file :
                                     currentExchange.exchange.content.exchange_image.file.includes("innowin.ir") ?
                                         currentExchange.exchange.content.exchange_image.file :
                                         REST_URL + currentExchange.exchange.content.exchange_image.file}/>
                            :
                            <DefaultUserIcon className="exchangeViewBarImg"/>

                    :

                    currentExchange.exchange_image && imageLoaded ?
                        <div className="edit-exchange-profile-picture-container">
                          <div className="edit-exchange-profile-picture">
                            تغییر تصویر
                          </div>
                          <img className="exchangeViewBarImg" alt={translate["Exchange Picture"]}
                               src={selectedImage ? selectedImage.file :
                                   currentExchange.exchange_image.file.includes("innowin.ir") ?
                                       currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file}/>
                          {!processing ?
                              <input type="file" accept="image/*" onChange={e => this._uploadHandler(e.currentTarget.files[0])}/>
                              : null}
                        </div>
                        :
                        currentExchange.exchange && currentExchange.exchange.content.exchange_image ?
                            <div className="edit-exchange-profile-picture-container">
                              <div className="edit-exchange-profile-picture">
                                تغییر تصویر
                              </div>
                              <img className="exchangeViewBarImg" alt={translate["Exchange Picture"]}
                                   src={selectedImage ? selectedImage.file :
                                       currentExchange.exchange.content.exchange_image.file.includes("innowin.ir") ?
                                           currentExchange.exchange.content.exchange_image.file :
                                           REST_URL + currentExchange.exchange.content.exchange_image.file}/>
                              {!processing ?
                                  <input type="file" accept="image/*" onChange={e => this._uploadHandler(e.currentTarget.files[0])}/>
                                  : null}
                            </div>
                            :
                            <div className={"edit-exchange-profile-picture-container"}>
                              <div className={"edit-exchange-profile-picture"}>
                                تصویر جدید
                              </div>
                              {
                                selectedImage ?
                                    <img className="exchangeViewBarImg" alt={translate["Exchange Picture"]}
                                         src={selectedImage.file}/> : <DefaultUserIcon className="exchangeViewBarImg"/>
                              }
                              {!processing ?
                                  <input type="file" accept="image/*" onChange={e => this._uploadHandler(e.currentTarget.files[0])}/>
                                  : null}
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
                    <div className="-grey1 fontSize-13px description-right-bar">
                      {
                        currentExchange.description === "" ? "بدون توضیحات" :
                            currentExchange.description ? currentExchange.description :
                                currentExchange.exchange.content.description === "" ? "بدون توضیحات" : currentExchange.exchange.content.description
                      }
                    </div>
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
                    {/*<div>*/}
                      {/*<span>محصول عرضه شده:</span>*/}
                      {/*<span>؟</span>*/}
                    {/*</div>*/}
                  </div>
                  :
                  null
            }
            {
              !editView ?
                  <div className={"exchange-view-bar-socials"}> {/* TODO: ABEL disable-logo class for non social exchange fields*/}
                    {/*<i className={"fa fa-youtube-play youtube disable-logo"}/>*/}
                    <i className={"fa fa-telegram disable-logo"}/>
                    <i className={"fa fa-instagram disable-logo"}/>
                    <i className={"fa fa-linkedin-square disable-logo"}/>
                    <i className={"fa fa-twitter disable-logo"}/>
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
                    {!loadingEdit && !processing ?
                        <button
                            type="button"
                            className="sidebarBottom"
                            onClick={this._handleEditButton}> تایید
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
                        onClick={() => this.setState({...this.state, editView: false, selectedImage: null})}> لغو
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
  const fileSelectorByKeyValue = makeFileSelectorByKeyValue()
  return ({
    translate: state.intl.messages,
    router: state.router,
    exchanges: state.exchanges,
    currentUserIdentity: state.auth.client.identity.content,
    currentUserId: userId,
    currentUserType: client.user_type,
    exchangesIdentities: state.common.exchangeMembership.list,
    clientFiles: fileSelectorByKeyValue(state, "identity", client.identity.content)
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
    createFile
  }, dispatch)
})

export default connect(StateToProps, DispatchToProps)(ExchangeViewBar)
