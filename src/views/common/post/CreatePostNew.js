import React, {Component} from 'react'
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import SupplyIcon from "../../../images/common/supply_svg"
import DemandIcon from "../../../images/common/demand_svg"
import AttachFileIcon from "../../../images/common/attachFile_svg"
import ContributionIcon from "../../../images/common/contribution_svg"
import Image from "src/images/common/image_upload_svg"
import Share from "src/images/common/share"

class CreatePostNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'supply',
      open: false,
      attachMenu: false,
      enterAttach: true,
      contactMenu: false,
    }
  }

  componentDidMount() {
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

  handleOpen = (e) => {
    if (e.target.value.length > 0) {
      this.setState({open: true})
    }
    else {
      this.setState({open: false})
    }
  }

  render() {
    return (
        <div className='post-component-container'>
          <div className='post-component-header'>
            <div>
              <img alt='profile' src={this.props.currentUserMedia} className='post-component-header-img'/>
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
          <textarea className={this.state.open ? 'post-component-textarea-open' : 'post-component-textarea'} onChange={this.handleOpen} placeholder='در زیست بوم باش ...'/>
          <div className='post-component-footer'>

            <div className='post-component-footer-logo' onClick={this.handleContact}>?</div>

            <div className='post-component-footer-items-style'>
              <div className='post-component-footer-items-style-text'>عمومی</div>
              <div className='post-component-footer-items-style-close'>✕</div>
            </div>

            <div className='post-component-footer-items-style'>
              <div className='post-component-footer-items-style-text'>فریلنسر</div>
              <div className='post-component-footer-items-style-close'>✕</div>
            </div>

            <div className='post-component-footer-items-style'>
              <div className='post-component-footer-items-style-text'>سپاهان تک</div>
              <div className='post-component-footer-items-style-close'>✕</div>
            </div>

            <div className='post-component-footer-send'>
              <div style={{display: 'inline-block'}} onClick={this.handleAttach}>
                <AttachFileIcon className='post-component-footer-send-attach'/>
              </div>
              <button className='post-component-footer-send-btn'>ارسال</button>
            </div>


            <div ref={e => this.setWrapperRef = e} className={this.state.attachMenu ? 'post-component-footer-attach-menu-container' : "post-component-footer-attach-menu-container-hide"}>
              <div className='post-component-footer-attach-menu'>
                <div className='explore-menu-items'>
                  <AttachFileIcon className='explore-logos'/>فایل
                </div>
                <div className='explore-menu-items'>
                  <Image className='explore-logos'/>عکس
                </div>
                <div className='explore-menu-items'>
                  <ContributionIcon className='explore-logos'/> ویدئو
                </div>
                <div className='explore-menu-items'>
                  <ContributionIcon className='explore-logos'/>
                  محصول
                </div>
                <div className='explore-menu-items'>
                  <ContributionIcon className='explore-logos'/> لینک
                </div>
              </div>
            </div>


            <div ref={e => this.setWrapperSecondRef = e} className={this.state.contactMenu ? 'post-component-footer-contact-menu-container' : "post-component-footer-contact-menu-container-hide"}>
              <div className='post-component-footer-attach-menu'>
                hello
              </div>
            </div>


          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const clientImgId = (state.auth.client.user_type === 'person') ? (state.auth.client.profile.profile_media) : (
      (state.auth.client.organization && state.auth.client.organization.organization_logo) || null
  )
  return ({
    currentUserMedia: (state.common.file.list[clientImgId] && state.common.file.list[clientImgId].file) || null,
    currentUserName: state.auth.client.user.first_name + ' ' + state.auth.client.user.last_name
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CreatePostNew)