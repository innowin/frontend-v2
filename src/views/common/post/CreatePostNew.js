import React, {Component} from 'react'
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import SupplyIcon from "../../../images/common/supply_svg"
import DemandIcon from "../../../images/common/demand_svg"
import AttachFileIcon from "../../../images/common/attachFile_svg"
import ContributionIcon from "../../../images/common/contribution_svg"
import Image from "src/images/common/image_upload_svg"
import Share from "src/images/common/share"
import FontAwesome from "react-fontawesome"
import socialActions from "../../../redux/actions/commonActions/socialActions"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"

class CreatePostNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'supply',
      open: false,
      attachMenu: false,
      enterAttach: true,
      contactMenu: false,
      labels: {},
      search: '',
      context: false,
      pageX: 0,
      pageY: 0,
      placeholder: 'در زیست بوم باش ...',
      selectedText: '',
    }
  }

  componentDidMount() {
    this.props.actions.getFollowers({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId
    })
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = (event) => {
    if (this.setWrapperRef && !this.setWrapperRef.contains(event.target)) {
      if (this.state.attachMenu) {
        this.setState({...this.state, attachMenu: !this.state.attachMenu})
      }
    }

    if (this.setWrapperSecondRef && !this.setWrapperSecondRef.contains(event.target)) {
      if (this.state.contactMenu) {
        this.setState({...this.state, contactMenu: !this.state.contactMenu})
      }
    }

    if (this.setWrapperThirdRef && !this.setWrapperThirdRef.contains(event.target)) {
      if (this.state.context) {
        this.setState({...this.state, context: !this.state.context})
      }
    }

  }

  handleSelectShare = () => {
    this.setState({...this.state, selected: 'share'})
  }
  handleSelectDemand = () => {
    this.setState({...this.state, selected: 'demand'})
  }
  handleSelectSupply = () => {
    this.setState({...this.state, selected: 'supply'})
  }

  handleAttach = () => {
    this.setState({...this.state, attachMenu: !this.state.attachMenu})
  }

  handleContact = () => {
    this.setState({...this.state, contactMenu: !this.state.contactMenu})
  }

  handleLabel(name) {
    let temp = {...this.state.labels}
    if (temp[name] === undefined) {
      if (name === 'دنبال کنندگان' || name === 'دنبال کنندگانِ دنبال کنندگان' || temp['عمومی'] === undefined)
        temp[name] = name
    }
    else {
      if (name !== 'دنبال کنندگان' && name !== 'دنبال کنندگانِ دنبال کنندگان')
        delete temp['عمومی']
      delete temp[name]
    }

    this.setState({...this.state, labels: {...temp}})

  }

  contextMenu = (e) => {
    e.preventDefault()
    this.setState({...this.state, pageX: e.pageX, pageY: e.pageY, context: true, selectedText: window.getSelection().toString()})
  }

  render() {

    const followersArr = Object.values(this.props.followers).filter(follow => follow.follow_follower.id !== this.props.currentUserIdentity && follow.follow_follower.name.includes(this.state.search))
    const exchangesArr = Object.values(this.props.exchanges).filter(exchange => exchange.exchange_identity_related_exchange.name.includes(this.state.search))


    return (
        <div className='post-component-container'>
          <div className='post-component-header'>
            <div>
              {this.props.currentUserMedia !== null && this.props.currentUserMedia !== undefined ?
                  <img alt='profile' src={this.props.currentUserMedia} className='post-component-header-img'/>
                  :
                  <DefaultUserIcon width='45px' height='45px'/>
              }
              {this.props.currentUserName}
            </div>
            <div className='post-component-header-item'>
              <Share className={this.state.selected === 'share' ? "post-component-header-item-logo1" : "post-component-header-item-logo1-unselect"}
                     onClick={this.handleSelectShare}/>
              <DemandIcon height="22px" className={this.state.selected === 'demand' ? 'post-component-header-item-logo' : 'post-component-header-item-logo-unselect'}
                          onClickFunc={this.handleSelectDemand}/>
              <SupplyIcon height="18px" className={this.state.selected === 'supply' ? 'post-component-header-item-logo2' : 'post-component-header-item-logo2-unselect'}
                          onClickFunc={this.handleSelectSupply}/>
            </div>
          </div>

          <div ref={e => this.text = e} className={this.state.open ? 'post-component-textarea-open' : 'post-component-textarea'} onContextMenu={this.contextMenu}
               onFocus={() => this.setState({...this.state, placeholder: ''})}
               contentEditable={true}
               onBlur={(e) => e.target.innerText === '' ? this.setState({...this.state, placeholder: 'در زیست بوم باش ...', open: false}) : this.setState({...this.state, open: true})}
               style={{color: this.state.placeholder.length > 0 ? '#BBBBBB' : 'black'}}>
            {this.state.placeholder}
          </div>

          <div className='post-component-footer'>

            <div className='post-component-footer-logo' onClick={this.handleContact}>?</div>
            <div className='post-component-footer-items-style-cont'>
              {
                Object.values(this.state.labels).map(label =>
                    <div className='post-component-footer-items-style'>
                      <div className='post-component-footer-items-style-text'>{label}</div>
                      <div className='post-component-footer-items-style-close' onClick={() => this.handleLabel(label)}>✕</div>
                    </div>)
              }

              <div className='post-component-footer-items-style-hide'/>

              <div className='post-component-footer-send'>
                <div style={{display: 'inline-block'}} onClick={this.handleAttach}>
                  <AttachFileIcon className='post-component-footer-send-attach'/>
                </div>
                <button className='post-component-footer-send-btn'>ارسال</button>

                <div ref={e => this.setWrapperRef = e} className={this.state.attachMenu ? 'post-component-footer-attach-menu-container' : "post-component-footer-attach-menu-container-hide"}>
                  <div className='post-component-footer-attach-menu'>
                    <div className='explore-menu-items'>
                      <AttachFileIcon className='post-component-footer-logos'/>
                      فایل
                    </div>
                    <div className='explore-menu-items'>
                      <Image className='post-component-footer-logos'/>
                      عکس
                    </div>
                    <div className='explore-menu-items'>
                      <ContributionIcon className='post-component-footer-logos'/>
                      ویدئو
                    </div>
                    <div className='explore-menu-items'>
                      <ContributionIcon className='post-component-footer-logos'/>
                      محصول
                    </div>
                    <div className='explore-menu-items'>
                      <ContributionIcon className='post-component-footer-logos'/>
                      لینک
                    </div>
                  </div>
                </div>

              </div>

            </div>


            <div ref={e => this.setWrapperSecondRef = e} className={this.state.contactMenu ? 'post-component-footer-contact-menu-container' : "post-component-footer-contact-menu-container-hide"}>
              <div className='post-component-footer-contact-menu'>
                <div className='post-component-footer-contact-menu-icon'>
                  ?
                  <span>  </span>
                  مخاطبین
                </div>
                <div className='post-component-footer-searchbox'>
                  <input type='text' className='post-component-footer-searchbox-input' placeholder='جستجو' onChange={(e) => this.setState({...this.state, search: e.target.value})}
                         onKeyUp={this.submitSearchByWord}/>
                  <FontAwesome name="search" className='post-component-footer-searchbox-icon'/>
                </div>

                <div className='post-component-footer-contact-menu-content'>
                  <div className='post-component-footer-check-container'>
                    {
                      'عمومی'.includes(this.state.search) ? <label className='post-component-footer-checkbox'>
                            <input type="checkbox" checked={this.state.labels['عمومی'] !== undefined} onClick={() => this.handleLabel('عمومی')}/>
                            <span className='checkmark'></span>
                            عمومی
                          </label>
                          : null
                    }

                    {
                      'دنبال کنندگان'.includes(this.state.search) ? <label className='post-component-footer-checkbox'>
                            <input type="checkbox" checked={this.state.labels['دنبال کنندگان'] !== undefined} onClick={() => this.handleLabel('دنبال کنندگان')}/>
                            <span className='checkmark'></span>
                            دنبال کنندگان
                          </label>
                          : null
                    }

                    {
                      'دنبال کنندگانِ دنبال کنندگان'.includes(this.state.search) ? <label className='post-component-footer-checkbox'>
                            <input type="checkbox" checked={this.state.labels['دنبال کنندگانِ دنبال کنندگان'] !== undefined} onClick={() => this.handleLabel('دنبال کنندگانِ دنبال کنندگان')}/>
                            <span className='checkmark'></span>
                            دنبال کنندگانِ دنبال کنندگان
                          </label>
                          : null
                    }
                  </div>

                  <div className='post-component-footer-contact-menu-content-title' style={{display: exchangesArr.length > 0 ? 'block' : 'none'}}>بورس ها</div>

                  <div className='post-component-footer-check-container'>
                    {
                      exchangesArr.map(exchange =>
                          <label className='post-component-footer-checkbox'>
                            <input type="checkbox" checked={this.state.labels[exchange.exchange_identity_related_exchange.name] !== undefined || this.state.labels['عمومی']}
                                   onClick={() => this.handleLabel(exchange.exchange_identity_related_exchange.name)}/>
                            <span className='checkmark'></span>
                            {exchange.exchange_identity_related_exchange.name}
                          </label>
                      )
                    }
                  </div>

                  <div className='post-component-footer-contact-menu-content-title' style={{display: followersArr.length > 0 ? 'block' : 'none'}}>دنبال کنندگان</div>

                  <div className='post-component-footer-check-container'>
                    {
                      followersArr.map(follow => {
                            return (
                                <label className='post-component-footer-checkbox'>
                                  <input type="checkbox" checked={this.state.labels[follow.follow_follower.name] !== undefined || this.state.labels['عمومی']}
                                         onClick={() => this.handleLabel(follow.follow_follower.name)}/>
                                  <span className='checkmark'></span>
                                  {follow.follow_follower.name}
                                </label>
                            )
                          }
                      )
                    }
                  </div>

                </div>

                <div style={{textAlign: 'left'}}>
                  <button className='post-component-footer-cancel-btn'>لغو</button>

                  <button className='post-component-footer-submit-btn'>ثبت</button>
                </div>

              </div>
            </div>


          </div>

          <div ref={e => this.setWrapperThirdRef = e} className='post-component-context' style={{left: this.state.pageX, top: this.state.pageY, height: this.state.context ? '100px' : '0px'}}>
            <div className='post-component-context-items' onClick={this.handleEmail}>
              <FontAwesome name="envelope" style={{color: '#353535',width:'20px',fontSize:'13px'}}/>
              ایمیل
            </div>
            <div className='post-component-context-items' onClick={this.handlePhone}>
              <FontAwesome name="phone" style={{color: '#353535',width:'20px',fontSize:'15px'}}/>
              تلفن
            </div>
          </div>

        </div>
    )
  }

  handleEmail = () => {
    let email = 'mailto:' + this.state.selectedText
    let outEmail = `<a href=${email}>${this.state.selectedText}</a>`
    this.text.innerHTML = this.text.innerText.replace(this.state.selectedText, outEmail)
  }

  handlePhone = () => {
    let email = 'tel:' + this.state.selectedText
    let outEmail = `<a href=${email}>${this.state.selectedText}</a>`
    this.text.innerHTML = this.text.innerText.replace(this.state.selectedText, outEmail)
  }
}

const mapStateToProps = (state) => {
  const clientImgId = (state.auth.client.user_type === 'person') ? (state.auth.client.profile.profile_media) : (
      (state.auth.client.organization && state.auth.client.organization.organization_logo) || null
  )

  const userId = state.auth.client.user !== null ? state.auth.client.user.id : state.auth.client.organization.id

  return ({
    currentUserType: state.auth.client.user_type,
    currentUserIdentity: state.auth.client.identity.content,
    currentUserId: userId,
    currentUserMedia: (state.common.file.list[clientImgId] && state.common.file.list[clientImgId].file) || null,
    currentUserName: state.auth.client.user.first_name + ' ' + state.auth.client.user.last_name,
    exchanges: state.common.exchangeMembership.list,
    followers: state.common.social.follows.list,
  })
}

const
    mapDispatchToProps = dispatch => ({
      actions: bindActionCreators({
        getFollowers: socialActions.getFollowers
      }, dispatch)
    })
export default connect(mapStateToProps, mapDispatchToProps)

(
    CreatePostNew
)