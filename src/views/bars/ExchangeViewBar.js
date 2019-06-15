import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import exchangeActions from 'src/redux/actions/exchangeActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Contacts, ExchangeIcon, DefaultUserIcon, CalendarEmpty} from 'src/images/icons'
import ExchangeMembershipActions from 'src/redux/actions/commonActions/exchangeMembershipActions'
import {BeatLoader, ClipLoader} from 'react-spinners'
import {REST_URL} from 'src/consts/URLS'
import {Link} from 'react-router-dom'
import makeFileSelectorByKeyValue from 'src/redux/selectors/common/file/selectFilsByKeyValue'
import {createFile} from 'src/redux/actions/commonActions/fileActions'
import TempActions from 'src/redux/actions/tempActions'
import types from '../../redux/actions/types'
import uuid from 'uuid'
import {createFileFunc} from '../common/Functions'
import constants from '../../consts/constants'


class ExchangeViewBar extends PureComponent {
  static propTypes = {
    exchangeId: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      exchange: {},
      demandCount: 0,
      supplyCount: 0,
      productCount: 0,
      badgesImgUrl: [],
      currentFileId: '',
      tags: [],
      members: [],
      membersViewSide: false,
      isLoading: true,
      error: null,
      followLoading: false,
      followedExchanges: [],
      imageLoaded: false,
      editView: false,
      loadingEdit: false,
      unFollowed: false,
      selectedImageTemp: null,
      selectedImage: null,
      processing: false,
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

  _handleFollow(e) {
    e.stopPropagation()
    this.setState({...this.state, followLoading: true, unFollowed: false})
    this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.exchangeId})
  }

  componentDidMount() {
    const {exchangeId, exchanges, exchangesIdentities, clientExchangeMemberships} = this.props

    let followed = []
    clientExchangeMemberships.forEach((followIds, index) => {
      if (exchangesIdentities[followIds]) {
        followed.push(exchangesIdentities[followIds].exchange_identity_related_exchange.id)
      }
      if (clientExchangeMemberships.length - 1 === index) {
        this.setState({...this.state, followedExchanges: followed})
      }
    })

    const currentExchange = exchanges.list[exchangeId]
    if (currentExchange && currentExchange.exchange_image && currentExchange.exchange_image.file) {
      let image = new Image()
      image.src = currentExchange.exchange_image.file.includes('innowin.ir') ? currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file
      image.onload = () => {
        this.setState({...this.state, imageLoaded: true})
      }
    }
    else if (currentExchange && currentExchange.exchange_image) {
      let image = new Image()
      image.src = currentExchange.exchange_image.file.includes('innowin.ir') ?
          currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file
      image.onload = () => {
        this.setState({...this.state, imageLoaded: true})
      }
    }
    document.addEventListener('mousedown', this._handleClickOutside)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {exchanges, exchangeId} = nextProps
    const currentExchange = exchanges.list[exchangeId]
    if (currentExchange !== this.props.exchanges.list[exchangeId]) {
      this.setState({...this.state, imageLoaded: false}, () => {
        if (this.state.loadingEdit) {
          this.setState({...this.state, editView: false, loadingEdit: false})
        }
        if (currentExchange && currentExchange.exchange_image && currentExchange.exchange_image.file) {
          let image = new Image()
          image.src = currentExchange.exchange_image.file.includes('innowin.ir') ? currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file
          image.onload = () => {
            this.setState({...this.state, imageLoaded: true})
          }
        }
        else if (currentExchange && currentExchange.exchange_image) {
          let image = new Image()
          image.src = currentExchange.exchange_image.file.includes('innowin.ir') ?
              currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file
          image.onload = () => {
            this.setState({...this.state, imageLoaded: true})
          }
        }
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let {exchangesIdentities, clientExchangeMemberships, temp, actions} = this.props
    let {removeFileFromTemp} = actions

    if (this.state.followLoading && clientExchangeMemberships !== prevProps.clientExchangeMemberships) {
      let followed = []
      clientExchangeMemberships.forEach((followIds, index) => {
        if (exchangesIdentities[followIds]) {
          followed.push(exchangesIdentities[followIds].exchange_identity_related_exchange.id)
        }
        if (clientExchangeMemberships.length - 1 === index) {
          this.setState({...this.state, followedExchanges: followed})
        }
      })
    }

    if (this.state.currentFileId !== '' && temp[this.state.currentFileId] && temp[this.state.currentFileId].progress === 100 && temp['exchange_new_image']) {
      this._imageHandler(temp['exchange_new_image'])
      removeFileFromTemp('exchange_new_image')
    }

  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside)
  }

  _handleClickOutside(event) {
    const {exchanges, exchangeId, currentUserId} = this.props
    if (exchanges.list[exchangeId]) {
      const currentExchange = exchanges.list[exchangeId]
      if (currentExchange && currentExchange.owner && currentExchange.owner.id === currentUserId) {
        if (this.exchangeAdminMenu && !this.exchangeAdminMenu.contains(event.target)) {
          this.exchangeAdminMenu.className = 'exchange-admin-menu-disable'
        }
      }
      else if (currentExchange && this.state.followedExchanges.indexOf(currentExchange.id) >= 0) {
        if (this.exchangeAdminMenu && !this.exchangeAdminMenu.contains(event.target)) {
          this.exchangeAdminMenu.className = 'exchange-admin-menu-disable'
        }
      }
    }
  }

  renderFollowBtn(currentExchange) {
    if (this.state.followedExchanges.indexOf(currentExchange.id) >= 0 && !this.state.unFollowed) {
      if (this.props.currentUserId === (currentExchange.owner && currentExchange.owner.id)) {
        return (
            <button
                type="button"
                className="sidebarFollowBottom"
                style={{cursor: 'pointer'}}
                onClick={(e) => this._handleEditView(e)}>
              {this.props.translate['Edit Exchange']}
            </button>
        )
      }
      else return (
          <button
              type="button"
              className="sidebarFollowBottom">عضو شده
          </button>
      )
    }
    else if (this.state.followLoading) {
      return (
          <button type="button" className="sidebarFollowBottom">
            <BeatLoader size={7} color={'#67e6d1'} margin={2}/>
          </button>
      )
    }
    else {
      return (
          <button
              type="button"
              className="sidebarFollowBottom"
              style={{cursor: 'pointer'}}
              onClick={(e) => this._handleFollow(e)}>درخواست عضویت
          </button>
      )
    }
  }

  _handleAdminMenu(e) {
    e.stopPropagation()
    this.exchangeAdminMenu.className = 'exchange-admin-menu'
  }

  _handleMenu(e) {
    e.stopPropagation()
    this.exchangeAdminMenu.className = 'exchange-admin-menu-member'
  }

  _handleEditView(e) {
    e.stopPropagation()
    this.setState({...this.state, editView: true})
    this.exchangeAdminMenu.className = 'exchange-admin-menu-disable'
  }

  _handleDeleteExchange() {
    this.exchangeAdminMenu.className = 'exchange-admin-menu-disable'
    const {actions, exchangeId} = this.props
    const {deleteExchange} = actions
    deleteExchange(exchangeId)
  }

  _uploadHandler = (fileString) => {
    const reader = new FileReader()
    if (fileString) {
      reader.readAsDataURL(fileString)
      reader.onload = () => {
        this.setState({
          ...this.state,
          selectedImageTemp: reader.result,
          selectedImageFile: fileString,
        }, this._createFile)
      }
    }
  }
  _createFile = () => {
    const {createFile} = this.props.actions
    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionData = 'exchange_new_image'
    const createArguments = {
      fileIdKey: 'fileId',
      nextActionType,
      nextActionData: {tempFileKeyName: nextActionData},
    }
    let fileId = uuid()
    const file = {fileId, formFile: this.state.selectedImageFile}
    const fileString = this.state.selectedImageTemp
    createFileFunc(createFile, fileString, createArguments, constants.CREATE_FILE_TYPES.IMAGE, constants.CREATE_FILE_CATEGORIES.EXCHANGE.IMAGE, file)

    this.setState({...this.state, processing: true, currentFileId: fileId})
    console.log('PROCESS....')

  }
  _imageHandler = (id: number) => {
    this.setState({
      ...this.state,
      selectedImage: this.state.selectedImageTemp,
      selectedImageId: id,
      processing: false,
    })
  }

  _handleEditButton() {
    if (this.editDescription && this.editDescription.value.length <= 100) {
      const {selectedImageId} = this.state
      const {actions, exchangeId} = this.props
      const {editExchange} = actions
      let formValues = {
        exchange_id: exchangeId,
        exchange_description: this.editDescription && this.editDescription.value,
        exchange_name: this.editName && this.editName.value,
        exchange_media: selectedImageId !== null ? selectedImageId : null,
      }
      editExchange(formValues)
      this.setState({...this.state, loadingEdit: true})
    }
    else console.log('Description Length is too much')
  }

  _handleUnfollowExchange() {
    const {exchanges, exchangeId, currentUserId, currentUserIdentity, exchangesIdentities, actions} = this.props
    const currentExchange = exchanges.list[exchangeId]
    if (this.state.followedExchanges.indexOf(currentExchange.id) >= 0) {
      const {unFollow, getExchangeMembershipByMemberIdentity} = actions
      getExchangeMembershipByMemberIdentity({
        identityId: currentUserIdentity,
        exchangeMembershipOwnerId: currentUserId,
      })
      let exchangeMembershipIdTemp = Object.values(exchangesIdentities).filter(memberships => {
        if (memberships.exchange_identity_related_exchange)
          return memberships.exchange_identity_related_exchange.id === exchangeId
        else return null
      })
      if (exchangeMembershipIdTemp !== null && exchangeMembershipIdTemp[0] !== undefined)
        unFollow({
          exchangeMembershipId: exchangeMembershipIdTemp[0].id,
          exchangeMembershipOwnerId: currentUserId,
        })
      else console.log('exchangeMembershipIdTemp: ', exchangeMembershipIdTemp)

      this.exchangeAdminMenu.className = 'exchange-admin-menu-disable'
      this.setState({...this.state, unFollowed: true, followLoading: false})
    }
  }

  render() {
    const {
      unFollowed, imageLoaded, editView, loadingEdit, processing, selectedImage,
    } = this.state
    const {translate, exchanges, exchangeId, currentUserId} = this.props
    if (exchanges.list[exchangeId]) {
      const currentExchange = exchanges.list[exchangeId] && exchanges.list[exchangeId]
      return (
          <div className="-sidebar-child-wrapper col">
            <div className="align-items-center flex-column">
              {currentUserId !== (currentExchange.owner && currentExchange.owner.id) && !editView ?
                  this.state.followedExchanges.indexOf(currentExchange.id) >= 0 && !unFollowed ?
                      <div>
                        <div className="fa fa-ellipsis-v menuBottom bubble-more" onClick={(e) => this._handleMenu(e)}/>
                        <div className={'exchange-admin-menu-disable'} ref={e => this.exchangeAdminMenu = e}>
                          <div className={'exchange-admin-menu-child'} onClick={this._handleUnfollowExchange}>
                            {translate['Unfollow Exchange']}
                          </div>
                        </div>
                      </div> : null
                  :
                  <div>
                    <div className="fa fa-ellipsis-v menuBottom bubble-more" onClick={(e) => this._handleAdminMenu(e)}/>
                    <div className={'exchange-admin-menu-disable'} ref={e => this.exchangeAdminMenu = e}>
                      <div className={'exchange-admin-menu-child'} onClick={(e) => this._handleEditView(e)}>
                        {translate['Edit Exchange']}
                      </div>
                      <Link to={`/`} className={'exchange-admin-menu-child-delete'}>
                        <div className={'exchange-admin-menu-child'} onClick={(e) => this._handleDeleteExchange(e)}>
                          {translate['Delete Exchange']}
                        </div>
                      </Link>
                    </div>
                  </div>
              }{/*<i className="fa fa-arrow-left menuBottom" onClick={this._handleMembersClick.bind(this)}> </i>*/}
              {
                !editView ?

                    currentExchange.exchange_image && imageLoaded ?
                        <img className="exchangeViewBarImg" alt={translate['Exchange Picture']}
                             src={selectedImage ? selectedImage :
                                 currentExchange.exchange_image.file.includes('innowin.ir') ?
                                     currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file}/>
                        :
                        currentExchange.exchange && currentExchange.exchange_image ?
                            <img className="exchangeViewBarImg" alt={translate['Exchange Picture']}
                                 src={selectedImage ? selectedImage :
                                     currentExchange.exchange_image.file.includes('innowin.ir') ?
                                         currentExchange.exchange_image.file :
                                         REST_URL + currentExchange.exchange_image.file}/>
                            :
                            <DefaultUserIcon className="exchangeViewBarImg"/>

                    :

                    currentExchange.exchange_image && imageLoaded ?
                        <div className="edit-exchange-profile-picture-container">
                          <div className="edit-exchange-profile-picture">
                            تغییر تصویر
                          </div>
                          <img className="exchangeViewBarImg" alt={translate['Exchange Picture']}
                               src={selectedImage ? selectedImage :
                                   currentExchange.exchange_image.file.includes('innowin.ir') ?
                                       currentExchange.exchange_image.file : REST_URL + currentExchange.exchange_image.file}/>
                          {!processing ?
                              <input type="file" accept="image/*" onChange={e => this._uploadHandler(e.currentTarget.files[0])}/>
                              : null}
                        </div>
                        :
                        currentExchange.exchange && currentExchange.exchange_image ?
                            <div className="edit-exchange-profile-picture-container">
                              <div className="edit-exchange-profile-picture">
                                تغییر تصویر
                              </div>
                              <img className="exchangeViewBarImg" alt={translate['Exchange Picture']}
                                   src={selectedImage ? selectedImage :
                                       currentExchange.exchange_image.file.includes('innowin.ir') ?
                                           currentExchange.exchange_image.file :
                                           REST_URL + currentExchange.exchange_image.file}/>
                              {!processing ?
                                  <input type="file" accept="image/*" onChange={e => this._uploadHandler(e.currentTarget.files[0])}/>
                                  : null}
                            </div>
                            :
                            <div className={'edit-exchange-profile-picture-container'}>
                              <div className={'edit-exchange-profile-picture'}>
                                تصویر جدید
                              </div>
                              {
                                selectedImage ?
                                    <img className="exchangeViewBarImg" alt={translate['Exchange Picture']}
                                         src={selectedImage}/> : <DefaultUserIcon className="exchangeViewBarImg"/>
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
                            currentExchange && currentExchange.name === '' ? 'بدون نام' :
                                currentExchange.name ? currentExchange.name :
                                    currentExchange.name === '' ? 'بدون نام' : currentExchange.name
                          }
                          </span>
                        :
                        <input ref={e => this.editName = e} className={'edit-exchange-name-input'}
                               defaultValue={
                                 currentExchange.name === '' ? 'بدون نام' :
                                     currentExchange.name ? currentExchange.name :
                                         currentExchange.name === '' ? 'بدون نام' : currentExchange.name}/>
                  }
                </div>
              </div>
              {
                !editView ?
                    <div>
                      <div className="-grey1 fontSize-13px description-right-bar">
                        {
                          currentExchange.description === '' ? 'بدون توضیحات' :
                              currentExchange.description ? currentExchange.description :
                                  currentExchange.description === '' ? 'بدون توضیحات' : currentExchange.description
                        }
                      </div>
                      <div className="under-description-right-bar">
                        <CalendarEmpty className='under-description-right-bar-svg-calendar-view'/>
                        1397/12/15

                        <div style={{margin: '0 5px', fontSize: '5px', color: '#aeaeae', display: 'inline-block', paddingBottom: '2px'}}>⬤</div>

                        <Contacts width="14px" height="14px" containerClass="under-description-right-bar-svg-member-view-con"
                                  svgClass="under-description-right-bar-svg-member-view"/>
                        {currentExchange.members_count === null ? 0 : currentExchange.members_count}
                      </div>
                    </div>
                    :
                    <textarea ref={e => this.editDescription = e} className={'edit-exchange-description-input'}
                              defaultValue={
                                currentExchange.description === '' ? 'بدون توضیحات' :
                                    currentExchange.description ? currentExchange.description :
                                        currentExchange.description === '' ? 'بدون توضیحات' : currentExchange.description
                              }/>
              }

            </div>


            {/*{*/}
            {/*!editView ?*/}
            {/*<div className="numbersSection flex-column">*/}
            {/*<div>*/}
            {/*<span>اعضا:</span>*/}
            {/*<span>*/}
            {/*{currentExchange.members_count === null ? 0 :*/}
            {/*currentExchange.members_count ? currentExchange.members_count :*/}
            {/*currentExchange.exchange.content.members_count === null ? 0 : currentExchange.exchange.content.members_count}*/}
            {/*</span>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*<span>عرضه:</span>*/}
            {/*<span>{currentExchange.supply_count}</span>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*<span>تقاضا:</span>*/}
            {/*<span>{currentExchange.demand_count}</span>*/}
            {/*</div>*/}
            {/*/!*<div>*!/*/}
            {/*/!*<span>محصول عرضه شده:</span>*!/*/}
            {/*/!*<span>؟</span>*!/*/}
            {/*/!*</div>*!/*/}
            {/*</div>*/}
            {/*:*/}
            {/*null*/}
            {/*}*/}
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
                        style={{cursor: 'pointer'}}
                        onClick={() => this.setState({...this.state, editView: false, selectedImage: null})}> لغو
                    </button>
                  </div>
            }
            {
              !editView ?
                  <div className={'exchange-view-bar-socials'}> {/* TODO:ABEL disable-logo class for non social exchange fields*/}
                    {/*<i className={"fa fa-youtube-play youtube disable-logo"}/>*/}
                    <i className={'fa fa-telegram disable-logo'}/>
                    <i className={'fa fa-instagram disable-logo'}/>
                    <i className={'fa fa-linkedin-square disable-logo'}/>
                    <i className={'fa fa-twitter disable-logo'}/>
                  </div>
                  :
                  null
            }
          </div>
      )
    }
    else {
      return (
          <div style={{textAlign: 'center', margin: '35px 10px 45px 10px'}}>
            پنجره مورد نظر یافت نشد!
          </div>
      )
    }
  }
}

const StateToProps = (state, ownProps) => {
  const client = state.auth.client
  const userId = state.auth.client.identity.content
  const fileSelectorByKeyValue = makeFileSelectorByKeyValue()
  return ({
    translate: state.intl.messages,
    router: state.router,
    exchanges: state.exchanges,
    currentUserIdentity: state.auth.client.identity.content,
    currentUserId: userId,
    currentUserType: client.user_type,
    exchangesIdentities: state.common.exchangeMembership.list,
    clientExchangeMemberships: state.auth.client.exchangeMemberships,
    clientFiles: fileSelectorByKeyValue(state, 'identity', client.identity.content),
    temp: state.temp.file,
  })
}
const DispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeMembershipByExchangeId: ExchangeMembershipActions.getExchangeMembershipByExchangeId,
    editExchange: exchangeActions.editExchange,
    deleteExchange: exchangeActions.deleteExchange,
    follow: ExchangeMembershipActions.createExchangeMembership,
    unFollow: ExchangeMembershipActions.deleteExchangeMembership,
    getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
    getAllExchanges: exchangeActions.getAllExchanges,
    createFile,
    removeFileFromTemp: TempActions.removeFileFromTemp,
  }, dispatch),
})

export default connect(StateToProps, DispatchToProps)(ExchangeViewBar)
