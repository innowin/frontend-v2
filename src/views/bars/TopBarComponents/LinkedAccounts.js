import connect from "react-redux/es/connect/connect"
import LinkedInIcon from "../../../images/common/linkedin_svg"
import React, {Component} from 'react'
import {bindActionCreators} from "redux"

class LinkedAccounts extends Component {
  render() {
    return (
        <div>
          <div className='settingModal-menu-manage-hint'>
            بارگذاری مخاطبین شما در شبکه های دیگر، به اینوین کمک می کند تا پیشنهاد های دقیق تری برای گسترش ارتباط
            به شما ارائه کند. ما بدون اطلاع شما با هیچ یک از این افراد ارتباط (ایمیل، پیامک
            و ...) نخواهیم گرفت.
          </div>

          <div className='settingModal-menu-manage-container'>
            <div className='settingModal-menu-manage-title'>
              {this.props.translate["Google"]}
            </div>
            <LinkedInIcon className='settingModal-menu-manage-logo'/>
            <div className='settingModal-menu-manage-address'>something@website.com</div>
            <button className='settingModal-menu-manage-remove'>{this.props.translate["Disconnect"]}</button>
          </div>

          <div className='settingModal-menu-manage-container'>
            <div className='settingModal-menu-manage-title'>
              {this.props.translate["Linkedin"]}
            </div>
            <LinkedInIcon className='settingModal-menu-manage-logo'/>
            <div className='settingModal-menu-manage-address'>something@website.com</div>
            <button className='settingModal-menu-manage-add'>{this.props.translate["Add"]}</button>
          </div>

        </div>
    )
  }
}

const mapStateToProps = state => ({
  translate: state.intl.messages.topBar
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(LinkedAccounts)